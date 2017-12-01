package com.ffss.datax.configuration.service

import groovy.util.logging.Log4j

import javax.transaction.Transactional

import org.joda.time.DateTime
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.jpa.repository.Modifying
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service

import com.ffss.datax.common.constants.Constants
import com.ffss.datax.common.domain.userprofile.PasswordHistory
import com.ffss.datax.security.util.SecurityUtil
import com.ffss.datax.configuration.repository.LoginPasswordConfigRepository
import com.ffss.datax.configuration.repository.PasswordHistoryRepository
import com.ffss.datax.configuration.repository.UserRepository

/**
 * The Class UserPasswordService for passwordRelated activities like saving password,validating password etc.
 *
 * @author Virtusa|Polaris
 */
@Log4j
@Service
class UserPasswordService {

	@Autowired
	UserRepository userRepository

	@Autowired
	PasswordEncoder passwordEncoder

	@Autowired
	LoginPasswordConfigRepository loginPasswordConfigRepository

	@Autowired
	PasswordHistoryRepository passwordHistoryRepository

	/**
	 * Save new password that has been encoded using bCryptPassword encoder
	 * along with some parameters like expireData,pwdExpired etc.
	 *
	 * @param password the password
	 * @return true if password has been saved successfully else false
	 */
	@Transactional
	def saveNewPassword(password) {
		def expireTime
		def pwdExpireTime
		def response=false
		def oldPwd

		def encryptedPwd = new BCryptPasswordEncoder().encode(password)
		def userData = userRepository.findOne(SecurityUtil.retrieveUserId())
		if(userData){
			oldPwd=userData.passwordHash
			def passwordConfig = findLoginPasswordConfig(userData)
			def reuseCount = passwordConfig.pwdReuseRestriction
			expireTime = passwordConfig.userDefinedPwdExpiry
			pwdExpireTime = Integer.parseInt(expireTime)
			userData.isPwdSysgen = Constants.userGenPwd
			userData.passwordHash = encryptedPwd
			userData.lastPwdChangDate = DateTime.now()
			userData.ispwdExpired = Constants.isPwdExpired
			userData.pwdExpireDate = DateTime.now().plusDays(pwdExpireTime)
			//userRepository.save(userData)
			savePasswordHistory(userData, reuseCount,oldPwd)
			log.debug('Saving the newly entered password')
			response=true
		}
		response
	}
	@Transactional
	@Modifying
	def savePasswordHistory(userData,reuseCount,oldPwd){
		def history = passwordHistoryRepository.findPasswordHistoryCountByUser(userData.id)

		if(reuseCount.asType(Long) > history.asType(Long)){
			passwordHistoryRepository.save(new PasswordHistory(
					passwordHash:userData.passwordHash,user:userData))
		}
		else if(reuseCount.asType(Long) == history.asType(Long)) {
			def historyList = passwordHistoryRepository.findHistory(userData.id)
			passwordHistoryRepository.delete(historyList.get(0).id)
		}
		else{
			Long diff = history.asType(Long)-reuseCount.asType(Long)
			def historyList = passwordHistoryRepository.findHistory(userData.id)
			(diff+1).times{
				passwordHistoryRepository.delete(historyList.get(it).id)
			}
		}
		passwordHistoryRepository.save(new PasswordHistory(
				passwordHash:userData.passwordHash,user:userData))
		userRepository.save(userData)
	}

	/**
	 * Validate entered password matches with the data present in the Database.
	 *
	 * @param password the password
	 * @return true if the password matches with the data present in DB else false
	 */
	def checkCurrentPwd(password) {
		def userData = userRepository.findOne(SecurityUtil.retrieveUserId())
		userData ? passwordEncoder.matches(password, userData.passwordHash) : false
	}

	/**
	 * Validate new password matches with the Regular expression. 
	 *
	 * @param password the password
	 * @return true if the passwordMatches with the regularExpression else false 
	 */
	def validateNewPwd(password) {
		def regex
		def minLen
		def isUppercase
		def isLowercase
		def isNumber
		def isSplChar
		def pwdReuseRestriction
		String pwd = password
		def isValid  = true
		boolean pwdReuseCheck = true

		def userData = userRepository.findOne(SecurityUtil.retrieveUserId())
		def passwordConfig = findLoginPasswordConfig(userData)
		regex = passwordConfig.passwordRegex
		minLen = passwordConfig.passWordMinLen
		isUppercase = passwordConfig.isUppercase
		isLowercase = passwordConfig.isLowercase
		isNumber = passwordConfig.isNumber
		isSplChar = passwordConfig.isSplChar
		pwdReuseRestriction = passwordConfig.pwdReuseRestriction
		def regExpression = regex.toString()

		def uppercasePattern = '((?=.*[A-Z]).{'+minLen+',50})'
		def lowercasePattern = '((?=.*[a-z]).{'+minLen+',50})'
		def numberPattern = '((?=.*[0-9]).{'+minLen+',50})'
		def splCharPattern = '((?=.*[`~!@#$%^&*-+=.,:;?<>]).{'+minLen+',50})'

		def passwordDataList = passwordHistoryRepository.findHistoryOfPasswords(userData.id)
		passwordDataList.each{
			def match =  passwordEncoder.matches(pwd, it)
			if(match){
				pwdReuseCheck = false
			}
		}
		log.debug('Matching the newly entered password with the regex')

		if(pwdReuseCheck){
			if(isUppercase){
				isValid = pwd.matches(uppercasePattern.toString())
			}
			if(isValid && isLowercase){
				isValid = pwd.matches(lowercasePattern.toString())
			}
			if(isValid && isNumber){
				isValid = pwd.matches(numberPattern.toString())
			}
			if(isValid && isSplChar){
				isValid = pwd.matches(splCharPattern.toString())
			}
		}else{
			isValid = false
		}
		isValid
	}

	/**
	 * Find password policy data based on the organizationId
	 *
	 * @param userData the user data
	 * @return passwordConfiguration 
	 */
	def findLoginPasswordConfig(userData){
		def orgUserPwdExpiryDetails,loginPasswordConfig
		if(userData.organization){
			orgUserPwdExpiryDetails = loginPasswordConfigRepository.findByOrganizationId(userData.organization.id.asType(Long))
			log.debug(orgUserPwdExpiryDetails?"loginPasswordConfig for OrganizationId-${userData.organization.id} is there":'No data found for userOrganizationId so fetching the default passwordConfigValue')
		}
		orgUserPwdExpiryDetails?(loginPasswordConfig = orgUserPwdExpiryDetails):(loginPasswordConfig  = loginPasswordConfigRepository.findDefaultValue())
		loginPasswordConfig
	}
}

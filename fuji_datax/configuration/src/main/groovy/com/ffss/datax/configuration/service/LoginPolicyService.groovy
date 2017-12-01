package com.ffss.datax.configuration.service

import groovy.util.logging.Log4j

import javax.transaction.Transactional

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

import com.ffss.datax.common.constants.Constants
import com.ffss.datax.common.domain.configuration.OrgLoginConfigMap
import com.ffss.datax.security.util.SecurityUtil
import com.ffss.datax.configuration.constants.ConfigurationConstants
import com.ffss.datax.configuration.repository.LoginPasswordConfigRepository
import com.ffss.datax.configuration.repository.OrganizationRepository
import com.ffss.datax.configuration.repository.UserRepository


/**
 * Class LoginPolicyService for providing CRUD operations on loginPolicy details.
 */
@Log4j
@Service
class LoginPolicyService {

	@Autowired
	LoginPasswordConfigRepository loginPasswordConfigRepository

	@Autowired
	UserRepository userRepository

	@Autowired
	OrganizationRepository organizationRepository

	/**
	 * save passwordPolicy with configuration like
	 * passwordMinLength,regex.
	 *
	 * @param password the password
	 * @param userId the user id
	 * @return the java.lang. object
	 */
	@Transactional
	def savePasswordPolicyConfig(passwordPolicy,userId){
		
		def regularExpression
		def pwdLength = passwordPolicy.pwdminlen.asType(Integer)
		regularExpression = ConfigurationConstants.REGEX+pwdLength+ConfigurationConstants.PWD_MAX_LENGTH
		def user = userRepository.findOne(userId.asType(Long))
		loginPasswordConfigRepository.save(new OrgLoginConfigMap(passWordMinLen:passwordPolicy.pwdminlen,
		accountLockThreshold:passwordPolicy.accntlockmax,
		userDefinedPwdExpiry:passwordPolicy.userdfndpwdexp,
		pwdReuseRestriction:passwordPolicy.pwdReuseRestriction,
		passwordRegex :regularExpression,
		isUppercase : passwordPolicy.isUppercase,
		isLowercase :passwordPolicy.isLowercase,
		isNumber : passwordPolicy.isNumber,
		isSplChar : passwordPolicy.isSplChar,
		comments:ConfigurationConstants.ALLOW_ALL,
		isDefault:Constants.FLAG_NO,
		organization:(user.organization?.id)?(organizationRepository.findOne(user.organization.id.asType(Long))):null))
	}


	/**
	 * Validate password policy for mandatory field .
	 *
	 * @param password the passwordPolicyObject 
	 * @return true if the mandatory field is present else false
	 */
	def validatePasswordPolicy(passwordPolicy){
		
		def policyList = ['pwdminlen']
		passwordPolicy.each {key,value->
			if(!key || !value)
				return false
			policyList.remove(key)
		}
		policyList.size()==0
	}

	/**
	 * Update password policy for the given configurationId with configuration like
	 * passwordMinLength,regex.
	 *
	 * @param password the password
	 * @param configId the configurationId
	 * @param userId the user id
	 * @return the updatedPasswordPolic object
	 */
	@Transactional
	def updatePasswordPolicy(passwordPolicy,configId,userId){
		
		def regularExpression
		def pwdPolicy = loginPasswordConfigRepository.findOne(configId.asType(Long))
		def user = userRepository.findOne(userId)
		pwdPolicy?.with{
			regularExpression = ConfigurationConstants.REGEX+passwordPolicy.pwdminlen+ConfigurationConstants.PWD_MAX_LENGTH
			passWordMinLen =passwordPolicy.pwdminlen
			pwdReuseRestriction = passwordPolicy.pwdReuseRestriction
			userDefinedPwdExpiry =passwordPolicy.userdfndpwdexp
			accountLockThreshold =passwordPolicy.accntlockmax
			passwordRegex = regularExpression
			isUppercase = passwordPolicy.isUppercase
			isLowercase =passwordPolicy.isLowercase
			isNumber = passwordPolicy.isNumber
			isSplChar = passwordPolicy.isSplChar
			organization = (user.organization?.id)?(organizationRepository.findOne(user.organization.id.asType(Long))):null
			loginPasswordConfigRepository.save(pwdPolicy)
			log.debug('Passwordpolicy configuration has been updated successfully')
		}

		pwdPolicy
	}
	
	/**
	 * Method to fetch the passwordConfiguration policy.
	 * finds the default passwordConfiguration policy and adds it to the list and
	 * search the configurationPolicy for the organizationId and adds it to the list if available  
	 * @return list containing passwordConfiguration details
	 */
	def findPasswordPolicy(){
		
		def passwordConfiguration = []
		def user = userRepository.findOne(SecurityUtil.retrieveUserId())
		// fetching the default value of passwordConfiguration and adding to the list
		passwordConfiguration.add(loginPasswordConfigRepository.findDefaultValue())
		// fetching the passwordConfiguration for the organizationId and adding to the list
		def orgPasswordConfig = loginPasswordConfigRepository.findByOrganizationId(user.organization?.id)
		orgPasswordConfig?passwordConfiguration.add(orgPasswordConfig):''
		passwordConfiguration
	}
}

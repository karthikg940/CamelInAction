
package com.ffss.datax.auth.service

import groovy.util.logging.Log4j

import org.joda.time.DateTime
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service

import com.ffss.datax.auth.constants.AuthConstants
import com.ffss.datax.auth.repository.UserAccountRepository
import com.ffss.datax.auth.service.feign.NotificationService
import com.ffss.datax.common.constants.ChannelEnum
import com.ffss.datax.common.constants.NotificationEventEnum
import com.ffss.datax.common.domain.userprofile.UserAccount
import com.ffss.datax.security.util.JwtTokenGenerator


/**
 * The Class UserService.
 *
 * @author Virtusa|Polaris
 * 
 */
@Service
@Log4j
class UserPasswordService {

	/** The user repository. */
	@Autowired
	UserAccountRepository userAccountRepository

	/** The password encoder. */
	@Autowired
	PasswordEncoder passwordEncoder

	/** The System Configuration Service. */
	@Autowired
	SystemConfigurationService systemConfigurationService

	/** The Password generator. */
	@Autowired
	PasswordGenerator passwordGenerator

	/** The Notification service. */
	@Autowired
	NotificationService notificationService
	
	/** The Ldap Configuration Service. */
	@Autowired
	LdapConfigurationService ldapConfigurationService

	
	/**
	 * Lock user account after maximum login attempts
	 * @param userName - the user name
	 * @return user - the UserAccount object
	 *
	 */
	def lockUserAccount(userName){

		def user = userAccountRepository.findActiveUserByUserName(userName)
		if(user){
			user.lockedTime = DateTime.now()
			user.isUserLock =  AuthConstants.FLAG_Y
			userAccountRepository.save(user)
			user
		}
	}

	/**
	 * Get the user info and check the password expired informaiton
	 * @param userId
	 * @return user object
	 */
	def getUserDetails(userId){
		def user
		if(userId)
		user = userAccountRepository.findOne(userId.asType(Long))
		def retVal
		if(user)
			retVal = updatePasswordExpiry(user)
			
		retVal
	}

	/**
	 * GetsUser Details.
	 * @param user the user
	 * @return the user Object
	 */
	def getUser(userName) {

		userAccountRepository.findActiveUserByUserName(userName)
	}

	/**
	 * Unlock user account after configured time.
	 *
	 * @param userId the user id
	 */
	UserAccount unlockUser(userId,unlockUser){
		def user = userAccountRepository.findOne(userId)
		//TODO: If unlock by admin, we need to check with the role and organization ID
		if(user){
			def lastLockedTime = user.lockedTime.millis
			def currentloginTime = DateTime.now().millis
			def differenceInMin = ((currentloginTime - lastLockedTime) / AuthConstants.NUMERIC_1000) / AuthConstants.NUMERIC_60
			if(differenceInMin > AuthConstants.NUMERIC_5 || unlockUser.equals('admin')){
				user.isUserLock =  AuthConstants.FLAG_N
				user.loginAttempt = AuthConstants.NUMERIC_0
				user.lockedTime = null
				userAccountRepository.save(user)
			}
		}
		user
	}


	/**
	 * Checks password expire date and update user account
	 * accordingly.
	 * 
	 * @param user the user
	 */
	def updatePasswordExpiry(user){

		def currentTime = DateTime.now().millis
		def pwdExpiryTime
		user.pwdExpireDate ?  (pwdExpiryTime = user.pwdExpireDate.millis) : (pwdExpiryTime = AuthConstants.NUMERIC_0)
		def difference = ((pwdExpiryTime - currentTime) / AuthConstants.NUMERIC_1000) / AuthConstants.NUMERIC_60
		if(difference  > AuthConstants.NUMERIC_0){
			log.info ' --->> Password will expire in '+ difference / AuthConstants.NUMERIC_60 + ' hours'
			user.ispwdExpired =  AuthConstants.FLAG_N
		}
		else{
			user.ispwdExpired =  AuthConstants.FLAG_Y
		}
		
		userAccountRepository.save(user)
	}



	/**
	 * Validate the user 
	 * @param user the user
	 * @return true or false
	 * 
	 */
	def validateUser(value){
		def retval = false
		def user 
		
		if(value.contains(AuthConstants.SYMBOL_ATTHERATE)){
			 user = userAccountRepository.findActiceUserByEmail(value.toString())
		} else {
			 user = userAccountRepository.findActiveUserByUserName(value)
		}
	
		if(user){
		    retval=true
		}
			
		retval
	}

	
	/**
	 * Reset the user password
	 * @param value the user password
	 * @return true or false
	 */
	def resetPassword(value){
		def present
		def retVal = false
		if(value.contains(AuthConstants.SYMBOL_ATTHERATE)){
			present = userAccountRepository.findActiceUserByEmail(value.toString())
		} else {
			present = userAccountRepository.findActiveUserByUserName(value.toString())
		}
		if(present){
			retVal = true
			def pwdLength = systemConfigurationService.getUserPwdLengthDetails(present.organization.id.asType(Long))
			def systemGenereatedPassword = passwordGenerator.generatePassword(pwdLength,pwdLength+AuthConstants.NUMERIC_2)
			def encryptedSysGenPwd = new BCryptPasswordEncoder().encode(systemGenereatedPassword)
			present.passwordHash = encryptedSysGenPwd
			present.isPwdSysgen =  AuthConstants.FLAG_Y
			userAccountRepository.save(present)

			sendEmail(present.id,present.userName,systemGenereatedPassword,present.emailAddress)
		}
		retVal
	}

	/**
	 * Send email
	 * @param id
	 * @param userName
	 * @param password
	 * @param email
	 * @return
	 */
	def sendEmail(id,userName,password,email){
		def secret = AuthConstants.SECRET_CODE
		def token = 'Bearer ' + JwtTokenGenerator.generateToken([id:id, userName:userName],secret)

		// TO-DO Need to change the orgId. Get the OrgId from loggedIn user and set it 
		notificationService.notificationSave(ChannelEnum.EMAIL.value,
				[notification:[
						to:[email],data:[password:password],template: AuthConstants.RESET_PASSWORD,
						eventId:NotificationEventEnum.RESETPASSWORD.value],orgId:1],token)
	}
}

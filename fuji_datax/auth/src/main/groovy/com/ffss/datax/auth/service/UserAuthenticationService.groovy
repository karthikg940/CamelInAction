package com.ffss.datax.auth.service

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service

import com.ffss.datax.auth.constants.AuthConstants
import com.ffss.datax.auth.repository.UserAccountRepository
import com.ffss.datax.common.constants.Constants

/**
 * 
 * @author Virtusa|Polaris
 *
 */
@Service
class UserAuthenticationService {

	/** The user account repository. */
	@Autowired
	UserAccountRepository userAccountRepository
	
	/** The password encoder. */
	@Autowired
	PasswordEncoder passwordEncoder

	/** The System Configuration Service. */
	@Autowired
	SystemConfigurationService systemConfigurationService

	/** The System Configuration Service. */
	@Autowired
	UserPasswordService userPasswordService

	/** The ldap configuration configuration. */
	@Autowired
	LdapConfigurationService ldapConfigurationService
	/**
	 * Authenticate.
	 * @param user the user
	 * @param pwd the pwd
	 * @return the java.lang. object
	 */
	def authenticate(userName, pwd) {
		def user = userAccountRepository.findByUserName(userName)
		def loggedInUser = userAccountRepository.findActiveUserByUserName(userName)
		def orgId
		def accountThresholdValue = ''
		if(loggedInUser){

			if(loggedInUser.organization){
				orgId = loggedInUser.organization.id
				accountThresholdValue = systemConfigurationService.getThresholdValue(orgId)
			}
		}
		def retVal = false
		if(loggedInUser){

			if(loggedInUser.lockedTime){
				userPasswordService.unlockUser(loggedInUser.id,'user')
			}
			def value = ''
			if(loggedInUser.organization){// Get the pwd expired details for loggedin user organizaiton
				orgId = loggedInUser.organization.id
				value = systemConfigurationService.getUserPwdExpiryDetails(orgId)
			}

            //Update the password expired flag
			if(value==''){
				loggedInUser.ispwdExpired = AuthConstants.FLAG_N
				userAccountRepository.save(loggedInUser)
			}
			else{
				userPasswordService.updatePasswordExpiry(loggedInUser)
			}
            
			//isUserLock flag is N then validate the user pwd password. return true if user is authenticated else false and set the login attempt value
 			if(loggedInUser.isUserLock ==  AuthConstants.FLAG_N){
				retVal = passwordEncoder.matches(pwd, loggedInUser.passwordHash)
				if(retVal){//return true in case valid pwd
					loggedInUser.loginAttempt = AuthConstants.NUMERIC_0
					userAccountRepository.save(loggedInUser)
					retVal
				}
				else{
					if(accountThresholdValue == ''){//return false in case threshold value is empty
						retVal =false
					}
					else{//set the login attempt value in case invalid pwd
						def thresholdValue = Integer.parseInt(accountThresholdValue)
						loggedInUser.loginAttempt += AuthConstants.NUMERIC_1
						userAccountRepository.save(loggedInUser)
						if(loggedInUser.loginAttempt == thresholdValue){
							userPasswordService.lockUserAccount(userName)
							retVal = Constants.locked
						}
					}
				}
			}
			else{//return locked in case isUserLock value is Y
				retVal = Constants.locked
			}
		}
		else if(!user){ //return false in case user not found 
			retVal = false
		}
		else{
			retVal = AuthConstants.NOT_ACTIVIE
		}
		retVal
	}

	/**
	 * Authenticate.
	 * @param user the user
	 * @param pwd the pwd
	 * @return the java.lang. object
	 */
	def authenticateLdap(user, pwd){
		def retVal = AuthConstants.USER_NOT_FOUND_IN_DATAX
		def loggedUser = userAccountRepository.findByUserName(user)
		 if(loggedUser){
			 loggedUser.ispwdExpired =  AuthConstants.FLAG_N
			 loggedUser.isPwdSysgen =  AuthConstants.FLAG_N
			 userAccountRepository.save(loggedUser)
			 retVal = ldapConfigurationService.authenticate(user, pwd)
		 }
		 retVal
	}
	
}

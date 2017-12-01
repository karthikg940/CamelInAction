package com.ffss.datax.auth.web.resource


import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

import com.ffss.datax.auth.constants.AuthConstants
import com.ffss.datax.auth.service.SystemConfigurationService
import com.ffss.datax.auth.service.UserAuthenticationService
import com.ffss.datax.auth.service.UserPasswordService
import com.ffss.datax.auth.web.transformer.LoginTransformer
import com.ffss.datax.common.constants.Constants
import com.ffss.datax.common.constants.CustomErrorCode
/**
 * Login Controller.
 *
 * @author Virtusa|Polaris
 * 
 */
@RestController
@RequestMapping('/api/login')
class LoginResource {

	/** The user service. */
	@Autowired
	UserPasswordService userPasswordService

	/** The user service. */
	@Autowired
	UserAuthenticationService userAuthenticationService
	
	/**  Login transformer **/
	@Autowired
	LoginTransformer loginTransformer

	/**  System configuration service **/
	@Autowired
	SystemConfigurationService systemConfigurationService

	/**
	 * Login.
	 * @param user the user
	 * @param pwd the pwd
	 * @param secret the secret
	 * @return the JWT TOKEN
	 */
	@RequestMapping(value='' , method = RequestMethod.POST)
	def login(@RequestParam('user') user, @RequestParam('pwd') pwd, @RequestParam('secret') secret) {

		def retVal = new ResponseEntity(CustomErrorCode.ER_401.value, HttpStatus.UNAUTHORIZED)

		def isAutenticated = true
		def ldapVal = systemConfigurationService.getSystemConfig()
		def ldapaccess =ldapVal[0].sysConfigValue
		if(ldapaccess==AuthConstants.FLAG_Y){ //IF flag Y, authenticate the user against the Datax DB  
			isAutenticated = userAuthenticationService.authenticateLdap(user, pwd)
		}else{//If flag N, authenticate the user against the Ldap repository  
			isAutenticated = userAuthenticationService.authenticate(user, pwd)
		}

		def loggedInUser = userPasswordService.getUser(user)
		if(isAutenticated == AuthConstants.NOT_ACTIVIE){//If user is inactive
			retVal = new ResponseEntity(CustomErrorCode.ER_400.value, HttpStatus.BAD_REQUEST)
		}
		else if(isAutenticated ==AuthConstants.USER_NOT_FOUND_IN_DATAX){//if user is not found in datax
			retVal = new ResponseEntity(CustomErrorCode.ER_404.value, HttpStatus.NOT_FOUND)
		}

		else if (isAutenticated) {// If valid user return user information
			retVal = loginTransformer.transformResult(secret, loggedInUser)
		}
		if(isAutenticated == Constants.locked){// validate the user locked info
			retVal = new ResponseEntity(CustomErrorCode.ER_403.value, HttpStatus.FORBIDDEN)
		}

		retVal
	}

	/**
	 * Get the user password expired details information
	 * 
	 * @param userId
	 * @return true or flase - based on Password expired date 
	 */
	@RequestMapping(value='' , method = RequestMethod.GET)
	def getUserPasswordExpiredDetail(@RequestParam('userId') Long userId) {

		def retVal = new ResponseEntity(CustomErrorCode.ER_404.value, HttpStatus.NOT_FOUND)
		def user = userPasswordService.getUserDetails(userId)
		if(user){
			retVal = [user.ispwdExpired]
		}
		retVal
	}
}

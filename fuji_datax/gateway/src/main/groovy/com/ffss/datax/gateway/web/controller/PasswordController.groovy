package com.ffss.datax.gateway.web.controller

import groovy.util.logging.Log4j

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

import com.ffss.datax.gateway.constants.GatewayConstants
import com.ffss.datax.gateway.service.LoginService
import com.ffss.datax.gateway.service.UserProfileService

/**
 *The Class PasswordController.
 *
 *@author Virtusa|Polaris
 */
@Log4j
@RestController
@RequestMapping('/auth/login')
class PasswordController {

	@Autowired
	LoginService loginService

	@Autowired
	UserProfileService userProfileService

	/**
	 * API to change system generated password
	 * @param newPwd - new password
	 * @param token -  token
	 * @return
	 */
	@RequestMapping(value = '/changesyspwd', method=RequestMethod.PUT)
	def changeSystemPwd(@RequestParam('password') def newPwd,@RequestParam('token') token){

		log.debug('Request to change the password by the user')

		def retVal = userProfileService.changePassword(newPwd, GatewayConstants.BEARER+token)
		retVal
	}

	/**
	 * API to validate current password
	 * @param password - current password of user
	 * @param token -  token
	 * @return  a boolean true or false based on current password valid or not
	 */
	@RequestMapping(value = '/currentpasswordvalidate', method=RequestMethod.GET)
	def currentPasswordValidate(@RequestParam('password') def password,@RequestParam('token') token){

		log.debug('Request to validate the current password')

		def retVal = userProfileService.currentPasswordValidate(password, GatewayConstants.BEARER+token)
		retVal
	}

	/**
	 * API to validate new password according to the login policy defined in the application
	 * @param password - new password of user
	 * @param token -  token
	 * @return  a boolean  true or false based on new password meets loginPolicy
	 */
	@RequestMapping(value = '/newpasswordvalidate', method=RequestMethod.GET)
	def newPasswordValidate(@RequestParam('password') def password,@RequestParam('token') token){

		log.debug('Request to validate the new password')
		def retVal = userProfileService.newPasswordValidate(password, GatewayConstants.BEARER+token)
		retVal
	}

	/**
	 * API to validate if the user exists based on userName or Email
	 * @param value - userName or Email of the user
	 * @return  a boolean  true or false based on userName or email exist in dataX db
	 */
	@RequestMapping(value='/validate',method=RequestMethod.GET)
	def validateUser(@RequestParam('value') String value) {

		log.debug('Request to validate the userName or email')

		loginService.validateUserInfo(value)
	}

	/**
	 * API to reset the password to a system generated value 
	 * and Emailed to the user based on userName or email parameter
	 * @param value - userName or Email of the user
	 * @return
	 */
	@RequestMapping(value='/reset',method=RequestMethod.POST)
	def resetPassword(@RequestParam('value') String value) {
		log.debug('Request received to reset the password by userName or email')

		loginService.resetPassword(value)
	}
}
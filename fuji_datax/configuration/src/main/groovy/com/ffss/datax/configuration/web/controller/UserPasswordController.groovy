package com.ffss.datax.configuration.web.controller

import groovy.util.logging.Log4j

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

import com.ffss.datax.configuration.service.UserPasswordService

/**
 * Class UserPasswordController provides api's for password validation and changing the currentPassword.
 * @author Virtusa|Polaris
 */
@Log4j
@RestController
@RequestMapping(value='/api/user')
class UserPasswordController {

	@Autowired
	UserPasswordService userPasswordService

	/**
	 * Method for changing/updating the password for user
	 * @param new_password
	 */
	@RequestMapping(value='/changepassword',method=RequestMethod.PUT)
	def changePassword(@RequestParam('password') String password) {
		log.debug('Request received for saving a new password')
		userPasswordService.saveNewPassword(password)
	}

	/**
	 * Validate entered currentPassword is correct or not
	 *
	 * @param password the password
	 * @return true if the entered currentPassword matches with the data in the database else false
	 */
	
	@RequestMapping(value='/currentpassword',method=RequestMethod.GET)
	def currentPasswordValidate(@RequestParam('password') String password) {
		log.debug('Request received for validating a new password')
		userPasswordService.checkCurrentPwd(password)
	}

	/**
	 * Validate new password matches with the regularExpression in the database.
	 *
	 * @param password the password
	 * @return true if the new password matched with the regularExpression
	 */
	@RequestMapping(value='/newpassword',method=RequestMethod.GET)
	def newPasswordValidate(@RequestParam('password') String password) {
		log.debug('Request received for validating a new password against a regularExpression')
		userPasswordService.validateNewPwd(password)
	}
}

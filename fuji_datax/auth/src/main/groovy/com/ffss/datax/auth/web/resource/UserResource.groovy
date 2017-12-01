package com.ffss.datax.auth.web.resource

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

import com.ffss.datax.auth.service.UserPasswordService

/**
 * Login Controller.
 *
 * @author Virtusa|Polaris
 */
@RestController
@RequestMapping('api')
class UserResource {

	@Autowired
	UserPasswordService userPasswordService
     

	/**
	 * Validate the user by name or email id 
	 * @param value the user name or email id
	 * @return true or false
	 */
	@RequestMapping(value='/userValidate',method=RequestMethod.GET)
	def validateUser(@RequestParam('value') String value) {
		[passwordReset:userPasswordService.validateUser(value)]
	}

	/**
	 * Reset the user password
	 * @param value the user password
	 * @return true or false
	 */
	@RequestMapping(value='/userValidate/reset',method=RequestMethod.POST)
	def resetPassword(@RequestParam('value') String value) {
		[passwordReset:userPasswordService.resetPassword(value)]
	}
	
	/**
	 * Unlock the user by admin
	 * @param userId
	 * @return success if the userId is found and unlocked
	 */
	@RequestMapping(value='/account/{userId}/unlock',method=RequestMethod.PUT)
	def unlockUser(@PathVariable('userId') Long userId) {
		userPasswordService.unlockUser(userId,'admin')?ResponseEntity.ok().build():ResponseEntity.notFound().build()
	}
}

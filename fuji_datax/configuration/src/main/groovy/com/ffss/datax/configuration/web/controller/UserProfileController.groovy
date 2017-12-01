package com.ffss.datax.configuration.web.controller

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.RestController

import com.ffss.datax.common.constants.CustomErrorCode
import com.ffss.datax.security.util.SecurityUtil
import com.ffss.datax.configuration.service.UserService
import com.ffss.datax.configuration.web.transformer.UserProfileTransformer

/**
 * class UserProfileController provides api's for fetching the userProfile.
 * @author Virtusa|Polaris
 */
@RestController
@RequestMapping(value='/api/userprofile')
class UserProfileController {

	@Autowired
	UserService userService

	@Autowired
	UserProfileTransformer userProfileTransformer

	/**
	 * Gets the userProfile object for the userId.
	 * userId will be got from the subject  
	 * @return the userProfile for the provided userId
	 */
	@RequestMapping(value='', method = RequestMethod.GET)
	def findUserProfile() {
		def user = userService.findUserById(SecurityUtil.retrieveUserId())
		user?userProfileTransformer.transform(user) : new ResponseEntity(CustomErrorCode.ER_404.value, HttpStatus.NOT_FOUND)
	}
}
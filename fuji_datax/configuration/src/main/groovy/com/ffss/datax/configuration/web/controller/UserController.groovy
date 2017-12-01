package com.ffss.datax.configuration.web.controller

import groovy.util.logging.Log4j

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

import com.ffss.datax.common.constants.CustomErrorCode
import com.ffss.datax.common.log.Auditable
import com.ffss.datax.security.util.SecurityUtil
import com.ffss.datax.configuration.service.UserConfigService
import com.ffss.datax.configuration.web.transformer.UserlistTransformer

/**
 * Class UserController provides api's for doing service other than CRUD operations.
 *
 * @author Virtusa|Polaris
 */
@Log4j
@RestController
@RequestMapping(value='/api/user')
class UserController {

	@Autowired
	UserlistTransformer userlistTransformer

	@Autowired
	UserConfigService userConfigService

	/**
	 * Method for checking the duplication of userName or email.
	 * @param email the email
	 * @param userName the user name
	 * @return true if the given data is present in the Database else false
	 */
	@RequestMapping(value='/search',method=RequestMethod.GET)
	def checkDuplication(@RequestParam('email') String email,@RequestParam('username') String userName) {

		if(!email){
			[isPresent:userConfigService.checkUserNamePresent(userName)]
		}
		else{
			[isPresent:userConfigService.checkMailPresent(email)]
		}
	}

	/**
	 * Method for activate or de-activate user
	 * @param id the id
	 * @param userDetails the user details
	 * @return the user JSON data
	 */
	@RequestMapping(value='/{id}/changeStatus', method=RequestMethod.PUT)
	@Auditable(eventCode=107L, microServiceName='userprofile',entityName='UserAccount',id=0)
	def changeUserStatus(@PathVariable('id') Long id ,@RequestBody userDetails) {
		log.debug('Request received for activating or de-activating user')
		def response = userConfigService.updateStatus(id, userDetails)
		response?userlistTransformer.transformUser(response):new ResponseEntity(CustomErrorCode.ER_404.value+'userId', HttpStatus.NOT_FOUND)
	}

	/**
	 * Gets the active users other that the userID present in the subject.
	 * @return the active users list JSON data
	 */
	@RequestMapping(value='/activeuser',method=RequestMethod.GET)
	def findOtherActiveUsers() {
		log.debug('Request received for getting active users')
		def retVal = userConfigService.findUsers(SecurityUtil.retrieveUserId())
		retVal?userlistTransformer.transformAll(retVal):new ResponseEntity(CustomErrorCode.ER_404.value+'users', HttpStatus.NOT_FOUND)
	}
}

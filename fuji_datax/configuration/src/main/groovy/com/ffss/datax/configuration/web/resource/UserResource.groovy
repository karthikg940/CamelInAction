package com.ffss.datax.configuration.web.resource

import groovy.util.logging.Log4j

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.RestController

import com.ffss.datax.common.constants.CustomErrorCode
import com.ffss.datax.configuration.service.UserService
import com.ffss.datax.configuration.web.transformer.UserTransformer
import com.ffss.datax.configuration.web.transformer.UserlistTransformer
import com.ffss.datax.security.util.SecurityUtil

/**
 * Class UserResource for CRUD operations.
 * @author Virtusa|Polaris
 */
@Log4j
@RestController
@RequestMapping(value='/api/org')
class UserResource {

	@Autowired
	UserService userService

	@Autowired
	UserTransformer userTransformer

	@Autowired
	UserlistTransformer userlistTransformer

	/**
	 * Method for saving a user and associations.
	 * @param userData the user data
	 */
	@RequestMapping(value='/{orgId}/userlist',method=RequestMethod.POST)
	def addNewUser(@RequestBody userData, @PathVariable('orgId') Long orgId) {
		def response = ResponseEntity.badRequest()
		if(!userService.validateUniqueData(userData)){
			def user = userService.findUserById(SecurityUtil.retrieveUserId())
			response = ResponseEntity.created(new URI("/api/org/${orgId}/userlist/${userService.saveUser(userData,user).id}"))
//			response = ResponseEntity.created(new URI("/api/user/${userService.saveUser(userData,user).id}"))
		}
		response.build()
	}
	/**
	 * fetches the user based on the userId.
	 * @param id the userId
	 * @return the userObject
	 */
	@RequestMapping(value='/{orgId}/userlist/{id}',method=RequestMethod.GET)
	def findUserById(@PathVariable('id') Long id, @PathVariable('orgId') Long orgId) {
		def user = userService.findUserById(id)
		user?userTransformer.transform(user):new ResponseEntity(CustomErrorCode.ER_404.value, HttpStatus.NOT_FOUND)
	}
	/**
	 * Fetches all the users from the database.
	 * @return the userObjects
	 */
//	@RequestMapping(value='',method=RequestMethod.GET)
//	def findAllUsers() {
//		userlistTransformer.transformAll(userService.findAllUser())
//	}
	
	@RequestMapping(value='/{orgId}/userlist',method=RequestMethod.GET)
	def findUserListByOrgId(@PathVariable('orgId') Long orgId) {
//		orgId = SecurityUtil.retreiveOrgId()
		def userList = userService.findUserListByOrgId(orgId)
		userlistTransformer.transformAll(userList)
	}

	/**
	 * Updates the user based on the userId.
	 * @param id the userId
	 * @param user the userObject
	 */
	@RequestMapping(value='/{orgId}/userlist/{id}',method=RequestMethod.PUT)
	def updateUser(@PathVariable('id') Long id,@RequestBody user, @PathVariable('orgId') Long orgId) {
		if(!userService.validateUniqueData(user)){
			log.debug('Request received for updation of user')
			userService.updateUser(id,user)?ResponseEntity.ok().build():new ResponseEntity(CustomErrorCode.ER_404.value, HttpStatus.NOT_FOUND)
		}
		else{
			log.error("For userObject-${user} validation fails")
			ResponseEntity.badRequest().build()
		}
	}
}
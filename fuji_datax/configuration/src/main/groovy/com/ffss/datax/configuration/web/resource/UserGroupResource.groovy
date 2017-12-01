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
import com.ffss.datax.common.log.Auditable
import com.ffss.datax.configuration.service.UserGroupService
import com.ffss.datax.configuration.web.transformer.UserGroupListTransformer
import com.ffss.datax.configuration.web.transformer.UserGroupTransformer

/**
 * Class UserGroupResource for CRUD operations.
 * @author Virtusa|Polaris
 */
@Log4j
@RestController
@RequestMapping(value='/api/usergroup')
class UserGroupResource {

	@Autowired
	UserGroupService userGroupService

	@Autowired
	UserGroupTransformer userGroupTransformer

	@Autowired
	UserGroupListTransformer userGroupListTransformer


	/**
	 * Save the usergroup data along with associations like users,roles etc.
	 * @param userGroupData the user group data
	 * @return the userId
	 */
	@RequestMapping(value='',method=RequestMethod.POST)
	@Auditable(eventCode=103L, microServiceName='userprofile', contentPosition=0,entityName='userGroup')
	def addUserGroup(@RequestBody userGroupData) {

		if(!userGroupService.validateUser(userGroupData.users)){
			def userGroup = userGroupService.saveUserGroup(userGroupData)
			ResponseEntity.created(new URI("/api/usergroup/${userGroup.id}")).build()
		}
	}

	/**
	 * fetches all the userGroup present in the Database.
	 * @return the userGroup objects
	 */
	@RequestMapping(value='',method=RequestMethod.GET)
	def findAllUserGroups(){
		log.debug('Fetches all the userGroup from DataX')
		userGroupListTransformer.transformAll(userGroupService.findAllUserGroup())
	}

	/**
	 * Gets the groupDetail with its associations like users,roles etc based on groupId .
	 * @param id the groupId
	 * @return the userGroup JSON data
	 */
	@RequestMapping(value='/{id}',method=RequestMethod.GET)
	def findGroup(@PathVariable('id') Long id){
		def userGroup = userGroupService.findGroupById(id)
		log.debug("Fetch the userGroup from DataX based on UserGroupId -${id}")
		userGroup?userGroupTransformer.transform(userGroup):new ResponseEntity(CustomErrorCode.ER_400.value, HttpStatus.NOT_FOUND)
	}

	/**
	 * Update the userGroup based on the groupId and its associations like users,roles etc.
	 * @param id the groupId
	 * @param userGroupData the user group data
	 * @return the status
	 */
	@RequestMapping(value='/{id}',method=RequestMethod.PUT)
	@Auditable(eventCode=105L, microServiceName='userprofile',entityName='userGroup',id=0)
	def updateUserGroup(@PathVariable('id') Long id,@RequestBody userGroupData) {
		def retVal  = ResponseEntity.ok().build()
		if(!userGroupService.validateUser(userGroupData.users)) {
			log.debug("updates the userGroup present in DataX based on UserGroupId -${id}")
			userGroupService.updateUserGroup(id,userGroupData)?ResponseEntity.ok().build():ResponseEntity.notFound().build()
		}
		retVal
	}


	/**
	 * Delete the userGroup based on the groupId and if associations like users,roles etc available.
	 * @param id the groupId
	 * @return the status
	 */
	@RequestMapping(value='/{id}',method=RequestMethod.DELETE)
	@Auditable(eventCode=104L, microServiceName='userprofile', contentPosition=0,id=0,entityName = 'userGroup')
	def deleteUserGroup(@PathVariable('id') Long id){
		def response = ResponseEntity.notFound().build()

		def group = userGroupService.deleteUserGroup(id)
		if(group){
			log.debug("Deleted the userGroup for userGroupId - ${id}")
			response= ResponseEntity.noContent().build()
		}
		response
	}
}
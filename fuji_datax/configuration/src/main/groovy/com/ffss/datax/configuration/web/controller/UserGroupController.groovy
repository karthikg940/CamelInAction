package com.ffss.datax.configuration.web.controller

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

import com.ffss.datax.configuration.service.UserGroupService



/**
 * Class UserGroupController provide api's for duplicate groupName validation.
 * @author Virtusa|Polaris
 */
@RestController
@RequestMapping(value='/api/usergroup')
class UserGroupController {

	@Autowired
	UserGroupService userGroupService

	/**
	 * Method for finding duplicate validation check of userGroupName.
	 * @param groupName the group name
	 * @return the true or false
	 */
	@RequestMapping(value='/search',method=RequestMethod.GET)
	def checkGroupName(@RequestParam('name')  groupName) {
		[isPresent:userGroupService.checkUserGroupName(groupName)]
	}
}
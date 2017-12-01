package com.ffss.datax.configuration.service

import groovy.util.logging.Log4j

import javax.transaction.Transactional

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

import com.ffss.datax.common.domain.userprofile.UserGroup
import com.ffss.datax.configuration.repository.OrganizationRepository
import com.ffss.datax.configuration.repository.PermissionRepository
import com.ffss.datax.configuration.repository.RoleRepository
import com.ffss.datax.configuration.repository.UserGroupRepository
import com.ffss.datax.configuration.repository.UserRepository

/**
 *  Class UserGroupService for performing userGroup CRUD operations.
 * @author Virtusa|Polaris
 */
@Log4j
@Service
class UserGroupService {

	@Autowired
	UserGroupRepository userGroupRepository

	@Autowired
	UserRepository userRepository

	@Autowired
	RoleRepository roleRepository

	@Autowired
	OrganizationRepository organizationRepository

	@Autowired
	PermissionRepository permissionRepository

	def users,roleList,orgList,permissionList

	/**
	 * Save user group details and map the associations like organization,role,permission,user
	 * @param userGroupData the user group data
	 * @return the userGroup object
	 */
	def saveUserGroup(userGroupData) {
		//TODO: Need to change the logic to modify the way we are updating createdBy and updatedBy value
		def userGroup = userGroupRepository.save(new UserGroup(
				groupName:userGroupData.groupName,description:userGroupData.description,createdBy:1,updatedBy:1
				))
		mapDataToListandSave(userGroup,userGroupData)
		userGroup
	}

	/**
	 * Fetches all the groups from Database.
	 * @return the userGroup object
	 */
	def findAllUserGroup() {
		log.debug('Service for fetching the userGroup from DataX')
		userGroupRepository.findAll()
	}

	/**
	 * method for fetching the userGroup and its associations(organization,role,permission,user)by groupId.
	 * @param id the groupId
	 * @return the userGroup object
	 */
	def findGroupById(groupId) {
		log.debug("Service for fetching the userGroup from DataX for userGroupId- ${groupId}")
		userGroupRepository.findOne(groupId)
	}

	/**
	 * validateUser for duplication check.
	 * @param users the userObjects
	 * @return the nonUnique object
	 */
	def validateUser(users) {

		if(users) {
			def nonUnique=users.clone().unique().size()!=users.size()
			log.debug("Service for validation of duplicateUsers in the JsonData ${nonUnique}")
			nonUnique
		}
	}


	/**
	 * updateUserGroup and updates association to userGroup for organization, permission, role, user
	 * @param id the groupId
	 * @param userGroupData the userGroup data
	 * @return the userGroup object
	 */
	@Transactional
	def updateUserGroup(groupId,userGroupData) {

		def userGroup = userGroupRepository.findOne(groupId)
		userGroup.description=userGroupData.description
		log.debug('Service for updation of userGroup')
		mapDataToListandSave(userGroup,userGroupData)
		userGroup
	}

	/** 
	 * Method for deleting the userGroup and its associations(organization,role,permission,user) based on the groupId
	 * @param id -groupId
	 */
	@Transactional
	def deleteUserGroup(groupId) {
		def group = userGroupRepository.findOne(groupId)
		if(group){
			group.role = []
			group.permission = []
			group.users = []
			group.org = []
			log.debug('Service for deletion of userGroup')
			userGroupRepository.save(group)
			userGroupRepository.delete(groupId)
		}
		group
	}

	/**
	 * Checks the userGroup name is already present or not.
	 * @param groupName the group name
	 * @return true if userGroup is present in the database else false
	 */
	def checkUserGroupName(groupName) {
		log.debug('Service for Duplicate validation check of userGroupName')
		userGroupRepository.findByGroupName(groupName) != null
	}

	/**
	 * addUsersToList if the userId is present in the Database .
	 * @param userGroupData the user group data
	 */
	def addUsersToList(userGroupData) {
		users= []
		userGroupData.users?.each{
			def user=userRepository.findOne(it.id.asType(Long))
			log.debug('Service for adding users to the list')
			users.add(user)
		}
	}

	/**
	 * Map data to list and save the userGroup Object.
	 *
	 * @param userGroupObj the userGroupObj
	 * @param reqData the data from frontEnd
	 */
	@Transactional
	def mapDataToListandSave(userGroupObj,reqData){
		//iterate thorugh the given methods for adding the data from frontEnd to list
		['addUsersToList', 'addRoleToList', 'addOrganizationToList', 'addPermissionToList'].each{
			this."${it}"(reqData)
		}
		userGroupObj.role = roleList
		userGroupObj.permission = permissionList
		userGroupObj.users = users
		userGroupObj.org = orgList
		userGroupRepository.save(userGroupObj)
	}

	/**
	 * Adds the role to list if the role Id is present in the Database .
	 *
	 * @param userGroupData the group data
	 */
	def addRoleToList(userGroupData) {
		roleList= []
		userGroupData.roles?.each{
			def role=roleRepository.findOne(it.id.asType(Long))
			log.debug('Service for adding roles to the list')
			roleList.add(role)
		}
	}
	/**
	 * Adds the organization to list if the organizationId is present in the Database .
	 *
	 * @param userGroupData the group data
	 */
	def addOrganizationToList(userGroupData) {
		orgList= []
		userGroupData.userOrg?.each{
			def organization=organizationRepository.findOne(it.id.asType(Long))
			log.debug('Service for adding organization to the list')
			orgList.add(organization)
		}
	}
	/**
	 * Adds the permission to list if the permissionId is present in the Database .
	 *
	 * @param userGroupData the group data
	 */
	def addPermissionToList(userGroupData) {
		permissionList= []
		userGroupData.permissions?.each{
			def permission=permissionRepository.findOne(it.id.asType(Long))
			log.debug('Service for adding permission to the list')
			permissionList.add(permission)
		}
	}
}

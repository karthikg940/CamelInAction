package com.ffss.datax.configuration.service

import groovy.util.logging.Log4j

import javax.transaction.Transactional

import org.joda.time.DateTime
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

import com.ffss.datax.common.domain.userprofile.UserRole
import com.ffss.datax.configuration.repository.OrganizationRepository
import com.ffss.datax.configuration.repository.PermissionRepository
import com.ffss.datax.configuration.repository.RoleRepository
import com.ffss.datax.configuration.repository.UserGroupRepository
import com.ffss.datax.configuration.repository.UserRepository

/**
 * Class RoleService for performing CRUD operations on roles.
 *
 * @author Virtusa|Polaris
 */
@Log4j
@Service
class RoleService {

	@Autowired
	RoleRepository roleRepository

	@Autowired
	PermissionRepository permissionRepository

	@Autowired
	OrganizationRepository organizationRepository

	@Autowired
	UserRepository userRepository

	@Autowired
	UserGroupRepository userGroupRepository


	def permission ,  orgVal ,userList , userGroupList

	/**
	 * Save role and associate permission and organization to role.
	 *
	 * @param roleData the role data
	 * @return the roleObject
	 */
	@Transactional
	def saveRole(roleData) {
		def roles = roleRepository.save(new UserRole(roleName:roleData.roleName, description:roleData.description,roleStartDateTime:DateTime.now(), roleEndDateTime:DateTime.now()))
		//method to add permissions to list
		addPermissionsToList(roleData)
		if(permission){
			roles.permission = permission
		}
		//method to add organizations to list
		addOrganizationToRole(roleData)
		if(orgVal){
			roles.organization = orgVal
		}
		roleRepository.save(roles)
		log.debug('Role has been saved successfully')
		roles
	}

	/**
	 * Validate permissions for duplicate check.
	 *
	 * @param permission the permission
	 * @return the nonUnique object
	 */
	def validatePermissions(permission) {
		if(!permission){
			false
		}
		else{
			if(permission.size() !=0){
				def nonUnique=permission.clone().unique().size()==permission.size()
				nonUnique
			}
			else {
				false
			}
		}
	}

	/**
	 * Adds the permissions to list only if permissionId is present in Database.
	 *
	 * @param roleData the role data
	 */
	def addPermissionsToList(roleData) {
		permission = []
		roleData.permission?.each{
			def prmsn = permissionRepository.findOne(it.id.asType(Long))
			permission.add(prmsn)
		}
	}

	/**
	 * Method to Gets the list of Roles from the dataBase.
	 *
	 * @return the all Roles
	 */
	def findAllRoles() {
		roleRepository.findAll()
	}

	/**
	 * Method to Gets the role and its associations(permission,organization,user,group) by roleId
	 *
	 * @param id - the roleId
	 * @return the roleObject
	 */
	def findRoleById(roleId) {
		roleRepository.findOne(roleId)
	}

	/**
	 * Method to Delete the Role by roleId and release all the associations(permission,organization,user,group)
	 *
	 * @param id - the roleId
	 */
	@Transactional
	def deleteRole(roleId) {
		// gets the role object by id
		def role = roleRepository.findOne(roleId)
		if(role){
			role.permission =[]
			role.organization =[]
			role.users =[]
			role.groups =[]
			roleRepository.save(role)
			log.debug("Role has been deleted successfully for the roleId -${roleId}")
			roleRepository.delete(roleId)
		}
		role
	}

	/**
	 * 
	 * Method to Update  the Role and its associations(permission,organization,user,group) by roleId
	 *
	 * @param id - the roleId
	 * @param data - update data 
	 * @return the role Object
	 */
	@Transactional
	def updateRole(roleId, data) {
		def existingData
		existingData= roleRepository.findOne(roleId.asType(Long))
		if(existingData){
			existingData.roleName = data.roleName
			existingData.description = data.description
			addPermissionsToList(data)
			permission?(existingData.permission = permission):(existingData.permission=[])
			addOrganizationToRole(data)
			orgVal?(existingData.organization = orgVal):(existingData.organization=[])
			roleRepository.save(existingData)
			log.debug("Role has been updated successfully for the roleId -${roleId}")
		}
		existingData
	}

	/**
	 * Adds the organization to role id if the given organizationId is present in DB.
	 *
	 * @param data - the list of organizations
	 */
	def addOrganizationToRole(data) {
		orgVal = []
		data.organization?.each  {
			def org =organizationRepository.findOne(it.id.asType(Long))
			orgVal.add(org)
		}
	}

	/**
	 * Method for checking roleName present in the Database or not.
	 *
	 * @param roleName the role name
	 * @return  true if rolename present
	 */
	def checkRoleNamePresent(roleName) {
		//gets the role name if exists in db
		roleRepository.findByRoleName(roleName) != null
	}

	/**
	 * method for re-allocating users and groups from one role to another newRole
	 * and delete the oldRole
	 * 
	 * @param existingRoleObj -old role object
	 * @param newRoleObj
	 */
	@Transactional
	def reAllocateRoles(existingRoleObj,newRoleObj) {

		//calls the methods addUsersToList() ,addUsergroupToList()
		['addUsersToList', 'addUsergroupToList'].each{
			this."${it}"(existingRoleObj, newRoleObj)
		}
		newRoleObj.users = userList.unique()
		newRoleObj.groups = userGroupList.unique()
		roleRepository.save(newRoleObj)
		//deletes the current role
		deleteRole(existingRoleObj.id)
	}

	/**
	 * Method for adding users to the list from oldRole and newRole before
	 * re-allocation of role is performed
	 * @param existingRoleObj
	 * @param newRoleObj
	 * @return
	 */
	def addUsersToList(existingRoleObj, newRoleObj) {
		userList = []
		[existingRoleObj, newRoleObj].users?.each {
			it.collect{
				def user = userRepository.findOne(it.id.asType(Long))
				userList.add(user)
			}
		}
		log.debug('User for a role has been added to list and ready for reallocation')
	}

	/**
	 * Method for adding userGroups to the list from oldRole and newRole before
	 * re-allocation of role is performed
	 * @param existingRoleObj
	 * @param newRoleObj
	 * @return
	 */
	def addUsergroupToList(existingRoleObj, newRoleObj) {
		userGroupList = []
		[existingRoleObj, newRoleObj].groups?.each {
			it.collect{
				def group = userGroupRepository.findOne(it.id.asType(Long))
				userGroupList.add(group)
			}
		}
		log.debug('Group for a role has been added to list and ready for reallocation')
	}
}

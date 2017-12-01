package com.ffss.datax.configuration.service

import groovy.util.logging.Log4j

import javax.transaction.Transactional

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.stereotype.Service

import com.ffss.datax.common.constants.Constants
import com.ffss.datax.common.domain.userprofile.UserAccount
import com.ffss.datax.configuration.repository.LoginPasswordConfigRepository
import com.ffss.datax.configuration.repository.OrganizationRepository
import com.ffss.datax.configuration.repository.PermissionRepository
import com.ffss.datax.configuration.repository.RoleRepository
import com.ffss.datax.configuration.repository.SystemConfigurationRepository
import com.ffss.datax.configuration.repository.UserGroupRepository
import com.ffss.datax.configuration.repository.UserRepository


/**
 * Class UserService for user CRUD operations.
 * @author Virtusa|Polaris
 */
@Log4j
@Service
class UserService {

	@Autowired
	UserRepository userRepository

	@Autowired
	PasswordGenerator passwordGenerator

	@Autowired
	SystemConfigurationRepository systemConfigRepository

	@Autowired
	OrganizationRepository organizationRepository

	@Autowired
	LoginPasswordConfigRepository loginPasswordConfigRepository

	@Autowired
	UserConfigService userConfigService

	@Autowired
	UserGroupRepository userGroupRepository

	@Autowired
	RoleRepository roleRepository

	@Autowired
	PermissionRepository permissionRepository

	def roleList,
	permissionList,
	groupList,
	orgList

	/**
	 * Save user data and saves the role,permission,group,organization associations for user.
	 *
	 * @param userData the user data
	 * @param user the user
	 * @return the user object
	 */
	def saveUser(userData,user) {
		def pwdLength = findUserPwdLengthDetails(user.organization.id.asType(Long))
		def systemGenereatedPassword = passwordGenerator.generatePassword(pwdLength,pwdLength+2)
		def encryptedSysGenPwd = new BCryptPasswordEncoder().encode(systemGenereatedPassword)
		def org = organizationRepository.findOne(userData.activeOrgList.get(0).id.asType(Long))
				
		def userObj
		//TODO: Need to change the logic of using findAll
		def ldapVal = systemConfigRepository.findAll()
		def ldapaccess =ldapVal[0].sysConfigValue
		if(ldapaccess==Constants.FLAG_YES){
			userObj = userRepository.save(new UserAccount(
					title:userData.title,firstName:userData.firstName,
					lastName:userData.lastName,userName:userData.userName,
					phoneNo:userData.phone,emailAddress:userData.email,
					isActive:Constants.FLAG_YES,isUserLock:Constants.FLAG_NO,
					loginAttempt:Constants.LOGIN_ATTEMPT,prefix:userData.prefix,
					isPwdSysgen:Constants.FLAG_NO,organization:org,ispwdExpired:Constants.FLAG_NO))
		}
		else{

			userObj = userRepository.save(new UserAccount(
					title:userData.title,firstName:userData.firstName,
					lastName:userData.lastName,userName:userData.userName,
					phoneNo:userData.phone,emailAddress:userData.email,
					passwordHash:encryptedSysGenPwd,isActive:Constants.FLAG_YES,
					isUserLock:Constants.FLAG_NO,loginAttempt:Constants.LOGIN_ATTEMPT,prefix:userData.prefix,
					isPwdSysgen:Constants.FLAG_YES,organization:org))
			userConfigService.sendUserName(userData)
			userConfigService.sendPassword(userData,systemGenereatedPassword)
		}
		mapDataToListandSave(userObj,userData)
		userObj
	}



	/**
	 * Find user by userId.
	 * @param id the id
	 * @return the user object
	 */
	def findUserById(userId) {
		userRepository.findOne(userId)
	}


	/**
	 * Fetch all the users present in Datax.
	 * @return the user objects
	 */
	def findAllUser(){
		userRepository.findAll()
	}
	
	def findUserListByOrgId(orgId){
		 userRepository.findUserListByOrgId(orgId)
	}

	/**
	 * Update user details and updates the role,permission,organization,userGroup.
	 * @param id the id
	 * @param user the user
	 * @return the user object
	 */
	def updateUser(userId,user){
		def userObj = userRepository.findOne(userId)
		def org = organizationRepository.findOne(user.activeOrgList.get(0).id.asType(Long))
		userObj.with{
			prefix = user.prefix
			title=user.title
			firstName=user.firstName
			lastName=user.lastName
			emailAddress=user.email
			phoneNo=user.phone
			organization=org
			mapDataToListandSave(userObj,user)
		}
		userObj
	}

	/**
	 * Gets the passwordLength from the passwordConfiguration table based on the OrganizationId.
	 *	
	 *If no data has been found for organizationId, then default value of passwordLength will be fetched 
	 * @param id -orgId
	 * @return the user pwd length details
	 */
	def findUserPwdLengthDetails(organizationId){
		def orgUserPwdExpiryDetails = loginPasswordConfigRepository.findByOrganizationId(organizationId.asType(Long))
		def pwdMinLength
		if(orgUserPwdExpiryDetails){
			log.debug("Getting the pwd minimum length based on the Organization Id - ${organizationId}")
			pwdMinLength = orgUserPwdExpiryDetails.passWordMinLen
		}
		else{
			log.debug('No data found for OrganizationId and so fetching the default value in Datax')
			def defUserPwdExpiryDetails = loginPasswordConfigRepository.findDefaultValue()
			pwdMinLength = defUserPwdExpiryDetails.passWordMinLen
		}
		pwdMinLength.asType(Integer)
	}

	/**
	 * Map data to list and save the userObject and associations.
	 *
	 * @param userObj the userObj
	 * @param reqData the data from frontEnd
	 */
	@Transactional
	def mapDataToListandSave(userObj,reqData){
		
		addGroupForUser(reqData)
		addRoleForUser(reqData)
		addPermissionForUser(reqData)
		addOrgToUser(reqData)
		userObj.userRole = roleList
		userObj.permission = permissionList
		userObj.userGroup = groupList
		userObj.userOrg = orgList
		
		
		log.debug ('User has been saved/updated successfully')
		userRepository.save(userObj)
	}

	/**
	 * Adds the group to list if the groupId is present in the Database.
	 *
	 * @param groupData the group data
	 */
	def addGroupForUser(groupData){
		groupList = []
		groupData.activeGroupList?.each {

			def group = userGroupRepository.findOne(it.id.asType(Long))
			groupList.add(group)
		}
		log.debug ('group has been added to list and ready for save')
	}

	/**
	 * Adds the role to list if the roleId is present in the Database.
	 *
	 * @param roleData the role data
	 */
	def addRoleForUser(roleData){
		roleList = []
		roleData.activeRoleList?.each {
			def role = roleRepository.findOne(it.id.asType(Long))
			roleList.add(role)
		}
		log.debug('role has been added to list and ready for save')
	}

	/**
	 * Adds the permission to list if the permissionId is present in the Database.
	 *
	 * @param permissionData the permission data
	 */
	def addPermissionForUser(permissionData){
		permissionList = []
		permissionData.activePrivilegeList?.each {
			def permission = permissionRepository.findOne(it.id.asType(Long))
			permissionList.add(permission)
		}
		log.debug ('Permission has been added to list and ready for save')
	}

	/**
	 * Adds the org to list if the organizationId is present in the Database.
	 *
	 * @param orgData the org data
	 */
	def addOrgToUser(orgData){
		orgList = []
		orgData.activeOrgList?.each {
			def organization = organizationRepository.findOne(it.id.asType(Long))
			orgList.add(organization)
		}
		log.debug ('Organization has been added to list and ready for save')
	}
	
//	organization = (user.organization?.id)?(organizationRepository.findOne(user.organization.id.asType(Long))):null
	


	/**
	 * Method for finding duplicate check data
	 * If duplicate is found nonUnique will be true else false
	 * checks for duplicate  for org,permission,roles,group
	 * @param user -data from frontEnd
	 * @return true or false
	 */
	def validateUniqueData(user){
		def nonUnique = false
		if(user.activeOrgList &&user.activeOrgList.size() !=0){
			nonUnique=user.activeOrgList.clone().unique().size()!=user.activeOrgList.size()
		}

		if(user.activePrivilege && user.activePrivilegeList.size() !=0 && !nonUnique){
			nonUnique=user.activePrivilegeList.clone().unique().size()!=user.activePrivilegeList.size()
		}

		if(user.activeRoleList && user.activeRoleList.size() !=0 && !nonUnique){
			nonUnique=user.activeRoleList.clone().unique().size()!=user.activeRoleList.size()
		}

		if(user.activeGroupList &&user.activeGroupList.size() !=0 && !nonUnique){
			nonUnique=user.activeGroupList.clone().unique().size()!=user.activeGroupList.size()
		}
		nonUnique
	}
}

package com.ffss.datax.configuration.web.transformer

import org.springframework.stereotype.Component

import com.ffss.datax.common.constants.Constants
import com.ffss.datax.common.domain.userprofile.UserGroup

@Component
class UserGroupTransformer {
	def transform(UserGroup userGroup){

		[ 'id':userGroup.id, 'groupName': userGroup.groupName, 'description': userGroup.description, 'users': transformUser(userGroup.users),permission:transformPermissionforGroup(userGroup.permission),
			role:transformRoleforGroup(userGroup.role),userOrg:transformOrgforGroup(userGroup.org)]
	}

	def transformUser(users) {
		users.sort{a,b->a.firstName <=> b.firstName}
		def userList = []
		users.each {
			userList.add(['id':it.id,'text':it.firstName+' '+it.lastName])
		}

		userList
	}

	def transformPermissionforGroup(permission){
		def permissionList = []
		permission?.each {
			permissionList.add(['id':it.id,'permissionName':it.permissionName])
		}

		permissionList
	}

	def transformRoleforGroup(role){
		def roleList = []
		role?.each {
			roleList.add(['id':it.id,'roleName':it.roleName])
		}

		roleList
	}

	def transformOrgforGroup(org){
		def orgList = []
		org?.each {
			if(it.isPmo==(Constants.unChecked)  && it.isStmo==(Constants.unChecked)){
				orgList.add([ 'id':it.id, 'orgName': 'FMO - '+it.orgName])
			}
			else if(it.isPmo==(Constants.checked)  && it.isStmo==(Constants.unChecked)){
				orgList.add([ 'id':it.id, 'orgName': 'PMO - '+it.orgName])
			}
			else if(it.isPmo==(Constants.unChecked)  && it.isStmo==(Constants.checked)){
				orgList.add([ 'id':it.id, 'orgName': 'STMO - '+it.orgName])
			}
			else if(it.isPmo==(Constants.checked)  && it.isStmo==(Constants.checked)){
				orgList.add([ 'id':it.id, 'orgName': 'PMO/STMO - '+it.orgName])
			}
		}

		orgList
	}
}




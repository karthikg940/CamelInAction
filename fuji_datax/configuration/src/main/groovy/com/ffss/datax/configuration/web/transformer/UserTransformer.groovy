package com.ffss.datax.configuration.web.transformer

import org.springframework.stereotype.Component

import com.ffss.datax.common.constants.Constants
import com.ffss.datax.common.domain.userprofile.UserAccount

@Component
class UserTransformer {

	def transform(UserAccount user){
		[ 'title': user.title,'prefix':user.prefix, 'firstName': user.firstName, 'lastName':user.lastName, 'userName':user.userName,
			'phone':user.phoneNo, 'email':user.emailAddress, 'status':user.isActive,permission:transformPermissionforUsers(user),
			role:transformRoleforUsers(user),userGroup:transformUserGroupforUsers(user),userOrg:transformOrgforUsers(user)]
	}

	def transformPermissionforUsers(user){
		user.permission?.collect{
			[ 'id':it?.id, 'permissionName': it?.permissionName]
		}
	}

	def transformRoleforUsers(user){
		user.userRole?.collect{
			[ 'id':it?.id, 'roleName': it?.roleName]
		}
	}

	def transformUserGroupforUsers(user){
		user.userGroup?.collect{
			[ 'id':it?.id, 'groupName': it?.groupName]
		}
	}

	def transformOrgforUsers(user){
		user.userOrg?.collect{

			if(it.isPmo==(Constants.unChecked)  && it.isStmo==(Constants.unChecked)){
				[ 'id':it.id, 'orgName': 'FMO - '+it.orgName]
			}
			else if(it.isPmo==(Constants.checked)  && it.isStmo==(Constants.unChecked)){
				[ 'id':it.id, 'orgName': 'PMO - '+it.orgName]
			}
			else if(it.isPmo==(Constants.unChecked)  && it.isStmo==(Constants.checked)){
				[ 'id':it.id, 'orgName': 'STMO - '+it.orgName]
			}
			else if(it.isPmo==(Constants.checked)  && it.isStmo==(Constants.checked)){
				[ 'id':it.id, 'orgName': 'PMO/STMO - '+it.orgName]
			}
		}
	}
}




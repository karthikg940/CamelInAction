package com.ffss.datax.configuration.web.transformer

import org.springframework.stereotype.Component

import com.ffss.datax.common.constants.Constants


@Component
class RoleTransformer {
	def transformAll(roles){
		[results:transform(roles)]
	}

	def transform(role) {
		role.collect{
			[ 'id':it.id, 'roleName': it.roleName, 'description': it.description, 'permission': transformPermissions(it.permission), 'organization': transformOrg(it.organization)]
		}
	}
	def transformPermissions(permissions){
		def permissionsList = []
		permissions.each {
			permissionsList.add(['id':it.id,'permissionName':it.permissionName])
		}

		permissionsList
	}

	def transformOrg(organization){
		def orgList = []
		organization.each{
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

	def transformRole(role) {
		[ 'id':role.id, 'roleName': role.roleName, 'description': role.description, 'permission': transformPermissions(role.permission), 'organization': transformOrg(role.organization),
			countStatus:countUserandGroup(role)]
	}

	def countUserandGroup(role){
		def countGroup = role.groups.count{it.id}
		def countUser = role.users.count{it.id}
		countGroup > 0 ||countUser>0
	}
}

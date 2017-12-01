package com.ffss.datax.configuration.web.transformer

import org.springframework.stereotype.Component

import com.ffss.datax.common.domain.userprofile.Permission

@Component
class PermissionTransformer {
	
	def transformAll(roles){
		[results:transform(roles)]
	}

	def transform(List<Permission> role) {
		role.collect{
			[ 'id':it.id, 'permissionName': it.permissionName]
		}
	}
}

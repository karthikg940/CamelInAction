package com.ffss.datax.configuration.web.transformer

import org.springframework.stereotype.Component

import com.ffss.datax.common.domain.userprofile.UserAccount
import com.ffss.datax.common.domain.userprofile.UserGroup

@Component
class UserGroupListTransformer {

	def transformAll(userGroups) {
		[results:transform(userGroups)]
	}

	def transform(List<UserGroup> userGroups) {
		userGroups.collect{
			[userGroupId:it.id,groupName:it.groupName,description:it.description,'users': transformUser(it.users)]
		}
	}

	def transformUser(List<UserAccount> users) {

		def userList = []
		users.each {
			userList.add(['id':it.id,'userName':it.userName])
		}

		userList
	}
}

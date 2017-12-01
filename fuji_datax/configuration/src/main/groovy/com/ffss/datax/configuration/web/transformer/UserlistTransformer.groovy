package com.ffss.datax.configuration.web.transformer

import org.springframework.stereotype.Component

import com.ffss.datax.common.domain.userprofile.UserAccount

@Component
class UserlistTransformer {

	def transformAll(users) {
		[results:transform(users)]
	}

	def transform(List<UserAccount> users) {
		users.sort{a,b->a.firstName <=> b.firstName}
		def userList = []
		users.each{
			if(it.userName!='system')
				userList.add([userId:it.id,userStatus:it.isActive,title:it.title,firstName:it.firstName,lastName:it.lastName,userName:it.userName,phoneNo:it.phoneNo,email:it.emailAddress,locked:it.isUserLock])
		}
		userList
	}

	def transformUser(UserAccount retVal) {
		[status:retVal.isActive]
	}
}

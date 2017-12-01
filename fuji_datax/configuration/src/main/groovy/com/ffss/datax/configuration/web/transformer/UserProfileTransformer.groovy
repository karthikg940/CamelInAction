package com.ffss.datax.configuration.web.transformer

import org.springframework.stereotype.Component

import com.ffss.datax.common.domain.userprofile.UserAccount

@Component
class UserProfileTransformer {

	def transform(UserAccount userAccount) {
		[id:userAccount.id,prefix:userAccount.prefix,firstName:userAccount.firstName,lastName:userAccount.lastName,orgId:userAccount.organization?.id]
	}
}




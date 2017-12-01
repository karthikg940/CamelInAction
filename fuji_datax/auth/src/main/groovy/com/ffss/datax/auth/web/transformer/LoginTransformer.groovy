package com.ffss.datax.auth.web.transformer


import org.springframework.stereotype.Component

import com.ffss.datax.security.util.JwtTokenGenerator

/**
 * Login Transformer
 * 
 * @author Virtusa|Polaris
 *
 */
@Component
class LoginTransformer {

	/**
	 * Transform user details 
	 * @param secret
	 * @param loginUser
	 * @return user details
	 */
	def transformResult(secret, loginUser) {

		[ token: JwtTokenGenerator.generateToken([id: loginUser.id, userName: loginUser.userName, orgId:loginUser.organization.id], secret),
			activeStatus: loginUser.isActive, lockStatus: loginUser.isUserLock, isPwdSysGenStatus: loginUser.isPwdSysgen,
			pwdExpiredStatus : loginUser.ispwdExpired ? loginUser.ispwdExpired : '' ]
	}
}

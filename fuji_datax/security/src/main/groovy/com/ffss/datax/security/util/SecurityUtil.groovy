package com.ffss.datax.security.util

import org.apache.shiro.SecurityUtils
import org.apache.shiro.subject.Subject

/**
 * Utility class containing commonly used security related functions
 * 
 * @author Virtusa|Polaris
 */
class SecurityUtil {

	/**
	 * This method retrieve the Authorizations token from SecurityUtils and creates a String that can be passed in the Authorization header.
	 * 
	 * @return String containing the security token, that can be used for Authorization header
	 */
	static String retrieveAuthToken() {
		Subject subject  = SecurityUtils.subject
		String token = "Bearer ${subject.principal.token}"
		token
	}

	/**
	 * Get the userId from the subject	
	 * @return userId as long
	 */
	static retrieveUserId() {
		Subject subject  = SecurityUtils.subject
		def userId = subject.principal.userId.asType(Long)

		userId
	}
	
	/**
	 * Get the organization Id from the subject
	 * @return orgId as long
	 */
	static retreiveOrgId(){
		Subject subject = SecurityUtils.subject
		def orgId = subject.principal.orgId.asType(Long)
		
		orgId
	}

	static getSystemSubject(Long id,String userName){
		final SECRET_CODE = 'auth.secret'
		def token = 'Bearer ' + JwtTokenGenerator.generateToken([id:id, userName:userName],SECRET_CODE)
		//Subject subject = (new Subject.Builder()).buildSubject()
		//subject.login(token)
		token
	}
}

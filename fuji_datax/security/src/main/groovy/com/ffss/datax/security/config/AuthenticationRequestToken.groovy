package com.ffss.datax.security.config

import org.apache.shiro.authc.AuthenticationToken


/**
 * 
 * Shiro authentication token implementation
 * 
 * @author Virtusa|Polaris
 *
 */
class AuthenticationRequestToken implements AuthenticationToken {

	private Object userId
	private Object orgId
	private String token
	def principal = null
	/** 
	 * Parametrized constructor.
	 * @param userId
	 * @param token
	 */
	AuthenticationRequestToken(Object userId, Object orgId, String token){
		this.userId = userId
		this.token = token
		this.orgId = orgId
	}

	@Override
	Object getCredentials() {
		userId
	}

	@Override
	Object getPrincipal() {
		principal
	}

	/**
	 * @return the userId
	 */
	Object getUserId() {
		userId
	}

	/**
	 * @param userId the userId to set
	 */
	void setUserId(Object userId) {
		this.userId = userId
	}

	/**
	 * @return the token
	 */
	String getToken() {
		token
	}

	/**
	 * @param token the token to set
	 */
	void setToken(String token) {
		this.token = token
	}

	Object getOrgId() {
		orgId;
	}

	void setOrgId(Object orgId) {
		this.orgId = orgId;
	}
}

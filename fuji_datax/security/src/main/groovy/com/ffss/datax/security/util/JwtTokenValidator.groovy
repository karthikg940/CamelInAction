package com.ffss.datax.security.util

import io.jsonwebtoken.Claims
import io.jsonwebtoken.Jwts

import com.ffss.datax.security.constants.SecurityConstants

/**
 * Class validates a given token.
 *@author Virtusa|Polaris
 */
class JwtTokenValidator {

	/**
	 * Parse the JWT token 
	 * @param token
	 * @param secret
	 * @return the userId,userName and expiration as a list
	 */
	static parseToken(String token,String secret) {
		Claims body = Jwts.parser()
				.setSigningKey(secret)
				.parseClaimsJws(token)
				.body

		[id:body.get(SecurityConstants.ID),userName:body.get(SecurityConstants.USERNAME),orgId:body.get(SecurityConstants.ORGANIZATION_ID),expiration:body.expiration]
	}
}

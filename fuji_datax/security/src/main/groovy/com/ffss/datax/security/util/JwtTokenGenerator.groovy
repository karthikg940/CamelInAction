package com.ffss.datax.security.util

import io.jsonwebtoken.Claims
import io.jsonwebtoken.Jwts
import io.jsonwebtoken.SignatureAlgorithm

import com.ffss.datax.security.constants.SecurityConstants

/**
 * Generates a Token.
 * 
 * 
 * @author Virtusa|Polaris
 *
 */
class JwtTokenGenerator {
	/**
	 * Generate a Token.
	 * 
	 * @param user Map - A map containing the id and userName.
	 * @param secret String - The secret key.
	 * @return String.
	 */
	static String generateToken(user, String secret) {
		Claims claims = Jwts.claims()
		claims.put(SecurityConstants.ID,user.id)
		claims.put(SecurityConstants.USERNAME, user.userName)
		claims.put(SecurityConstants.ORGANIZATION_ID, user.orgId)
		def token = Jwts.builder()
				.setClaims(claims)
				.signWith(SignatureAlgorithm.HS512, secret)
				.compact()
				
		token
	}
}

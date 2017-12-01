package com.ffss.datax.security.config

import io.jsonwebtoken.ClaimJwtException
import io.jsonwebtoken.ExpiredJwtException
import io.jsonwebtoken.JwtException
import io.jsonwebtoken.MalformedJwtException
import io.jsonwebtoken.PrematureJwtException
import io.jsonwebtoken.SignatureException
import io.jsonwebtoken.UnsupportedJwtException

import org.apache.shiro.authc.AuthenticationInfo
import org.apache.shiro.authc.AuthenticationToken
import org.apache.shiro.authc.SimpleAuthenticationInfo
import org.apache.shiro.realm.AuthenticatingRealm
import org.apache.shiro.subject.PrincipalCollection
import org.apache.shiro.subject.SimplePrincipalCollection
import org.springframework.stereotype.Component

import com.ffss.datax.security.constants.SecurityConstants
import com.ffss.datax.security.util.JwtTokenValidator
/**
 * Custom authentication Realm class for the token to be validated
 *  
 * @author Virtusa|Polaris
 *
 */

@Component 
class AuthenticatingTokenRealm extends AuthenticatingRealm {

	@Override
	boolean supports(AuthenticationToken token) {
		token in AuthenticationRequestToken
	}

	/**
	 *   Custom Realm for the token to be parsed and setting the userId to be used in Resource class
	 */ 
	@Override
	AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken token) {
		AuthenticationRequestToken authToken = (AuthenticationRequestToken) token

		try{
			JwtTokenValidator.parseToken(authToken.getToken(), SecurityConstants.SECRET_CODE)
		}catch(ClaimJwtException cjex){
			throw new CustomAuthenticationException()
		}catch(ExpiredJwtException ejex){
			throw new CustomAuthenticationException()
		}
		catch(MalformedJwtException mjex){
			throw new CustomAuthenticationException()
		}catch(PrematureJwtException pjex){
			throw new CustomAuthenticationException()
		}catch(SignatureException signex){
			throw new CustomAuthenticationException()
		}catch(UnsupportedJwtException usje){
			throw new CustomAuthenticationException()
		}catch(JwtException jwte){
			throw new CustomAuthenticationException()
		}

		simpleAuthenticationInfo(authToken)
	}

	/**
	 * Implementation for setting the principals and credentials
	 * @param authToken
	 * @return
	 */
	SimpleAuthenticationInfo simpleAuthenticationInfo(authToken){
		SimpleAuthenticationInfo simpleAuthenticationInfo = new SimpleAuthenticationInfo()
		PrincipalCollection principals = new SimplePrincipalCollection(authToken, authToken.token)
		Object credentials = authToken.userId
		simpleAuthenticationInfo.setPrincipals(principals)
		simpleAuthenticationInfo.setCredentials(credentials)
		simpleAuthenticationInfo
	}
}

package com.ffss.datax.security.config

import io.jsonwebtoken.ClaimJwtException
import io.jsonwebtoken.ExpiredJwtException
import io.jsonwebtoken.JwtException
import io.jsonwebtoken.MalformedJwtException
import io.jsonwebtoken.PrematureJwtException
import io.jsonwebtoken.SignatureException
import io.jsonwebtoken.UnsupportedJwtException

import javax.servlet.ServletRequest
import javax.servlet.ServletResponse
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

import org.apache.shiro.authc.AuthenticationException
import org.apache.shiro.authc.IncorrectCredentialsException
import org.apache.shiro.authc.LockedAccountException
import org.apache.shiro.authc.UnknownAccountException
import org.apache.shiro.authz.AuthorizationException
import org.apache.shiro.subject.Subject
import org.apache.shiro.web.filter.authc.AuthenticationFilter

import com.ffss.datax.security.constants.SecurityConstants
import com.ffss.datax.security.util.JwtTokenValidator

/**
 * Authentication Filter for parsing and validating the token
 * 
 * @author Virtusa|Polaris
 *
 */
class StatelessAuthenticationFilter extends AuthenticationFilter  {

	
    
	/**
	 * Determines whether the current subject is authenticated.
	 * 
	 * @return true if the subject is authenticated; false if the subject is unauthenticated
	 * 
	 */
	@Override
	protected boolean isAccessAllowed(ServletRequest request, ServletResponse response, Object mappedValue) {
		def user

		def authToken

		HttpServletRequest httpRequest = (HttpServletRequest) request
		String authHeader = httpRequest.getHeader(SecurityConstants.AUTHORIZATION)

		//String cookie = httpRequest.getCookies().find{ it.name == 'rememberMe' }
		if ((authHeader == null || !authHeader.startsWith(SecurityConstants.BEARER))) {
			throw new CustomAuthenticationException()
		}
		try{
			//Get the token from the Bearer using subscript operator 
			authToken = authHeader[authHeader.indexOf(' ')..-1]
            
			user= JwtTokenValidator.parseToken(authToken, SecurityConstants.SECRET_CODE)
		}
		catch(ClaimJwtException cjex){
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
		
		// set the userid and token
		AuthenticationRequestToken token = new AuthenticationRequestToken(user.id.asType(String), user.orgId.asType(String),authToken)
		try {//the token encapsulating the subject's principals and credentials to be passed to the
             // Authentication subsystem for verification.
			Subject subject = getSubject(request, response)
			subject.login(token)
			true
		} catch (UnknownAccountException unacex) {
			throw new CustomAuthenticationException()
		}catch (IncorrectCredentialsException incex) {
			throw new CustomAuthenticationException()
		}catch (LockedAccountException  laex) {
			throw new CustomAuthenticationException()
		}catch (AuthenticationException   atex) {
			throw new CustomAuthenticationException()
		}catch (AuthorizationException   autex) {
			throw new CustomAuthenticationException()
		}
	}


	/**
     * Processes requests where the subject was denied access as determined by the
     * isAccessAllowed  method.
     * 
     */ 
	@Override
	protected boolean onAccessDenied(ServletRequest servletRequest, ServletResponse servletResponse) throws Exception {
		HttpServletResponse response = (HttpServletResponse) servletResponse
		response.setStatus(HttpServletResponse.SC_FORBIDDEN)
		false
	}
}

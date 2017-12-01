package com.ffss.datax.gateway.web.resource


import groovy.util.logging.Log4j
import io.jsonwebtoken.Claims
import io.jsonwebtoken.Jwts

import javax.servlet.http.Cookie
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

import com.ffss.datax.gateway.constants.GatewayConstants
import com.ffss.datax.gateway.service.LoginService

/**
 *The Class LoginResource.
 *
 *@author Virtusa|Polaris
 */
@Log4j
@RestController
@RequestMapping('/auth/login')
class LoginResource {

	@Value('auth.secret')
	String secret

	@Autowired
	LoginService loginService

	/**
	 * API for login
	 * @param user - userName
	 * @param pwd  - password
	 * @return
	 */
	@RequestMapping(value = '', method=RequestMethod.POST)
	def login(@RequestParam('user') user,@RequestParam('pwd') password,
			@RequestParam(value ='rememberMe',required = false) rememberMe,
			HttpServletResponse response) {

		log.debug("Request received for login by the user : ${user}")

		def userObject = loginService.login(user, password, secret)
		//check weather password is systemGenerated or not
		def systemPwd = userObject.isPwdSysGenStatus?userObject.isPwdSysGenStatus:GatewayConstants.FLAG_NO
		//create the cookie for rememberMe
		if (rememberMe && systemPwd == GatewayConstants.FLAG_NO) {
			def cookie = new Cookie(GatewayConstants.REMEMBER_ME, userObject.token)
			cookie.setMaxAge(GatewayConstants.MAX_AGE)
			response.addCookie(cookie)
		}
		userObject
	}


	/**
	 * API to validate rememberMe cookie
	 * @param request 
	 * @param response 
	 * @return
	 */
	@RequestMapping(value = '', method=RequestMethod.GET)
	def validateToken(HttpServletRequest request, HttpServletResponse response) {
		def retVal
		Cookie[] cookies = request.cookies
		if(cookies == null)
			false
		else{
			for (int cklngth =0; cklngth< cookies.length; cklngth++) {
				Cookie aCookie = cookies[cklngth]
				if(aCookie.name == GatewayConstants.REMEMBER_ME) {
					retVal = aCookie.value
				}
			}
			if(retVal){
				Claims body = Jwts.parser().setSigningKey(secret).parseClaimsJws(retVal).body
				def userId = body.get('id')
				def pwdExpryStatus = loginService.getUser(userId)
				if(pwdExpryStatus[0] == GatewayConstants.FLAG_YES){
					def logoutcookie = new Cookie(GatewayConstants.REMEMBER_ME, null)
					logoutcookie.setMaxAge(GatewayConstants.MIN_AGE)
					response.addCookie(logoutcookie)
					retVal = ''
				}
			}
			retVal
		}
	}

}
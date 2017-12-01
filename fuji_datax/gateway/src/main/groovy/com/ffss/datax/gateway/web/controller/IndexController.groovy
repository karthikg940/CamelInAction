package com.ffss.datax.gateway.web.controller

import groovy.util.logging.Log4j

import javax.servlet.http.Cookie
import javax.servlet.http.HttpServletResponse
import javax.servlet.http.HttpSession

import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Controller
import org.springframework.ui.Model
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam

import com.ffss.datax.gateway.constants.GatewayConstants

/**
 *The Class IndexController.
 *
 *@author Virtusa|Polaris
 */
@Log4j
@Controller
class IndexController {

	/**
	 * This is invoked to load the login page
	 *
	 */
	@RequestMapping('/login')
	def login() {
		GatewayConstants.LOGIN
	}
	
	/**
	 * This method is to implement 'rememberMe' functionality using cookie 
	 * thereby landing in dashboard page directly
	 *
	 */
	@RequestMapping('/')
	def home(Model model,HttpSession session) {
		def keyName = GatewayConstants.TOKEN
		def retVal = GatewayConstants.LOGIN
		def token = session.getAttribute(keyName)
		if (token) {
			model.addAttribute(keyName,token)
			retVal = GatewayConstants.INDEX
		}
		retVal
	}

	/**
	 * This method is to load the dashboard after successful login
	 *
	 */
	@RequestMapping('/index')
	def index(Model model, @RequestParam('token') token,HttpSession session) {
		log.debug('Login success ... loading dashboard')

		def keyName = GatewayConstants.TOKEN
		model.addAttribute(keyName,token)
		session.setAttribute(keyName, token)
		GatewayConstants.INDEX
	}

	/**
	 * This method is invoked to remove the cookie and navigate to login page by clicking logout
	 *
	 */
	@RequestMapping('/auth/logout')
	def logout(HttpServletResponse response) {
		log.debug('Request received for Logging out from DataX')

		def logoutcookie = new Cookie(GatewayConstants.REMEMBER_ME, null)
		logoutcookie.setMaxAge(0)
		response.addCookie(logoutcookie)
		ResponseEntity.ok().build()
		GatewayConstants.LOGIN
	}
	
	/**
	 * This method is to navigate to change password page
	 * 
	 */
	@RequestMapping('/changePassword')
	def changePwd(){
		GatewayConstants.CHANGE_PASSWORD
	}
	
	/**
	 * This method is to navigate to forgot password page
	 *
	 */
	@RequestMapping('/forgotPassword')
	def forgotPassword()	{
		GatewayConstants.FORGOT_PASSWORD
	}
}
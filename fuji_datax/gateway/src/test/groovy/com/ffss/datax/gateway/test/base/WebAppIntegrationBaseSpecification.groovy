/**
 *
 */
package com.ffss.datax.gateway.test.base


import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status

import javax.servlet.Filter

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.setup.MockMvcBuilders
import org.springframework.web.context.WebApplicationContext

import spock.lang.Shared
import spock.lang.Specification

import com.ffss.datax.gateway.service.LoginService
import com.ffss.datax.gateway.service.UserProfileService
import com.ffss.datax.gateway.web.controller.PasswordController
import com.ffss.datax.gateway.web.resource.LoginResource
import com.ffss.datax.gateway.web.resource.SystemConfigurationResource
import com.ffss.datax.security.util.JwtTokenGenerator



/**
 * Common functionalities required for all tests go here.
 * 
 */
class WebAppIntegrationBaseSpecification extends Specification {
	MockMvc mockMvc

	@Autowired
	WebApplicationContext wac

	@Autowired
	Filter shiroFilterFactoryBean

	@Shared
	String token


	/**
	 * Sets up the mock web application context.
	 */
	def setup() {

		this.mockMvc = MockMvcBuilders.webAppContextSetup(this.wac).addFilters(shiroFilterFactoryBean).build()
		mockFeignClients()
		mockFeignClientsReset()
		mockUserProfile()
		mockSystemConfig()
		def authRes = this.mockMvc.perform(get('/auth/login'))
		authRes.andExpect(status().is(200))

		def changePwd = this.mockMvc.perform(get('/changePassword'))
		changePwd.andExpect(status().is(200))
		def forgotPassword = this.mockMvc.perform(get('/forgotPassword'))
		forgotPassword.andExpect(status().is(200))
		def login = this.mockMvc.perform(get('/login'))
		login.andExpect(status().is(200))
		def refreshToken = this.mockMvc.perform(get('/'))
		refreshToken.andExpect(status().is(200))
	}

	def mockFeignClients() {
		def mockLoginService = [
			login : {user,pwd,secret->
				return [token:JwtTokenGenerator.generateToken([id:user,name:user],secret)]
			},
			validateUserInfo:{value-> return []},
			resetPassword:{value->return []}
		] as LoginService
		wac.getBean(LoginResource.class).loginService = mockLoginService
	}
	def mockFeignClientsReset() {
		def mockLoginService = [
			validateUserInfo:{value-> return []},
			resetPassword:{value->return []}
		] as LoginService
		wac.getBean(PasswordController.class).loginService = mockLoginService
	}
	def mockUserProfile() {
		def mockUserProfile = [
			changePassword : {password,token-> return []},
			currentPasswordValidate : {password,token-> return []},
			newPasswordValidate : {password,token-> return []}
		] as UserProfileService

		wac.getBean(PasswordController.class).userProfileService = mockUserProfile
	}

	def mockSystemConfig(){
		def mockSystemConfig = [
			findLdapConfig: { return[]}
		] as LoginService

		wac.getBean(SystemConfigurationResource.class).loginService = mockSystemConfig
	}
}

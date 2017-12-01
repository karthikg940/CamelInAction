package com.ffss.datax.auth.test.base


import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*

import javax.servlet.Filter
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.setup.MockMvcBuilders
import org.springframework.web.context.WebApplicationContext

import spock.lang.Specification

import com.ffss.datax.auth.service.feign.NotificationService
import com.ffss.datax.auth.service.UserPasswordService

/**
 * Common functionalities required for all tests go here.
 * 
 * @author Virtusa|Polaris
 * 
 */
class WebAppIntegrationBaseSpecification extends Specification 
{
	
	MockMvc mockMvc
	
	@Autowired
	WebApplicationContext wac
	
	MockMvc unSecuredMockMvc
	
	def token
	
	@Autowired
	Filter shiroFilterFactoryBean
	/**
	 * Sets up the mock web application context.
	 */
	def setup() {
		token = 'eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MTAwMSwidXNlck5hbWUiOiJqb2hudyJ9.N9NB9ioZUSOhtiSziPA10h4PpjOlzBV0ztqqvcuaOp9RqxkRUa3XvvX7GrTPQTy4vxuNd59ve7OBq-dVcPP65g'
		this.mockMvc = MockMvcBuilders.webAppContextSetup(this.wac).addFilters(shiroFilterFactoryBean).build()
		this.unSecuredMockMvc = MockMvcBuilders.webAppContextSetup(this.wac).build()
		mockFeignClients()
	}
	
	def mockFeignClients() {
		def notificationSend = [
			notificationSave :{
				id,request,token->
				return []
			}]as  NotificationService
		wac.getBean(UserPasswordService.class).notificationService = notificationSend
	}
}

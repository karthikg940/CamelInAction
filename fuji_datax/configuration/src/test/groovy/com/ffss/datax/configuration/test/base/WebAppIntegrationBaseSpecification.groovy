/**
 *
 */
package com.ffss.datax.configuration.test.base


import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*

import javax.servlet.Filter

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.setup.MockMvcBuilders
import org.springframework.web.context.WebApplicationContext

import com.ffss.datax.common.service.AsyncAuditService
import com.ffss.datax.common.service.AuditLoggerService
import com.ffss.datax.configuration.service.UserConfigService
import com.ffss.datax.configuration.service.feign.UserNotificationService

import spock.lang.Specification

/**
 * Common functionalities required for all tests go here.
 * 
 */
class WebAppIntegrationBaseSpecification extends Specification {
	MockMvc mockMvc
	
	MockMvc unSecuredMockMvc
	
	@Autowired
	WebApplicationContext wac
	
	
	@Autowired
	Filter shiroFilterFactoryBean
	
	/**
	 * Sets up the mock web application context.
	 */
	def setup()
	{
		this.mockMvc = MockMvcBuilders.webAppContextSetup(this.wac).addFilters(shiroFilterFactoryBean).build()
		this.unSecuredMockMvc = MockMvcBuilders.webAppContextSetup(this.wac).build()
		mockFeignClients()
	}

	
	def getCreatedId(response) {
		def createdEntityLocation =response.andReturn().getResponse().getHeader("Location")
		createdEntityLocation.substring(createdEntityLocation.lastIndexOf('/') + 1)
	}
	
	
	def mockFeignClients() {
		def notificationSend = [
			notificationSave :{ id,request,token->
				[]
			}]as  UserNotificationService
		wac.getBean(UserConfigService).userNotificationService = notificationSend

		def mockAuditService = [
			auditLogger : {content, eventCode, microServiceName,entityName, token->
				[]
			}
		] as AuditLoggerService
		wac.getBean(AsyncAuditService).auditLoggerService = mockAuditService
	}
}

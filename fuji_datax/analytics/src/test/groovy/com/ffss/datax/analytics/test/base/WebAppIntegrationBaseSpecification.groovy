/**
 *
 */
package com.ffss.datax.analytics.test.base



import javax.servlet.Filter
import com.ffss.datax.analytics.service.ReportGenerationService
import com.ffss.datax.analytics.service.feign.StudyWorkflowService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.setup.MockMvcBuilders
import org.springframework.web.context.WebApplicationContext

import spock.lang.Specification

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
	
	/**
	 * Sets up the mock web application context.
	 */
	def setup() 
	{
		this.mockMvc = MockMvcBuilders.webAppContextSetup(this.wac).addFilters(shiroFilterFactoryBean).build()
		mockFeignClients()
	}
	
	def mockFeignClients() {
		def mockCreateTask = [
		
			getUser : { id,request,token->
				return [[id:1001,prefix:"Dr",firstName:"John",middleName:"",lastName:"Williams"]]
			}
			
		] as StudyWorkflowService
	wac.getBean(ReportGenerationService.class).studyWorkflowService = mockCreateTask
	}
	
}

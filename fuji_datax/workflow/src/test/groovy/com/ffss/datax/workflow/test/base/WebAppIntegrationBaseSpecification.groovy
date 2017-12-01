package com.ffss.datax.workflow.test.base


import javax.servlet.Filter

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.setup.MockMvcBuilders
import org.springframework.web.context.WebApplicationContext

import spock.lang.Specification

import com.ffss.datax.security.util.JwtTokenGenerator

/**
 * Common functionalities required for all tests go here.
 * 
 * @author Virtusa|Polaris
 * 
 */
class WebAppIntegrationBaseSpecification extends Specification 
{
	
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
	}
	
	
	
	
}

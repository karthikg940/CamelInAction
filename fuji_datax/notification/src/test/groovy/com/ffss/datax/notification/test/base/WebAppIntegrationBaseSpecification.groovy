package com.ffss.datax.notification.test.base

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*

import javax.servlet.Filter

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

	static final String TOKEN ="eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MTAwMiwidXNlck5hbWUiOiJjcmlzcmVuIn0.d_6oSe5guKmDi_K5V8LIS3L_UsuhrKkrfm9nc_WuDyOoK-mLhVX8WHss3fQ33G2Ek_qTRqwiWmmdl5RUrojOxQ"

	MockMvc mockMvc

	MockMvc unsecuredMockMvc

	@Autowired
	WebApplicationContext wac

	@Autowired
	Filter shiroFilterFactoryBean

	/**
	 * Sets up the mock web application context.
	 */
	def setup() {
		this.mockMvc = MockMvcBuilders.webAppContextSetup(this.wac).addFilters(shiroFilterFactoryBean).build()
		this.unsecuredMockMvc = MockMvcBuilders.webAppContextSetup(this.wac).build()
	}
}

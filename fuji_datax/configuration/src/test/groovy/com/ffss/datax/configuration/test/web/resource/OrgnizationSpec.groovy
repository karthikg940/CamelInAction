package com.ffss.datax.configuration.test.web.resource

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*
import groovy.json.JsonOutput
import groovy.json.JsonSlurper

import javax.ws.rs.core.MediaType

import com.ffss.datax.configuration.test.base.TransactionalWebIntegrationTest
import com.ffss.datax.configuration.test.base.WebAppIntegrationBaseSpecification

@TransactionalWebIntegrationTest
class OrgnizationSpec extends WebAppIntegrationBaseSpecification{

	def Authorization = 'Authorization'
	def Bearer = 'Bearer '

	def 'Get List of Organizations'() {
		given:'Admin have list of organizations'
		when:'he want to get the list of organizations'
		def res = this.mockMvc.perform(get('/api/organization')
				.header(Authorization,Bearer+RoleTestData.token)
				.accept(MediaType.APPLICATION_JSON))
		then:'the expected status is'
		res.andExpect(status().isOk())
		def getJson = new JsonSlurper().parseText(res.andReturn().response.contentAsString)
		assert getJson.results[0].orgName == RoleTestData.orgData.orgName
	}
}

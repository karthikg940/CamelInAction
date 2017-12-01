package com.ffss.datax.configuration.test.web.resource

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status
import groovy.json.JsonSlurper

import org.springframework.http.MediaType

import com.ffss.datax.configuration.test.base.TransactionalWebIntegrationTest
import com.ffss.datax.configuration.test.base.WebAppIntegrationBaseSpecification

@TransactionalWebIntegrationTest
class ConfigurationSpec extends WebAppIntegrationBaseSpecification {
	static  Authorization = 'Authorization'
	static  Bearer = 'Bearer '
	def 'fetching all examTypes'(expectedStatus,expectedResult) {
		given:'we have examtypes'

		when:'we have to fetch list of exam types'

		def res=this.mockMvc.perform(get('/api/exam')
				.header(Authorization,Bearer +ConfigurationTestData.token1)
				.accept(MediaType.APPLICATION_JSON))

		then: ' The expected status is'

		res.andExpect(status().is(expectedStatus))
		if (expectedStatus == 200) {
			validateResult(expectedResult, new JsonSlurper().parseText(res.andReturn().response.contentAsString))
		}

		where:
		expectedStatus << [ConfigurationTestData.stat]
		expectedResult << [ConfigurationTestData.GetExamtypesTest]
	}

	void validateResult(expectedResult,actualResult) {
		['id', 'examTypeDesc', 'examTypeDetailDesc', 'isEnabled', 'isDeleted'].each{
			assert expectedResult[it] == actualResult[it]
		}
	}


	def 'remove examtype'(examid,expectedStatus){

		given:'we have a examtype'

		when:'examtype is removed from list of examtypes'

		def res=this.mockMvc.perform(delete("/api/exam/remove/${examid}")
				.header(Authorization,Bearer +ConfigurationTestData.token1)
				.contentType(MediaType.APPLICATION_JSON))

		res.andExpect(status().is(expectedStatus))

		and: 'get list of examTypes'

		def response=this.mockMvc.perform(get('/api/exam')
				.header(Authorization,Bearer +ConfigurationTestData.token1)
				.accept(MediaType.APPLICATION_JSON))

		then: 'The expected status is'
		response.andExpect(status().isOk())
		where :
		examid << [9002, 1]
		expectedStatus << [ConfigurationTestData.stat, 404]
	}


	def 'get cptcode'(expectedStatus,expectedResult){
		given:'we have cpt codes'

		when:'we have to fetch list of cpt codes'

		def res=this.mockMvc.perform(get('/api/exam/cptcode')
				.header(Authorization,Bearer +ConfigurationTestData.token1)
				.accept(MediaType.APPLICATION_JSON))

		then: ' The expected status is'

		res.andExpect(status().is(expectedStatus))
		if (expectedStatus == ConfigurationTestData.stat) {
			validateResult(expectedResult, new JsonSlurper().parseText(res.andReturn().response.contentAsString))
		}

		where:
		expectedStatus << [ConfigurationTestData.stat]
		expectedResult << [ConfigurationTestData.GetCptCodes]
	}

	def 'get templates'(expectedStatus,expectedResult){
		given:'we have templates'

		when:'we have to fetch list of templates'

		def res=this.mockMvc.perform(get('/api/exam/template')
				.header(Authorization,Bearer +ConfigurationTestData.token1)
				.accept(MediaType.APPLICATION_JSON))

		then: ' The expected status is'

		res.andExpect(status().is(expectedStatus))
		if (expectedStatus == 200) {
			validateResult(expectedResult, new JsonSlurper().parseText(res.andReturn().response.contentAsString))
		}

		where:
		expectedStatus << [ConfigurationTestData.stat]
		expectedResult << [ConfigurationTestData.GetTemplateData]
	}

	def 'get tags for ExamType'(id,expectedResult,expectedStatus){
		given:'we have templates'

		when:'we have to fetch list of templates'

		def res=this.mockMvc.perform(get("/api/exam/${id}/tags")
				.header(Authorization,Bearer +ConfigurationTestData.token1)
				.accept(MediaType.APPLICATION_JSON))

		then: ' The expected status is'

		res.andExpect(status().is(expectedStatus))
		where:
		id   |            expectedResult                          |expectedStatus
		9001 |   ConfigurationTestData.tagsForExamType 			  |		200
		9009 |    			       ''                               |		404
	}
}


package com.ffss.datax.configuration.test.web.resource

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status
import groovy.json.JsonOutput
import groovy.json.JsonSlurper

import org.springframework.http.MediaType

import com.ffss.datax.configuration.test.base.TransactionalWebIntegrationTest
import com.ffss.datax.configuration.test.base.WebAppIntegrationBaseSpecification


@TransactionalWebIntegrationTest
class StudyTagSpec extends WebAppIntegrationBaseSpecification {

	static  Authorization = 'Authorization'
	static  Bearer = 'Bearer '
	def ' Insert tags for study'(studyId,testData,expectedStatus) {
		given:' we have tags'

		when:' Inserting tags for the study'

		def res=this.mockMvc.perform(post("/api/studyTag/${studyId}/tag")
				.header(Authorization,Bearer+ConfigurationTestData.token1)
				.content(JsonOutput.toJson(testData))
				.contentType(MediaType.APPLICATION_JSON))

		then: ' The expected status is'

		res.andExpect(status().is(expectedStatus))

		where:
		studyId				| 			testData							|expectedStatus
		76000000000001		|	ConfigurationTestData.tagsForExamType	    |200
		76000000000001		|	ConfigurationTestData.tagsForExamTypeW	    |400
		12121212121212		|	ConfigurationTestData.tagsForExamType	    |400
	}

	def ' Get tags for study'() {
		given:' we have tags'

		when:' Inserting tags for the study'
		def studyId = 76000000000001
		def res=this.mockMvc.perform(post("/api/studyTag/${studyId}/tag")
				.header(Authorization,Bearer+ConfigurationTestData.token1)
				.content(JsonOutput.toJson(ConfigurationTestData.tagsForExamType))
				.contentType(MediaType.APPLICATION_JSON))

		then: ' The expected status is'

		res.andExpect(status().isOk())

		and: ' getting the studyId and deleting the tags'

		def resGet=this.mockMvc.perform(get("/api/studyTag/${studyId}/tag")
				.header(Authorization,Bearer+ConfigurationTestData.token1)
				.contentType(MediaType.APPLICATION_JSON))

		then: ' The expected status is'

		resGet.andExpect(status().isOk())
	}
}

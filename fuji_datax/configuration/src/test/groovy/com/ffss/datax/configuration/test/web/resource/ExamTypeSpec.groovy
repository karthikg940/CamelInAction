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
class ExamTypeSpec extends WebAppIntegrationBaseSpecification {
	static  Authorization = 'Authorization'
	static  Bearer = 'Bearer '
	def "save examType"(token,data,expectedStatus){

		given:'We want to save examtype'

		when:'user enters new examtype'

		def res=this.mockMvc.perform(post('/api/exam')
				.header(Authorization,Bearer+token)
				.content(JsonOutput.toJson(data))
				.contentType(MediaType.APPLICATION_JSON))

		then:'the expected status is'
		res.andExpect(status().isCreated())

		if (expectedStatus == 201) {

			
			def getRes = this.mockMvc.perform(get(res.andReturn().response.headers['Location'].value)
					.header(Authorization,Bearer+token))

			def getJson = new JsonSlurper().parseText(getRes.andReturn().response.contentAsString)
			assert getJson.examTypeName == data.examTypeName
			assert getJson.examTypeDesc == data.examTypeDesc
			assert getJson.examTypeAlias == data.examTypeAlias
			getRes.andExpect(status().isOk())
		}

		where :
		token << [ConfigurationTestData.token1]
		data << [ConfigurationTestData.saveExamTypeData]
		expectedStatus << [ConfigurationTestData.stat1]
	}

	def "Checking whether the examtypeName is present or not"  () {

		given: ' An examtypeName is available with default data'
		when: ' You fetch the boolean value if examtypeName present'

		def examtypeNameOne = 'Ocular'
		def examtypeNameResOne = this.mockMvc.perform(get("/api/exam/search?name=${examtypeNameOne}")
				.header(Authorization,Bearer+ConfigurationTestData.token1))
		then: ' Checking the boolean value'
		examtypeNameResOne.andExpect(status().isOk())
		def examtypeNameJson = new JsonSlurper().parseText(examtypeNameResOne.andReturn().response.contentAsString)
		assert examtypeNameJson.isPresent == true

		and: ' Checking for record is which is not there'
		then: ' You fetch the boolean value for mail present or not'

		def examtypeNameTwo = 'test'
		def examtypeNameResTwo = this.mockMvc.perform(get("/api/exam/search?name=${examtypeNameTwo}").header(Authorization,Bearer+ConfigurationTestData.token1))
		then: ' Checking the boolean value'
		examtypeNameResTwo.andExpect(status().isOk())
		def examtypeNameJsonTwo = new JsonSlurper().parseText(examtypeNameResTwo.andReturn().response.contentAsString)
		assert examtypeNameJsonTwo.isPresent == false
	}

	def 'Enable and Disable Examtype'(examTypeId, examTypeData, expectedStatus) {
		given: 'admin is in examtypeList page'
		when: 'admin perform enable or disable action'
		def token=ConfigurationTestData.token1
		def response = this.mockMvc.perform(put("/api/exam/${examTypeId}/renderexamtype")
				.header(Authorization,Bearer+token)
				.content(JsonOutput.toJson(examTypeData))
				.contentType(MediaType.APPLICATION_JSON))

		then: 'status fetched'
		response.andExpect(status().is(expectedStatus))

		where:
		examTypeId <<[9001, 1235]
		examTypeData << [ConfigurationTestData.examtypeEnableTestData, ConfigurationTestData.examtypeEnableTestData]
		expectedStatus << [200, 404]
	}

	def "Get an examtype"(token,data,expectedStatus){

		given:'We have a saved examtype'

		def res=this.mockMvc.perform(post('/api/exam')
				.header(Authorization,Bearer+token)
				.content(JsonOutput.toJson(data))
				.contentType(MediaType.APPLICATION_JSON))

		res.andExpect(status().is(201))

		when: ' You fetch for an exam type'

		
		def getRes = this.mockMvc.perform(get(res.andReturn().response.headers['Location'].value)
				.header(Authorization,Bearer+token))
		then: ' The data received is validated against the expected result'
		getRes.andExpect(status().isOk())
		//def searchJson = new JsonSlurper().parseText(getRes.andReturn().response.contentAsString)
		//def actualResult = searchJson

		def getJson = new JsonSlurper().parseText(getRes.andReturn().response.contentAsString)
		assert getJson.examTypeName == data.examTypeName
		assert getJson.examTypeDesc == data.examTypeDesc
		assert getJson.examTypeAlias == data.examTypeAlias
		getRes.andExpect(status().isOk())



		where :
		token << [ConfigurationTestData.token1, ConfigurationTestData.token2]
		data << [ConfigurationTestData.saveExamTypeData, ConfigurationTestData.saveExamTypeData]
		expectedStatus << [201, 404]
	}

	def 'Test updating a examtype'(token) {
		given: 'We have saved eamtype and attributes'

		def res = this.mockMvc.perform(post('/api/exam')
				.header(Authorization,Bearer+token)
				.content(JsonOutput.toJson(ConfigurationTestData.saveExamTypeData))
				.contentType(MediaType.APPLICATION_JSON))

		res.andExpect(status().is(201))
		when: 'We update a examtype'
		def updateres = this.mockMvc.perform(put(res.andReturn().response.headers['Location'].value)
				.header(Authorization,Bearer+token)
				.content(JsonOutput.toJson(ConfigurationTestData.updateExamTypeData))
				.contentType(MediaType.APPLICATION_JSON))

		then: 'The examtype gets updated'
		updateres.andExpect(status().is(200))
		def getRes = this.mockMvc.perform(get(res.andReturn().response.headers['Location'].value)
				.header(Authorization,Bearer+token))

		getRes.andExpect(status().isOk())
		def getJson = new JsonSlurper().parseText(getRes.andReturn().response.contentAsString)
		assert getJson.examTypeDesc == ConfigurationTestData.updateExamTypeData.examTypeDesc
		assert getJson.examTypeAlias == ConfigurationTestData.updateExamTypeData.examTypeAlias

		where:
		token << [ConfigurationTestData.token1]
	}
}


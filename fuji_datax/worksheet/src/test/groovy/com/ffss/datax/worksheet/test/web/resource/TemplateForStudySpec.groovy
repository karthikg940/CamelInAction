package com.ffss.datax.worksheet.test.web.resource

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status
import groovy.json.JsonSlurper

import org.springframework.http.MediaType

import com.ffss.datax.worksheet.test.base.TransactionalWebIntegrationTest
import com.ffss.datax.worksheet.test.base.WebAppIntegrationBaseSpecification

@TransactionalWebIntegrationTest
class TemplateForStudySpec extends WebAppIntegrationBaseSpecification{

	def "get templates for the study"(){
		def studyId = 76000000000101
		given: ' Assigned a cardiac exam type for a study'
		when: ' seeing the template in the worksheet section'
		def templateForStudy = this.mockMvc.perform(get("/api/template/search?studyId=${studyId}&examTypeFlag=true")
				.header("Authorization","Bearer "+WorksheetTestData.token1)
				.contentType(MediaType.APPLICATION_JSON))
		
		def templateForCardiac = new JsonSlurper().parseText(templateForStudy.andReturn().response.contentAsString)
		then:' I should see only templates belonging to the cardiac exam type'
		assert templateForCardiac.results.size()==2
		and:' getting the template for study which has unassigned examtype'
		def templateForAnotherStudy = this.mockMvc.perform(get("/api/template/search?studyId=${studyId}&examTypeFlag=false")
			.header("Authorization","Bearer "+WorksheetTestData.token1)
			.contentType(MediaType.APPLICATION_JSON))
		
		def allTemplate = new JsonSlurper().parseText(templateForAnotherStudy.andReturn().response.contentAsString)
		then:' It has to fetch the entire templates which is present in the DataX table'
		assert allTemplate.results.size() == 3
	}
}

package com.ffss.datax.workflow.test.web.resource

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*
import groovy.json.JsonOutput
import groovy.json.JsonSlurper

import org.springframework.http.MediaType

import com.ffss.datax.workflow.test.base.TransactionalWebIntegrationTest
import com.ffss.datax.workflow.test.base.WebAppIntegrationBaseSpecification

@TransactionalWebIntegrationTest
class StudyWorkflowSpec extends WebAppIntegrationBaseSpecification {

	def 'Get preference for the organization'(token,expectedStatus,expectedResult) {
		given: 'the org config is present'

		when: ' User is logged in'

		def response = this.mockMvc.perform(get('/api/preference')
				.header('Authorization','Bearer '+token)
				.contentType(MediaType.APPLICATION_JSON))

		then: 'status should change to assigned'
		response.andExpect(status().is(expectedStatus))
		where:
		token<<[WorkflowData.token, WorkflowData.crisren]
		expectedStatus<<[200, 200]
		expectedResult<<[WorkflowData.qaenabled, WorkflowData.qaenabled1]
	}
}



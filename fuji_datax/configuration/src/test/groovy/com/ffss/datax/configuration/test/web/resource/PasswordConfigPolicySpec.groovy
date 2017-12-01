package com.ffss.datax.configuration.test.web.resource

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*
import groovy.json.JsonOutput

import org.springframework.http.MediaType

import com.ffss.datax.configuration.test.base.TransactionalWebIntegrationTest
import com.ffss.datax.configuration.test.base.WebAppIntegrationBaseSpecification

@TransactionalWebIntegrationTest
class PasswordConfigPolicySpec extends WebAppIntegrationBaseSpecification{

	def ' Saving the password config policy'(token,policyData,expectedStatus) {
		given: ' Admin is in password config screen'
		when: ' Admin has entered all the details for password config'
		def saveConfig = this.mockMvc.perform(post('/api/config/passwordpolicy')
				.header('Authorization','Bearer '+token)
				.content(JsonOutput.toJson(policyData))
				.contentType(MediaType.APPLICATION_JSON))
		then: ' pwd policy has to be saved'
		saveConfig.andExpect(status().is(expectedStatus))
		where:
		token<<[PasswordConfigPolicyData.token, PasswordConfigPolicyData.token]
		policyData<<[PasswordConfigPolicyData.pwdPolicyData, PasswordConfigPolicyData.pwdPolicyWrongData]
		expectedStatus<<[201, 400]
	}
	def ' Updating the password config policy'(token,policyData,expectedStatus) {
		given: ' Admin is in password config screen'
		when: ' Adding a record for OrgLoginConfig'
		def saveConfig = this.mockMvc.perform(post('/api/config/passwordpolicy')
				.header('Authorization','Bearer '+token)
				.content(JsonOutput.toJson(policyData))
				.contentType(MediaType.APPLICATION_JSON))
		and : ' for the saved config use the record for update'
		if(expectedStatus ==200){
			String[] saveConfigFrag= saveConfig.andReturn().response.headers['Location'].value.split('/');
			String savedConfigId =  saveConfigFrag[saveConfigFrag.length-1];
			
			def updateConfig = this.mockMvc.perform(put("/api/config/${savedConfigId}/passwordpolicy")
					.header('Authorization','Bearer '+token)
					.content(JsonOutput.toJson(policyData))
					.contentType(MediaType.APPLICATION_JSON))
			then: ' pwd policy has to be updated'
			updateConfig.andExpect(status().is(expectedStatus))
		}
		and :' then updating the record which is not there in DB'
		def updateErrConfig = this.mockMvc.perform(put('/api/config/1755252/passwordpolicy')
				.header('Authorization','Bearer '+token)
				.content(JsonOutput.toJson(policyData))
				.contentType(MediaType.APPLICATION_JSON))
		then: ' pwd policy has to be updated'
		updateErrConfig.andExpect(status().is(400))
		where:
		token<<[PasswordConfigPolicyData.token, PasswordConfigPolicyData.token]
		policyData<<[PasswordConfigPolicyData.pwdPolicyData, PasswordConfigPolicyData.pwdPolicyWrongData]
		expectedStatus<<[200, 400]
	}
	def ' Get the password config policy'(token,policyData,expectedStatus) {
		given: ' Admin is in password config screen'
		when: ' Adding a record for OrgLoginConfig'


		def getConfig = this.mockMvc.perform(get('/api/config/passwordpolicy')
				.header('Authorization','Bearer '+token)
				.contentType(MediaType.APPLICATION_JSON))
		then: ' pwd policy has to be updated'

		getConfig.andExpect(status().is(200))


		where:
		token<<[PasswordConfigPolicyData.token]
		policyData<<[PasswordConfigPolicyData.pwdPolicyData]
		expectedStatus<<[200]
	}
}

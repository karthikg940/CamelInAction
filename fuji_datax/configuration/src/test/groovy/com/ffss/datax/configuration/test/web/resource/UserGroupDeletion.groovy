package com.ffss.datax.configuration.test.web.resource

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*
import groovy.json.JsonOutput
import groovy.json.JsonSlurper

import javax.ws.rs.core.MediaType

import com.ffss.datax.configuration.test.base.TransactionalWebIntegrationTest
import com.ffss.datax.configuration.test.base.WebAppIntegrationBaseSpecification

@TransactionalWebIntegrationTest
class UserGroupDeletion extends WebAppIntegrationBaseSpecification {

	def 'Test adding new user group to datax'() {
		given: 'We have filled user group form'
		when: 'We add a user'
		def resp = this.mockMvc.perform(post('/api/usergroup')
				.header('Authorization','Bearer '+UserGroupTestData.token)
				.content(JsonOutput.toJson(UserGroupTestData.addUserGroupTestData1))
				.contentType(MediaType.APPLICATION_JSON))
		then: 'we expect the status'
		resp.andExpect(status().is(201))

		def getRes = this.mockMvc.perform(get(resp.andReturn().response.headers['Location'].value)
				.header('Authorization','Bearer '+UserProfileTestData.token))
		getRes.andExpect(status().isOk())
		def getJson = new JsonSlurper().parseText(getRes.andReturn().response.contentAsString)
		assert getJson.groupName == UserGroupTestData.addUserGroupTestData1.groupName
		assert getJson.description == UserGroupTestData.addUserGroupTestData1.description
		
		String[] frag= resp.andReturn().response.headers['Location'].value.split('/')
		def id =  frag[frag.length-1]

		and: 'We are fetching the entire list of userGroups'
		then: 'Fetching user groups which are in active state'

		def responseList = this.mockMvc.perform(get('/api/usergroup')
				.header('Authorization','Bearer '+UserGroupTestData.token)
				.accept(MediaType.APPLICATION_JSON))
		then: ' The expected status is'

		responseList.andExpect(status().isOk())

		and: 'We are having the entire list of userGroups'
		then: 'We are updating the usergroup deletion flag for particular userGroup'

		def respDelete = this.mockMvc.perform(delete("/api/usergroup/${id}")
				.header('Authorization','Bearer '+UserGroupTestData.token)
				.accept(MediaType.APPLICATION_JSON))
		then: ' The expected status is'

		respDelete.andExpect(status().isNoContent())
		
		and: 'We are fetching the entire list of userGroups'
		then: 'Fetching user groups which are in active state'

		def respCheck = this.mockMvc.perform(get('/api/usergroup')
				.header('Authorization','Bearer '+UserGroupTestData.token)
				.accept(MediaType.APPLICATION_JSON))
		then: ' The expected status is'
		def respData = new JsonSlurper().parseText(respCheck.andReturn().response.contentAsString)
		
		assert respData.results[] == []
		respCheck.andExpect(status().isOk())
	}

}

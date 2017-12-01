package com.ffss.datax.configuration.test.web.resource

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*
import groovy.json.JsonOutput
import groovy.json.JsonSlurper

import javax.ws.rs.core.MediaType

import com.ffss.datax.configuration.test.base.TransactionalWebIntegrationTest
import com.ffss.datax.configuration.test.base.WebAppIntegrationBaseSpecification

@TransactionalWebIntegrationTest
class UserGroupSpec extends WebAppIntegrationBaseSpecification {

	def Authorization = 'Authorization'
	def Bearer = 'Bearer '

	def 'Test adding new user group to datax'() {
		given: 'We have filled user group form'
		when: 'We add a user'
		def resp = this.mockMvc.perform(post('/api/usergroup')
				.header(Authorization,Bearer+UserGroupTestData.token)
				.content(JsonOutput.toJson(UserGroupTestData.addUserGroupTestData1))
				.contentType(MediaType.APPLICATION_JSON))
		then: 'we expect the status'
		resp.andExpect(status().isCreated())

		def getRes = this.mockMvc.perform(get(resp.andReturn().response.headers['Location'].value)
				.header(Authorization,Bearer+UserProfileTestData.token))
		getRes.andExpect(status().isOk())
		def getJson = new JsonSlurper().parseText(getRes.andReturn().response.contentAsString)
		assert getJson.groupName == UserGroupTestData.addUserGroupTestData1.groupName
		assert getJson.description == UserGroupTestData.addUserGroupTestData1.description
		assert getJson.users[1] == UserGroupTestData.addUserGroupTestData1.users[1]
	}

	void getRes(expectedResult,actualResult){
		['results'].each{

			assert expectedResult.groupName == actualResult.groupName
			assert expectedResult.description == actualResult.description
		}
	}


	def 'Getting the list of User Groups'(expectedStatus,expectedResult) {
		given: 'We have list of User Groups'

		when: 'We want fetch the list of User Groups'

		def res = this.mockMvc.perform(get('/api/usergroup')
				.header(Authorization,Bearer+UserGroupTestData.token)
				.accept(MediaType.APPLICATION_JSON))

		then: ' The expected status is'

		res.andExpect(status().is(expectedStatus))
		if (expectedStatus == 200) {
			validateResult(expectedResult, new JsonSlurper().parseText(res.andReturn().response.contentAsString))
		}
		where:
		expectedStatus << [200]
		expectedResult << [UserGroupTestData.getUserGroupTestData1]
	}

	void validateResult(expectedResult,actualResult) {
		['id', 'groupName', 'description', 'users'].each{
			assert expectedResult[it] == actualResult[it]
		}
	}

	def 'Test updating the usergroup'() {
		given: 'We have usergroup for the given id'

		def res = this.mockMvc.perform(post('/api/usergroup')
				.header(Authorization,Bearer+UserGroupTestData.token)
				.content(JsonOutput.toJson(UserGroupTestData.addUserGroupTestData1))
				.contentType(MediaType.APPLICATION_JSON))

		res.andExpect(status().is(201))
		when: 'We update a usergroup'
		def updateusergroupres = this.mockMvc.perform(put(res.andReturn().response.headers['Location'].value)
				.header(Authorization,Bearer+UserGroupTestData.token)
				.content(JsonOutput.toJson(UserGroupTestData.updateUserGroupData))
				.contentType(MediaType.APPLICATION_JSON))

		then: 'The usergroup gets updated'
		updateusergroupres.andExpect(status().is(200))

		def getRes = this.mockMvc.perform(get(res.andReturn().response.headers['Location'].value)
				.header(Authorization,Bearer+UserGroupTestData.token))

		getRes.andExpect(status().isOk())

		and: ' updating the values for user with null'
		def updateGroupUser = this.mockMvc.perform(put(res.andReturn().response.headers['Location'].value)
				.header(Authorization,Bearer+UserGroupTestData.token)
				.content(JsonOutput.toJson(UserGroupTestData.updateUserinGroup))
				.contentType(MediaType.APPLICATION_JSON))

		then: 'The usergroup gets updated'
		updateGroupUser.andExpect(status().is(200))

		def updateGroupPermission = this.mockMvc.perform(put(res.andReturn().response.headers['Location'].value)
				.header(Authorization,Bearer+UserGroupTestData.token)
				.content(JsonOutput.toJson(UserGroupTestData.updatePermissioninGroup))
				.contentType(MediaType.APPLICATION_JSON))

		then: 'The usergroup gets updated'
		updateGroupPermission.andExpect(status().is(200))

		def updateOrginGroup = this.mockMvc.perform(put(res.andReturn().response.headers['Location'].value)
				.header(Authorization,Bearer+UserGroupTestData.token)
				.content(JsonOutput.toJson(UserGroupTestData.updateOrginGroup))
				.contentType(MediaType.APPLICATION_JSON))

		then: 'The usergroup gets updated'
		updateOrginGroup.andExpect(status().is(200))

		def getJson = new JsonSlurper().parseText(getRes.andReturn().response.contentAsString)
		assert getJson.description == UserGroupTestData.updateUserGroupData.description
	}

	def 'Checking whether the name is present or not'  () {

		given: ' An name is available with default data'
		when: ' You fetch the boolean value if name present'

		def nameOne = 'test'
		def nameResOne = this.unSecuredMockMvc.perform(get("/api/usergroup/search?name=${nameOne}"))
		then: ' Checking the boolean value'
		nameResOne.andExpect(status().isOk())
		def nameJsonOne = new JsonSlurper().parseText(nameResOne.andReturn().response.contentAsString)
		assert nameJsonOne.isPresent == false

		and: ' Checking for record is which is not there'
		then: ' You fetch the boolean value for mail present or not'
	}
}


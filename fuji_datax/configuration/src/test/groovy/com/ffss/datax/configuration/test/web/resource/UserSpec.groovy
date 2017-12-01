package com.ffss.datax.configuration.test.web.resource

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*
import groovy.json.JsonOutput
import groovy.json.JsonSlurper

import javax.ws.rs.core.MediaType

import com.ffss.datax.configuration.test.base.TransactionalWebIntegrationTest
import com.ffss.datax.configuration.test.base.WebAppIntegrationBaseSpecification

@TransactionalWebIntegrationTest
class UserSpec extends WebAppIntegrationBaseSpecification {

	def Authorization = 'Authorization'
	def Bearer = 'Bearer '

	def 'Test adding new user to datax'() {
		given: 'We have filled user form'
		def orgId = 1
		when: 'We add a user'
		def resp = this.mockMvc.perform(post("/api/org/${orgId}/userlist")
				.header(Authorization,Bearer+UserProfileTestData.token)
				.content(JsonOutput.toJson(UserProfileTestData.addUserTestData1))
				.contentType(MediaType.APPLICATION_JSON))
		then: 'we expect the status'
		resp.andExpect(status().is(201))

		def getRes = this.mockMvc.perform(get(resp.andReturn().response.headers['Location'].value)
				.header(Authorization,Bearer+UserProfileTestData.token))
		//getRes.andExpect(status().isOk())
		def getJson = new JsonSlurper().parseText(getRes.andReturn().response.contentAsString)
		assert getJson.title == UserProfileTestData.addUserTestData1.title
		assert getJson.firstName == UserProfileTestData.addUserTestData1.firstName
		assert getJson.lastName == UserProfileTestData.addUserTestData1.lastName
		assert getJson.userName == UserProfileTestData.addUserTestData1.userName
		assert getJson.phone == UserProfileTestData.addUserTestData1.phone
		assert getJson.email == UserProfileTestData.addUserTestData1.email
		assert getJson.status == UserProfileTestData.addUserTestData1.status
		//		assert getJson.userOrg(0).id.asType(Long) == UserProfileTestData.addUserTestData1.activeOrgList(0).id.asType(Long)
	
		}

	def 'Test updating the user'() {
		given: 'We have user for the given id'
		def orgId = 1
		def res = this.mockMvc.perform(post("/api/org/${orgId}/userlist")
				.header(Authorization,Bearer+UserProfileTestData.token)
				.content(JsonOutput.toJson(UserProfileTestData.addUserTestData2))
				.contentType(MediaType.APPLICATION_JSON))

		res.andExpect(status().isCreated())
		when: 'We update a user'
		def updateres = this.mockMvc.perform(put(res.andReturn().response.headers['Location'].value)
				.header(Authorization,Bearer+UserProfileTestData.token)
				.content(JsonOutput.toJson(UserProfileTestData.updateData))
				.contentType(MediaType.APPLICATION_JSON))
		then: 'The user gets updated'
		updateres.andExpect(status().isOk())
		def getRes = this.mockMvc.perform(get(res.andReturn().response.headers['Location'].value)
				.header(Authorization,Bearer+UserProfileTestData.token))
		getRes.andExpect(status().isOk())

		def getJson = new JsonSlurper().parseText(getRes.andReturn().response.contentAsString)
		assert getJson.title == UserProfileTestData.updateData.title
		assert getJson.firstName == UserProfileTestData.updateData.firstName
		assert getJson.lastName == UserProfileTestData.updateData.lastName
		assert getJson.mobile == UserProfileTestData.updateData.mobile
		assert getJson.email == UserProfileTestData.updateData.email

		def resBadRequest = this.mockMvc.perform(put(res.andReturn().response.headers['Location'].value)
				.header(Authorization,Bearer+UserProfileTestData.token)
				.content(JsonOutput.toJson(UserProfileTestData.addUserTestDataBadRequest))
				.contentType(MediaType.APPLICATION_JSON))

		resBadRequest.andExpect(status().isBadRequest())
	}

	def 'fetch all the list of users who are in same organization'(orgId, expectedResults, expectedStatus, countOfRecords){
		given:'we have list of users'

		when:'fetch the users with in the same organization'

		def getResponse = this.mockMvc.perform(get("/api/org/${orgId}/userlist")
				.header(Authorization,Bearer+UserProfileTestData.token)
				.contentType(MediaType.APPLICATION_JSON))
		then:'display the list of users who are in same organization'

		getResponse.andExpect(status().is(expectedStatus))
		if (expectedStatus == 200) {
			def userList = new JsonSlurper().parseText(getResponse.andReturn().response.contentAsString)

			assert userList.results.size() == countOfRecords
			expectedResults.results.userName.each{
				assert it in userList.results.userName
			}
		}
		where:
		orgId <<[1, 76000001L, 76000002L]
		expectedResults << [UserProfileTestData.userData1, UserProfileTestData.userData2, UserProfileTestData.userData3]
		expectedStatus << [200, 200, 200]
		countOfRecords <<[4, 2, 1]
	}
	
	def 'validate to get the user for given userID'(userId){
		given:'user id is given for the user'
		when: ' fetch the user data for the given user id'
		def orgId = 1
		def jsonResponse = this.mockMvc.perform(get("/api/org/${orgId}/userlist/${userId}")
			.header(Authorization, Bearer+UserProfileTestData.token)
			.contentType(MediaType.APPLICATION_JSON))
		
		then:' details of the user for the given user id'
		def userDetail = new JsonSlurper().parseText(jsonResponse.andReturn().response.contentAsString)
		if(userDetail)
		{
			assert userDetail.userName == 'johnw'
			assert userDetail.firstName =='John'
		}
		
		where:
		userId <<[1001]
	}
	
	def 'Active and Deactivate user'(userId, token, userData, expectedStatus) {
		given: 'admin is in userList page'
		when: 'admin perform active or deactive action'

		def response = this.mockMvc.perform(put("/api/user/${userId}/changeStatus")
				.header(Authorization,Bearer+UserProfileTestData.token)
				.content(JsonOutput.toJson(userData))
				.contentType(MediaType.APPLICATION_JSON))

		then: 'status fetched'
		response.andExpect(status().is(expectedStatus))

		where:
		userId << UserProfileTestData.userId
		token << [UserProfileTestData.token, UserProfileTestData.token, UserProfileTestData.token]
		userData << UserProfileTestData.userActiveDeactiveTestData
		expectedStatus << UserProfileTestData.userStatus
	}


	def 'Test get all the  active user from datax'() {
		given:'We have users'
		when:'You fetch the users'
		def resp=this.mockMvc.perform(get("/api/user/activeuser")
				.header(Authorization,Bearer+UserProfileTestData.token)
				.contentType(MediaType.APPLICATION_JSON))
		then:'we get all the users'
		resp.andExpect(status().isOk())
	}
	
}

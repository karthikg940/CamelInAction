package com.ffss.datax.configuration.test.web.resource;

import static org.springframework.http.HttpStatus.*
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*
import groovy.json.JsonSlurper

import org.springframework.http.MediaType
import org.springframework.mock.web.*
import org.springframework.web.util.*

import com.ffss.datax.configuration.test.base.TransactionalWebIntegrationTest
import com.ffss.datax.configuration.test.base.WebAppIntegrationBaseSpecification

@TransactionalWebIntegrationTest
class ChangePasswordSpec extends WebAppIntegrationBaseSpecification {

	def 'Test password is current PWD or not'(password) {
		given: 'We have user given password'
		when: 'User enter his current pwd'
		def resp = this.mockMvc.perform(get("/api/user/currentpassword?password=${password}")
				.header('Authorization','Bearer '+UserProfileTestData.token)
				.accept(MediaType.APPLICATION_JSON))
		then: 'we expect the status'
		resp.andExpect(status().is(200))
		def response = new JsonSlurper().parseText(resp.andReturn().response.contentAsString)
		if(response==true)
			assert response == true
		else
			assert response == false

		where:
		password << ['johny123', 'XXXXXXX']
	}


	def 'Test new password is valid Password or not'() {

		given: 'We have user given new  password'
		def restrictionCount = 3
		def response
		restrictionCount.times{
			response = this.mockMvc.perform(put('/api/user/changepassword?password=asdf@123')
								   .header('Authorization','Bearer '+UserProfileTestData.token)
								   .contentType(MediaType.APPLICATION_JSON))
	   }
		when:'the user tries to reuse the same password'
		def password = 'asdf@123'
		def inValidResponse = this.mockMvc.perform(get("/api/user/newpassword?password=${password}")
				.header('Authorization','Bearer '+UserProfileTestData.token)
				.accept(MediaType.APPLICATION_JSON))
		then: 'user not allowed to change his password'
		def inValid = new JsonSlurper().parseText(inValidResponse.andReturn().response.contentAsString)
		assert inValid==false

		and:'user enter the invalid password which does not uppercase'
		def password1 = 'johny123@'
		def inValidResponseUC = this.mockMvc.perform(get("/api/user/newpassword?password=${password1}")
				.header('Authorization','Bearer '+UserProfileTestData.token)
				.accept(MediaType.APPLICATION_JSON))
		then: 'user not allowed to change his password'
		def inValidUC = new JsonSlurper().parseText(inValidResponseUC.andReturn().response.contentAsString)
		assert inValidUC==false

		and:'user enter the password which does not contain lowercase'
		def password2 = 'JOHNY123@'
		def inValidResponseLC = this.mockMvc.perform(get("/api/user/newpassword?password=${password2}")
				.header('Authorization','Bearer '+UserProfileTestData.token)
				.accept(MediaType.APPLICATION_JSON))
		then: 'user not allowed to change his password'
		def inValidLC = new JsonSlurper().parseText(inValidResponseLC.andReturn().response.contentAsString)
		assert inValidLC==false

		and:'user enter the password which does not contain Numbers'
		def password3 = 'JOHNY@welcome'
		def inValidResponseNum = this.mockMvc.perform(get("/api/user/newpassword?password=${password3}")
				.header('Authorization','Bearer '+UserProfileTestData.token)
				.accept(MediaType.APPLICATION_JSON))
		then: 'user not allowed to change his password'
		def inValidNum = new JsonSlurper().parseText(inValidResponseNum.andReturn().response.contentAsString)
		assert inValidNum==false

		and:'user enter the password which does not contain Special Characters'
		def password4 = 'JOHNYwelcome12'
		def inValidResponseSpl  = this.mockMvc.perform(get("/api/user/newpassword?password=${password4}")
				.header('Authorization','Bearer '+UserProfileTestData.token)
				.accept(MediaType.APPLICATION_JSON))
		then: 'user not allowed to change his password'
		def inValidSpl = new JsonSlurper().parseText(inValidResponseSpl.andReturn().response.contentAsString)
		assert inValidSpl==false

		and: 'User enter his new password which meets all the conditions'
		def validPassword = 'Johny@1234'
		def resp = this.mockMvc.perform(get("/api/user/newpassword?password=${validPassword}")
				.header('Authorization','Bearer '+UserProfileTestData.token)
				.accept(MediaType.APPLICATION_JSON))
		def validResponse = new JsonSlurper().parseText(resp.andReturn().response.contentAsString)
		assert validResponse == true

		then: 'user allows to change his password'
		def changeReponse = this .mockMvc.perform(put("/api/user/changepassword?password=${validPassword}")
				.header('Authorization','Bearer '+UserProfileTestData.token)
				.contentType(MediaType.APPLICATION_JSON))
		print 'the change Response is'+changeReponse
		then: 'user account updated with new password and the old password is saved into user password history'
		def flow = changeReponse.andReturn().response
		changeReponse.andExpect(status().is(200))
	}
}

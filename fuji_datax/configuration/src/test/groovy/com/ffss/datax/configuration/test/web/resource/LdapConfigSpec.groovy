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
class LdapConfigSpec extends WebAppIntegrationBaseSpecification {
	static  Authorization = 'Authorization'
	static  Bearer = 'Bearer '
	static  url= '/api/ldapconfig'

	def'setting ldap configuration'(){
		given:'ldap configuration'

		when:'admin want to setup ldap configuration'

		def res = this.mockMvc.perform(post(url)
				.header(Authorization,Bearer+LdapConfigTestData.token1)
				.content(JsonOutput.toJson(LdapConfigTestData.data))
				.contentType(MediaType.APPLICATION_JSON))
		then:'ldap configuration setup is finished'

		res.andExpect(status().isCreated())
		def getRes = this.mockMvc.perform(get(url)
				.header(Authorization,Bearer+LdapConfigTestData.token1))
		getRes.andExpect(status().isOk())
		def getJson = new JsonSlurper().parseText(getRes.andReturn().response.contentAsString)
		assert getJson.directoryType == LdapConfigTestData.data.directoryType
		assert getJson.remoteServer == LdapConfigTestData.data.remoteServer
	}


	def'update ldap configuration'(){
		given:'we have saved ldap configuration'

		def res = this.mockMvc.perform(post(url)
				.header(Authorization,Bearer+LdapConfigTestData.token1)
				.content(JsonOutput.toJson(LdapConfigTestData.data))
				.contentType(MediaType.APPLICATION_JSON))
		res.andExpect(status().isCreated())
		when:'Admin want to update ldap configuration'
		def updateRes = this.mockMvc.perform(put(res.andReturn().response.headers['Location'].value)
				.header(Authorization,Bearer+LdapConfigTestData.token1)
				.content(JsonOutput.toJson(LdapConfigTestData.updatedata))
				.contentType(MediaType.APPLICATION_JSON))
		then:'ldap configuration setup is finished'
		updateRes.andExpect(status().isOk())
		def getRes = this.mockMvc.perform(get(url)
				.header(Authorization,Bearer+LdapConfigTestData.token1))
		getRes.andExpect(status().isOk())
		def getJson = new JsonSlurper().parseText(getRes.andReturn().response.contentAsString)
		assert getJson.directoryType == LdapConfigTestData.data.directoryType
		assert getJson.remoteServer == LdapConfigTestData.data.remoteServer
	}

	def'validate ldap configuration'(data,expectedStatus,expectedResult){
		given:'we have ldap configuration data'
		when: 'Admin want to test the connection'

		def res = this.mockMvc.perform(post(url+'/validate')
		.header(Authorization,Bearer+LdapConfigTestData.token1)
		.content(JsonOutput.toJson(data))
		.contentType(MediaType.APPLICATION_JSON))
		then:'ldap configuration connection  is successful'
		res.andExpect(status().is(expectedStatus))
		def getJson = new JsonSlurper().parseText(res.andReturn().response.contentAsString)
		assert getJson?.isValidConn == expectedResult?.isValidConn

		where:
		data<<[LdapConfigTestData.testConnData[0],LdapConfigTestData.testConnData[1],[:]]
		expectedStatus<<[LdapConfigTestData.stat,LdapConfigTestData.stat,LdapConfigTestData.stat]
		expectedResult<<[LdapConfigTestData.testConnDataRes,LdapConfigTestData.testConnDataFailRes,LdapConfigTestData.testConnDataFailRes]
	}
}

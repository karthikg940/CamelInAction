package com.ffss.datax.configuration.test.web.resource

import groovy.json.JsonOutput

import static org.hamcrest.MatcherAssert.assertThat
import static org.hamcrest.Matchers.*
import static org.hamcrest.core.IsNot.not
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status
import groovy.json.JsonOutput
import groovy.json.JsonSlurper

import org.springframework.http.MediaType

import com.ffss.datax.configuration.test.base.TransactionalWebIntegrationTest
import com.ffss.datax.configuration.test.base.WebAppIntegrationBaseSpecification

@TransactionalWebIntegrationTest
class WorksheetPersonalTagsSpec extends WebAppIntegrationBaseSpecification{

	static  Authorization = 'Authorization'
	static  Bearer = 'Bearer '

	def 'spec to save a new personal tag and associate with study'(studyId,userId){

		given:"The user has a study assigned to him as PP or AP or QA "

		when : "the user wants to add a new personal tag which is not in the system"

		def res=this.mockMvc.perform(post("/api/userTag/${userId}/tag")
				.header(Authorization,Bearer+ConfigurationTestData.token1)
				.content(JsonOutput.toJson(ConfigurationTestData.newPersonalTag))
				.contentType(MediaType.APPLICATION_JSON))

		then : 'verify whether it is added to personal tag table'

		def getTagIdResp=this.mockMvc.perform(get("/api/userTag/${userId}/tag")
				.header(Authorization,Bearer+ConfigurationTestData.token1)
				.contentType(MediaType.APPLICATION_JSON))
		def getTagIdRespJson = new JsonSlurper().parseText(getTagIdResp.andReturn().response.contentAsString)
		assert getTagIdRespJson[getTagIdRespJson.size-1].name == ConfigurationTestData.newPersonalTagWithId[0].name

		and : 'newly created personal tag should be associated with the selected study'

		def associationResp=this.mockMvc.perform(post("/api/studyTag/${studyId}/tag")
				.header(Authorization,Bearer+ConfigurationTestData.token1)
				.content(JsonOutput.toJson(ConfigurationTestData.requestBody))
				.contentType(MediaType.APPLICATION_JSON))

		then : 'verify whether it is associated with the particular study'
		def checkAssociationResp=this.mockMvc.perform(get("/api/studyTag/${studyId}/tag")
				.header(Authorization,Bearer+ConfigurationTestData.token1)
				.contentType(MediaType.APPLICATION_JSON))
		def checkAssociationRespJson = new JsonSlurper().parseText(checkAssociationResp.andReturn().response.contentAsString)
		checkAssociationRespJson?.each{ assert it.name == 'Cardiac_personal' }
		//assert checkAssociationRespJson[0].contains(ConfigurationTestData.requestBody[0].tagId)

		and : 'when the user wants to retrieve all his associated personal tags ==> GET Master list of PersonalTags'

		def getAllTagsResp=this.mockMvc.perform(get("/api/userTag/${userId}/tag")
				.header(Authorization,Bearer+ConfigurationTestData.token1)
				.contentType(MediaType.APPLICATION_JSON))

		def getAllTagsRespJson = new JsonSlurper().parseText(getAllTagsResp.andReturn().response.contentAsString)
		then :'Verify the newly added tag is being retrieved'

		assert getAllTagsRespJson[getAllTagsRespJson.size-1].name == ConfigurationTestData.newPersonalTagWithId[0].name

		where:
		studyId << [76000000000001]
		userId << [1001]
	}

	def 'spec to validate user-specific tags'(userId,userId_Y,studyId){

		given :'user X has a study assigned to him'

		when: 'user X wants to add new personal tag'

		def res=this.mockMvc.perform(post("/api/userTag/${userId}/tag")
				.header(Authorization,Bearer+ConfigurationTestData.token1)
				.content(JsonOutput.toJson(ConfigurationTestData.newPersonalTag))
				.contentType(MediaType.APPLICATION_JSON))

		then :'verify whether new tag has been added to the personal tags list'

		def getTagIdResp=this.mockMvc.perform(get("/api/userTag/${userId}/tag")
				.header(Authorization,Bearer+ConfigurationTestData.token1)
				.contentType(MediaType.APPLICATION_JSON))
		def getTagIdRespJson = new JsonSlurper().parseText(getTagIdResp.andReturn().response.contentAsString)
		assert getTagIdRespJson[getTagIdRespJson.size-1].name == 'Cardiac_personal'

		and :'user Y wants to see X user\'s personal tag when retrieving all Y\'s personal tags'

		def getAllTagsResp=this.mockMvc.perform(get("/api/userTag/${userId_Y}/tag")
				.header(Authorization,Bearer+ConfigurationTestData.token1)
				.contentType(MediaType.APPLICATION_JSON))

		def getAllTagsRespJson = new JsonSlurper().parseText(getAllTagsResp.andReturn().response.contentAsString)
		then :'Verify that Y\'s personal tag list should not contain X\'s personal tags'

		assert getAllTagsRespJson[getAllTagsRespJson.size-1].id != ConfigurationTestData.user_X_personalTags[0].id
		//assertThat(getAllTagsRespJson[0],not(hasItem( ConfigurationTestData.newPersonalTagWithId[0])))

		and : 'user X wants to see Y user\'s personal tag for a particular study'
		def checkAssociationResp=this.mockMvc.perform(get("/api/studyTag/${studyId}/tag")
				.header(Authorization,Bearer+ConfigurationTestData.token1)
				.contentType(MediaType.APPLICATION_JSON))
		then :'Verify whether X is restricted to view Y user\'s personal tag'
		def checkAssociationRespJson = new JsonSlurper().parseText(checkAssociationResp.andReturn().response.contentAsString)
		//assertThat(checkAssociationRespJson[0],not(hasItem(checkAssociationRespJson[0] )))//ConfigurationTestData.user_Y_personalTags[0]
		assert checkAssociationRespJson[checkAssociationRespJson.size-1].name == 'Cardiac_personal'
		where :
		userId << [1001]
		userId_Y << [1002]
		studyId << [76000000000001]
	}

	def 'user wants to delete all his personal Tags from the tag library'(userId){
		
		given : 'user already has set of personal tags in the library'

		when : 'user wants to clear all personal tags created by him'
		
		this.mockMvc.perform(delete("/api/userTag/${userId}/tag")
				.header(Authorization,Bearer+ConfigurationTestData.token1)
				.contentType(MediaType.APPLICATION_JSON))
		
		
		then : 'verifies the tag library'
		
		def getAlltagsResp = this.mockMvc.perform(get("/api/userTag/${userId}/tag")
				.header(Authorization,Bearer+ConfigurationTestData.token1)
				.contentType(MediaType.APPLICATION_JSON))
		def getAlltagsJsonArray = new JsonSlurper().parseText(getAlltagsResp.andReturn().response.contentAsString)
		
		assert getAlltagsJsonArray.size == 0

		where:
		userId << [1001]
	}
}

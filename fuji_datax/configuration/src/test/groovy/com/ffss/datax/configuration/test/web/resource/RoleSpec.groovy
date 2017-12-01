package com.ffss.datax.configuration.test.web.resource

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*
import groovy.json.JsonOutput
import groovy.json.JsonSlurper

import javax.ws.rs.core.MediaType

import com.ffss.datax.configuration.test.base.TransactionalWebIntegrationTest
import com.ffss.datax.configuration.test.base.WebAppIntegrationBaseSpecification

@TransactionalWebIntegrationTest
class RoleSpec extends WebAppIntegrationBaseSpecification{

	def Authorization = 'Authorization'
	def Bearer = 'Bearer '

	def 'Add roles to DataX'(data,expectedStatus) {
		given:'Admin have list of permissions'
		when:'he want to create a roles'
		def resp = this.mockMvc.perform(post('/api/role')
				.header(Authorization,Bearer+RoleTestData.token)
				.content(JsonOutput.toJson(data))
				.contentType(MediaType.APPLICATION_JSON))
		then:'the role is created'
		resp.andExpect(status().is(expectedStatus))
		if(expectedStatus == RoleTestData.created){
			def getRes = this.mockMvc.perform(get(resp.andReturn().response.headers['Location'].value)
					.header(Authorization,Bearer+UserProfileTestData.token))
			getRes.andExpect(status().isOk())
			def getJson = new JsonSlurper().parseText(getRes.andReturn().response.contentAsString)
			assert getJson.roleName == RoleTestData.addRoleData.roleName
			assert getJson.description == RoleTestData.addRoleData.description
		}
		where:
		data<<[RoleTestData.addRoleData, RoleTestData.updateDataDuplicate, RoleTestData.updateData2]
		expectedStatus<<[RoleTestData.created , RoleTestData.badRequest, RoleTestData.badRequest]
	}

	def 'update the roles'(data,expectedStatus) {
		given:'Admin have list of roles'
		def resp = this.mockMvc.perform(post('/api/role')
				.header(Authorization,Bearer+RoleTestData.token)
				.content(JsonOutput.toJson(RoleTestData.addRoleData))
				.contentType(MediaType.APPLICATION_JSON))
		resp.andExpect(status().isCreated())
		when:'he want to modify or update a role'

		def res = this.mockMvc.perform(put(resp.andReturn().response.headers['Location'].value)
				.header(Authorization,Bearer+RoleTestData.token)
				.content(JsonOutput.toJson(data))
				.contentType(MediaType.APPLICATION_JSON))

		then:'the role is Modified or Updated'
		res.andExpect(status().is(expectedStatus))

		def getRes = this.mockMvc.perform(get(resp.andReturn().response.headers['Location'].value)
				.header(Authorization,Bearer+UserProfileTestData.token))
		getRes.andExpect(status().isOk())
		where:
		data<<[RoleTestData.addRoleData1, RoleTestData.updateDataDuplicate, RoleTestData.updateData2]
		expectedStatus<<[200, RoleTestData.badRequest, RoleTestData.badRequest]
	}


	def 'Get List of Roles'() {
		given:'Admin have list of permissions and  he wants to create the roles'
		def resp = this.mockMvc.perform(post('/api/role')
				.header(Authorization,Bearer+RoleTestData.token)
				.content(JsonOutput.toJson(RoleTestData.addRoleData))
				.contentType(MediaType.APPLICATION_JSON))
		resp.andExpect(status().isCreated())
		def resp2 = this.mockMvc.perform(post('/api/role')
				.header(Authorization,Bearer+RoleTestData.token)
				.content(JsonOutput.toJson(RoleTestData.addRoleData1))
				.contentType(MediaType.APPLICATION_JSON))
		resp2.andExpect(status().isCreated())
		when:'he want to get the list of roles'
		def res = this.mockMvc.perform(get('/api/role')
				.header(Authorization,Bearer+RoleTestData.token)
				.accept(MediaType.APPLICATION_JSON))
		then:'the expected status is'
		res.andExpect(status().isOk())
		def getJson = new JsonSlurper().parseText(res.andReturn().response.contentAsString)
		assert getJson.results[1].roleName == RoleTestData.addRoleData1.roleName
		assert getJson.results[1].description == RoleTestData.addRoleData1.description
		
	}

	def 'delete the role from DataX'() {
		given:'Admin have List of Roles created'
		def res = this.mockMvc.perform(post('/api/role')
				.header(Authorization,Bearer+RoleTestData.token)
				.content(JsonOutput.toJson(RoleTestData.addRoleData))
				.contentType(MediaType.APPLICATION_JSON))
		res.andExpect(status().isCreated())
		when:'Admin want to delete a role from DataX'
		def deleteRes = this.mockMvc.perform(delete(res.andReturn().response.headers['Location'].value)
				.header(Authorization,Bearer+RoleTestData.token))
		then: 'The role gets deleted'
		deleteRes.andExpect(status().is(204))
		def getRes = this.mockMvc.perform(get(res.andReturn().response.headers['Location'].value)
				.header(Authorization,Bearer+RoleTestData.token))
		getRes.andExpect(status().is(404))
		def checkres = this.mockMvc.perform(delete(res.andReturn().response.headers['Location'].value)
				.header(Authorization,Bearer+RoleTestData.token))
		checkres.andExpect(status().is(404))
	}

	def 'checking whether the Rolename is present or not'  () {

		given: ' A role name is available '
		def res = this.mockMvc.perform(post('/api/role')
				.header(Authorization,Bearer+RoleTestData.token)
				.content(JsonOutput.toJson(RoleTestData.addRoleData))
				.contentType(MediaType.APPLICATION_JSON))
		res.andExpect(status().isCreated())
		when: 'you want to check wheather that role name is present or not'

		def roleName = 'test'
		def nameResOne = this.unSecuredMockMvc.perform(get("/api/role/search?name=${roleName}"))
		then: ' Checking the boolean value'
		nameResOne.andExpect(status().isOk())
		def nameJsonOne = new JsonSlurper().parseText(nameResOne.andReturn().response.contentAsString)
		assert nameJsonOne.isPresent == false
		and:'you want to check wheather that role name is present or not'
		def roleName1 = 'itadmin'
		def nameResTwo = this.unSecuredMockMvc.perform(get("/api/role/search?name=${roleName1}"))
		then: ' Checking the boolean value'
		nameResOne.andExpect(status().isOk())
		def nameJsonTwo = new JsonSlurper().parseText(nameResTwo.andReturn().response.contentAsString)
		assert nameJsonTwo.isPresent == true
	}
	
	
	def 'reAllocatae a role to other Role'(id, roleId, expectedStatus) {
		given: ' we have roles associated with users '
		when: 'you want to reallocate a role to other role'
		def res = this.mockMvc.perform(put("/api/role/${id}/reallocate?roleId=${roleId}")
				.header(Authorization,Bearer+RoleTestData.token))
		then: 'users and groups allocated to other role'
		res.andExpect(status().is(expectedStatus))
		where:
		id<< [6001, 6001 ,1234, 1234]
		roleId<< [6002, 323, 6002, 5678]
		expectedStatus<< [200, 404, 404,404]
	}
}

package com.ffss.datax.configuration.test.web.resource

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*
import groovy.json.JsonSlurper

import javax.ws.rs.core.MediaType

import com.ffss.datax.configuration.test.base.TransactionalWebIntegrationTest
import com.ffss.datax.configuration.test.base.WebAppIntegrationBaseSpecification


@TransactionalWebIntegrationTest
class UserProfileSpec extends WebAppIntegrationBaseSpecification {


	def 'get the user full name'  (token,statusValue, statusCode) {
		
		given:'when login to application'
		
		when: 'Get an userName from URL'
		
		def resp=this.mockMvc.perform(get('/api/userprofile')
				.header('Authorization','Bearer '+token)
				.accept(MediaType.APPLICATION_JSON))

		then: 'a status is fetched'
		resp.andExpect(status().is(statusCode))

		if(statusCode == 200) {
			def object = new JsonSlurper().parseText(resp.andReturn().response.contentAsString)

			assert object.prefix ==  statusValue.prefix
			assert object.firstName ==  statusValue.firstName
			assert object.lastName ==  statusValue.lastName
		}

		where:
			token << [UserProfileTestData.token]
			statusValue <<[UserProfileTestData.userProfile]
			statusCode <<[200]
	}
}

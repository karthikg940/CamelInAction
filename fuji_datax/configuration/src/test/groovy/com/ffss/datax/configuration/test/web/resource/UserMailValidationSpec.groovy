package com.ffss.datax.configuration.test.web.resource

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*
import groovy.json.JsonSlurper

import com.ffss.datax.configuration.test.base.TransactionalWebIntegrationTest
import com.ffss.datax.configuration.test.base.WebAppIntegrationBaseSpecification


@TransactionalWebIntegrationTest
class UserMailValidationSpec extends WebAppIntegrationBaseSpecification {


	def 'Checking whether the userName is present or not'  () {

		given: ' An user_account is available with default data'
		when: ' You fetch the boolean value if mail present'
		
		def email = 'john.williams@sonosite.com'
		def emailRespOne = this.unSecuredMockMvc.perform(get("/api/user/search?email=${email}&username="))
		then: ' Checking the boolean value'
		emailRespOne.andExpect(status().isOk())
		def emailJson = new JsonSlurper().parseText(emailRespOne.andReturn().response.contentAsString)
		assert emailJson.isPresent == true
		
		and: ' Checking for record is which is not there'
		then: ' You fetch the boolean value for mail present or not'
		
		def emailTwo = 'john.williams@gmail.com'
		def emailRespTwo = this.unSecuredMockMvc.perform(get("/api/user/search?email=${emailTwo}&username="))
		then: ' Checking the boolean value'
		emailRespTwo.andExpect(status().isOk())
		def emailJsonTwo = new JsonSlurper().parseText(emailRespTwo.andReturn().response.contentAsString)
		assert emailJsonTwo.isPresent == false
		
		and: ' Checking for user record is there or not'
		then: ' You fetch the boolean value for user present or not'
		
		def userName = 'johnw'
		def nameRespOne = this.unSecuredMockMvc.perform(get("/api/user/search?username=${userName}&email="))
		nameRespOne.andExpect(status().isOk())
		def nameJsonOne = new JsonSlurper().parseText(nameRespOne.andReturn().response.contentAsString)
		assert nameJsonOne.isPresent == true
		
		and: ' Checking for user record which is not there'
		then: ' You fetch the boolean value for user present or not'
		
		def userNameTwo = 'William'
		def nameRespTwo = this.unSecuredMockMvc.perform(get("/api/user/search?username=${userNameTwo}&email="))
		nameRespTwo.andExpect(status().isOk())
		def nameJsonTwo = new JsonSlurper().parseText(nameRespTwo.andReturn().response.contentAsString)
		assert nameJsonTwo.isPresent == false
		
	}


}

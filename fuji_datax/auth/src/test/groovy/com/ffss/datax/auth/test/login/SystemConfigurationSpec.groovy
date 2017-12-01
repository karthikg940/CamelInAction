package com.ffss.datax.auth.test.login

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*
import groovy.json.JsonSlurper

import org.springframework.http.MediaType

import com.ffss.datax.auth.test.base.TransactionalWebIntegrationTest
import com.ffss.datax.auth.test.base.WebAppIntegrationBaseSpecification

@TransactionalWebIntegrationTest
class SystemConfigurationSpec extends WebAppIntegrationBaseSpecification{

	def ' Getting the system Config'(expectedStatus) {
		given: ' Admin is in password config screen'
		when: ' Admin has entered all the details for password config'
		def getConfig = this.unSecuredMockMvc.perform(get("/api/pwdpolicy")
				.contentType(MediaType.APPLICATION_JSON))
		then: ' pwd policy has to be saved'
		getConfig.andExpect(status().is(expectedStatus))
		def resp = new JsonSlurper().parseText(getConfig.andReturn().response.contentAsString)
		assert resp.ldapConfigEnabled == false
		where:
		expectedStatus<<[200]
	}
}

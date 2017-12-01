package com.ffss.datax.auth.test.login

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*
import groovy.json.JsonSlurper

import com.ffss.datax.auth.test.base.TransactionalWebIntegrationTest
import com.ffss.datax.auth.test.base.WebAppIntegrationBaseSpecification

@TransactionalWebIntegrationTest
class ResetPwdSpec extends WebAppIntegrationBaseSpecification {

	def 'Test reset password'(value,expectedStatus) {
		given: 'We have user given password'
		when: 'User enter his current pwd'
		def res = this.unSecuredMockMvc.perform(post("/api/userValidate/reset?value=${value}"))
		then: "we expect the status"
		res.andExpect(status().is(expectedStatus))

		def resJson = new JsonSlurper().parseText(res.andReturn().response.contentAsString)
		//assert resJson?.passwordReset == expectedResult.passwordReset
		where:
		value<<['johnw','cris.renella@sonosite.com']
		expectedStatus<<[200,200]
		//expectedResult<<[LockUserTestData.passwordReset,LockUserTestData.passwordReset]
	}
}

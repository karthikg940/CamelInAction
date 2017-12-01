package com.ffss.datax.auth.test.login

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.MediaType

import com.ffss.datax.auth.constants.AuthConstants
import com.ffss.datax.auth.repository.UserAccountRepository
import com.ffss.datax.auth.test.base.TransactionalWebIntegrationTest
import com.ffss.datax.auth.test.base.WebAppIntegrationBaseSpecification
import groovy.json.JsonSlurper

/**
 * Test cases for unlocking userAccount
 * 
 * @author Virtusa|Polaris
 */
@TransactionalWebIntegrationTest
class UnlockUserSpec extends WebAppIntegrationBaseSpecification {

	@Autowired
	UserAccountRepository userRepository

	def ' To unlock a locked user account'(userId,expectedStatus) {


		given : ' having locked users in datax by giving wrong password'

		when : ' we try to unlock the locked user'

		def res = this.mockMvc.perform(put("/api/account/${userId}/unlock")
				.header("Authorization","Bearer "+token)
				.accept(MediaType.APPLICATION_JSON))

		res.andExpect(status().is(expectedStatus))
		then : ' we check for the given userId is unlocked or not'
		if(expectedStatus == 200){
			
			when: ' Login with the correct credentials in which the user has unlocked'
			def loginResponse = this.unSecuredMockMvc.perform(post("/api/login?user=psam&pwd=password&secret=MySecret"))
			def resJsn= new JsonSlurper().parseText(loginResponse.andReturn().response.contentAsString)
			then: ' we check for the lockStatus'
			assert resJsn.lockStatus == 'N'
			assert resJsn.activeStatus == 'Y'
		}

		where :
		userId << [1003L, 2017L]
		expectedStatus << [200, 404]
	}
}


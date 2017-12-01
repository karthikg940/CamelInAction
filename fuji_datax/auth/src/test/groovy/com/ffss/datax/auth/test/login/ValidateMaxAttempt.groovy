package com.ffss.datax.auth.test.login

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*
import groovy.json.JsonSlurper

import org.joda.time.DateTime
import org.springframework.beans.factory.annotation.Autowired

import com.ffss.datax.auth.repository.UserAccountRepository
import com.ffss.datax.auth.test.base.TransactionalWebIntegrationTest
import com.ffss.datax.auth.test.base.WebAppIntegrationBaseSpecification

/**
 * Unit test for locking user account
 * 
 * @author Virtusa|Polaris
 */
@TransactionalWebIntegrationTest
class ValidateMaxAttempt extends WebAppIntegrationBaseSpecification {

	@Autowired
	UserAccountRepository userAccountRepository

	def 'Lock user account after maximum login attempt'(user, pwd, expectedStatus, expectedResult) {

		given: 'We have the user'

		when: ' User reached maximum attempt of entering wrong password'
		def res
		5.times{
			res = this.unSecuredMockMvc.perform(post("/api/login?user=${user}&pwd=${pwd}&secret=MySecret"))
		}

		then: ' User account get locked and status fetched'
		//res.andExpect(status().is(expectedStatus))
		if (expectedStatus == 403) {
			def validateRes=new JsonSlurper().parseText(res.andReturn().response.contentAsString)
			assert validateRes.lock == expectedResult.lock
		}
		where:
		user << LockUserTestData.userName
		pwd << LockUserTestData.password
		expectedResult << LockUserTestData.lockStatus
		expectedStatus << LockUserTestData.expectedStatus
	}

	def 'UnLock user account after maximum login attempt'(user, pwd,passwrd) {
		given: 'We have locked user'
		def res
		5.times{
			res = this.unSecuredMockMvc.perform(post("/api/login?user=${user}&pwd=${pwd}&secret=MySecret"))
		}
		res.andExpect(status().is(403))
		when: ' After reached maximum time'
		updateUser(user)
		def resp = this.unSecuredMockMvc.perform(post("/api/login?user=${user}&pwd=${passwrd}&secret=MySecret"))
		then: ' User account get locked and status fetched'
		resp.andExpect(status().isOk())
		where:
		user << LockUserTestData.userName
		pwd << LockUserTestData.pwd
		passwrd<<LockUserTestData.password
	}
	void updateUser(userName) {
		def lockedTime=DateTime.now().minusMinutes(05)
		def userOb = userAccountRepository.findByUserName(userName)
		userOb.lockedTime =lockedTime
		userAccountRepository.save(userOb)
	}
}

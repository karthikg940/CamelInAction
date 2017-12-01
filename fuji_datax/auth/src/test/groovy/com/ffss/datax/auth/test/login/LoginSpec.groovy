package com.ffss.datax.auth.test.login

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*
import groovy.json.JsonSlurper

import org.joda.time.DateTime
import org.springframework.beans.factory.annotation.Autowired

import com.ffss.datax.auth.repository.UserAccountRepository
import com.ffss.datax.auth.test.base.TransactionalWebIntegrationTest
import com.ffss.datax.auth.test.base.WebAppIntegrationBaseSpecification
import com.ffss.datax.security.util.JwtTokenValidator

/**
 * Test cases with different login scenarios
 * 
 * @author Virtusa|Polaris
 * 
 */
@TransactionalWebIntegrationTest
class LoginSpec extends WebAppIntegrationBaseSpecification {

	@Autowired
	UserAccountRepository userAccountRepository
	
	def 'Validate the login mechanism with VALID credentials'(user, pwd, expectedStatus) {
		given: 'We have valid userName and password'

		when: ' We attempt to authenticate'

		def res = this.unSecuredMockMvc.perform(post("/api/login?user=${user}&pwd=${pwd}&secret=MySecret"))

		then: ' We expect the status'

		res.andExpect(status().is(expectedStatus))

		if (expectedStatus == 200) {
			def resJson = new JsonSlurper().parseText(res.andReturn().response.contentAsString)

			def validUser = JwtTokenValidator.parseToken(resJson.token, 'MySecret')

			assert validUser.userName == user
		}

		where:
		user     | 	   pwd     |  expectedStatus

		'johnw'    | 'johny123'   |       200
	}


	def 'Validate the login mechanism with INVALID credentials'(user, pwd, expectedStatus) {

		given : 'We have invalid userName and password'

		when : ' We attempt to authenticate'

		def res = this.unSecuredMockMvc.perform(post("/api/login?user=${user}&pwd=${pwd}&secret=MySecret"))

		then : ' We expect the status'

		res.andExpect(status().is(expectedStatus))

		where :
		user    	   | 	   pwd       |  expectedStatus

		'testUser'    |  '124ssq233'    |       401
	}

	def "get the password expiry details on login"  (userId, expectedResult, expectedStatus) {

		given:"When user try to login"
		def resp=this.unSecuredMockMvc.perform(get("/api/login?userId=${userId}"))
		resp.andExpect(status().is(expectedStatus))
		when: "Get the password expiry details"
		updateUser(userId)
		def res=this.unSecuredMockMvc.perform(get("/api/login?userId=${userId}"))
		then: "the pwd is expired"
		resp.andExpect(status().is(expectedStatus))
		if (expectedStatus == 200) {
			def result = new JsonSlurper().parseText(resp.andReturn().response.contentAsString)
			assert result == expectedResult
		}
		where:
		userId << [1001, 12345678,'']
		expectedResult << [['N'], ['UNDEFINED'],[:]]
		expectedStatus << [200, 404 ,404]
	}

	void updateUser(userId) {
		def userOb
		def pwdExpireDate=DateTime.now().minusDays(01)
		if(userId)
		userOb = userAccountRepository?.findById(userId.asType(Long.class))
		if(userOb){
			userOb.pwdExpireDate = pwdExpireDate
			userAccountRepository.save(userOb)
		}
		
	}
}

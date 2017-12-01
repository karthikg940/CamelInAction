package com.ffss.datax.gateway.test.auth
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status
import com.ffss.datax.gateway.test.base.*;

/**
 * 
 * @author Virtusa|Polaris
 * 
 *
 */
@TransactionalWebIntegrationTest
class LogoutSpec extends WebAppIntegrationBaseSpecification {


	def 'Test the log out'() {

		given: ' We are logged in'

		when: ' You log out'

		def res = this.mockMvc.perform(get('/auth/logout').header('Authorization',"Bearer ${TestData.token}".toString()))

		then: ' You are logged out'

		res.andExpect(status().isOk())
	}
}

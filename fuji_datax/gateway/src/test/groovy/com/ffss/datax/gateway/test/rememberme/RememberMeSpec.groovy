package com.ffss.datax.gateway.test.rememberme

/**
 * @author Virtusa|Polaris
 *
 */
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status

import com.ffss.datax.gateway.test.base.TransactionalWebIntegrationTest
import com.ffss.datax.gateway.test.base.WebAppIntegrationBaseSpecification
import javax.servlet.http.Cookie

@TransactionalWebIntegrationTest
class RememberMeSpec extends WebAppIntegrationBaseSpecification {

	def 'Validate the remember me functionality'() {

		given: 'We have the incoming user , pwd and remember me value'

		when:  'remember Me radio button is checked'

		def res = this.mockMvc.perform(post('/auth/login')
				.param('user','johnw')
				.param('pwd','johny123')
				.param('rememberMe','true'))

		then: ' cookie is created'

		res.andExpect(status().isOk())
		res.andReturn().response.cookies.find{it.name =='rememberMe'}!=null
	}

	def 'Validate if the token value is null'(expectedStatus,token) {

		given: ' we have token'

		when: ' We attempt to login'

		def res = this.mockMvc.perform(get("/index?token=${token}"))

		then: 'redirect to dashboard page'

		res.andExpect(status().is(expectedStatus))

		where:
		expectedStatus << [200, 200]
		token << [
			"eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MSwidXNlck5hbWUiOiJqb2hudyJ9.RbhWO3whmg6C440BtUzGbLhuKGeYcHeZ7pTFqwOIGRu0UuLTGNOPJeOWIDpJ73A7iBrlNKJAKj49hNMJHPM37w",
			false
		]
	}
}

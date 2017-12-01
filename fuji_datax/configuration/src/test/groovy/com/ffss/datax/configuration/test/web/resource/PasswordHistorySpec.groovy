package com.ffss.datax.configuration.test.web.resource;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*

import groovy.json.JsonSlurper
import org.springframework.http.MediaType

import com.ffss.datax.configuration.test.base.TransactionalWebIntegrationTest
import com.ffss.datax.configuration.test.base.WebAppIntegrationBaseSpecification

@TransactionalWebIntegrationTest
class PasswordHistorySpec extends WebAppIntegrationBaseSpecification {
	
	
	def 'make the entry into the passwordHistory repository based on the admin config'()
	{
		def response
		given: 'user in the change password screen and able to change the password'
		def restrictionCount = 2
		def token = 'eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MTAwMSwidXNlck5hbWUiOiJqb2hudyJ9.N9NB9ioZUSOhtiSziPA10h4PpjOlzBV0ztqqvcuaOp9RqxkRUa3XvvX7GrTPQTy4vxuNd59ve7OBq-dVcPP65g'
		
		when : ' user enters the valid password'
		def password = 'Johny@123456'
		
		then : ' save the password into the repository'
		restrictionCount.times{
		 response = this.mockMvc.perform(put('/api/user/changepassword?password=Johny@123456')
								.header('Authorization','Bearer '+token)
								.contentType(MediaType.APPLICATION_JSON))
	}
		response.andExpect(status().is(200))
	}
	
}

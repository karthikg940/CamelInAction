package com.ffss.datax.auth.test.login

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status

import com.ffss.datax.auth.test.base.TransactionalWebIntegrationTest
import com.ffss.datax.auth.test.base.WebAppIntegrationBaseSpecification

/**
 * Test cases with different login scenarios
 * 
 * @author Virtusa|Polaris
 */
@TransactionalWebIntegrationTest
class UserValidateSpec extends WebAppIntegrationBaseSpecification
{
	def 'To check whether userName or emailId entered is valid or not'(value,expectedStatus)
	{
		
		given : 'We have userName or emailId'
		
		when : ' We attempt to reset'
		
		def res = this.unSecuredMockMvc.perform(get("/api/userValidate?value=${value}"))
			
		then : 'We expect the status'
		
				res.andExpect(status().is(expectedStatus))
				
		where :
		value << ['johnw','john.williams@sonosite.com','test','test@sonosite.com']
		expectedStatus << [200,200,200,200]
			   
			 
	}
	
}

package com.ffss.datax.gateway.test.auth

import com.ffss.datax.gateway.test.base.TransactionalWebIntegrationTest
import com.ffss.datax.gateway.test.base.WebAppIntegrationBaseSpecification
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status

@TransactionalWebIntegrationTest
class SystemConfigurationSpec extends WebAppIntegrationBaseSpecification{

	def ' check whether the ldap is configured or not'(){
		
		given :' provided the loginURL'
		
		when:' on loading of the login page'
		def resp = this.mockMvc.perform(get("/auth/passwordpolicy"))
		then:' response whether the ldap is enabled'
		resp.andExpect(status().isOk())
	}
}

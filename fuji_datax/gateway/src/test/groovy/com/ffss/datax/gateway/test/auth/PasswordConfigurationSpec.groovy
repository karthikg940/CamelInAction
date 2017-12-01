package com.ffss.datax.gateway.test.auth

import com.ffss.datax.gateway.test.base.TransactionalWebIntegrationTest
import com.ffss.datax.gateway.test.base.WebAppIntegrationBaseSpecification
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status

@TransactionalWebIntegrationTest
class PasswordConfigurationSpec extends WebAppIntegrationBaseSpecification {

	def 'change system password to new password'() {
		def password = '1234$qwerQ'
		given: ' When we are logging in'

		when: ' the current password '

		def res = this.mockMvc.perform(put('/auth/login/changesyspwd?password='+password+'&token='+TestData.token))

		then: ' password has been changed'

		res.andExpect(status().isOk())
	}
	
	def ' validating the current password'(){
		
		def password = 'johny123'
		given: ' When we are changing the password'

		when: ' After entering the current password'

		def res = this.mockMvc.perform(get('/auth/login/currentpasswordvalidate?password='+password+'&token='+TestData.token))

		then: ' true if the password entered is correct'

		res.andExpect(status().isOk())

	}
	
	def ' validating the new password'(){
		
		def password = 'johny$1234'
		given: ' When we are changing the password'

		when: ' After entering the new password'

		def res = this.mockMvc.perform(get('/auth/login/newpasswordvalidate?password='+password+'&token='+TestData.token))

		then: ' true if the password entered matches with the regex'

		res.andExpect(status().isOk())

	}
	
	def ' validating the user is there or not'(){
		
		def userName = 'johnw'
		given: ' When we are changing the password'

		when: ' After entering the current password'

		def res = this.mockMvc.perform(get('/auth/login/validate?value='+userName))

		then: ' true if the userName or mail is present'

		res.andExpect(status().isOk())

	}
	
	def ' resetting a password'(){
		
		def userName = 'johnw'
		given: ' When we are in login page and forgot password' 

		when: ' enter username in forgotpassword page'

		def res = this.mockMvc.perform(post('/auth/login/reset?value='+userName)
			.header("Authorization","Bearer "+TestData.token))

		then: ' after successful attempt password is sent to give emailID'

		res.andExpect(status().isOk())

	}
	
	def ' validating whether token is there in browser'(){
		
		def userName = 'johnw'
		given: ' When we are in login page and forgot password'

		when: ' enter username in forgotpassword page'

		def res = this.mockMvc.perform(post('/auth/login/reset?value='+userName)
			.header("Authorization","Bearer "+TestData.token))

		then: ' after successful attempt password is sent to give emailID'

		res.andExpect(status().isOk())

	}
}

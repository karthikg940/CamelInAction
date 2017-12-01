package com.ffss.datax.configuration.test.web.resource

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*

import javax.websocket.Session

import org.springframework.http.MediaType

import com.ffss.datax.configuration.test.base.TransactionalWebIntegrationTest
import com.ffss.datax.configuration.test.base.WebAppIntegrationBaseSpecification

import groovy.json.JsonOutput
import groovy.json.JsonSlurper

@TransactionalWebIntegrationTest
class MailConfigurationSpec extends WebAppIntegrationBaseSpecification{

	static final String TOKEN ="eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MTAwMiwidXNlck5hbWUiOiJjcmlzcmVuIn0.d_6oSe5guKmDi_K5V8LIS3L_UsuhrKkrfm9nc_WuDyOoK-mLhVX8WHss3fQ33G2Ek_qTRqwiWmmdl5RUrojOxQ"
	
	def "Retrieve mail Configurations" () {
		
		when: "All json parameters are passed"
			def response = this.mockMvc.perform(get("/api/configuration/email?orgId=1")
				.header("Authorization","Bearer " + TOKEN)
				.contentType(MediaType.APPLICATION_JSON))
			
		then:
			response.andExpect(status().is(200))
			(new JsonSlurper().parseText(response.andReturn().response.contentAsString)).orgId == 1
			
	}


	def "Save mail Configurations" () {
		
		setup:
			def id = 1
			
		when: "All json parameters are passed"
			def response = this.mockMvc.perform(put("/api/configuration/email/${id}")
				.header("Authorization","Bearer " + TOKEN)
				.contentType(MediaType.APPLICATION_JSON)
				.content(JsonOutput.toJson(emailConfig)))

		then:
			response.andExpect(status().is(200))
			
		where: 
			emailConfig << [[ orgId:1, isSSL:true, isAuth:false, isEnable:true, userName:'', password:'', port:25, server:'localhost', defaultEmail:' DataX Workflow Mailer<DoNotReply@TBD.com>'],
							[ orgId:1, isSSL:true, isAuth:true, isEnable:true, userName:'test', password:'password', port:25, server:'localhost', defaultEmail:' DataX Workflow Mailer<DoNotReply@TBD.com>']]
	}

	
}

package com.ffss.datax.notification.test.web.resource

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*

import javax.mail.Session
import javax.mail.Transport

import org.springframework.http.MediaType

import com.ffss.datax.notification.test.base.TransactionalWebIntegrationTest
import com.ffss.datax.notification.test.base.WebAppIntegrationBaseSpecification

import groovy.json.JsonOutput
import groovy.json.JsonSlurper

@TransactionalWebIntegrationTest
class CheckConnectionSpec extends WebAppIntegrationBaseSpecification{

	Session session = GroovyMock()
	Transport transport = GroovyMock()

	def "Check Email Connection Success" () {

		setup:

		Session.metaClass.static.getInstance = {Properties prop -> return session}

		session.getTransport('smtp') >> transport
		transport.connect() >> {println 'Successfully Connected to Mail Server'}
		transport.connect('Test', 'password') >> {println 'Successfully Connected to Mail Server'}

		when: "isAuth == false/true"

		def response = this.mockMvc.perform(post("/api/internal/notification/checkConnection")
				.header("Authorization","Bearer " + TOKEN)
				.contentType(MediaType.APPLICATION_JSON)
				.content(JsonOutput.toJson(emailConfig)))

		then:

		response.andExpect(status().is(200))
		(new JsonSlurper().parseText(response.andReturn().response.contentAsString)).connectionSuccess == true

		cleanup:

		GroovySystem.metaClassRegistry.setMetaClass(Session, null)

		where:

		emailConfig << [
			[server:'localhost', port: 25, isAuth:false],
			[server:'localhost', port: 25, isAuth:true, userName: 'Test', password: 'password']
		]
	}

	def "Check Email Connection Failure" () {

		setup:

		Session.metaClass.static.getInstance = {Properties prop -> return session}

		session.getTransport('smtp') >> transport
		transport.connect() >> {throw new Exception('Email Connection Failure')}
		transport.connect('Test', 'password') >> { throw new Exception('Email Connection Failure') }

		when: "isAuth == false/true"

		def response = this.mockMvc.perform(post("/api/internal/notification/checkConnection")
				.header("Authorization","Bearer " + TOKEN)
				.contentType(MediaType.APPLICATION_JSON)
				.content(JsonOutput.toJson(emailConfig)))

		then:

		response.andExpect(status().is(200))
		(new JsonSlurper().parseText(response.andReturn().response.contentAsString)).connectionSuccess == false

		cleanup:

		GroovySystem.metaClassRegistry.setMetaClass(Session, null)

		where:

		emailConfig << [
			[server:'localhost', port: 25, isAuth:false],
			[server:'localhost', port: 25, isAuth:true, userName: 'Test', password: 'password']
		]
	}
}

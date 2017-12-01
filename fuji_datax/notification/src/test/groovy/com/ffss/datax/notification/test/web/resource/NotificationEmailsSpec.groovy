package com.ffss.datax.notification.test.web.resource

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*

import javax.ws.rs.core.MediaType

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.mail.javamail.JavaMailSender
import org.springframework.mail.javamail.JavaMailSenderImpl
import org.springframework.mail.javamail.MimeMessagePreparator

import com.ffss.datax.common.constants.NotificationStatusEnum
import com.ffss.datax.common.domain.notification.Notification
import com.ffss.datax.notification.delegate.EmailProcessor
import com.ffss.datax.notification.service.NotificationAsyncService
import com.ffss.datax.notification.test.base.TransactionalWebIntegrationTest
import com.ffss.datax.notification.test.base.WebAppIntegrationBaseSpecification

import groovy.json.JsonOutput

@TransactionalWebIntegrationTest
class NotificationEmailsSpec extends WebAppIntegrationBaseSpecification {

	@Autowired
	NotificationAsyncService notificationAsyncService

	@Autowired
	EmailProcessor emailProcessor


	def "Send Email Notifications" () {

		setup:

		notificationAsyncService.metaClass.notificationReqAsync = {Long lastId -> println 'Call goes to notificationReqAsync method' }

		def emailJson = [orgId:1, notification: [from: 'sonosite@datax.com', to :['john.williams@sonosite.com', 'cris.renella@sonosite.com'], subject: 'userCreation']]
		def alertJsonWithoutDataxUser =[orgId:1, notification: [to :['john.williams@sonosite.com', 'cris.renella@sonosite.com'], subject: 'userCreation']]
		def channel = 1

		when: "When sender's email contains in the JSON "

		def response = this.mockMvc.perform(post("/api/notification/${channel}")
				.header("Authorization","Bearer " + TOKEN)
				.contentType(MediaType.APPLICATION_JSON)
				.content(JsonOutput.toJson(emailJson)))

		then:

		response.andExpect(status().is(200))

		when: "When sender's email not contains in the JSON"

		def responseNoQueryParam = this.mockMvc.perform(post("/api/notification/${channel}")
				.header("Authorization","Bearer " + TOKEN)
				.contentType(MediaType.APPLICATION_JSON)
				.content(JsonOutput.toJson(alertJsonWithoutDataxUser)))

		then:

		responseNoQueryParam.andExpect(status().is(200))

		cleanup:

		GroovySystem.metaClassRegistry.setMetaClass(notificationAsyncService, null)
		GroovySystem.metaClassRegistry.setMetaClass(NotificationAsyncService.class ,null)
	}

	def 'Process Email notifications - Success'(){

		setup:

		JavaMailSender.metaClass.send = { MimeMessagePreparator msgPrepa -> println 'Email Sent Successfully!!!!!'}

		when: 'Retrieved notification from db'

		def notificationObj = notificationAsyncService.findNotificationsById(3L)
		NotificationStatusEnum status = emailProcessor.processNotification(notificationObj)

		then:

		status == NotificationStatusEnum.SUCCESS

		cleanup:

		GroovySystem.metaClassRegistry.setMetaClass(JavaMailSender, null)
		GroovySystem.metaClassRegistry.setMetaClass(JavaMailSenderImpl, null)
	}

	def 'Process Email notifications - Failure'(){

		setup:

		JavaMailSender.metaClass.send = { MimeMessagePreparator msgPrepa -> throw new Exception('Simulate Failure in Sending Emails')}

		when: 'Retrieved notification from db'

		def notificationObj = notificationAsyncService.findNotificationsById(3L)
		emailProcessor.processNotification(notificationObj)

		then:

		Exception exception = thrown()
		exception.message == 'Simulate Failure in Sending Emails'
	}

	def "Retrieve 'FAILED' and 'DISABLED' emails" () {

		when: "Need to retrieve 'FAILED' and 'DISABLED' emails"

		def response = this.mockMvc.perform(get("/api/notification/email")
				.header("Authorization","Bearer " + TOKEN)
				.contentType(MediaType.APPLICATION_JSON))

		then:

		response.andExpect(status().is(200))
	}

	def "Resend 'FAILED' and 'DISABLED' emails" () {

		setup:

		notificationAsyncService.metaClass.notificationReqAsync = {Long Id -> println 'Call goes to notificationReqAsync method' }
		notificationAsyncService.metaClass.notificationProcessorAsync = {Notification notificationObj -> println 'Call goes to notificationProcessorAsync method' }

		def jsonInput = [id :[1]]
		def jsonInputWithoutIds = [id :[]]
		def jsonEmpty = []

		when: "email ids are given as json parameters"
		Notification n = new Notification()
		notificationAsyncService.notificationProcessorAsync(n)
		
		
		def response = this.mockMvc.perform(post("/api/notification/email")
				.header("Authorization","Bearer " + TOKEN)
				.contentType(MediaType.APPLICATION_JSON)
				.content(JsonOutput.toJson(jsonInput)))

		then:

		response.andExpect(status().is(200))

		when: "email ids are not given as json parameters or json is empty"

		def responseWithoutIds = this.mockMvc.perform(post("/api/notification/email")
				.header("Authorization","Bearer " + TOKEN)
				.contentType(MediaType.APPLICATION_JSON)
				.content(JsonOutput.toJson(jsonInputWithoutIds)))
		
		def responseEmpty = this.mockMvc.perform(post("/api/notification/email")
			.header("Authorization","Bearer " + TOKEN)
			.contentType(MediaType.APPLICATION_JSON)
			.content(JsonOutput.toJson(jsonEmpty)))

		then:

		responseWithoutIds.andExpect(status().is(200))
		responseEmpty.andExpect(status().is(200))

		cleanup:

		GroovySystem.metaClassRegistry.setMetaClass(notificationAsyncService, null)
		GroovySystem.metaClassRegistry.setMetaClass(NotificationAsyncService.class ,null)
	}
}

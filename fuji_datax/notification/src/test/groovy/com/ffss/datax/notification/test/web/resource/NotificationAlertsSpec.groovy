package com.ffss.datax.notification.test.web.resource

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*

import javax.ws.rs.core.MediaType

import org.springframework.beans.factory.annotation.Autowired

import com.ffss.datax.common.constants.NotificationStatusEnum
import com.ffss.datax.notification.delegate.InAppProcessor
import com.ffss.datax.notification.service.NotificationAsyncService
import com.ffss.datax.notification.test.base.TransactionalWebIntegrationTest
import com.ffss.datax.notification.test.base.WebAppIntegrationBaseSpecification

import groovy.json.JsonOutput
import groovy.json.JsonSlurper

@TransactionalWebIntegrationTest
class NotificationAlertsSpec extends WebAppIntegrationBaseSpecification {

	@Autowired
	NotificationAsyncService notificationAsyncService

	@Autowired
	InAppProcessor inAppProcessor

	def "Save Notification Alert status" () {

		setup:
		//Retrieving the original "notificationReqAsync" method, so that it can be set back in after this test
		def originalNotificationReqAsync = notificationAsyncService.metaClass.getMetaMethod('notificationReqAsync',[Long] as Class[])

		notificationAsyncService.metaClass.notificationReqAsync = {Long lastId -> println 'Call goes to notificationReqAsync method' }

		def alertJson = [orgId:1, notification: [from: 1001, to :[1002, 1006], message :'You have been allocated to perform a test on patient3.']]
		def alertJsonWithoutDataxUser =[orgId:1, notification: [to :[1003, 1006], message :'You have been allocated to perform a test on patient4.']]
		def channel = 2

		when: "all json parameters are passed"

		def response = this.mockMvc.perform(post("/api/notification/${channel}")
				.header("Authorization","Bearer " + TOKEN)
				.contentType(MediaType.APPLICATION_JSON)
				.content(JsonOutput.toJson(alertJson)))

		then:

		response.andExpect(status().is(200))

		when: "User ID is not passed in the json"

		def responseWithoutUserId = this.mockMvc.perform(post("/api/notification/${channel}")
				.header("Authorization","Bearer " + TOKEN)
				.contentType(MediaType.APPLICATION_JSON)
				.content(JsonOutput.toJson(alertJsonWithoutDataxUser)))

		then:

		responseWithoutUserId.andExpect(status().is(200))

		cleanup:
		//Setting back the original "notificationReqAsync" method, need to do this, the way it's done below because "notificationAsyncService" is a proxy class
		//Therefore, cannot use "GroovySystem.metaClassRegistry.setMetaClass(notificationAsyncService, null)" to reset back to the original method
		notificationAsyncService.metaClass.notificationReqAsync = { Long lastId ->
			originalNotificationReqAsync.invoke(notificationAsyncService,[lastId] as Object[]) }
	}

	def 'Process Inapp notifications - Success'(){

		when: 'Process notification with id - 1 from db'

		def notificationObj = notificationAsyncService.findNotificationsById(3L)
		NotificationStatusEnum status = inAppProcessor.processNotification(notificationObj)

		then:

		status == NotificationStatusEnum.SUCCESS

		when: 'Process notification with id - 2 from db'
		
		notificationObj = notificationAsyncService.findNotificationsById(4L)
		status = inAppProcessor.processNotification(notificationObj)

		then:

		status == NotificationStatusEnum.SUCCESS
	}

	def "Retrieve All Alerts By User" () {

		when: "No Query Parameters are passed"

		def responseNoQueryParam = this.mockMvc.perform(get("/api/notification/alert")
				.header("Authorization","Bearer " + TOKEN)
				.contentType(MediaType.APPLICATION_JSON))

		then:

		responseNoQueryParam.andExpect(status().is(200))
		(new JsonSlurper().parseText(responseNoQueryParam.andReturn().response.contentAsString)).unreadAlertsCount == 2

		when: "User ID is passed in as a Query Parameter"

		def response = this.mockMvc.perform(get("/api/notification/alert?datax_receiver=1003")
				.header("Authorization","Bearer " + TOKEN)
				.contentType(MediaType.APPLICATION_JSON))

		then:

		response.andExpect(status().is(200))
		(new JsonSlurper().parseText(response.andReturn().response.contentAsString)).unreadAlertsCount == 3

		when: "Date is passed in as a Query Parameter"

		def responseWithDate = this.mockMvc.perform(get("/api/notification/alert?date=2017-06-13 17:09:55")
				.header("Authorization","Bearer " + TOKEN)
				.contentType(MediaType.APPLICATION_JSON))

		then:

		responseWithDate.andExpect(status().is(200))

		when: "User ID and Date both are passed in as a Query Parameter"

		def responseWithUserIdAndDate = this.mockMvc.perform(get("/api/notification/alert?datax_receiver=1003&date=2017-06-11 17:09:55")
				.header("Authorization","Bearer " + TOKEN)
				.contentType(MediaType.APPLICATION_JSON))

		then:

		responseWithUserIdAndDate.andExpect(status().is(200))
	}

	def "Update Notification Alert status" () {

		setup:

		def updateJson = [orgId:1, dataxUser: 1001, id:[1, 2], status:'READ']
		def updateJsonWithoutUserId = [orgId:1, id:[1, 2], status:'READ']

		when: "No Query Parameters are passed"

		def response = this.mockMvc.perform(put("/api/notification/alert")
				.header("Authorization","Bearer " + TOKEN)
				.contentType(MediaType.APPLICATION_JSON)
				.content(JsonOutput.toJson(updateJson)))

		then:

		response.andExpect(status().is(200))

		when: "User ID is not passed in the json"

		def responseWithoutUserId = this.mockMvc.perform(put("/api/notification/alert")
				.header("Authorization","Bearer " + TOKEN)
				.contentType(MediaType.APPLICATION_JSON)
				.content(JsonOutput.toJson(updateJsonWithoutUserId)))

		then:

		responseWithoutUserId.andExpect(status().is(200))
	}
}

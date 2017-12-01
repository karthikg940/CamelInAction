package com.ffss.datax.notification.service

import javax.transaction.Transactional

import org.apache.shiro.SecurityUtils
import org.apache.shiro.subject.Subject
import org.joda.time.format.DateTimeFormat
import org.joda.time.format.DateTimeFormatter
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

import com.fasterxml.jackson.databind.ObjectMapper
import com.ffss.datax.common.constants.NotificationStatusEnum
import com.ffss.datax.common.domain.notification.Notification
import com.ffss.datax.notification.constants.NotificationConstants
import com.ffss.datax.notification.repository.NotificationAlertRepository
import com.ffss.datax.notification.repository.NotificationRepository
import com.ffss.datax.notification.util.NotificationUtil

import groovy.json.JsonSlurper
import groovy.util.logging.Log4j

/**
 * Perform services related to Notifications
 * @author Virtusa|Polaris
 *
 */
@Log4j
@Service('notificationService')
class NotificationService{

	static DateTimeFormatter formatter = DateTimeFormat.forPattern('yyyy-MM-dd HH:mm:ss')

	private static final int DEFAULT_ERROR_COUNT = 0

	@Autowired
	NotificationRepository notificationRepository

	@Autowired
	NotificationAlertRepository notificationAlertRepository

	@Autowired
	NotificationAsyncService notificationAsyncService

	/**
	 * This method is for saving the notification data and calls Async Method to send email or to save alerts
	 * 
	 * @param map containing notification info sent through JSON
	 * 
	 * @param channelId 1-EMAIL/2-INAPP
	 */
	def saveNotification(map, int channel){

		Notification notification = saveAndFlushNotification(map, channel)

		if (notification) {
			def lastId = notification.id

			log.info("Notification - ${lastId} successfully saved")
			notificationAsyncService.notificationReqAsync(lastId)
			lastId
		} else {
			log.error("Received a Null for the notification object of Notification - ${lastId} , that was saved")
		}
	}

	/**
	 * This method is used for testing whether the email configurations provided are correct or not
	 * 
	 * @param emailConfig Object containing the email configurations
	 * 
	 * @return True or False, depending on the connection is successful or not
	 */
	def checkConnection(emailConfig) {

		log.info("In email checkConnection Service method, checkConnection with server - ${emailConfig.server}")
		NotificationUtil.checkEmailConfiguration(emailConfig)
	}


	/**
	 * Save & Flush notification info to Notification table in db
	 * 
	 * @param map containing notification info sent through JSON
	 * 
	 * @param channelId 1-EMAIL/2-INAPP
	 */
	@Transactional
	Notification saveAndFlushNotification(map, int channelId) {

		//Get current logged userId
		Subject subject  = SecurityUtils.subject
		def dataxUserId = subject.principal.userId

		//Generate Json from the map
		def mapAsJson = new ObjectMapper().writeValueAsString(map)
		def jsonSlurper = new JsonSlurper()
		def wholeobject = jsonSlurper.parseText(mapAsJson)
		def notificationAsJson = new ObjectMapper().writeValueAsString(wholeobject[NotificationConstants.JSON_ATTRIBUTE_NOTIFICATION])

		def orgId = wholeobject[NotificationConstants.JSON_ATTRIBUTE_ORG_ID]

		Notification notification=new Notification(
				orgId:orgId,
				channelId:channelId,
				notification:notificationAsJson,
				status:NotificationStatusEnum.NEW.value,
				errorCount:DEFAULT_ERROR_COUNT,
				createdBy:dataxUserId.asType(Long),
				updatedBy:null)

		notificationRepository.saveAndFlush(notification)

	}

	/**
	 * Retrieve All notifications that status is FAIL or DISABLED
	 * @return List<Notification>
	 */
	List<Notification> retrieveFailedDisabledNotifications(){

		notificationRepository.retrieveFailedDisabledNotifications(NotificationStatusEnum.FAIL.value,NotificationStatusEnum.DISABLED.value)
	}

	/**
	 * Call Async methods to process disabled and failed email notifications again
	 * @param json with notification id list
	 */
	void retrySendingEmailNotification(json){

		def idList = json[NotificationConstants.JSON_ATTRIBUTE_ID]

		if((json) && (idList)){

			idList.each {

				//Change the status of the email notification to 'Retrying'
				notificationAsyncService.updateNotificationStatus(NotificationStatusEnum.RETRYING.value,it)

				notificationAsyncService.notificationReqAsync(it)
			}
		}
		else{

			//Retrieve list of FAILED or DISABLED Notifications from DB
			List<Notification> failedNotifications = retrieveFailedDisabledNotifications()

			//Process them again
			failedNotifications.each{

				//Change the status of the email notification to 'Retrying'
				notificationAsyncService.updateNotificationStatus(NotificationStatusEnum.RETRYING.value,it.id)

				//Try again to process the email notification
				notificationAsyncService.notificationProcessorAsync(it)
			}
		}
	}
}

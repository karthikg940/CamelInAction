package com.ffss.datax.notification.service

import org.joda.time.DateTime
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.scheduling.annotation.Async
import org.springframework.stereotype.Service

import com.ffss.datax.common.constants.NotificationStatusEnum
import com.ffss.datax.common.domain.notification.Notification
import com.ffss.datax.notification.delegate.NotificationProcessorFactory
import com.ffss.datax.notification.repository.NotificationRepository

import groovy.util.logging.Log4j

/**
 * Handle Asynchronous methods
 * @author Virtusa|Polaris
 *
 */
@Log4j
@Service('notificationAsyncService')
class NotificationAsyncService {

	@Value('${notification.maxErrorCount:5}')
	int maxErrorCount

	@Autowired
	NotificationRepository notificationRepository

	@Autowired
	NotificationProcessorFactory notificationProcessorFactory

	/**
	 * This method will update a status of a notification with a given id.
	 * @param status that should change to
	 * @param Notification Id that should be updated
	 */
	def updateNotificationStatus(String status,Long id){

		notificationRepository.changeNotificationStatus(status,id)

		//get current date and time and Change updated date and time
		updateUpdatedDateTime(DateTime.now(),id)
	}

	/**
	 * This method will increase Error Count By One of the notification with given id
	 * @param Notification Id that error count should change 
	 */
	def increaseErrorCountByOne(Long id){

		notificationRepository.increaseErrorCountByOne(id)

		//get current date and time and Change updated date and time
		updateUpdatedDateTime(DateTime.now(),id)
	}

	/**
	 * This method will get the current Error Count of the notification with given id
	 * @param Notification Id
	 */
	def getCurrentErrorCount(Long id){

		notificationRepository.getErrorCount(id)
	}

	/**
	 * This method is to get notification data by primary key
	 * @param Notification Id
	 */
	def findNotificationsById(Long Id){

		notificationRepository.findOne(Id)
	}

	/**
	 * This method is for retrieve saved notifications from DB and to process emails or alerts by calling notificationProcessorAsync method
	 * @param Id of the last saved notification 
	 * @param channel Id, either 1 for EMAIL, 2 for INAPP or 3 for INAPP_SHARE
	 */
	@Async('notificationReqExecutor')
	def notificationReqAsync(Long lastId) {

		//retrieve saved notification from db
		Notification notification=findNotificationsById(lastId)

		//calls notificationProcessorAsync to process notifications asynchronously
		notificationProcessorAsync(notification)
	}

	/**
	 * This method calls delegator to process notification
	 * @param notificationObj containing notification info retrieved from Notification table in DB
	 * @param channel, 1-EMAIL/2-INAPP
	 */
	@Async('notificationTaskExecutor')
	void notificationProcessorAsync(Notification notificationObj) {

		try{

			//Change the status of the notification to 'Processing'
			updateNotificationStatus(NotificationStatusEnum.PROCESSING.value,notificationObj.id)
			
			log.info("Notification - ${notificationObj.id} status changed to Processing")
		
			//process notification depending on the channel
			NotificationStatusEnum retEnumVal = notificationProcessorFactory.getContext(notificationObj.channelId,notificationObj.id).processNotification(notificationObj)

			//Change the status of the notification to Any other NotificationStatusEnum other than FAIL
			updateNotificationStatus(retEnumVal.value, notificationObj.id)
			log.info("Notification - ${notificationObj.id} status changed to ${retEnumVal.value}")

		}catch(Exception ex) {

			log.error("Exception occured in Notification - ${notificationObj.id}", ex)

			//Change the status of the notification to 'Fail'
			updateNotificationStatus(NotificationStatusEnum.FAIL.value,notificationObj.id)
			log.info("Notification - ${notificationObj.id} status changed to FAILED")

			//Increase the error count in DB for this notification
			increaseErrorCountByOne(notificationObj.id)

			//Get Error count from DB
			int errCount=getCurrentErrorCount(notificationObj.id)

			//If failed more than maximum error count, No retry
			if(errCount>maxErrorCount) {

				log.info("Exceeds the maximum error count in Notification - ${notificationObj.id} , No retry")
			}else {

				log.info("Notification - ${notificationObj.id} Failed, retrying")
				//retrying
				notificationReqAsync(notificationObj.id)
			}

		}
	}

	/**
	 * Update date time of a notification
	 * @param dateTime
	 * @param id
	 */
	def updateUpdatedDateTime(dateTime,id){
		notificationRepository.changeUpdateTime(dateTime,id)
	}

}

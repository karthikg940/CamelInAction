package com.ffss.datax.notification.service

import org.apache.shiro.SecurityUtils
import org.apache.shiro.subject.Subject
import org.joda.time.DateTime
import org.joda.time.format.DateTimeFormat
import org.joda.time.format.DateTimeFormatter
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

import com.ffss.datax.common.constants.AlertStatusEnum
import com.ffss.datax.common.constants.NotificationStatusEnum
import com.ffss.datax.common.domain.notification.NotificationAlert
import com.ffss.datax.notification.constants.NotificationConstants
import com.ffss.datax.notification.repository.NotificationAlertRepository
import com.ffss.datax.notification.repository.NotificationRepository

import groovy.json.JsonSlurper
import groovy.util.logging.Log4j

/**
 * Perform services related to Inapp Notifications
 * @author Virtusa|Polaris
 *
 */
@Log4j
@Service('alertService')
class AlertService {

	static DateTimeFormatter formatter = DateTimeFormat.forPattern('yyyy-MM-dd HH:mm:ss')

	@Autowired
	NotificationRepository notificationRepository

	@Autowired
	NotificationAlertRepository notificationAlertRepository

	/**
	 * This method is for reading all alert notification data by dataxUser
	 * @param user
	 * @return List<NotificationAlert>
	 */
	def findAlertNotificationsByUser(user){
		notificationAlertRepository.findAllUserNotifications(user)
	}

	/**
	 * This method is for reading all alert notification data by dataxUser.
	 * @param user
	 * @param date
	 * @return List<NotificationAlert>
	 */
	def findAlertByUserAndDate(user,date){

		notificationAlertRepository.findAllUserNotificationsBydate(user,formatter.parseDateTime(date))
	}

	/**
	 * Update date time of a alert notification
	 * @param dateTime
	 * @param id
	 */
	def updateAlertUpdatedDateTimeAndUpdatedBy(dateTime,id,updatedBy){
		notificationAlertRepository.changeUpdateTimeAndUpdatedBy(dateTime,id,updatedBy)
	}

	/**
	 * This method is to change the status of alert notifications.
	 * @param json with alerts ids that status should change the status
	 * @return int status
	 */
	@Transactional
	def changeAlertNotificationStatus(json){

		def idList = json[NotificationConstants.JSON_ATTRIBUTE_ID]
		def status = json[NotificationConstants.JSON_ATTRIBUTE_STATUS]
		def dataxUserId = json[NotificationConstants.JSON_ATTRIBUTE_DATAX_USER]

		if(!dataxUserId){
			//Get current logged userId
			Subject subject  = SecurityUtils.subject
			dataxUserId = subject.principal.userId
		}
		if (validateAlertStatus(status)) {
			idList.each {
				notificationAlertRepository.changeAlertNotificationStatus(status,it)
				log.info('Alert notification status changed in to '+status+' where id is '+it)

				//Change updated date-time and updated user
				updateAlertUpdatedDateTimeAndUpdatedBy(DateTime.now(),it,dataxUserId.asType(Long))
			}
		} else {
			log.info("Notification alert statuses not changed for the following Ids - ${idList}")
		}
	}

	/**
	 * Validate the status with AlertStatusEnum
	 * @param status
	 * @return true/false
	 */
	def validateAlertStatus(status){
		def retVal = false
		try {
			AlertStatusEnum.valueOf(status)
			retVal = true
		} catch (Exception ex) {
			log.error("Invalid status identified, Status value received - ${status}")
		}
		retVal
	}

	/**
	 * This method is to retrieve alerts count for a user with the given user Id and with given status
	 * @param User id
	 * @param status
	 * @return alerts count with the given status
	 */
	def getAlertsCountByUserIdAndStatus(dataxUser,status){
		notificationAlertRepository.getCountByStatusAndUser(dataxUser,status)
	}

	/**
	 * This method is for reading new alert notification data from Notification table.
	 * @param notificationObj which contains alert info retrieved from Notification table
	 * @return NotificationStatusEnum
	 */
	@Transactional
	NotificationStatusEnum saveAlertNotification(notificationObj){

		def jsonSlurper = new JsonSlurper()
		def notificationJsonObject = jsonSlurper.parseText(notificationObj.notification)

		def dataxUserId = notificationObj.createdBy
		Long orgId=notificationObj.orgId
		def channelId=notificationObj.channelId
		def dataxUser=notificationJsonObject.get('to')
		def message=notificationJsonObject.get('message')

		dataxUser.each {
			NotificationAlert notificationAlert=new NotificationAlert(
					orgId:orgId,
					channel_id:channelId,
					datax_receiver:it,
					message:message,
					status:AlertStatusEnum.UNREAD.value,
					createdBy:dataxUserId.asType(Long),
					updatedBy:null)

			notificationAlertRepository.save(notificationAlert)
			log.info(' Notification Alert Saved')
		}

		//Returning SUCCESS, since the execution pointer will not come here in case of an exception
		NotificationStatusEnum.SUCCESS
	}
}

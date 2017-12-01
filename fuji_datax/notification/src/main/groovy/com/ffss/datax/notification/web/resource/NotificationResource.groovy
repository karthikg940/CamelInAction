package com.ffss.datax.notification.web.resource

import org.apache.shiro.SecurityUtils
import org.apache.shiro.subject.Subject
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

import com.ffss.datax.common.constants.AlertStatusEnum
import com.ffss.datax.common.constants.NotificationStatusEnum
import com.ffss.datax.common.domain.notification.Notification
import com.ffss.datax.notification.service.AlertService
import com.ffss.datax.notification.service.NotificationService
import com.ffss.datax.notification.web.transformer.AlertNotificationTransformer


/**
 * Controller with all APIs of notification service.
 * @author Virtusa|Polaris
 */
@RestController
@RequestMapping('/api/notification')
class NotificationResource {


	@Autowired
	NotificationService notificationService

	@Autowired
	AlertNotificationTransformer alertNotificationTransformer

	@Autowired
	AlertService alertService

	/**
	 * API to save notification info to Notification table 
	 * Send if it is a email
	 * Save to notification_alert table if it is a alert
	 * @param map containing notification info taken from json input
	 * @param channel, INAPP/EMAIL
	 */
	@RequestMapping(value = '/{channel}', method = RequestMethod.POST)
	def notificationSave( @RequestBody HashMap<String,Object> map, @PathVariable('channel') int channel) {

		def retVal = notificationService.saveNotification(map,channel)
		if(retVal){
			return NotificationStatusEnum.SUCCESS
		}
	}

	/**
	 * API to retrieve all inapp notifications for a given user Id. If user Id not given, will take the logged user Id
	 * If date is given retrieve alerts that are created after the given date
	 * @param receiver's User Id, This is not compulsory
	 * @return JSON with List<NotificationAlert> and unread alerts count
	 */
	@RequestMapping(value = '/alert', method = RequestMethod.GET)
	def findAlertNotificationsByUser(@RequestParam(value='datax_receiver',required=false) Long dataxUserId, @RequestParam(value='date',required=false) def date ) {

		//If datax_receiver not given get the receiver as logged user
		if(!dataxUserId){

			Subject subject  = SecurityUtils.subject
			dataxUserId = subject.principal.userId.asType(Long)
		}

		if(date){
			//Retrieve all alerts for the dataxUserId which are created after the given date from DB
			def alerts = alertService.findAlertByUserAndDate(dataxUserId,date)

			//Transform the JSON output as required by the front end
			alertNotificationTransformer.transformAlertNotifications(alerts)
		}
		else{

			//Retrieve all alerts for the dataxUserId from DB
			def alerts = alertService.findAlertNotificationsByUser(dataxUserId)

			//Get unread alerts counts from DB
			def unreadCount=alertService.getAlertsCountByUserIdAndStatus(dataxUserId,AlertStatusEnum.UNREAD.value)

			//Transform the JSON output as required by the front end
			alertNotificationTransformer.transform(alerts,unreadCount)
		}

	}

	/**
	 * API to change the status of alert notifications
	 * @param JSON containing alert IDs that should change, and the status it should changed to
	 */
	@RequestMapping(value = '/alert', method = RequestMethod.PUT)
	def changeAlertNotificationStatus( @RequestBody json) {

		//Change the status of alerts to the status given by the JSON input
		alertService.changeAlertNotificationStatus(json)
	}

	/**
	 * API to retrieve list of FAILED or DISABLED Notifications from DB
	 * @return List<Notification> - List of FAILED and DISABLED email notifications
	 */
	@RequestMapping(value = '/email', method = RequestMethod.GET)
	def retrieveFailedDisabledNotifications () {

		//Retrieve list of FAILED or DISABLED Notifications from DB
		List<Notification> failedNotifications = notificationService.retrieveFailedDisabledNotifications()

	}

	/**
	 * API to retry all DISABLED and FAILED Email notifications
	 */
	@RequestMapping(value = '/email', method = RequestMethod.POST)
	def retryFailedDisabledNotifications (@RequestBody json) {

		notificationService.retrySendingEmailNotification(json)

	}

}

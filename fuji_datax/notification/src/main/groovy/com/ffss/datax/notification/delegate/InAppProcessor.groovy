package com.ffss.datax.notification.delegate

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component

import com.ffss.datax.common.constants.NotificationStatusEnum
import com.ffss.datax.notification.service.AlertService

/**
 * Implementation of ChannelDelegator for Inapp Notification
 * @author Virtusa|Polaris
 *
 */
@Component('inAppProcessor')
class InAppProcessor implements ChannelDelegator {

	@Autowired
	AlertService alertService

	/**
	 * Override ChannelDelegator, processNotification method
	 * Process Inapp Notification
	 * @param notificationObj containing alert information
	 * @return The NotificationStatusEnum, either SUCCESS or FAILED
	 */
	@Override
	NotificationStatusEnum processNotification(notificationObj) {
		alertService.saveAlertNotification(notificationObj)
	}
}

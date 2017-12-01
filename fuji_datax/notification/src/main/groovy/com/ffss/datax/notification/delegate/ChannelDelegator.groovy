package com.ffss.datax.notification.delegate

import com.ffss.datax.common.constants.NotificationStatusEnum

/**
 * This will handle notification delegation.
 * @author Virtusa|Polaris
 */
interface ChannelDelegator {

	/**
	 * This method should be used to send the notification for different channels.
	 * @param notificationObj with notification info
	 * @return NotificationStatusEnum either SUCCESS,FAILED or DISABLED
	 */
	NotificationStatusEnum processNotification(Object notificationObj)
}

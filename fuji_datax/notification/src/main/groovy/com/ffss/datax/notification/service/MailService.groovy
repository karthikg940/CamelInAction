package com.ffss.datax.notification.service

import com.ffss.datax.common.constants.NotificationStatusEnum

/**
 * Interface to perform services related to sending emails
 * @author Virtusa|Polaris
 *
 */
interface MailService {

	NotificationStatusEnum sendNotificationEmail(final Object notificationJsonObject, final Object tempObject)
}

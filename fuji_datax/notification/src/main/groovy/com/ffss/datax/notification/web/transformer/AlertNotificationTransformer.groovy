package com.ffss.datax.notification.web.transformer

import org.joda.time.format.DateTimeFormat
import org.joda.time.format.DateTimeFormatter
import org.springframework.stereotype.Component

/**
 * Transform the JSON output
 * @author Virtusa|Polaris
 *
 */
@Component
class AlertNotificationTransformer {

	static DateTimeFormatter formatter = DateTimeFormat.forPattern('yyyy-MM-dd HH:mm:ss')

	/**
	 * Format the JSON including status Count
	 * @param alerts
	 * @param statusCount
	 */
	def transform(alerts,statusCount) {
		[
			unreadAlertsCount:statusCount,
			results:transformAlert(alerts)
		]
	}

	/**
	 * Format the JSON without including status Count
	 * @param alerts
	 * @param statusCount
	 */
	def transformAlertNotifications(alerts){
		[
			results:transformAlert(alerts)
		]
	}

	/**
	 * Format the JSON Output
	 * @param alerts
	 */
	def transformAlert(alerts){

		alerts.collect{
			[orgId:it.orgId,channel_id:it.channel_id,alertId:it.id,datax_receiver:it.datax_receiver,message:it.message,status:it.status,
				created_by:it.createdBy,updated_by:it.updatedBy,createdDateTime:formatter.print(it.createdDateTime),
				updatedDateTime:formatter.print(it.updatedDateTime)]
		}
	}
}

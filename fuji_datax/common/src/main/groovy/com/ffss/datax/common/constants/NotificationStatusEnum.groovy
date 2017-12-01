package com.ffss.datax.common.constants

/**
 * Different notification status.
 *
 * @author Virtusa|Polaris.
 *
 */
enum NotificationStatusEnum {

	NEW('NEW'),
	PROCESSING('PROCESSING'),
	DELETED('DELETED'),
	FAIL('FAILED'),
	SUCCESS('SUCCESS'),
	DISABLED('DISABLED'),
	RETRYING('RETRYING')
	
	String value

	private NotificationStatusEnum(String value) {
		this.value = value
	}
}

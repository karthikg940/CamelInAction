package com.ffss.datax.common.constants

enum NotificationEventEnum {
	USERCREATION(100L),
	PASSWORDGENERATION(101L),
	RESETPASSWORD(102L)

	long value

	NotificationEventEnum(value) {
		this.value = value
	}
}

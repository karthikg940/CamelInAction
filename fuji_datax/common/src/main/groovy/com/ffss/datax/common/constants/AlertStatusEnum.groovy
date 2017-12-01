package com.ffss.datax.common.constants

/**
 * Different alert status.
 *
 * @author Virtusa|Polaris.
 *
 */
enum AlertStatusEnum {

	READ('READ'),
	UNREAD('UNREAD')
	
	String value

	private AlertStatusEnum(String value) {
		this.value = value
	}
}

package com.ffss.datax.common.constants

/**
 * Different Entity.
 *
 * @author Virtusa|Polaris.
 *
 */
enum EntityEnum {

	STUDY('Study'),
	USERGROUP('UserGroup'),
	USERACCOUNT('UserAccount'),
	WORKSHEET('Worksheet')
	
	String value

	private EntityEnum(String value) {
		this.value = value
	}
}

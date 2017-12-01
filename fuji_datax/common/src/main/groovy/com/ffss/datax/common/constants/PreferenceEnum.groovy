package com.ffss.datax.common.constants

enum PreferenceEnum {

	POCQA(101L),
	POCAttending(102L),
	POCQAAttending(103L),
	QAAttending(104L)

	long value

	PreferenceEnum(value) {
		this.value = value
	}
	static boolean isQaEnable(preference){
		preference.qaEnabled==true && preference.attestationEnabled == false
	}
	static boolean isAttendingEnable(preference){
		preference.attestationEnabled == true && preference.qaEnabled==false
	}
	static boolean isQaAttendingEnable(preference){
		preference.qaEnabled==true && preference.attestationEnabled == true
	}
}

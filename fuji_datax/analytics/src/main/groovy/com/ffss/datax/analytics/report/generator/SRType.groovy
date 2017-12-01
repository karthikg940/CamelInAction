package com.ffss.datax.analytics.report.generator

enum SRType {

	Device('DeviceBased'),
	Template('TemplateBased'),
	Sop('SopTypeBased')

	String value

	SRType(value){
		this.value = value
	}
}

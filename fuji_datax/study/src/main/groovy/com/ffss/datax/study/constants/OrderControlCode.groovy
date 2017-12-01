package com.ffss.datax.study.constants

enum OrderControlCode {

	NW('NEW'),
	CA('CANCEL'),
	OK("ORDERACCEPTED")


	def value

	OrderControlCode(value){
		this.value=value
	}
	
}

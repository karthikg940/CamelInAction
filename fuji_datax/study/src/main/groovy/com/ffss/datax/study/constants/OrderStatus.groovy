package com.ffss.datax.study.constants

enum OrderStatus {

	NONORDERED('No order for study'),
	MISMATCH('Order mismatch for study'),
	VALID("Valid")


	def value

	OrderStatus(value){
		this.value=value
	}
}

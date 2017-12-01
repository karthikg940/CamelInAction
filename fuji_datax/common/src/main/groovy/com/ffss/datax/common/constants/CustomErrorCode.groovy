package com.ffss.datax.common.constants

enum CustomErrorCode {

	ER_404('No record found '),
	ER_201('Record created for '),
	ER_200('Success'),
	ER_401('The request not authorized'),
	ER_400('The request not acceptable'),
	ER_204('The request processed successfully '),
	ER_403('You dont have permission to access / on this server ')
	
	def value
	
	CustomErrorCode(value) {
		this.value = value
	}
}
 
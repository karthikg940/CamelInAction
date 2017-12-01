package com.ffss.datax.auth.test.login

class LockUserTestData {

	static def lockStatus = [lock:'Y']
	static def userName = ['johnw']
	static def pwd = ['qwerty']
	
	static def password = ['johny123']
	
	static  def expectedStatus = [403]

	static def passwordReset = [passwordReset:true]
	static def passwordReset1 = [passwordReset:false]
	
}





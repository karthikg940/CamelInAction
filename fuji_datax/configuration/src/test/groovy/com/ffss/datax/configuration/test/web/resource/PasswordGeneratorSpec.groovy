package com.ffss.datax.configuration.test.web.resource

import spock.lang.Specification

import com.ffss.datax.configuration.service.PasswordGenerator


class PasswordGeneratorSpec extends Specification{

	PasswordGenerator passwordGenerator = new PasswordGenerator()

	def 'generate a password'(min, max){

		given:'we have new user'
		when:' we want to genetrate a random pwd'
		String pwd=passwordGenerator.generatePassword(min,max)
		then:'generated password is'
		assert pwd.length() >=min
		assert pwd.length() <=max
		assert isValid(pwd)
		where:
		min<<[8, 19, 21, 3]
		max <<[11, 20, 30, 4]
	}
	def isValid (pwd) {
		pwd.find(/[a-z]/) && pwd.find(/[A-Z]/) && pwd.find(/\d/) && pwd.find(/[`~!@#$%^&amp;*-+=|.,:;?<>'"]/)
	}
}

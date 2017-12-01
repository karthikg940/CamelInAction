package com.ffss.datax.auth.test.login

import com.ffss.datax.auth.service.PasswordGenerator
import spock.lang.Specification


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
		min<<[8, 20, 21, 4]
		max <<[11, 20, 30, 4]
	}
	def isValid (pwd) {
		return pwd.find(/[a-z]/) && pwd.find(/[A-Z]/) && pwd.find(/\d/) && pwd.find(/[~!@$#%^*&;?.+_]/)
	}
}

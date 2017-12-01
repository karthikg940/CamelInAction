package com.ffss.datax.auth.service

import java.security.SecureRandom

import org.springframework.stereotype.Service

/**
 * 
 * @author Virtusa|Polaris
 *
 */
@Service
class PasswordGenerator {

	static lowerCase = ('a'..'z').collect{it}
	static upperCase = ('A'..'Z').collect{it}
	static numbers = (0..9).collect{it}
	static specialChars = [
		'@',
		'$',
		'^',
		'&',
		'~',
		'!',
		'#',
		'%',
		'*',
		';' ,
		'?',
		'.',
		'+',
		'_'
	]
	static pwdChoices = [lowerCase, upperCase, numbers, specialChars]

	/**
	 * Generates a password.
	 *Actually uses valid min and max before passing.
	 * 
	 * @param min int - The minimum length of the password.
	 * @param max int - The maximum length of the password.
	 * @return a pseudo random password.
	 */
	def generatePassword(min,max) {
		Random rd = new SecureRandom()
		def pwd = []
		pwdChoices.each{
			pwd.add(it[rd.nextInt(it.size())])
		}

		def diff = max-min
		def pwdLen = (diff?rd.nextInt(diff):0) + min
		while (pwd.size() < pwdLen) {
			def pwdChoice = pwdChoices[rd.nextInt(pwdChoices.size())]
			pwd.add(pwdChoice[rd.nextInt(pwdChoice.size())])
		}
		Collections.shuffle(pwd,new SecureRandom())
		pwd.join('').toString()
	}
}

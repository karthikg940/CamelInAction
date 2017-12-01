package com.ffss.datax.configuration.service

import java.security.SecureRandom

import org.springframework.stereotype.Service

/**
 * class for generation of password using a secureRandom algorithm
 * provided the minimum and maximum length of the password
 * @author Virtusa|Polaris
 *
 */
@Service
class PasswordGenerator {

	static lowerCase = ('a'..'z').collect{it}
	static upperCase = ('A'..'Z').collect{it}
	static numbers = (0..9).collect{it}
	static specialChars = [
		'`',
		'~',
		'!',
		'@',
		'#',
		'$',
		'%',
		'^',
		'&',
		'*',
		'-',
		'+',
		'=',
		'.',
		'|',
		',',
		':',
		';' ,
		'?',
		'<',
		'"',
		"'"
	]
	static pwdChoices = [lowerCase, upperCase, numbers, specialChars]

	/**
	 * Uses a secureRandom algorithm to generate a password with 
	 *   minimum of one character specified in the pwdChoicesList provided the
	 *   minimum and maximum length of the password.
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
		//checking whether the passwordGenerated is less than the specified maximum length
		def diff = max-min
		//If passwordGenerated is less than the specified maximum length then again iteration happens for passwordAppend
		def pwdLen = (diff?rd.nextInt(diff):0) + min
		
		while (pwd.size() < pwdLen) {
			def pwdChoice = pwdChoices[rd.nextInt(pwdChoices.size())]
			pwd.add(pwdChoice[rd.nextInt(pwdChoice.size())])
		}
		Collections.shuffle(pwd,new SecureRandom())
		pwd.join('').toString()
	}
}

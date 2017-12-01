package com.ffss.datax.security.config

import org.apache.shiro.authc.AuthenticationException

/**
 * Custom authentication exception class
 * 
 * @author Virtusa|Polaris
 *
 */
class CustomAuthenticationException extends AuthenticationException {
	CustomAuthenticationException() {
		super('Invalid Authorization')
	}
}

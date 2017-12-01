package com.ffss.datax.auth.config

import groovy.util.logging.*

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.crypto.password.PasswordEncoder

/**
 *
 *
 * @author Virtusa|Polaris
 * 
 */
@Configuration
class BeanConfig 
{

	@Bean
	PasswordEncoder passwordEncoder()
	{  
		new BCryptPasswordEncoder()
	}
}

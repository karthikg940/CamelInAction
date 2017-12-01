package com.ffss.datax.study.config

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.web.client.RestTemplate

@Configuration
class ServiceConfiguration {

	@Bean
	RestTemplate restTemplate(){
		new RestTemplate()
	}
}

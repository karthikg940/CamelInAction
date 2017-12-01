package com.ffss.datax.integrationsystem

import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.autoconfigure.domain.EntityScan
import org.springframework.context.annotation.ComponentScan
import org.springframework.data.jpa.repository.config.EnableJpaRepositories

@SpringBootApplication
@ComponentScan(basePackages='com.ffss.datax.*')
@EntityScan(basePackages='com.ffss.datax.*')
@EnableJpaRepositories(basePackages = 'com.ffss.datax.*')
class IntegrationsystemApplication {

	static void main(String[] args) {
		SpringApplication.run IntegrationsystemApplication, args
	}
}

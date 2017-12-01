package com.ffss.datax.auditlog

import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.autoconfigure.domain.EntityScan
import org.springframework.cloud.netflix.feign.EnableFeignClients
import org.springframework.context.annotation.ComponentScan
import org.springframework.data.jpa.repository.config.EnableJpaRepositories

@SpringBootApplication
@ComponentScan(basePackages = 'com.ffss.datax')
@EntityScan(basePackages='com.ffss.datax.common.domain')
@EnableFeignClients(basePackages='com.ffss.datax')
@EnableJpaRepositories(basePackages = 'com.ffss.datax.*')
class AuditLogApplication {
	static void main (String[] args){
		SpringApplication.run AuditLogApplication, args
	}
}

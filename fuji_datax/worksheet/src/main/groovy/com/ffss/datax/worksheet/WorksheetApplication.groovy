package com.ffss.datax.worksheet

import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.autoconfigure.domain.EntityScan
import org.springframework.cloud.client.discovery.EnableDiscoveryClient
import org.springframework.cloud.netflix.feign.EnableFeignClients
import org.springframework.context.annotation.ComponentScan
import org.springframework.data.jpa.repository.config.EnableJpaRepositories

/**
 * @author Virtusa|Polaris
 */

@SpringBootApplication
@ComponentScan(basePackages='com.ffss.datax')
@EntityScan(basePackages='com.ffss.datax.common.domain')
@EnableDiscoveryClient
@EnableFeignClients(basePackages='com.ffss.datax')
@EnableJpaRepositories(basePackages = 'com.ffss.datax.*')
class WorksheetApplication {

	static void main(String[] args) {
	
		SpringApplication.run WorksheetApplication, args
	}
}

package com.ffss.datax.analytics

import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.autoconfigure.domain.EntityScan
import org.springframework.context.annotation.ComponentScan
import org.springframework.data.jpa.repository.config.EnableJpaRepositories

import com.ffss.datax.analytics.AnalyticsApplication

/**
 * 
 * @author Virtusa|Polaris
 */
@SpringBootApplication
@ComponentScan(basePackages = 'com.ffss.datax')
@EntityScan(basePackages = 'com.ffss.datax.common.domain')
@EnableJpaRepositories(basePackages = 'com.ffss.datax.*')
class AnalyticsApplication 
{
	static void main(String[] args){
		SpringApplication.run AnalyticsApplication, args
	}
}


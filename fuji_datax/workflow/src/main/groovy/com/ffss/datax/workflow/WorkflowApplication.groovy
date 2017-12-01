package com.ffss.datax.workflow

import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.autoconfigure.domain.EntityScan
import org.springframework.context.annotation.ComponentScan
import org.springframework.data.jpa.repository.config.EnableJpaRepositories

/**
 *
 * @author Virtusa|Polaris
 * 
 */
@SpringBootApplication
@ComponentScan(basePackages = 'com.ffss.datax')
@EntityScan(basePackages='com.ffss.datax.common.domain')
@EnableJpaRepositories(basePackages = 'com.ffss.datax.*')
class WorkflowApplication 
{
	
	static void main(String[] args) 
	{
		SpringApplication.run WorkflowApplication, args
	}
}


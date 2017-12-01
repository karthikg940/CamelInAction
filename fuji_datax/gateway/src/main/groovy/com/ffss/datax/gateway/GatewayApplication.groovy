package com.ffss.datax.gateway

import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.cloud.client.discovery.EnableDiscoveryClient
import org.springframework.cloud.netflix.feign.EnableFeignClients
import org.springframework.cloud.netflix.zuul.EnableZuulProxy
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.ComponentScan

import com.ffss.datax.gateway.filter.RoutingFilter

/**
 * The Class GatewayApplication.
 */
@SpringBootApplication
@EnableZuulProxy
@EnableDiscoveryClient
@EnableFeignClients(basePackages='com.ffss.datax')
@ComponentScan(basePackages='com.ffss.datax')
class GatewayApplication 
{

	/**
	 * The main method.
	 *
	 * @param args the arguments
	 */
	static void main(String[] args) 
	{
		SpringApplication.run GatewayApplication, args
	}
	@Bean
	public RoutingFilter routingFilter() {
	  return new RoutingFilter();
	}
}

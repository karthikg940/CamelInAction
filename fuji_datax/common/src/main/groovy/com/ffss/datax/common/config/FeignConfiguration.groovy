package com.ffss.datax.common.config

import org.springframework.cloud.netflix.feign.EnableFeignClients
import org.springframework.context.annotation.Configuration

@Configuration
@EnableFeignClients(basePackages='com.ffss.datax')
class FeignConfiguration {
	

}

package com.ffss.datax.gateway.service

import org.springframework.cloud.netflix.feign.FeignClient
import org.springframework.web.bind.annotation.RequestHeader
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.ResponseBody

/**
 * Feign client for Authentication service calls
 * 
 * @author Virtusa|Polaris
 */


@FeignClient("http://configuration")
interface SystemConfigurationService {

	@RequestMapping(value='api/config/passwordpolicy', method=RequestMethod.GET)
	@ResponseBody def findPasswordConfigurationPolicy(@RequestHeader('Authorization') token)
}

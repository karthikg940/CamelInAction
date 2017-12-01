package com.ffss.datax.configuration.service.feign

import org.springframework.cloud.netflix.feign.FeignClient
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestHeader
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.ResponseBody

/**
 *
 * Feign client for Notification service calls
 *
 * @author Virtusa|Polaris
 */

@FeignClient('http://notification')
interface NotificationService {
	@RequestMapping(value='/api/internal/notification/checkConnection',method=RequestMethod.POST, produces = 'application/json; charset=UTF-8', consumes = 'application/json')
	@ResponseBody def checkConnection(@RequestBody request,@RequestHeader('Authorization') token)
}

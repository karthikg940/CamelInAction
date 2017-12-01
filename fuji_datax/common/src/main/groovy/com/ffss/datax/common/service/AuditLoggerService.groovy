package com.ffss.datax.common.service

import org.springframework.cloud.netflix.feign.FeignClient
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestHeader
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.ResponseBody

/**
 * 
 * @author Virtusa|Polaris
 *
 */

@FeignClient('http://auditlog')
interface AuditLoggerService 
{	@RequestMapping(value='/api/auditlog',method=RequestMethod.POST)
	@ResponseBody def auditLogger(@RequestBody content, @RequestParam('eventCode') long eventCode, @RequestParam('microServiceName') microServiceName, @RequestParam('entityName') entityName,@RequestHeader('Authorization') token)
	
}

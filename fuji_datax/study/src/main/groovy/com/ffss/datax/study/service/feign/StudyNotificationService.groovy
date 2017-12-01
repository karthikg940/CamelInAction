package com.ffss.datax.study.service.feign

import org.springframework.cloud.netflix.feign.FeignClient
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestHeader
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.ResponseBody

/**
 *
 * Feign client for Alertnotification
 *
 * @author VirtusaPolaris
 */

@FeignClient('http://notification')
interface StudyNotificationService {
	
	@RequestMapping(value='/api/notification/{channel}',method=RequestMethod.POST)
	@ResponseBody def notificationSave(@PathVariable('channel') Integer id,@RequestBody request,@RequestHeader('Authorization') token)

}

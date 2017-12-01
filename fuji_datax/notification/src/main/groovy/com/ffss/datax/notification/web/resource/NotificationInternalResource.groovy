package com.ffss.datax.notification.web.resource

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.ResponseBody
import org.springframework.web.bind.annotation.RestController

import com.ffss.datax.notification.service.NotificationService

import groovy.util.logging.Log4j

/**
 * Notification controller class containing APIs to be consumed by other microservices for intra microservice invocations
 * 
 * @author Virtusa|Polaris
 */
@RestController
@RequestMapping('/api/internal/notification')
@Log4j
class NotificationInternalResource {

	@Autowired
	NotificationService notificationService

	/**
	 * API to test email configurations.
	 * 
	 * @param emailConfig object containing email configurations
	 * 
	 * @return a JSON object with the connection status of Success or Failed
	 */
	@RequestMapping(value='/checkConnection', method=RequestMethod.POST)
	@ResponseBody
	def emailCheckConnection(@RequestBody emailConfig) {
		log.info("Request received to perform a email test connectionl for server - ${emailConfig.server}")

		"""{"connectionSuccess": ${notificationService.checkConnection(emailConfig)}}"""
	}
}

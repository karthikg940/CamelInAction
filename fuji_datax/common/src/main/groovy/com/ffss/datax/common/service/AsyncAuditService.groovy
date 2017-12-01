package com.ffss.datax.common.service

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.scheduling.annotation.Async
import org.springframework.scheduling.annotation.EnableAsync
import org.springframework.stereotype.Service


/**
 *
 * @author Virtusa|Polaris
 *
 */

@Service
@EnableAsync
class AsyncAuditService {
	
	@Autowired
	AuditLoggerService auditLoggerService

	
	@Async
	def auditLogger(content, eventCode, microServiceName,entityName, token){
		auditLoggerService.auditLogger(content, eventCode, microServiceName,entityName,token)
	}

}

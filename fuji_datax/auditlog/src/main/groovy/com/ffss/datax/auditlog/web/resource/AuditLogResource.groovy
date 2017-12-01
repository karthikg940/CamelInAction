package com.ffss.datax.auditlog.web.resource

import groovy.util.logging.*

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

import com.ffss.datax.auditlog.service.AuditLogService
import com.ffss.datax.common.constants.CustomErrorCode

/**
 *Auditlog Controller
 *
 * 
 * @author Virtusa|Polaris
 */
@RestController
@RequestMapping('/api/auditlog')
class AuditLogResource 
{
	
	@Autowired
	AuditLogService auditLogService

	
	@RequestMapping(value='' ,method = RequestMethod.POST)
	def auditLogger(@RequestBody content, @RequestParam('eventCode') long eventCode, @RequestParam('microServiceName') microServiceName,@RequestParam('entityName') entityName) 
	{
		auditLogService.saveAudit(content,eventCode, microServiceName,entityName)?ResponseEntity.ok().build():new ResponseEntity(CustomErrorCode.ER_400.value, HttpStatus.BAD_REQUEST)
		
	}
}

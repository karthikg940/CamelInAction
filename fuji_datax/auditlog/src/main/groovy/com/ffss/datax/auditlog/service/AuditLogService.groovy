package com.ffss.datax.auditlog.service

//import net.minidev.json.JSONValue

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

import com.ffss.datax.auditlog.repository.AuditEventRepository
import com.ffss.datax.auditlog.repository.AuditEventTypeRepository
import com.ffss.datax.common.constants.Constants
import com.ffss.datax.common.domain.audit.AuditEvent
import com.ffss.datax.common.domain.audit.AuditEventType
import com.ffss.datax.security.util.SecurityUtil

/**
 * 
 * Audit log service class
 * @author Virtusa|Polaris
 *
 */

@Service
class AuditLogService
{

	/**Audit event type repository **/
	@Autowired
	AuditEventTypeRepository auditEventTypeRepository

	/**Audit event repository **/
	@Autowired
	AuditEventRepository auditEventRepository


	/**
	 * Save the audit log for the micro services
	 * @param content
	 * @param eventCode
	 * @param microServiceName
	 * @param entityName
	 * @return audit event data
	 */
	def saveAudit(content,eventCode, microServiceName,entityName){
		
		def userId = SecurityUtil.retrieveUserId()
		AuditEventType auditEventType = auditEventTypeRepository.findByEventCode(eventCode)

		def objPrev
		def objCurrent

		objPrev = content[Constants.PREVIOUS]


		objCurrent = content[Constants.NEW]

		auditEventRepository.save(new AuditEvent(eventPrevValue:objPrev, 
												 eventCurrValue: objCurrent, 
												 auditEventType:auditEventType, 
												 microserviceName: microServiceName,
												 entityName:entityName,
												 createdBy:userId,
												 updatedBy:userId))

	}

}

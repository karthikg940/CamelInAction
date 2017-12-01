package com.ffss.datax.auditlog.repository


import org.springframework.data.jpa.repository.JpaRepository

import com.ffss.datax.common.domain.audit.AuditEventType

/**
 *
 *
 *@author Virtusa|Polaris
 */
interface AuditEventTypeRepository extends JpaRepository<AuditEventType, Long>{
	
	AuditEventType findByEventCode(long eventCode)
}



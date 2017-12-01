package com.ffss.datax.auditlog.repository


import org.springframework.data.jpa.repository.JpaRepository

import com.ffss.datax.common.domain.audit.AuditEvent

/**
 *
 *
 *@author Virtusa|Polaris
 */
interface AuditEventRepository extends JpaRepository<AuditEvent, Long>{
	
}



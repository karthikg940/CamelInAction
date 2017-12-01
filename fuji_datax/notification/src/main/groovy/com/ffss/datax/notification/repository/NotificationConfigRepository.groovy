package com.ffss.datax.notification.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param

import com.ffss.datax.common.domain.configuration.EmailConfig

/**
 * JPA Repository class configured for Email Configuration domain object
 * 
 * @author Virtusa|Polaris
 */
interface NotificationConfigRepository extends JpaRepository<EmailConfig, Long>{

	@Query('select e from EmailConfig e where e.orgId=:orgId')
	EmailConfig findByOrgId(@Param('orgId') orgId)
}

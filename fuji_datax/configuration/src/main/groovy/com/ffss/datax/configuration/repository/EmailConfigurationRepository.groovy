package com.ffss.datax.configuration.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import org.springframework.stereotype.Repository

import com.ffss.datax.common.domain.configuration.EmailConfig

@Repository
interface EmailConfigurationRepository extends JpaRepository<EmailConfig, Long> {

	/**
	 * retrieve email configurations by orgId
	 * @param orgId
	 * @return EmailConfig
	 */
	@Query('From EmailConfig ec where ec.orgId=:orgId')
	EmailConfig findByOrgId(@Param('orgId') Long orgId)
}

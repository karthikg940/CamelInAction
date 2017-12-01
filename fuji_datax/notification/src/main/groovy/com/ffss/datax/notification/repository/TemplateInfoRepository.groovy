package com.ffss.datax.notification.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param

import com.ffss.datax.common.domain.notification.TemplateInfo

interface TemplateInfoRepository extends JpaRepository<TemplateInfo, Long> {

	/**
	 * Get template by the template Name
	 * @param tempName
	 * @param orgId
	 * @return TemplateInfo
	 */
	@Query('select tempInfo from TemplateInfo tempInfo where tempInfo.tempName=:tempName and tempInfo.orgId=:orgId')
	TemplateInfo findTemplate(@Param('tempName') String tempName,@Param('orgId') Long orgId)
}

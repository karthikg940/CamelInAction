package com.ffss.datax.study.repository

import org.springframework.data.jpa.repository.JpaRepository

import com.ffss.datax.common.domain.worksheet.WorksheetTemplate

/**
 * The Interface WorksheetTemplateRepository.
 * 
 * @author Virtusa|Polaris
 */
interface WorksheetTemplateRepository extends JpaRepository<WorksheetTemplate, Long> {
	
}


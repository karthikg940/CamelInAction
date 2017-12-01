package com.ffss.datax.analytics.repository

import org.springframework.data.jpa.repository.JpaRepository

import com.ffss.datax.common.domain.worksheet.Worksheet

/**
 * The Interface WorksheetRepository.
 * 
 * @author Virtusa|Polaris
 */
interface WorksheetRepository extends JpaRepository<Worksheet, Long> {
	
}
package com.ffss.datax.configuration.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query

import com.ffss.datax.common.domain.worksheet.WorksheetTemplate

interface WorksheetTemplateRepository extends JpaRepository<WorksheetTemplate, Long> {

	@Query("select e from WorksheetTemplate e where e.type in('Procedural','Others')")
	List<WorksheetTemplate> findProceduralTypes()
}

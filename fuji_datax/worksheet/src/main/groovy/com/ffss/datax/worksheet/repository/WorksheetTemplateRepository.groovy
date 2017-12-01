package com.ffss.datax.worksheet.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query

import com.ffss.datax.common.domain.worksheet.WorksheetTemplate

/**
 * The Interface WorksheetTemplateRepository.
 */
interface WorksheetTemplateRepository extends JpaRepository<WorksheetTemplate, Long> {
	
	/**
	 * Search procedural exam type.
	 *
	 * @return the list
	 */
	@Query("select distinct e from WorksheetTemplate e join fetch e.examTypeMap em where e.type in('Procedural') and em.deleted = 'N'")
	List<WorksheetTemplate> findProceduralWorksheetTemplate()
}

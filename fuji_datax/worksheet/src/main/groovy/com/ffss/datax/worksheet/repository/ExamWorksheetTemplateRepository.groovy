package com.ffss.datax.worksheet.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query

import com.ffss.datax.common.domain.worksheet.ExamWorksheetTemplate

/**
 * The Interface ExamWorksheetTemplateRepository.
 */
interface ExamWorksheetTemplateRepository extends JpaRepository<ExamWorksheetTemplate, Long> {

	/**
	 * Search QA exam type.
	 *
	 * @return the list
	 */
	@Query("from ExamWorksheetTemplate ewt join fetch ewt.worksheetTemplate e join fetch ewt.examTypeMap em where e.type in('QaFlow')")
	List<ExamWorksheetTemplate> findQAExamWorksheetTemplate()
	
	List<ExamWorksheetTemplate> findByExamTypeMapExamTypeDesc(String examTypeName)
}



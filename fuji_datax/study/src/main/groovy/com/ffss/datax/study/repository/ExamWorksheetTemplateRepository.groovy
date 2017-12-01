package com.ffss.datax.study.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param

import com.ffss.datax.common.domain.worksheet.ExamWorksheetTemplate


/**
 * The Interface ExamWorksheetTemplateRepository.
 * @author Virtusa|Polaris
 */
interface ExamWorksheetTemplateRepository extends JpaRepository<ExamWorksheetTemplate, Long> {

	/**
	 * Find exam worksheet template by template name.
	 *
	 * @param templateName the template name
	 * @return the list
	 */
	@Query('from ExamWorksheetTemplate ewt join fetch ewt.worksheetTemplate e join fetch ewt.examTypeMap em where e.templateName=:templateName')
	List<ExamWorksheetTemplate> findExamWorksheetTemplateByTemplateName(@Param ('templateName') String templateName)
}



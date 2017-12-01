package com.ffss.datax.study.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param

import com.ffss.datax.common.domain.configuration.ExamTypeMap


/**
 * The Interface ExamTypeMapRepository.
 * @author Virtusa|Polaris
 */
interface ExamTypeMapRepository extends JpaRepository<ExamTypeMap, Long> {


	/**
	 * Find exam types by template name.
	 *
	 * @param templateName the template name
	 * @return the list
	 */
	@Query('select e from ExamTypeMap e join fetch e.examWorksheetTemplate em join fetch em.worksheetTemplate ew where ew.templateName=:templateName ')
	List<ExamTypeMap> findExamTypesByTemplateName(@Param ('templateName') String templateName)

	/**
	 * Find by exam type name.
	 *
	 * @param examTypeName the exam type name
	 * @return the exam type map
	 */
	@Query('select e from ExamTypeMap e where e.examTypeDesc =:examTypeName ')
	ExamTypeMap findByExamTypeName(@Param ('examTypeName') String examTypeName)
}



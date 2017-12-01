package com.ffss.datax.configuration.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query

import com.ffss.datax.common.domain.worksheet.ExamWorksheetTemplate

interface ExamWorksheetTemplateRepository extends JpaRepository<ExamWorksheetTemplate, Long> {

	@Query("from ExamWorksheetTemplate ewt join fetch ewt.worksheetTemplate e join fetch ewt.examTypeMap em where e.type in('Procedural') and em.deleted = 'N'")
	List<ExamWorksheetTemplate> searchProceduralExamType()
}



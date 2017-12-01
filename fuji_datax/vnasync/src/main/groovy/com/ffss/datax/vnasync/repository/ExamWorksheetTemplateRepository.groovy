package com.ffss.datax.vnasync.repository

import com.ffss.datax.common.domain.worksheet.ExamWorksheetTemplate
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository;

@Repository
interface ExamWorksheetTemplateRepository extends JpaRepository<ExamWorksheetTemplate,Long>{

	List<ExamWorksheetTemplate> findByExamTypeMapExamTypeDesc(String examTypeName)
}

package com.ffss.datax.study.repository;

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param

import com.ffss.datax.common.domain.worksheet.Worksheet

public interface WorksheetRepository extends JpaRepository<Worksheet, Long> {
	@Query('select w from Worksheet w join fetch w.study s join fetch w.template  where s.id=:studyId and w.examWorksheetType=:type')
	Worksheet findWorksheetByStudyAndType(@Param('studyId') studyId,@Param('type') type)
}

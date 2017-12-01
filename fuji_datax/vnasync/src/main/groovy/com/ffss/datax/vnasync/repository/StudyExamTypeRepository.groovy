package com.ffss.datax.vnasync.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import org.springframework.stereotype.Repository

import com.ffss.datax.common.domain.study.StudyExamTypeMap
@Repository
interface StudyExamTypeRepository extends JpaRepository<StudyExamTypeMap,Long>{

	@Query('select s from StudyExamTypeMap s join fetch s.study se where se.id=:id')
	StudyExamTypeMap findStudyExamTypeByStudyId(@Param('id') id)
}

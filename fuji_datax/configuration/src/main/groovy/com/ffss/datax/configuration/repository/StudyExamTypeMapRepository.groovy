package com.ffss.datax.configuration.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param

import com.ffss.datax.common.domain.study.StudyExamTypeMap


interface StudyExamTypeMapRepository  extends JpaRepository<StudyExamTypeMap, Long> {

	@Query('select sem from StudyExamTypeMap sem join fetch sem.examTypeMap etm where etm.id=:id')
	StudyExamTypeMap findAssociatedExamType(@Param('id') Long id)
}

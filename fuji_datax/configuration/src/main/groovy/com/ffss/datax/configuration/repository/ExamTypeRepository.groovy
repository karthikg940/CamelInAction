package com.ffss.datax.configuration.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param

import com.ffss.datax.common.domain.configuration.ExamTypeMap


 interface ExamTypeRepository extends JpaRepository<ExamTypeMap, Long> {

	@Query("select et from ExamTypeMap et where deleted='N'")
	List<ExamTypeMap> findPresentExamType()
	
	@Query("select s from ExamTypeMap s where  deleted='N' and examTypeDesc=:examtypeName")
	ExamTypeMap findByexamtypeName(@Param('examtypeName') String examtypeName)
}



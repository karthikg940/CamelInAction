package com.ffss.datax.vnasync.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository;

import com.ffss.datax.common.domain.configuration.ExamTypeMap

@Repository
interface ExamTypeRepository extends JpaRepository<ExamTypeMap, Long> {

	ExamTypeMap findByExamTypeDescIgnoreCase(String examTypeName)
}

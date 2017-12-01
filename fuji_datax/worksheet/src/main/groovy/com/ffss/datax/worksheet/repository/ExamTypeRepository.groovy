package com.ffss.datax.worksheet.repository

import org.springframework.data.jpa.repository.JpaRepository

import com.ffss.datax.common.domain.study.ExamType

/**
 * The Interface ExamTypeRepository.
 */
interface ExamTypeRepository extends JpaRepository<ExamType, Long> {

}

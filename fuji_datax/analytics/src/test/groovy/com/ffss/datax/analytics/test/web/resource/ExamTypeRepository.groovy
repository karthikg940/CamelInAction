package com.ffss.datax.analytics.test.web.resource

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param

import com.ffss.datax.common.domain.study.ExamType


/**
 * The Interface ExamTypeRepository.
 * @author Virtusa|Polaris
 */
interface ExamTypeRepository extends JpaRepository<ExamType, Long> {

	/**
	 * Find exam type by series id.
	 *
	 * @param seriesId the series id
	 * @return the exam type
	 */
	@Query('select s from ExamType s join fetch s.series join fetch s.examTypeMap where s.series.id=:seriesId')
	ExamType findExamTypeBySeriesId(@Param ('seriesId') Long seriesId)
}



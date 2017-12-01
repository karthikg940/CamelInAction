package com.ffss.datax.analytics.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param

import com.ffss.datax.common.domain.study.PatientWorklist

/**
 * The Interface PatientWorkListRepository.
 */
interface PatientWorkListRepository  extends JpaRepository<PatientWorklist, Long> {

	/**
	 * Gets the patient work list.
	 *
	 * @param id the id
	 * @return the patient work list
	 */
	@Query('select wrklist from PatientWorklist wrklist where wrklist.patient.id=:id')
	PatientWorklist getPatientWorkList(@Param('id') Long id)
}

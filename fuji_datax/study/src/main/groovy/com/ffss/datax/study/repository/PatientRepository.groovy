package com.ffss.datax.study.repository

import org.springframework.data.jpa.repository.JpaRepository

import com.ffss.datax.common.domain.study.Patient

/**
 * The Interface PatientRepository.
 * 
 * @author Virtusa|Polaris
 */
interface PatientRepository extends JpaRepository<Patient, Long> {
	
}
 package com.ffss.datax.study.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query

import com.ffss.datax.common.domain.study.StudyLookup



/**
 * The Interface StudyLookupRepository.
 * @author Virtusa|Polaris
 */
interface StudyLookupRepository extends JpaRepository<StudyLookup, Long> {
	
	/**
	 * Status list.
	 *
	 * @return the list
	 */
	@Query("select s from StudyLookup s where s.name in('New','Assigned','Pending','Signed','QAUnassigned','QAAssigned','QAInProgress','SubmittedForAttestation')")
	List <StudyLookup> findStatusByName()
	
	/**
	 * Find by name ignore case.
	 *
	 * @param name the name
	 * @return the study lookup
	 */
	StudyLookup findByNameIgnoreCase(String name)
}
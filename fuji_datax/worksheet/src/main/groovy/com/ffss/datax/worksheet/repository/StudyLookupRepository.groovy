 package com.ffss.datax.worksheet.repository

import org.springframework.data.jpa.repository.JpaRepository

import com.ffss.datax.common.domain.study.StudyLookup


/**
 * The Interface StudyLookupRepository.
 */
interface StudyLookupRepository extends JpaRepository<StudyLookup, Long> {

	/**
	 * Find by name ignore case.
	 *
	 * @param name the name
	 * @return the study lookup
	 */
	StudyLookup findByNameIgnoreCase(String name)
}

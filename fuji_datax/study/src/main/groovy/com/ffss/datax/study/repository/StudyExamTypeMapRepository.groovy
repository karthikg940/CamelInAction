 package com.ffss.datax.study.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Modifying
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param

import com.ffss.datax.common.domain.study.StudyExamTypeMap



/**
 * The Interface StudyExamTypeMapRepository.
 * @author Virtusa|Polaris
 */
interface StudyExamTypeMapRepository extends JpaRepository<StudyExamTypeMap, Long> {

	/**
	 * Find study exam type by study id.
	 *
	 * @param id the id
	 * @return the study exam type map
	 */
	@Query('select s from StudyExamTypeMap s join fetch s.study se where se.id=:id')
	StudyExamTypeMap findStudyExamTypeByStudyId(@Param('id') id)
	
	/**
	 * Delete study exam type.
	 *
	 * @param eid the eid
	 * @return the int
	 */
	@Modifying
	@Query('delete from StudyExamTypeMap s where s.id=:eid')
	int deleteStudyExamType(@Param('eid') Long eid)
}


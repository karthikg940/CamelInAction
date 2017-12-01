package com.ffss.datax.study.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Modifying
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param

import com.ffss.datax.common.domain.study.StudyTaskMap


/**
 * The Interface StudyTaskMapRepository.
 * @author Virtusa|Polaris
 */
interface StudyTaskMapRepository extends JpaRepository<StudyTaskMap, Long> {

	/**
	 * Find one by study id.
	 *
	 * @param studyId the study id
	 * @return the study task map
	 */
	StudyTaskMap findOneByStudyId(studyId)

	/**
	 * Delete study task.
	 *
	 * @param id the id
	 * @return the int
	 */
	@Modifying
	@Query('delete from StudyTaskMap w where w.id=:id')
	int deleteStudyTask(@Param('id') Long id)
}

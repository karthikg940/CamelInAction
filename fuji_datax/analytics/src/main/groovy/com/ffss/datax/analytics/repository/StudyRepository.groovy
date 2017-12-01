
package com.ffss.datax.analytics.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param

import com.ffss.datax.common.domain.study.Study


/**
 * The Interface StudyRepository.
 * 
 * @author Virtusa|Polaris
 */
interface StudyRepository extends JpaRepository<Study, Long> {
	
	/**
	 * Gets the task.
	 *
	 * @param id the id
	 * @return the task
	 */
	@Query('select  s from Study s join fetch s.studyTaskMap ss join fetch ss.workflowTask where s.id=:id')
	Study getTask(@Param('id')Long id)
}
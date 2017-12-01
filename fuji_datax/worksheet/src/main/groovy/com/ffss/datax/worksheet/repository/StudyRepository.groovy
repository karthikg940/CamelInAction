 package com.ffss.datax.worksheet.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param

import com.ffss.datax.common.domain.study.Study


/**
 * The Interface StudyRepository.
 */
interface StudyRepository extends JpaRepository<Study, Long> {

	/**
	 * Gets the poc user.
	 *
	 * @param userId the user id
	 * @return the poc user
	 */
	@Query('select distinct s from Study s join fetch s.studyTaskMap ss join fetch s.status st join fetch ss.workflowTask where s.id=:id')
	Study findStudyTaskById(@Param('id')Long userId)
	
	@Query('select s from Study s join fetch s.studyExamTypeMap stMap join fetch stMap.examTypeMap map where s.id =:id')
	Study getExamTypeForStudy(@Param('id') Long id)
}
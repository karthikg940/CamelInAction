 package com.ffss.datax.study.repository

import org.joda.time.DateTime
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param

import com.ffss.datax.common.domain.study.Study

/**
 * The Interface StudyRepository.
 */
interface StudyRepository extends JpaRepository<Study, Long> {

	/**
	 * Find study details.
	 *
	 * @param id the id
	 * @return the study
	 */
	@Query('select distinct s from Study s join fetch s.patient left outer join fetch s.series se left outer join se.examType left outer join s.status where s.id =:id')
	Study findStudyDetails(@Param('id') id)

	/**
	 * find the attending user.
	 *
	 * @param userId the user id
	 * @return the attending user
	 */
	@Query("select distinct s from Study s join fetch s.studyTaskMap ss join fetch ss.workflowTask se join fetch se.userTaskStage sa join fetch sa.taskRoleConfig st join fetch st.taskRole str where str.taskRoleName='attending' and s.id=:id")
	Study findAttendingUserbyStudyId(@Param('id')Long userId)

	/**
	 * find task by study id
	 * 
	 * @param userId the user id
	 * @return the poc user
	 */
	@Query('select distinct s from Study s join fetch s.studyTaskMap ss join fetch ss.workflowTask where s.id=:id')
	Study findTaskByStudyId(@Param('id')Long userId)

	/**
	 * Find worksheet by study id.
	 *
	 * @param id the id
	 * @return the study
	 */
	@Query('select distinct s from Study s join fetch s.worksheet w where s.id=:id')
	Study findworksheetByStudyId(@Param('id') Long id)

	@Query('select distinct s from Study s left outer join fetch s.studyTaskMap ss left outer join fetch ss.workflowTask w left outer join fetch s.status where s.lastStatusChangedDateTime<=:threshholdtime)')
	List<Study> findIdleStudies(@Param('threshholdtime') DateTime threshholdtime)

	@Query('select distinct s from Study s join fetch s.patient p join p.patientIdentifier pi left outer join fetch s.series se left outer join se.examType e left outer join s.worksheet w left outer join w.template wt left outer join s.accessionNumber left outer join s.status where s.id =:id')
	Study findPatientDetailsByStudyId(@Param('id') Long id)
}
package com.ffss.datax.analytics.repository


import org.joda.time.DateTime
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param

import com.ffss.datax.common.domain.study.Study

interface DashboardRepository extends JpaRepository<Study, Long> {

	@Query("select distinct s from Study s left outer join fetch s.status left outer join fetch s.studyTaskMap ss join fetch ss.workflowTask wft join fetch wft.userTaskStage uts join fetch uts.taskRoleConfig trc join fetch trc.taskRole tr where ((s.vnaCreatedDateTime>:from and s.vnaCreatedDateTime<:to) and (uts.user.id =:id) and (tr.taskRoleName='performing') AND (s.deleted='N') and (s.orgFk=:orgId))")
	List<Study> getMyStudiesDataDetails(@Param('from') DateTime from,@Param('to') DateTime to,@Param('id') Long id, @Param('orgId') Long orgId)

	@Query("select distinct s from Study s left outer join fetch s.status left outer join fetch s.series se where (s.vnaCreatedDateTime>:from and s.vnaCreatedDateTime<:to) AND (s.deleted='N') and (s.orgFk=:orgId)")
	List<Study> getAllStudiesDetails(@Param('from') DateTime from,@Param('to') DateTime to, @Param('orgId') Long orgId)

	@Query("select distinct s from Study s left outer join fetch s.status left outer join fetch s.studyTaskMap ss join fetch ss.workflowTask wft join fetch wft.userTaskStage uts join fetch uts.taskRoleConfig trc join fetch trc.taskRole tr where ((s.qaAssignedDateTime>:from and s.qaAssignedDateTime<:to) AND (s.deleted='N') and (uts.user.id =:id) and (tr.taskRoleName='qa') and (s.orgFk=:orgId))")
	List<Study> getQaStudies(@Param('from') DateTime from,@Param('to') DateTime to, @Param('id') Long id, @Param('orgId') Long orgId)
}


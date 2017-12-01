package com.ffss.datax.workflow.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param

import com.ffss.datax.common.domain.workflow.WorkflowTask

interface WorkflowTaskRepository extends JpaRepository<WorkflowTask, Long> {

	@Query('select distinct w from WorkflowTask w join fetch w.userTaskStage ut join fetch ut.taskRoleConfig st join fetch st.taskRole str where str.taskRoleName=:type and w.id=:id')
	WorkflowTask getUser(@Param('id')Long id,@Param('type')String type)
}

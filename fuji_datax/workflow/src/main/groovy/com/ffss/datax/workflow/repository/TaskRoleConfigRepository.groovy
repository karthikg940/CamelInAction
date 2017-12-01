package com.ffss.datax.workflow.repository

import org.springframework.data.jpa.repository.JpaRepository

import com.ffss.datax.common.domain.workflow.TaskRoleConfig

interface TaskRoleConfigRepository extends JpaRepository<TaskRoleConfig,Long> {

	TaskRoleConfig findByTaskRoleTaskRoleName(taskRoleName)
}

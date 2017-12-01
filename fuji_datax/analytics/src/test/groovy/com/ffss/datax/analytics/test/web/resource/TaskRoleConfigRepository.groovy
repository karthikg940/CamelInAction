package com.ffss.datax.analytics.test.web.resource

import org.springframework.data.jpa.repository.JpaRepository

import com.ffss.datax.common.domain.workflow.TaskRoleConfig

public interface TaskRoleConfigRepository extends JpaRepository<TaskRoleConfig,Long>
{
}

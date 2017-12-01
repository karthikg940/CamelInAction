package com.ffss.datax.study.test.web.resource

import org.springframework.data.jpa.repository.JpaRepository

import com.ffss.datax.common.domain.workflow.TaskAssignedUser

interface TaskAssignedUserRepository extends JpaRepository<TaskAssignedUser, Long> {

}

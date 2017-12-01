package com.ffss.datax.workflow.repository

import org.springframework.data.jpa.repository.JpaRepository

import com.ffss.datax.common.domain.workflow.UserTaskStage


interface UserTaskStageRepository extends JpaRepository<UserTaskStage, Long> {
}

package com.ffss.datax.worksheet.test.repository

import org.springframework.data.jpa.repository.JpaRepository

import com.ffss.datax.common.domain.workflow.UserTaskStage

interface UserTaskStageRepository  extends JpaRepository<UserTaskStage,Long>{

}

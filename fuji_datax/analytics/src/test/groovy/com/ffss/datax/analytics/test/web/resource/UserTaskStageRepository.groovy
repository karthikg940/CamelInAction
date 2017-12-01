package com.ffss.datax.analytics.test.web.resource

import org.springframework.data.jpa.repository.JpaRepository

import com.ffss.datax.common.domain.workflow.UserTaskStage


/**
 * The Interface UserTaskStageRepository.
 * @author Virtusa|Polaris
 */
interface UserTaskStageRepository extends JpaRepository<UserTaskStage, Long> {
	
}

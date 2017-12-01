package com.ffss.datax.study.repository

import org.springframework.data.jpa.repository.JpaRepository

import com.ffss.datax.common.domain.workflow.WorkflowTask

/**
 * The Interface WorkflowTaskRepository.
 * @author Virtusa|Polaris
 */
interface WorkflowTaskRepository extends
		JpaRepository<WorkflowTask, Long> {
			
}

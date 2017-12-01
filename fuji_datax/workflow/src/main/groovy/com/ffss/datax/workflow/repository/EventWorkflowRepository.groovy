package com.ffss.datax.workflow.repository

import org.springframework.data.jpa.repository.JpaRepository

import com.ffss.datax.common.domain.workflow.EventWorkflow

interface EventWorkflowRepository extends JpaRepository<EventWorkflow, Long> {

	EventWorkflow findByEventName(eventName)
}

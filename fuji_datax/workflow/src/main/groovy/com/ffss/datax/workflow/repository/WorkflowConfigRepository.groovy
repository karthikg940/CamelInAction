package com.ffss.datax.workflow.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param

import com.ffss.datax.common.domain.workflow.WorkflowConfig

interface WorkflowConfigRepository extends JpaRepository<WorkflowConfig, Long> {
	@Query('select wfc from WorkflowConfig wfc where wfc.currentStatus=:currentStatus and wfc.typeConfig.id=:typeId and wfc.eventWorkflow.id=:eventId')
	WorkflowConfig findByStatusEventIdAndTypeId(@Param('currentStatus') currentStatus,@Param('typeId') typeId,@Param('eventId') eventId )

	@Query('select wfc from WorkflowConfig wfc where wfc.currentStatus=:currentStatus and wfc.eventWorkflow.eventName=:eventName')
	WorkflowConfig findByStatusAndEvent(@Param('currentStatus') currentStatus,@Param('eventName') eventName )
}

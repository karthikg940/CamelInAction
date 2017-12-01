package com.ffss.datax.common.domain.workflow

import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.Id
import javax.persistence.Table

import com.ffss.datax.common.domain.audit.Audit

@Entity
@Table(name='event_workflow')
class EventWorkflow extends Audit {

	@Id
	@GeneratedValue
	@Column(name='EVENT_WORKFLOW_PK')
	Long id
		
	@Column(name='EVENT_NAME')
	String eventName
	
}

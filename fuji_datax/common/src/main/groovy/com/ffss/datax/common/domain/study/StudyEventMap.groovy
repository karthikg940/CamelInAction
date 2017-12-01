package com.ffss.datax.common.domain.study

import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.Id
import javax.persistence.Table

import com.ffss.datax.common.domain.audit.Audit

@Entity
@Table(name='study_event_workflow_map')
class StudyEventMap extends Audit {

	@Id
	@GeneratedValue
	@Column(name='STUDY_EVENT_WORKFLOW_MAP_PK')
	Long id
		
	@Column(name='EVENT_TYPE')
	String eventType
	
	@Column(name='CURRENT_STATUS')
	String currentStatus
	
	@Column(name='NEXT_STATUS')
	String nextStatus
}

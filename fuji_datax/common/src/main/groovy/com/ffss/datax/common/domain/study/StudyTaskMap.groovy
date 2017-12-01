package com.ffss.datax.common.domain.study

import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.FetchType
import javax.persistence.GeneratedValue
import javax.persistence.Id
import javax.persistence.JoinColumn
import javax.persistence.ManyToOne
import javax.persistence.Table

import com.fasterxml.jackson.annotation.JsonBackReference
import com.ffss.datax.common.domain.audit.Audit
import com.ffss.datax.common.domain.workflow.WorkflowTask

@Entity
@Table(name='study_task_map')
class StudyTaskMap extends Audit{
	
	@Id
	@GeneratedValue
	@Column(name='STUDY_TASK_MAP_PK')
	Long id
	
	@JsonBackReference
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name='STUDY_FK')
	Study study
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name='TASK_FK')
	WorkflowTask workflowTask

}

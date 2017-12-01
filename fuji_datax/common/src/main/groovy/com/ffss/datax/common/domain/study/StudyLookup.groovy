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
import com.fasterxml.jackson.annotation.JsonIgnore
import com.ffss.datax.common.domain.audit.Audit
import com.ffss.datax.common.domain.workflow.WorkflowStage

@Entity
@Table(name='STUDY_STATUS_LKUP')
class StudyLookup extends Audit {

	@Id
	@GeneratedValue
	@Column(name='STUDY_STATUS_LKUP_PK')
	Long id

	@Column(name='STATUS_DESCRIPTION')
	String name

	@JsonIgnore
	@JsonBackReference
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name='WORKFLOW_FK')
	WorkflowStage workFlow

	@JoinColumn(name='WORKFLOW_FK')
	Long workflowSequence
}

package com.ffss.datax.common.domain.study

import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.FetchType
import javax.persistence.GeneratedValue
import javax.persistence.Id
import javax.persistence.JoinColumn
import javax.persistence.ManyToOne
import javax.persistence.OneToOne
import javax.persistence.Table

import com.fasterxml.jackson.annotation.JsonBackReference
import com.fasterxml.jackson.annotation.JsonIdentityInfo
import com.fasterxml.jackson.annotation.JsonIgnore
import com.fasterxml.jackson.annotation.ObjectIdGenerators
import com.ffss.datax.common.domain.audit.Audit
import com.ffss.datax.common.domain.workflow.WorkflowStage

@Entity
@Table(name='study_owner_assignment')
@JsonIdentityInfo(generator=ObjectIdGenerators.IntSequenceGenerator, property='@id')
class StudyUserAssignment extends Audit{
	
	@Id
	@GeneratedValue
	@Column(name='STUDY_USER_ASSIGNMENT_PK')
	Long id
	
	@Column(name='STUDY_TYPE')
	String type
	
	@JsonIgnore
	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name='STUDY_FK')
	Study study
	
	@JsonIgnore
	@JsonBackReference
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name='WORKFLOW_FK')
	WorkflowStage workFlow
	
	@JoinColumn(name='WORKFLOW_SEQUENCE')
	Long workflowSequence
	
	
}



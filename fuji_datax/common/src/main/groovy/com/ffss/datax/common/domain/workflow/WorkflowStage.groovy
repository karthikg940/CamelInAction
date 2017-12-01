package com.ffss.datax.common.domain.workflow

import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.FetchType
import javax.persistence.GeneratedValue
import javax.persistence.Id
import javax.persistence.ManyToMany
import javax.persistence.Table

import com.fasterxml.jackson.annotation.JsonBackReference
import com.ffss.datax.common.domain.audit.Audit
import com.ffss.datax.common.domain.study.StudyLookup
import com.ffss.datax.common.domain.study.StudyUserAssignment

@Entity
@Table(name='workflow_stages')
class WorkflowStage extends Audit {

	@Id
	@GeneratedValue
	@Column(name='WORKFLOW_PK')
	Long id

	@Column(name='WORKFLOW_DESC')
	String workflowDesc

	@ManyToMany(fetch = FetchType.EAGER, mappedBy = 'workFlow')
	@JsonBackReference
	List<StudyUserAssignment> studyUserAssignment
	
	@ManyToMany(fetch = FetchType.EAGER, mappedBy = 'workFlow')
	@JsonBackReference
	List<StudyLookup> studyLookup
}

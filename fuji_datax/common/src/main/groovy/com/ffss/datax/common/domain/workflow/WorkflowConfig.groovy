package com.ffss.datax.common.domain.workflow

import javax.persistence.CascadeType
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.FetchType
import javax.persistence.GeneratedValue
import javax.persistence.Id
import javax.persistence.JoinColumn
import javax.persistence.ManyToOne
import javax.persistence.OneToMany
import javax.persistence.Table

import com.fasterxml.jackson.annotation.JsonBackReference
import com.fasterxml.jackson.annotation.JsonIgnore
import com.fasterxml.jackson.annotation.JsonManagedReference
import com.ffss.datax.common.domain.audit.Audit

@Entity
@Table(name='workflow_config')
class WorkflowConfig extends Audit {

	@Id
	@GeneratedValue
	@Column(name='WORKFLOW_CONFIG_PK')
	Long id

	@JsonIgnore
	@JsonBackReference
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name='EVENT_WORKFLOW_FK')
	EventWorkflow eventWorkflow

	@Column(name='CURRENT_STATUS')
	String currentStatus

	@Column(name='NEXT_STATUS')
	String nextStatus

	@JsonIgnore
	@JsonBackReference
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name='TYPE_FK')
	TypeConfig typeConfig
	
	@JsonIgnore
	@JsonManagedReference
	@OneToMany(mappedBy = 'workflowConfig',cascade=CascadeType.ALL)
	List<TaskRoleConfig> taskRoleConfig
	


	/*	@JsonIgnore
	 @JsonBackReference
	 @ManyToOne(fetch = FetchType.LAZY)
	 @JoinColumn(name='WORKFLOW_FK')
	 WorkflowStage workflowStage*/
}

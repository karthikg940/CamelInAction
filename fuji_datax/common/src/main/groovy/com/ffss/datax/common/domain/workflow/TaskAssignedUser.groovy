package com.ffss.datax.common.domain.workflow

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

@Entity
@Table(name='task_assigned_user')
class TaskAssignedUser extends Audit {

	@Id
	@GeneratedValue
	@Column(name='TASK_ASSIGNED_USER_PK')
	Long id
	
	@JsonIgnore
	@JsonBackReference
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name='TASK_FK')
	WorkflowTask workflowTask
	
	@Column(name='FLAG')
	String flag
	
	@Column(name='STATUS')
	String status
	
}

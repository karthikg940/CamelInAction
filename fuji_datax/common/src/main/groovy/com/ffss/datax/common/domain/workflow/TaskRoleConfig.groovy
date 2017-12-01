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
@Table(name='task_role_config')
class TaskRoleConfig extends Audit{
	
	@Id
	@GeneratedValue
	@Column(name='TASK_ROLE_CONFIG_PK')
	Long id
	
	@JsonIgnore
	@JsonBackReference
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name='TASK_ROLE_FK')
	TaskRole taskRole
	
	@JsonIgnore
	@JsonBackReference
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name='WORKFLOW_CONFIG_FK')
	WorkflowConfig workflowConfig
	
	@JsonIgnore
	@JsonManagedReference
	@OneToMany(mappedBy = 'taskRoleConfig',cascade=CascadeType.ALL)
	List<UserTaskStage> UserTaskStage

}

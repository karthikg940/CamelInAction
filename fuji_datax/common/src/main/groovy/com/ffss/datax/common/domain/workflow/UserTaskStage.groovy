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
import com.ffss.datax.common.domain.userprofile.UserAccount

@Entity
@Table(name='user_task_stage')
class UserTaskStage extends Audit{
	
	@Id
	@GeneratedValue
	@Column(name='USER_TASK_STAGE_PK')
	Long id

	@JsonBackReference
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name='USER_FK')
	UserAccount user
	
	@JsonIgnore
	@JsonBackReference
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name='TASK_FK')
	WorkflowTask workflowTask
	
	@JsonIgnore
	@JsonBackReference
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name='TASK_ROLE_CONFIG_FK')
	TaskRoleConfig taskRoleConfig
}

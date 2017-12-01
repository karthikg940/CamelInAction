package com.ffss.datax.common.domain.workflow

import javax.persistence.CascadeType
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.Id
import javax.persistence.OneToMany
import javax.persistence.Table

import com.fasterxml.jackson.annotation.JsonIgnore
import com.fasterxml.jackson.annotation.JsonManagedReference
import com.ffss.datax.common.domain.audit.Audit

@Entity
@Table(name='task_role')
class TaskRole extends Audit {
	
	@Id
	@GeneratedValue
	@Column(name='TASK_ROLE_PK')
	Long id
	
	@Column(name='TASK_ROLE_NAME')
	String taskRoleName
	
	@JsonIgnore
	@JsonManagedReference
	@OneToMany(mappedBy = 'taskRole',cascade=CascadeType.ALL)
	List<TaskRoleConfig> taskRoleConfig

}

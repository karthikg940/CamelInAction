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
@Table(name='type_config')
class TypeConfig extends Audit {

	@Id
	@GeneratedValue
	@Column(name='TYPE_PK')
	Long id
	
	@Column(name='TYPE_NAME')
	String typeName
	
	@JsonIgnore
	@JsonManagedReference
	@OneToMany(mappedBy = 'typeConfig',cascade=CascadeType.ALL)
	List<WorkflowTask> workflowTask
	
	@JsonIgnore
	@JsonManagedReference
	@OneToMany(mappedBy = 'typeConfig',cascade=CascadeType.ALL)
	List<WorkflowConfig> workflowConfig
}

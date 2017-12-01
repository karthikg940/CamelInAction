package com.ffss.datax.common.domain.workflow

import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.Id
import javax.persistence.Table

import com.ffss.datax.common.domain.audit.Audit

@Entity
@Table(name='default_workflow')
class MasterPreference extends Audit {

	@Id
	@GeneratedValue
	@Column(name='MASTER_PK')
	Long id
		
	@Column(name='NAME')
	String preferenceName
	
}

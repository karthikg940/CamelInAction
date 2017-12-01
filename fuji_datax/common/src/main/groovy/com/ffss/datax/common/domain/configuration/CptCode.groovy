package com.ffss.datax.common.domain.configuration

import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.Id
import javax.persistence.Table

import com.ffss.datax.common.domain.audit.Audit

@Entity
@Table(name='cpt_code')
class CptCode extends Audit{

	@Id
	@GeneratedValue
	@Column(name='CPT_CODE_PK')
	Long id 

	@Column(name='CPT_CODE')
	String cptCode
	
	
}

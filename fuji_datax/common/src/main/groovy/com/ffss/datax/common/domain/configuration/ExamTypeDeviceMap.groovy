package com.ffss.datax.common.domain.configuration

import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.FetchType
import javax.persistence.GeneratedValue
import javax.persistence.Id
import javax.persistence.JoinColumn
import javax.persistence.ManyToOne
import javax.persistence.Table

import com.fasterxml.jackson.annotation.JsonBackReference
import com.ffss.datax.common.domain.audit.Audit

@Entity
@Table(name='exmtyp_device_map')
class ExamTypeDeviceMap extends Audit {
	
	@Id
	@GeneratedValue
	@Column(name='EXMTYP_DEVICE_MAP_PK')
	Long id

	
	@Column(name='DESCRIPTION_IN_DEVICE')
	String descriptionInDevice

	@JsonBackReference 
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name='exam_type_map_fk')
	ExamTypeMap examTypeMap
	
	@Column(name='ALIAS_NAME')
	String aliasName
	
}

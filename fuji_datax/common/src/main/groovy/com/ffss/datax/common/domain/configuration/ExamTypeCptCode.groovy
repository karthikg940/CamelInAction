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
@Table(name='exam_type_cpt_code')
class ExamTypeCptCode extends Audit {
	
	@Id
	@GeneratedValue
	@Column(name='EXAM_TYPE_CPT_PK')
	Long id

	@JsonBackReference
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name='EXAM_TYPE_MAP_FK')
	ExamTypeMap examTypeMap
	
	@JsonBackReference
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name='CPT_CODE_FK')
	CptCode cptcode
	
	@Column(name='IS_MANDATORY')
	String isMandatory
	
}

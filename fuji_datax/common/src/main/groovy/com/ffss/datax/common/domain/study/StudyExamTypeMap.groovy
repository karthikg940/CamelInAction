package com.ffss.datax.common.domain.study

import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.FetchType
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType
import javax.persistence.Id
import javax.persistence.JoinColumn
import javax.persistence.ManyToOne
import javax.persistence.OneToOne
import javax.persistence.Table

import com.fasterxml.jackson.annotation.JsonBackReference
import com.fasterxml.jackson.annotation.JsonIdentityInfo
import com.fasterxml.jackson.annotation.ObjectIdGenerators
import com.ffss.datax.common.domain.audit.Audit
import com.ffss.datax.common.domain.configuration.ExamTypeMap

@Entity
@Table(name='study_examtype_map')
@JsonIdentityInfo(generator=ObjectIdGenerators.IntSequenceGenerator, property='@id')
class StudyExamTypeMap extends Audit{
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name='STUDY_EXAMTYPE_MAP_PK')
	Long id
	
	@Column(name='TYPE')
	String type
	
	
	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name='EXAM_TYPE_REL_FK')
	Study study

	
	@JsonBackReference
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name='EXAM_TYPE_MAP_FK')
	ExamTypeMap examTypeMap

}



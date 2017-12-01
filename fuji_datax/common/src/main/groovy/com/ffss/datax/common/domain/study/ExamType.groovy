package com.ffss.datax.common.domain.study

import javax.persistence.CascadeType
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.FetchType
import javax.persistence.GeneratedValue
import javax.persistence.Id
import javax.persistence.JoinColumn
import javax.persistence.ManyToOne
import javax.persistence.OneToMany
import javax.persistence.OneToOne
import javax.persistence.Table

import com.fasterxml.jackson.annotation.JsonBackReference
import com.fasterxml.jackson.annotation.JsonIgnore
import com.fasterxml.jackson.annotation.JsonManagedReference
import com.ffss.datax.common.domain.audit.Audit
import com.ffss.datax.common.domain.configuration.ExamTypeMap
import com.ffss.datax.common.domain.configuration.Tags
import com.ffss.datax.common.domain.worksheet.Worksheet

@Entity
@Table(name='EXAM_TYPE')
class ExamType extends Audit{

	@Id
	@GeneratedValue
	@Column(name='EXAM_TYPE_PK')
	Long id
	
	@JsonBackReference
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name='series_fk')
	Series series
	
	@JsonManagedReference
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name='EXAM_TYPE_MAP_FK')
	ExamTypeMap examTypeMap
	
	@JsonIgnore
	@JsonManagedReference
	@OneToMany(mappedBy = 'examType',cascade=CascadeType.ALL)
	List<Tags> tags
	
	@JsonManagedReference
	@OneToOne(mappedBy = 'examType',cascade=CascadeType.ALL)
	Worksheet worksheet
	
		
	
	
}

package com.ffss.datax.common.domain.configuration

import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.FetchType
import javax.persistence.GeneratedValue
import javax.persistence.Id
import javax.persistence.JoinColumn
import javax.persistence.ManyToMany
import javax.persistence.ManyToOne
import javax.persistence.Table

import com.fasterxml.jackson.annotation.JsonBackReference
import com.fasterxml.jackson.annotation.JsonIgnore
import com.ffss.datax.common.domain.audit.Audit
import com.ffss.datax.common.domain.study.Study

@Entity
@Table(name='tag_examtype_map')
class TagsExamTypeMap extends Audit 
{
	@Id
	@GeneratedValue
	@Column(name='TAG_EXAMTYPE_MAP_PK')
	Long tagId
	
	@JsonBackReference
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name='EXAM_TYPE_MAP_FK')
	ExamTypeMap examTypeMap
	
	@Column(name='TAG_DESCRIPTION')
	String tagDescription
	
	@Column(name='TAG_TYPE')
	String tagType

	@JsonIgnore
	@ManyToMany(fetch = FetchType.EAGER, mappedBy = 'tags')
	@JsonBackReference
	List<Study> study =  []
}

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
import com.ffss.datax.common.domain.study.ExamType

@Entity
@Table(name='TAGS')
class Tags extends Audit
{
	@Id
	@GeneratedValue
	@Column(name='TAGS_PK')
	Long id
	
	@JsonBackReference
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name='exam_type_fk')
	ExamType examType
	
	@JsonBackReference
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name='tag_examtype_map_fk')
	TagsExamTypeMap tagExamType

}

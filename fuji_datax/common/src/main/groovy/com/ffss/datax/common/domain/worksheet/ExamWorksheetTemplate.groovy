package com.ffss.datax.common.domain.worksheet

import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.FetchType
import javax.persistence.GeneratedValue
import javax.persistence.Id
import javax.persistence.JoinColumn
import javax.persistence.ManyToOne
import javax.persistence.Table

import com.fasterxml.jackson.annotation.JsonBackReference
import com.ffss.datax.common.domain.configuration.ExamTypeMap


@Entity
@Table(name='exammap_wrksht_tmpl')
class ExamWorksheetTemplate {
	
	@Id
	@GeneratedValue
	@Column(name='EXAM_WRKSHT_TMPL_PK')
	Long id
	
	@JsonBackReference
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name='exam_type_map_fk')
	ExamTypeMap examTypeMap
	
	@JsonBackReference
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name='WRKSHT_TEMPLT_FK')
	WorksheetTemplate worksheetTemplate
	
	
	
}

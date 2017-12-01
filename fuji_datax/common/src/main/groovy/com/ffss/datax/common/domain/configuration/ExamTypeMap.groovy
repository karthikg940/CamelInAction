package com.ffss.datax.common.domain.configuration	

import javax.persistence.CascadeType
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.Id
import javax.persistence.JoinColumn
import javax.persistence.JoinTable
import javax.persistence.ManyToMany
import javax.persistence.OneToMany
import javax.persistence.Table

import com.fasterxml.jackson.annotation.JsonIgnore
import com.fasterxml.jackson.annotation.JsonManagedReference
import com.ffss.datax.common.domain.audit.Audit
import com.ffss.datax.common.domain.study.StudyExamTypeMap
import com.ffss.datax.common.domain.worksheet.ExamWorksheetTemplate
import com.ffss.datax.common.domain.worksheet.WorksheetTemplate

@Entity
@Table(name='exam_type_mapping')
class ExamTypeMap extends Audit {
	
	@Id
	@GeneratedValue
	@Column(name='EXAM_TYPE_MAP_PK')
	Long id

	@JsonIgnore
	@JsonManagedReference
	@OneToMany(mappedBy ='examTypeMap',cascade=CascadeType.ALL)
	List<ExamWorksheetTemplate> examWorksheetTemplate
	
	@JsonIgnore
	@JsonManagedReference
	@OneToMany(mappedBy ='examTypeMap',cascade=CascadeType.ALL)
	List<StudyExamTypeMap> studyExamTypeMap
	
	@Column(name='EXAM_TYPE_DESC')
	String examTypeDesc
	
	@Column(name='EXAM_TYPE_DETAIL')
	String examTypeDetailDesc
	
	@Column(name='IS_DELETED')
	String deleted
	
	@Column(name='IS_ENABLED')
	String enabled 
	
	@JsonIgnore
	@JsonManagedReference
	@OneToMany(mappedBy ='examTypeMap',cascade=CascadeType.ALL)
	List<ExamTypeDeviceMap> aliasName
	
	@JsonIgnore
	@JsonManagedReference
	@OneToMany(mappedBy ='examTypeMap',cascade=CascadeType.ALL)
	List<TagsExamTypeMap> tags
	
	@JsonIgnore
	@JsonManagedReference
	@OneToMany(mappedBy ='examTypeMap',cascade=CascadeType.ALL)
	List<ExamTypeCptCode> mancptCode
	
	@JsonIgnore
	@JsonManagedReference
	@OneToMany(mappedBy ='examTypeMap',cascade=CascadeType.ALL)
	List<ExamTypeCptCode> optcptCode
	
	@ManyToMany(cascade = CascadeType.ALL)
	@JsonManagedReference
	@JoinTable(name = 'exammap_wrksht_tmpl',
	joinColumns =
	@JoinColumn(name = 'exam_type_map_fk', referencedColumnName = 'exam_type_map_pk'),
	inverseJoinColumns =
	@JoinColumn(name = 'WRKSHT_TEMPLT_FK',referencedColumnName = 'WRKSHT_TEMPLT_PK')
	)
	List<WorksheetTemplate> worksheetTemplate = []
	
}

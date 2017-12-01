package com.ffss.datax.common.domain.worksheet

import java.lang.String.*

import javax.persistence.CascadeType
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.FetchType
import javax.persistence.GeneratedValue
import javax.persistence.Id
import javax.persistence.Lob
import javax.persistence.ManyToMany
import javax.persistence.OneToMany
import javax.persistence.Table

import com.fasterxml.jackson.annotation.JsonBackReference
import com.fasterxml.jackson.annotation.JsonIgnore
import com.fasterxml.jackson.annotation.JsonManagedReference
import com.ffss.datax.common.domain.audit.Audit
import com.ffss.datax.common.domain.configuration.ExamTypeMap

@Entity
@Table(name='wrksht_templt')
class WorksheetTemplate extends Audit {
	
	@Id
	@GeneratedValue
	@Column(name='WRKSHT_TEMPLT_PK')
	Long id
	
	@JsonIgnore
	@JsonManagedReference
	@OneToMany(mappedBy = 'worksheetTemplate',cascade=CascadeType.ALL)
	List<ExamWorksheetTemplate> examWorksheetTemplate
	
	@Column(name='PARENT_TMPLT_FK')
	Long parentTemplateFk
	
	@Column(name='TEMPLT_NAME')
	String templateName
	
	@Column(name='TEMPLT_CONTENT')
	@Lob
	String templateContent
	
	@Column(name='IS_MODIFY')
	String isModify
	
	@Column(name='TYPE')
	String type
	
	@JsonIgnore
	@ManyToMany(fetch = FetchType.EAGER, mappedBy = 'worksheetTemplate')
	@JsonBackReference
	List<ExamTypeMap> examTypeMap =  []
	
}

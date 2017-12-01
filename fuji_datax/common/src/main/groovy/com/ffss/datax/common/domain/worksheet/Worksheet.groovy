package com.ffss.datax.common.domain.worksheet

import javax.persistence.CascadeType
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.FetchType
import javax.persistence.GeneratedValue
import javax.persistence.Id
import javax.persistence.JoinColumn
import javax.persistence.Lob
import javax.persistence.ManyToOne
import javax.persistence.OneToMany
import javax.persistence.OneToOne
import javax.persistence.Table

import com.fasterxml.jackson.annotation.JsonIgnore
import com.ffss.datax.common.domain.audit.Audit
import com.ffss.datax.common.domain.study.ExamType
import com.ffss.datax.common.domain.study.Study
import com.ffss.datax.common.domain.userprofile.UserAccount

@Entity
@Table(name='wrksht')
class Worksheet extends Audit{
	@Id
	@GeneratedValue
	@Column(name='WRKSHT_PK')
	Long id
		
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name='WRKSHT_TEMPLT_FK')
	WorksheetTemplate template
	
	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name='EXAM_TYPE_FK')
	ExamType examType
	
	@JsonIgnore
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name='STUDY_FK')
	Study study
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name='WKSHT_STATUS_LKUP_FK')
	WorksheetLookup lookupId

	@Column(name='EXAM_TYPE_ALIAS')
	String examTypeAlias
	
	@Column(name='EXAM_WKSHT_TYPE')
	String examWorksheetType
	
	@Lob
	@Column(name='WRKSHT_CONTENT')
	String content
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name='USER_FK')
	UserAccount assignToUserId
	
	@JsonIgnore
	@OneToMany(mappedBy = 'worksheet',cascade=CascadeType.ALL)
	List<WorksheetSignature> worksheetSignature
	
	
}

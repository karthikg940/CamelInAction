package com.ffss.datax.common.domain.study

import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.FetchType
import javax.persistence.GeneratedValue
import javax.persistence.Id
import javax.persistence.JoinColumn
import javax.persistence.OneToOne
import javax.persistence.Table

import com.fasterxml.jackson.annotation.JsonIgnore
import com.ffss.datax.common.domain.audit.Audit

@Entity
@Table(name='accession_number')
class AccessionNumber extends Audit{

	@Id
	@Column(name='ACCESSION_PK')
	Long id

	@Column(name='ACCESSION_NUMBER')
	String accessionNumber

	@JsonIgnore
	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name='STUDY_FK')
	Study study
}

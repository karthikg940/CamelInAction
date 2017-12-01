package com.ffss.datax.common.domain.study

import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.FetchType
import javax.persistence.Id
import javax.persistence.JoinColumn
import javax.persistence.ManyToOne
import javax.persistence.Table

import com.fasterxml.jackson.annotation.JsonBackReference
import com.fasterxml.jackson.annotation.JsonIgnore
import com.fasterxml.jackson.annotation.JsonManagedReference
import com.ffss.datax.common.domain.audit.Audit
import com.ffss.datax.common.domain.userprofile.Organization

@Entity
@Table(name='patient_worklist')
class PatientWorklist extends Audit{

	@Id
	@Column(name='PATIENT_WORKLIST_PK')
	Long id 

	@Column(name='ENCOUNTER_NUMBER_TYPE')
	Long encounterNumberType
	
	@Column(name='ENCOUNTER_NUMBER')
	String encounterNumber
	
	@JsonIgnore
	@JsonManagedReference
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name='PATIENT_FK')
	Patient patient
	
	@JsonIgnore
	@JsonBackReference
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name='ORG_FK')
	Organization organization

}

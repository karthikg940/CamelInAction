package com.ffss.datax.common.domain.study

import java.sql.Date

import javax.persistence.CascadeType
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.Id
import javax.persistence.OneToMany
import javax.persistence.Table

import com.fasterxml.jackson.annotation.JsonBackReference
import com.fasterxml.jackson.annotation.JsonIdentityInfo
import com.fasterxml.jackson.annotation.JsonIgnore
import com.fasterxml.jackson.annotation.ObjectIdGenerators
import com.ffss.datax.common.domain.audit.Audit

@Entity
@Table(name='patient')
@JsonIdentityInfo(generator=ObjectIdGenerators.IntSequenceGenerator, property='@id')
class Patient extends Audit {
	@Id
	@Column(name='patient_pk')
	Long id
	
	@JsonIgnore
	@JsonBackReference
	@OneToMany(mappedBy='patient',cascade=CascadeType.ALL)
	List<Study> study
	
	@JsonIgnore
	@JsonBackReference
	@OneToMany(mappedBy='patient',cascade=CascadeType.ALL)
	List<PatientIdentifier> patientIdentifier

	@JsonIgnore
	@JsonBackReference
	@OneToMany(mappedBy='patient',cascade=CascadeType.ALL)
	List<PatientWorklist> patientWorklist
	
	
	@Column(name='birth_date')
	Date birthDate

	@Column(name='first_name')
	String firstName

	@Column(name='middle_name')
	String middleName

	@Column(name='last_name')
	String lastName


	@Column(name='prefix')
	String prefix

	@Column(name='suffix')
	String suffix

	@Column(name='gender')
	String gender

	@Column(name='ethnic_origin')
	String ethnicOrigin

	@Column(name='mpi_id')
	String mpiId



}

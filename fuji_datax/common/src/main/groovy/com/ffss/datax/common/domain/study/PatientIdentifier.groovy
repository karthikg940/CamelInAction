package com.ffss.datax.common.domain.study

import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.FetchType
import javax.persistence.GeneratedValue
import javax.persistence.Id
import javax.persistence.JoinColumn
import javax.persistence.ManyToOne
import javax.persistence.Table

import org.hibernate.annotations.Type
import org.joda.time.DateTime

import com.fasterxml.jackson.annotation.JsonIgnore
import com.fasterxml.jackson.annotation.JsonManagedReference
import com.fasterxml.jackson.databind.annotation.JsonDeserialize
import com.fasterxml.jackson.databind.annotation.JsonSerialize
import com.ffss.datax.common.domain.audit.Audit
import com.ffss.datax.common.util.CustomDateTimeDeserializer
import com.ffss.datax.common.util.CustomDateTimeSerializer

@Entity
@Table(name='patient_identifier')
class PatientIdentifier extends Audit{
	@Id
	@Column(name='PATIENT_ID_PK')
	Long id
	
	@Column(name='ID_TYPE')
	String idType

	@Column(name='ISSUER')
	String issuer

	@Column(name='MEDICAL_ID')
	String medicalId

	@JsonIgnore
	@JsonManagedReference
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name='PATIENT_FK')
	Patient patient
	
	@Column(name ='VNACRTD_DATE_TIME')
	@Type(type = 'org.jadira.usertype.dateandtime.joda.PersistentDateTime')
	@JsonSerialize(using = CustomDateTimeSerializer)
	@JsonDeserialize(using = CustomDateTimeDeserializer)
	DateTime vnaCreatedDateTime

}

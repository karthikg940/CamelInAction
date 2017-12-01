package com.ffss.datax.common.domain.study


import javax.persistence.CascadeType
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.FetchType
import javax.persistence.GeneratedValue
import javax.persistence.Id
import javax.persistence.JoinColumn
import javax.persistence.ManyToOne
import javax.persistence.OneToMany
import javax.persistence.Table
import javax.validation.constraints.NotNull

import org.hibernate.annotations.Type
import org.hibernate.validator.constraints.NotEmpty
import org.joda.time.DateTime

import com.fasterxml.jackson.annotation.JsonBackReference
import com.fasterxml.jackson.annotation.JsonIgnore
import com.fasterxml.jackson.annotation.JsonManagedReference
import com.fasterxml.jackson.databind.annotation.JsonDeserialize
import com.fasterxml.jackson.databind.annotation.JsonSerialize
import com.ffss.datax.common.domain.audit.Audit
import com.ffss.datax.common.util.CustomDateTimeDeserializer
import com.ffss.datax.common.util.CustomDateTimeSerializer

@Entity
@Table(name='series')
class Series extends Audit{
	@Id
	@Column(name='series_pk')
	Long id
	
	@JsonIgnore
	@JsonBackReference
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name='study_fk')
	Study study
	
	@NotEmpty
	@Column(name='series_uid')
	String seriesUid

	@Column(name='series_number')
	String seriesNumber

	@Column(name='description')
	String description

	@Column(name='dicom_mapping_file')
	String dicomMappingFile

	@NotEmpty
	@Column(name='modality')
	String modality

	@Column(name='body_part')
	String bodyPart

	@Column(name='laterality')
	String laterality

	@NotNull
	@Column(name='cluster_fk')
	Long clusterId

	@JsonIgnore
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name='operator_fk')
	Person operator
	
	@JsonIgnore
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name='performing_physician_fk')
	Person performingPhysician
	
	
	@Column(name='equipment_uln')
	String equipmentUln
	
	@Column(name='equipment_id')
	String equipmentId
	
	@NotEmpty
	@Column(name='organization_uln')
	String organizationUln

	@Column(name='institution')
	String institution

	@Column(name='department')
	String department

	@Column(name='station_name')
	String stationName
	
	
	
	
	@Column(name='series_date_time')
	@Type(type = 'org.jadira.usertype.dateandtime.joda.PersistentDateTime')
	@JsonSerialize(using = CustomDateTimeSerializer)
	@JsonDeserialize(using = CustomDateTimeDeserializer)
	DateTime seriesDateTime
	
	@Column(name='update_sequence')
	Integer updateSequence
	
	@JsonIgnore
	@JsonManagedReference
	@OneToMany(mappedBy = 'series',cascade=CascadeType.ALL)
	List<SopInstance> sopInstance
	
	@JsonIgnore
	@JsonManagedReference
	@OneToMany(mappedBy = 'series',cascade=CascadeType.ALL)
	List<ExamType> examType
	
	
}

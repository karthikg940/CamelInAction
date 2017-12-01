package com.ffss.datax.common.domain.study

import javax.persistence.CascadeType
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.FetchType
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType;
import javax.persistence.Id
import javax.persistence.JoinColumn
import javax.persistence.JoinTable
import javax.persistence.ManyToMany
import javax.persistence.ManyToOne
import javax.persistence.OneToMany
import javax.persistence.OneToOne
import javax.persistence.Table
import javax.validation.constraints.NotNull

import org.hibernate.annotations.Type
import org.joda.time.DateTime

import com.fasterxml.jackson.annotation.JsonIdentityInfo
import com.fasterxml.jackson.annotation.JsonIgnore
import com.fasterxml.jackson.annotation.JsonManagedReference
import com.fasterxml.jackson.annotation.ObjectIdGenerators
import com.fasterxml.jackson.databind.annotation.JsonDeserialize
import com.fasterxml.jackson.databind.annotation.JsonSerialize
import com.ffss.datax.common.domain.audit.Audit
import com.ffss.datax.common.domain.configuration.TagsExamTypeMap
import com.ffss.datax.common.domain.tag.PersonalTag
import com.ffss.datax.common.domain.worksheet.Worksheet
import com.ffss.datax.common.util.CustomDateTimeDeserializer
import com.ffss.datax.common.util.CustomDateTimeSerializer

@Entity
@Table(name='study')
@JsonIdentityInfo(generator=ObjectIdGenerators.IntSequenceGenerator, property='@id')
class Study extends Audit{

	@Id
	@Column(name='study_pk')
	Long id

	@JsonIgnore
	@JsonManagedReference
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name='patient_fk')
	Patient patient

	@JsonIgnore
	@JsonManagedReference
	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name='STUDY_STATUS_LKUP_FK')
	StudyLookup status

	@JsonIgnore
	@JsonManagedReference
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name='referring_physician_fk')
	Person referringPhysician

	@JsonIgnore
	@JsonManagedReference
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name='requesting_physician_fk')
	Person requestingPhysician

	@Column(name='description')
	String description


	@NotNull
	@Column(name='vnacrtd_date_time')
	@Type(type = 'org.jadira.usertype.dateandtime.joda.PersistentDateTime')
	@JsonSerialize(using = CustomDateTimeSerializer)
	@JsonDeserialize(using = CustomDateTimeDeserializer)
	DateTime vnaCreatedDateTime

	@Column(name='scheduled_date_time')
	@Type(type = 'org.jadira.usertype.dateandtime.joda.PersistentDateTime')
	@JsonSerialize(using = CustomDateTimeSerializer)
	@JsonDeserialize(using = CustomDateTimeDeserializer)
	DateTime scheduledDateTime

	@Column(name='performed_date_time')
	@Type(type = 'org.jadira.usertype.dateandtime.joda.PersistentDateTime')
	@JsonSerialize(using = CustomDateTimeSerializer)
	@JsonDeserialize(using = CustomDateTimeDeserializer)
	DateTime performedDateTime

	@Column(name='completed_date_time')
	@Type(type = 'org.jadira.usertype.dateandtime.joda.PersistentDateTime')
	@JsonSerialize(using = CustomDateTimeSerializer)
	@JsonDeserialize(using = CustomDateTimeDeserializer)
	DateTime completedDateTime

	@Column(name='study_uid')
	String studyUid

	@Column(name='patient_age')
	String patientAge

	@Column(name='patient_height')
	String patientHeight

	@Column(name='patient_weight')
	String patientWeight

	@Column(name='internal_validation_status')
	String internalValidationStatus

	@JsonIgnore
	@Column(name='archive_status')
	Short archiveStatus

	@Column(name='last_accessed_date_time')
	@Type(type = 'org.jadira.usertype.dateandtime.joda.PersistentDateTime')
	@JsonSerialize(using = CustomDateTimeSerializer)
	@JsonDeserialize(using = CustomDateTimeDeserializer)
	DateTime lastAccessedDateTime

	@Column(name='stmo')
	String stmo

	@Column(name='STUDY_ID')
	String studyId

	@Column(name='QA_STATUS')
	Integer qaStatus

	@JsonIgnore
	@JsonManagedReference
	@OneToMany(mappedBy = 'study',cascade=CascadeType.ALL)
	List<Series> series

	@JsonIgnore
	@JsonManagedReference
	@OneToMany(mappedBy = 'study',cascade=CascadeType.ALL)
	List<SopInstance> sopInstance

	@JsonIgnore
	@JsonManagedReference
	@OneToMany(mappedBy = 'study',cascade=CascadeType.ALL)
	List<Worksheet> worksheet


	@JsonManagedReference
	@OneToOne(mappedBy = 'study',cascade=CascadeType.ALL)
	StudyExamTypeMap studyExamTypeMap

	@JsonIgnore
	@JsonManagedReference
	@OneToOne(mappedBy = 'study',cascade=CascadeType.ALL)
	StudyUserAssignment studyUserAssignment

	@Column(name='STUDY_TYPE')
	String studyType

	@Column(name='IS_DELETED')
	String deleted

	@Column(name='IS_SHARED')
	String isShared

	@Column(name='ORG_FK')
	Long orgFk

	@JsonIgnore
	@JsonManagedReference
	@OneToOne(mappedBy = 'study',cascade=CascadeType.ALL)
	StudyTaskMap studyTaskMap


	@ManyToMany(cascade = CascadeType.ALL)
	@JsonManagedReference
	@JoinTable(name = 'study_tag_map',
	joinColumns =
	@JoinColumn(name = 'STUDY_FK', referencedColumnName = 'STUDY_PK'),
	inverseJoinColumns =
	@JoinColumn(name = 'TAG_EXAMTYPE_MAP_FK',referencedColumnName = 'TAG_EXAMTYPE_MAP_PK')
	)
	List<TagsExamTypeMap> tags = []



	@Column(name='QA_ASSIGNED_DATE_TIME')
	@Type(type = 'org.jadira.usertype.dateandtime.joda.PersistentDateTime')
	@JsonSerialize(using = CustomDateTimeSerializer)
	@JsonDeserialize(using = CustomDateTimeDeserializer)
	DateTime qaAssignedDateTime


	@Column(name='ATTENDING_ASSIGNED_DATE_TIME')
	@Type(type = 'org.jadira.usertype.dateandtime.joda.PersistentDateTime')
	@JsonSerialize(using = CustomDateTimeSerializer)
	@JsonDeserialize(using = CustomDateTimeDeserializer)
	DateTime attendingAssignedDateTime

	@ManyToMany(cascade = CascadeType.ALL)
	@JsonManagedReference
	@JoinTable(name = 'study_tag_map',
	joinColumns =
	@JoinColumn(name = 'STUDY_FK', referencedColumnName = 'STUDY_PK'),
	inverseJoinColumns =
	@JoinColumn(name = 'TAG_EXAMTYPE_MAP_FK',referencedColumnName = 'PERSONAL_TAG_PK')
	)
	List<PersonalTag> personal_tags = []

	@Column(name='LAST_STATUS_CHANGED_DATE_TIME')
	@Type(type = 'org.jadira.usertype.dateandtime.joda.PersistentDateTime')
	@JsonSerialize(using = CustomDateTimeSerializer)
	@JsonDeserialize(using = CustomDateTimeDeserializer)
	DateTime lastStatusChangedDateTime
	
	@Column(name='IS_ALERTED')
	String alerted
	
	@JsonManagedReference
	@OneToOne(mappedBy = 'study',cascade=CascadeType.ALL)
	AccessionNumber accessionNumber


	
}

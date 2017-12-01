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
import org.hibernate.validator.constraints.NotEmpty
import org.joda.time.DateTime

import com.fasterxml.jackson.annotation.JsonBackReference
import com.fasterxml.jackson.annotation.JsonIgnore
import com.fasterxml.jackson.databind.annotation.JsonDeserialize
import com.fasterxml.jackson.databind.annotation.JsonSerialize
import com.ffss.datax.common.domain.audit.Audit
import com.ffss.datax.common.util.CustomDateTimeDeserializer
import com.ffss.datax.common.util.CustomDateTimeSerializer

@Entity
@Table(name='sop_instance')
class SopInstance extends Audit {

	@Id
	@Column(name='SOP_INSTANCE_PK')
	Long id
	
	
	@JsonBackReference
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name='series_fk')
	Series series
	
	@JsonIgnore
	@JsonBackReference
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name='study_fk')
	Study study
	
	@Column(name='SOP_INSTANCE_TYPE')
	Integer instanceType

	@Column(name='SOP_INSTANCE_UID')
	String instanceUid

	@Column(name='SOP_CUID')
	String cUid

	@Column(name='ACQUIRED_DATE_TIME')
	@Type(type = 'org.jadira.usertype.dateandtime.joda.PersistentDateTime')
	@JsonSerialize(using = CustomDateTimeSerializer)
	@JsonDeserialize(using = CustomDateTimeDeserializer)
	DateTime instanceDateTime

	@Column(name='FILE_NAME')
	String instanceFileName

	@Column(name='IMAGE_NUMBER')
	Integer imageNumber

	@Column(name='COMMITTED_INDICATOR')
	String indicator

	@Column(name='ORIGINAL_SIZE')
	Long size

	@Column(name='FRAME_COUNT')
	Long frameCount

	
}

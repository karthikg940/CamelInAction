package com.ffss.datax.common.domain.audit

import javax.persistence.Column
import javax.persistence.MappedSuperclass
import javax.persistence.PrePersist

import org.hibernate.annotations.Type
import org.joda.time.DateTime

import com.fasterxml.jackson.databind.annotation.JsonDeserialize
import com.fasterxml.jackson.databind.annotation.JsonSerialize
import com.ffss.datax.common.util.CustomDateTimeDeserializer
import com.ffss.datax.common.util.CustomDateTimeSerializer

@MappedSuperclass
class Audit {
	@Column(name='created_by')
	Long createdBy

	@Column(name='updated_by')
	Long updatedBy

	@Column(name='CREATED_DATE_TIME')
	@Type(type = 'org.jadira.usertype.dateandtime.joda.PersistentDateTime')
	@JsonSerialize(using = CustomDateTimeSerializer)
	@JsonDeserialize(using = CustomDateTimeDeserializer)
	DateTime createdDateTime

	@Column(name='UPDATED_DATE_TIME')
	@Type(type = 'org.jadira.usertype.dateandtime.joda.PersistentDateTime')
	@JsonSerialize(using = CustomDateTimeSerializer)
	@JsonDeserialize(using = CustomDateTimeDeserializer)
	DateTime updatedDateTime

	@PrePersist
	void addAllAuditColumns() {
		createdDateTime = DateTime.now()
		updatedDateTime = DateTime.now()
	}
}

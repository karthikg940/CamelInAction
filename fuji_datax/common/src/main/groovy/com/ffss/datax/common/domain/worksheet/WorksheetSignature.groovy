package com.ffss.datax.common.domain.worksheet

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

import com.fasterxml.jackson.databind.annotation.JsonDeserialize
import com.fasterxml.jackson.databind.annotation.JsonSerialize
import com.ffss.datax.common.domain.audit.Audit
import com.ffss.datax.common.util.CustomDateTimeDeserializer
import com.ffss.datax.common.util.CustomDateTimeSerializer

@Entity
@Table(name='signature')
class WorksheetSignature extends Audit {

	@Id
	@GeneratedValue
	@Column(name='SIGN_PK')
	Long id

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name='WRKSHT_FK')
	Worksheet worksheet

	@Column(name='SIGNED_NAME')
	String signedName

	@Column(name='WKSHT_STATUS_CURRENT')
	String wrkShtStatus

	@Column(name='POC_DATE')
	@Type(type = 'org.jadira.usertype.dateandtime.joda.PersistentDateTime')
	@JsonSerialize(using = CustomDateTimeSerializer)
	@JsonDeserialize(using = CustomDateTimeDeserializer)
	DateTime pocDateTime

}

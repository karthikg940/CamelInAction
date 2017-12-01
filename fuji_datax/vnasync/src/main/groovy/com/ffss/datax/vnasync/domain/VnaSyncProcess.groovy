package com.ffss.datax.vnasync.domain

import java.util.Formatter.DateTime

import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.Id
import javax.persistence.Table

import org.hibernate.annotations.Type

import com.fasterxml.jackson.databind.annotation.JsonDeserialize
import com.fasterxml.jackson.databind.annotation.JsonSerialize
import com.ffss.datax.vnasync.domain.util.CustomDateTimeDeserializer
import com.ffss.datax.vnasync.domain.util.CustomDateTimeSerializer

/**
 * 
 * @author Virtusa|Polaris
 *
 */
@Entity
@Table(name ='batch_process')
class VnaSyncProcess{

	@Id
	@Column(name='BATCH_PROCESS_ID_PK')
	Long id

	@Column(name='BATCH_START_TIME')
	@Type(type = 'org.jadira.usertype.dateandtime.joda.PersistentDateTime')
	@JsonSerialize(using = CustomDateTimeSerializer)
	@JsonDeserialize(using = CustomDateTimeDeserializer)
	DateTime batchStartTime

	@Column(name='BATCH_END_TIME')
	@Type(type = 'org.jadira.usertype.dateandtime.joda.PersistentDateTime')
	@JsonSerialize(using = CustomDateTimeSerializer)
	@JsonDeserialize(using = CustomDateTimeDeserializer)
	DateTime batchEndTime

	@Column(name='STATUS')
	String status

	@Column(name='IS_RUNNING')
	String isRunning

	VnaSyncProcess(){}


	VnaSyncProcess(Long id, DateTime batchStartTime, DateTime batchEndTime,  String status, String isRunning) {
		this.id = id
		this.batchStartTime = batchStartTime
		this.batchEndTime = batchEndTime
		this.status = status
		this.isRunning = isRunning
	}
}

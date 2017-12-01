package com.ffss.datax.common.domain.notification

import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.Id
import javax.persistence.Table

import com.ffss.datax.common.domain.audit.Audit

@Entity
@Table(name='notification_alert')
class NotificationAlert extends Audit {
	
	@Id
	@GeneratedValue
	@Column(name='ID')
	Long id
	
	@Column(name='ORG_ID')
	Long orgId
	
	@Column(name='CHANNEL_ID')
	Long channel_id
	
	@Column(name='DATAX_RECEIVER')
	Long datax_receiver

	@Column(name='MESSAGE')
	String message	
		
	@Column(name='STATUS')
	String status
	
}


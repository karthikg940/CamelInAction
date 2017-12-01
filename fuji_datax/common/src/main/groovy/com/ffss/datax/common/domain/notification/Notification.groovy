package com.ffss.datax.common.domain.notification

import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.Id
import javax.persistence.Lob
import javax.persistence.Table

import com.ffss.datax.common.domain.audit.Audit

@Entity
@Table(name='NOTIFICATION')
class Notification extends Audit{

	@Id
	@GeneratedValue
	@Column(name='ID')
	Long id
	
	@Column(name='ORG_ID')
	Long orgId
		
	@Column(name='CHANNEL_ID')
	int channelId
	
	@Lob
	@Column(name='NOTIFICATION')
	String notification
	
	@Column(name='STATUS')
	String status
	
	@Column(name='ERROR_COUNT')
	int errorCount	
	
}

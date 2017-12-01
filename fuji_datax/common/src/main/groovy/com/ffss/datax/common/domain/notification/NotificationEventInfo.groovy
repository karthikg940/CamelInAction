package com.ffss.datax.common.domain.notification

import com.ffss.datax.common.domain.audit.Audit
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.Id
import javax.persistence.Lob
import javax.persistence.Table

@Entity
@Table(name='notification_events_info')
class NotificationEventInfo extends Audit {
	
	@Id
	@GeneratedValue
	@Column(name='NOTIFICATION_EVENTS_PK')
	Long id
	
	@Column(name='ORG_ID')
	Long orgId
	
	@Column(name='EVENT_CODE')
	String eventCode
	
	@Column(name='EVENT_TYPE')
	String eventType
	
	@Lob
	@Column(name='EVENT_DETAILS')
	String eventDetails
	
}

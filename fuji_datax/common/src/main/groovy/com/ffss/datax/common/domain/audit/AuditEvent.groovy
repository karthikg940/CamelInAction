package com.ffss.datax.common.domain.audit

import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.FetchType
import javax.persistence.GeneratedValue
import javax.persistence.Id
import javax.persistence.JoinColumn
import javax.persistence.Lob
import javax.persistence.ManyToOne
import javax.persistence.Table

import com.fasterxml.jackson.annotation.JsonManagedReference

@Entity
@Table(name='AUDIT_EVENT')
class AuditEvent extends Audit{


	@Id
	@GeneratedValue
	@Column(name='EVENT_PK')
	Long id

	@JsonManagedReference
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name='EVENT_TYPE_FK')
	AuditEventType auditEventType

	@Lob
	@Column(name='EVENT_PREV_VALUE')
	String eventPrevValue

	@Lob
	@Column(name='EVENT_CURR_VALUE')
	String eventCurrValue

	@Column(name='MICROSERVICE_NAME')
	String microserviceName

	@Column(name='AUDIT_USERNAME')
	String auditUsername
	
	@Column(name='ENTITY_NAME')
	String entityName
	
	@Column(name='ENTITY_ID')
	Long entityId
	
	
}

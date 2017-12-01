package com.ffss.datax.common.domain.audit

import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.Id
import javax.persistence.Table

@Entity
@Table(name='AUDIT_EVENT_TYPE')
class AuditEventType extends Audit{


	@Id
	@GeneratedValue
	@Column(name='EVENT_TYPE_PK')
	Long id

	@Column(name='EVENT_CODE')
	Long eventCode

	@Column(name='EVENT_CODE_DESCRIPTION')
	String eventCodeDesc
}

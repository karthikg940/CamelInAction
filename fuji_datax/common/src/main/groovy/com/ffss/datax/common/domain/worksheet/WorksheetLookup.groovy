package com.ffss.datax.common.domain.worksheet

import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.Id
import javax.persistence.Table

import com.ffss.datax.common.domain.audit.Audit

@Entity
@Table(name='wksht_status_lkup')
class WorksheetLookup extends Audit {
	
	@Id
	@GeneratedValue
	@Column(name='WKSHT_STATUS_LKUP_PK')
	Long id
	
	@Column(name='STATUS_DESCRIPTION')
	String name
	
}

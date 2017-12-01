package com.ffss.datax.common.domain.workflow

import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.FetchType
import javax.persistence.GeneratedValue
import javax.persistence.Id
import javax.persistence.JoinColumn
import javax.persistence.ManyToOne
import javax.persistence.Table

import com.fasterxml.jackson.annotation.JsonBackReference
import com.fasterxml.jackson.annotation.JsonIgnore
import com.ffss.datax.common.domain.audit.Audit
import com.ffss.datax.common.domain.userprofile.Organization


@Entity
@Table(name='custom_workflow')
class Preference extends Audit {

	@Id
	@GeneratedValue
	@Column(name='TRANSACTION_PK')
	Long id
	
	@JsonIgnore
	@JsonBackReference
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name='MASTER_FK')
	MasterPreference masterPreference
	
	@JsonIgnore
	@JsonBackReference
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name='ORG_FK')
	Organization organization
	
	@Column(name='FLAG')
	String isEnabled
	
}

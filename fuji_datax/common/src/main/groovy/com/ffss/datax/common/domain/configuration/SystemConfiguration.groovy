package com.ffss.datax.common.domain.configuration

import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.Id
import javax.persistence.JoinColumn
import javax.persistence.OneToOne
import javax.persistence.Table

import com.ffss.datax.common.domain.audit.Audit
import com.ffss.datax.common.domain.userprofile.Organization


@Entity
@Table(name='system_configuration')
class SystemConfiguration extends Audit{

	@Id
	@GeneratedValue
	@Column(name='SYSTEM_CONFIGURATION_PK')
	Long id

	@Column(name='SYSTEM_CONFIGURATION_NAME')
	String sysConfigName

	@Column(name='DESCRIPTION')
	String description

	@Column(name='SYSTEM_CONFIGURATION_VALUE')
	String sysConfigValue
	
	@OneToOne
	@JoinColumn(name='ORG_FK')
	Organization organization
}

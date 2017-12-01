package com.ffss.datax.common.domain.configuration

import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.FetchType
import javax.persistence.GeneratedValue
import javax.persistence.Id
import javax.persistence.JoinColumn
import javax.persistence.OneToOne
import javax.persistence.Table

import com.ffss.datax.common.domain.userprofile.Organization

@Entity
@Table(name='org_preference')
class Configuration {

	@Id
	@GeneratedValue
	@Column(name='CONFIGURATION_PK')
	Long id

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name='ORG_FK')
	Organization organization

	@Column(name='THRESHOLD_TIME_LIMIT')
	Long thresholdTimeLimit
}

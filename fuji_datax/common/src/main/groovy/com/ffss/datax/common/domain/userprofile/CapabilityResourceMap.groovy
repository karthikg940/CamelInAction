package com.ffss.datax.common.domain.userprofile

import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.FetchType
import javax.persistence.GeneratedValue
import javax.persistence.Id
import javax.persistence.JoinColumn
import javax.persistence.ManyToOne
import javax.persistence.Table

import com.fasterxml.jackson.annotation.JsonIgnore
import com.fasterxml.jackson.annotation.JsonManagedReference
import com.ffss.datax.common.domain.audit.Audit

@Entity
@Table(name='capability_resource_mapping')
class CapabilityResourceMap extends Audit{
	@Id
	@GeneratedValue
	@Column(name='CAPABILITY_RESOURCE_MAPPING_PK')
	Long id
	@Column(name='RESOURCE')
	String resource

	@Column(name='END_POINT')
	String endPoint
	
	@JsonIgnore
	@JsonManagedReference
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name='CAPABILITY_FK')
	Capability capability
}

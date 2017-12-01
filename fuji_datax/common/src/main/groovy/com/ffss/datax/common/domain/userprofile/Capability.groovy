package com.ffss.datax.common.domain.userprofile

import javax.persistence.CascadeType
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.FetchType
import javax.persistence.GeneratedValue
import javax.persistence.Id
import javax.persistence.JoinColumn
import javax.persistence.ManyToOne
import javax.persistence.OneToMany
import javax.persistence.Table

import com.fasterxml.jackson.annotation.JsonBackReference
import com.fasterxml.jackson.annotation.JsonIgnore
import com.fasterxml.jackson.annotation.JsonManagedReference
import com.ffss.datax.common.domain.audit.Audit

@Entity
@Table(name='capability')
class Capability extends Audit{

	@Id
	@GeneratedValue
	@Column(name='CAPABILITY_PK')
	Long id

	@Column(name='CAPABILITY_NAME')
	String capabilityName

	@Column(name='DESCRIPTION')
	String description
	
	@JsonIgnore
	@JsonManagedReference
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name='PERMISSION_FK')
	Permission permission
	
	@JsonIgnore
	@JsonBackReference
	@OneToMany(mappedBy='capability',cascade=CascadeType.ALL)
	List<CapabilityResourceMap> capabilityResourceMap
}

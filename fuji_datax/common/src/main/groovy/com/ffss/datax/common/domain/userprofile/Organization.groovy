package com.ffss.datax.common.domain.userprofile

import javax.persistence.CascadeType
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.FetchType
import javax.persistence.GeneratedValue
import javax.persistence.Id
import javax.persistence.ManyToMany
import javax.persistence.OneToMany
import javax.persistence.OneToOne
import javax.persistence.Table

import com.fasterxml.jackson.annotation.JsonBackReference
import com.fasterxml.jackson.annotation.JsonIgnore
import com.fasterxml.jackson.annotation.JsonManagedReference
import com.ffss.datax.common.domain.audit.Audit
import com.ffss.datax.common.domain.configuration.ConfigurationSetting
import com.ffss.datax.common.domain.configuration.OrgLoginConfigMap
import com.ffss.datax.common.domain.configuration.SystemConfiguration
import com.ffss.datax.common.domain.study.DicomMap
import com.ffss.datax.common.domain.study.PatientWorklist
import com.ffss.datax.common.domain.workflow.Preference

@Entity
@Table(name='organization')
//@JsonIdentityInfo(generator=ObjectIdGenerators.IntSequenceGenerator.class, property='@id')
class Organization extends Audit{
	
	@Id
	@Column(name='ORG_PK')
	Long id
		
	@Column(name='ORG_NAME')
	String orgName
	
	@Column(name='DESCRIPTION')
	String description
	
	@Column(name='IS_PMO')
	String isPmo
	
	@Column(name='IS_STMO')
	String isStmo
	
	@Column(name='ID_TYPE')
	String idType
	
	@Column(name='PREFIX')
	String prefix
	
	@JsonManagedReference
	@OneToOne(mappedBy = 'organization',cascade=CascadeType.ALL)
	DicomMap dicomMap

	@JsonIgnore
	@JsonManagedReference
	@OneToMany(mappedBy = 'organization',cascade=CascadeType.ALL)
	List<UserAccount> userAccount
	
	@JsonIgnore
	@JsonManagedReference
	@OneToMany(mappedBy = 'organization',cascade=CascadeType.ALL)
	List<Preference> transactionPreference

	@JsonIgnore
	@JsonManagedReference
	@OneToMany(mappedBy = 'organization',cascade=CascadeType.ALL)
	List<UserGroup> userGroup
	
	@JsonManagedReference
	@OneToOne(mappedBy = 'organization',cascade=CascadeType.ALL)
	ConfigurationSetting configSetting
	
	@JsonIgnore
	@JsonBackReference
	@OneToMany(mappedBy='patient',cascade=CascadeType.ALL)
	List<PatientWorklist> patientWorklist
	
	@JsonManagedReference
	@OneToOne(mappedBy = 'organization',cascade=CascadeType.ALL)
	OrgLoginConfigMap orgLoginConfigMap
	
	@JsonManagedReference
	@OneToOne(mappedBy = 'organization',cascade=CascadeType.ALL)
	SystemConfiguration systemConfig
	
	@Column(name='PARENT_ORG_FK')
	Long parentOrgFk
	
	@JsonIgnore
	@ManyToMany(fetch = FetchType.EAGER, mappedBy = 'organization')
	@JsonBackReference
	List<UserRole> roles = []

}

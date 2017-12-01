package com.ffss.datax.common.domain.configuration


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
@Table(name='ldap_config')
class LdapConfig extends Audit {
	@Id
	@GeneratedValue
	@Column(name='LDAP_CONFIG_PK')
	Long id
	
	@Column(name='DIRECTORY_TYPE')
	String directoryType
	
	@Column(name='REMOTE_DOMAIN')
	String remoteDomain

	@Column(name='REMOTE_SERVER')
	String remoteServer

	@Column(name='ACCESS_GROUP')
	String accessGroup

	@Column(name='SEARCH_ROOT')
	String searchRoot
	
	@Column(name='LDAP_PORT')
	Long ldapPort
	
	@Column(name='USER_DN')
	String userDn

	@Column(name='MANAGE_DN')
	String manageDn

	@Column(name='MANAGE_PASSWORD')
	String managePassword
	
	@JsonIgnore
	@JsonBackReference
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name='org_fk')
	Organization organization
	
}
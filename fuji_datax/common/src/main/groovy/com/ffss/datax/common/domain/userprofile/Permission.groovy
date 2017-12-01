package com.ffss.datax.common.domain.userprofile

import javax.persistence.CascadeType
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.FetchType
import javax.persistence.GeneratedValue
import javax.persistence.Id
import javax.persistence.ManyToMany
import javax.persistence.OneToMany
import javax.persistence.Table

import com.fasterxml.jackson.annotation.JsonBackReference
import com.fasterxml.jackson.annotation.JsonIgnore
import com.ffss.datax.common.domain.audit.Audit

@Entity
@Table(name='permission')
class Permission extends Audit{

	@Id
	@GeneratedValue
	@Column(name='PERMISSION_PK')
	Long id

	@Column(name='PERMISSION_NAME')
	String permissionName

	@Column(name='DESCRIPTION')
	String description

	@JsonIgnore
	@JsonBackReference
	@OneToMany(mappedBy='permission',cascade=CascadeType.ALL)
	List<Capability> capability


	@JsonIgnore
	@ManyToMany(fetch = FetchType.EAGER, mappedBy = 'permission')
	@JsonBackReference
	List<UserAccount> users = []

	@JsonIgnore
	@ManyToMany(fetch = FetchType.EAGER, mappedBy = 'permission')
	@JsonBackReference
	List<UserRole> roles =  []

	@JsonIgnore
	@ManyToMany(fetch = FetchType.EAGER, mappedBy = 'permission')
	@JsonBackReference
	List<UserGroup> groups = []
}

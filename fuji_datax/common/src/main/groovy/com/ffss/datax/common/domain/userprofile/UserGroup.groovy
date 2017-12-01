package com.ffss.datax.common.domain.userprofile

import javax.persistence.CascadeType
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.FetchType
import javax.persistence.GeneratedValue
import javax.persistence.Id
import javax.persistence.JoinColumn
import javax.persistence.JoinTable
import javax.persistence.ManyToMany
import javax.persistence.ManyToOne
import javax.persistence.Table

import com.fasterxml.jackson.annotation.JsonManagedReference
import com.ffss.datax.common.domain.audit.Audit

@Entity
@Table(name='user_group')
class UserGroup extends Audit{
	@Id
	@GeneratedValue
	@Column(name='USER_GROUP_PK')
	Long id

	@Column(name='GROUP_NAME')
	String groupName

	@Column(name='DESCRIPTION')
	String description

	/*@JsonIgnore
	@JsonManagedReference
	@OneToMany(mappedBy ='userGroup',cascade=CascadeType.ALL)
	List<UserAccountGroup> userAccountGroup*/

	@ManyToMany(cascade = CascadeType.ALL)
	@JsonManagedReference
	@JoinTable(name = 'useracc_group_mapping',
	joinColumns =
	@JoinColumn(name = 'USER_GROUP_FK', referencedColumnName = 'USER_GROUP_PK'),
	inverseJoinColumns =
	@JoinColumn(name = 'USER_ACCOUNT_FK',referencedColumnName = 'USER_ACCOUNT_PK')
	)
	List<UserAccount> users = [] 
	
	@Column(name='IS_DELETED')
	String isDeleted = 'N'
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name='org_fk')
	Organization organization
	
	@ManyToMany(cascade = CascadeType.ALL)
	@JsonManagedReference
	@JoinTable(name = 'group_permission_mapping',
	joinColumns = 
	@JoinColumn(name = 'USER_GROUP_FK', referencedColumnName = 'USER_GROUP_PK'),
	inverseJoinColumns =
	@JoinColumn(name = 'PERMISSION_FK',referencedColumnName = 'PERMISSION_PK')
	)
	List<Permission> permission =  []
	
	@ManyToMany(cascade = CascadeType.ALL)
	@JsonManagedReference
	@JoinTable(name = 'group_role_mapping',
	joinColumns =
	@JoinColumn(name = 'USER_GROUP_FK', referencedColumnName = 'USER_GROUP_PK'),
	inverseJoinColumns =
	@JoinColumn(name = 'USER_ROLE_FK',referencedColumnName = 'USER_ROLE_PK')
	)
	List<UserRole> role =  []
	
	@ManyToMany(cascade = CascadeType.ALL)
	@JsonManagedReference
	@JoinTable(name = 'group_org_mapping',
	joinColumns =
	@JoinColumn(name = 'USER_GROUP_FK', referencedColumnName = 'USER_GROUP_PK'),
	inverseJoinColumns =
	@JoinColumn(name = 'GROUP_ORG_FK',referencedColumnName = 'ORG_PK')
	)
	List<Organization> org =  []
}

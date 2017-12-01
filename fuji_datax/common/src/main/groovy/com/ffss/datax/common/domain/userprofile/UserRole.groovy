package com.ffss.datax.common.domain.userprofile

import javax.persistence.CascadeType
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.Id
import javax.persistence.JoinColumn
import javax.persistence.JoinTable
import javax.persistence.ManyToMany
import javax.persistence.Table
import javax.validation.constraints.NotNull

import org.hibernate.annotations.Type
import org.joda.time.DateTime

import com.fasterxml.jackson.annotation.JsonManagedReference
import com.fasterxml.jackson.databind.annotation.JsonDeserialize
import com.fasterxml.jackson.databind.annotation.JsonSerialize
import com.ffss.datax.common.domain.audit.Audit
import com.ffss.datax.common.util.CustomDateTimeDeserializer
import com.ffss.datax.common.util.CustomDateTimeSerializer

@Entity
@Table(name='user_role')
class UserRole extends Audit{
	@Id
	@GeneratedValue
	@Column(name='USER_ROLE_PK')
	Long id

	@Column(name='ROLE_NAME')
	String roleName

	@Column(name='DESCRIPTION')
	String description

	@Column(name='IS_DELETED')
	String isDeleted = 'N'

	@NotNull
	@Column(name='ROLE_START_DATE')
	@Type(type = 'org.jadira.usertype.dateandtime.joda.PersistentDateTime')
	@JsonSerialize(using = CustomDateTimeSerializer)
	@JsonDeserialize(using = CustomDateTimeDeserializer)
	DateTime roleStartDateTime

	@Column(name='ROLE_END_DATE')
	@Type(type = 'org.jadira.usertype.dateandtime.joda.PersistentDateTime')
	@JsonSerialize(using = CustomDateTimeSerializer)
	@JsonDeserialize(using = CustomDateTimeDeserializer)
	DateTime roleEndDateTime

	@ManyToMany(cascade = CascadeType.ALL)
	@JsonManagedReference
	@JoinTable(name = 'useracc_role_mapping',
	joinColumns =
	@JoinColumn(name = 'USER_ROLE_FK', referencedColumnName = 'USER_ROLE_PK'),
	inverseJoinColumns =
	@JoinColumn(name = 'USER_ACCOUNT_FK',referencedColumnName = 'USER_ACCOUNT_PK')
	)
	List<UserAccount> users = []

	@ManyToMany(cascade = CascadeType.ALL)
	@JsonManagedReference
	@JoinTable(name = 'role_permission_mapping',
	joinColumns =
	@JoinColumn(name = 'USER_ROLE_FK', referencedColumnName = 'USER_ROLE_PK'),
	inverseJoinColumns =
	@JoinColumn(name = 'PERMISSION_FK',referencedColumnName = 'PERMISSION_PK')
	)
	List<Permission> permission = []
	
	@ManyToMany(cascade = CascadeType.ALL)
	@JsonManagedReference
	@JoinTable(name = 'org_role_mapping',
	joinColumns =
	@JoinColumn(name = 'USER_ROLE_FK', referencedColumnName = 'USER_ROLE_PK'),
	inverseJoinColumns =
	@JoinColumn(name = 'ORG_FK',referencedColumnName = 'ORG_PK')
	)
	List<Organization> organization = []
	
	@ManyToMany(cascade = CascadeType.ALL)
	@JsonManagedReference
	@JoinTable(name = 'group_role_mapping',
	joinColumns =
	@JoinColumn(name = 'USER_ROLE_FK', referencedColumnName = 'USER_ROLE_PK'),
	inverseJoinColumns =
	@JoinColumn(name = 'USER_GROUP_FK',referencedColumnName = 'USER_GROUP_PK')
	)
	List<UserGroup> groups = []
}

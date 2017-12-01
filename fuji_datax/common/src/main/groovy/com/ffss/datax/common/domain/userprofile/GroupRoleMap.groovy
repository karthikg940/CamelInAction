package com.ffss.datax.common.domain.userprofile

import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.FetchType
import javax.persistence.GeneratedValue
import javax.persistence.Id
import javax.persistence.JoinColumn
import javax.persistence.ManyToOne
import javax.persistence.Table

import com.ffss.datax.common.domain.audit.Audit

@Entity
@Table(name='group_role_mapping')
class GroupRoleMap extends Audit{
	@Id
	@GeneratedValue
	@Column(name='GROUP_ROLE_MAPPING_PK')
	Long id
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name='USER_GROUP_FK')
	UserGroup userGroup
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name='USER_ROLE_FK')
	UserRole userRole
}

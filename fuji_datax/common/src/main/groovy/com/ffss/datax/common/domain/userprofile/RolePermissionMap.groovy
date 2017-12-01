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
@Table(name='role_permission_mapping')
class RolePermissionMap extends Audit{
	@Id
	@GeneratedValue
	@Column(name='ROLE_PERMISSION_MAPPING_PK')
	Long id

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name='PERMISSION_FK')
	Permission permission
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name='USER_ROLE_FK')
	UserRole userRole

}

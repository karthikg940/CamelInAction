/*package com.ffss.datax.common.domain

import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.FetchType
import javax.persistence.GeneratedValue
import javax.persistence.Id
import javax.persistence.JoinColumn
import javax.persistence.ManyToOne
import javax.persistence.Table

@Entity
@Table(name='useracc_group_mapping')
class UserAccountGroup extends Audit{
	@Id
	@GeneratedValue
	@Column(name='USERACC_GROUP_MAPPING_PK')
	Long id
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name='USER_ACCOUNT_FK')
	UserAccount userAccount

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name='USER_GROUP_FK')
	UserGroup userGroup
}
*/
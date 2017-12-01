package com.ffss.datax.common.domain.tag

import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.Id
import javax.persistence.Table

import org.joda.time.DateTime

import com.ffss.datax.common.domain.audit.Audit

@Entity
@Table(name='personal_tag')
class PersonalTag extends Audit{
	
	@Id
	@GeneratedValue
	@Column(name='PERSONAL_TAG_PK')
	Long id
	
	@Column(name='TAG_NAME')
	String name
	
	@Column(name='USER_ID')
	Long userId
	
}

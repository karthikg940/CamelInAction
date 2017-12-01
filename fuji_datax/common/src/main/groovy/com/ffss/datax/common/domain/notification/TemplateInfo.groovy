package com.ffss.datax.common.domain.notification

import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.Id
import javax.persistence.Table

@Entity
@Table(name='template_info')
class TemplateInfo {
	
	@Id
	@GeneratedValue
	@Column(name='TEMP_ID')
	Long tempId

	@Column(name='ORG_ID')
	Long orgId
		
	@Column(name='TEMP_NAME')
	String tempName
	
	@Column(name='TEMP_TYPE')
	String tempType
	
	@Column(name='DESCRIPTION')
	String description
	
	@Column(name='SUBJECT')
	String subject
	
	@Column(name='PATH')
	String path
}

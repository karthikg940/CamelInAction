package com.ffss.datax.common.domain.configuration

import javax.persistence.Column;
import javax.persistence.Entity
import javax.persistence.Id
import javax.persistence.Table

@Entity
@Table(name='preference_type')
class PreferenceType {

	@Id
	@Column(name='PREFERENCE_TYPE_ID')
	Long id
	
	@Column(name='NAME')
	String name
}

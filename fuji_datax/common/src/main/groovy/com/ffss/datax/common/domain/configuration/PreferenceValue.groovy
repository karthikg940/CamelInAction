package com.ffss.datax.common.domain.configuration

import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.FetchType
import javax.persistence.GeneratedValue
import javax.persistence.Id
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany
import javax.persistence.Table
import javax.persistence.criteria.Fetch;

@Entity
@Table(name='preference_value')
class PreferenceValue {

	@Id
	@GeneratedValue
	@Column(name='PREFERENCE_VALUE_ID')
	Long id;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name='PREFERENCE_TYPE_ID') 
	PreferenceType preferenceType
	
	@Column(name='DISPLAY_VALUE')		
	String displayValue
	
}

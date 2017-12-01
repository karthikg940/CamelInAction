package com.ffss.datax.common.domain.configuration

import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.FetchType
import javax.persistence.GeneratedValue
import javax.persistence.Id
import javax.persistence.JoinColumn
import javax.persistence.ManyToOne
import javax.persistence.OneToOne
import javax.persistence.Table

@Entity
@Table(name='system_preference')
class SystemPreference {

	@Id
	@GeneratedValue
	@Column(name='ID')
	Long id;
	
	@Column(name='SYSTEM_PREFERENCE_ID')
	Long systemPreferenceId;
		
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name='PREFERENCE_TYPE_ID')
	PreferenceType preferenceType
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name='PREFERENCE_VALUE_ID')
	PreferenceValue preferenceValue
	
	
}

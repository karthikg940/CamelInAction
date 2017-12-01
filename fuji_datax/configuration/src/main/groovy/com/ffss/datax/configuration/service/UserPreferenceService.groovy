package com.ffss.datax.configuration.service

import groovy.util.logging.Log4j

import javax.transaction.Transactional

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

import com.fasterxml.jackson.databind.ser.std.StdKeySerializers.Default
import com.ffss.datax.common.domain.configuration.PreferenceType;
import com.ffss.datax.common.domain.configuration.PreferenceValue
import com.ffss.datax.common.domain.configuration.SystemPreference
import com.ffss.datax.common.domain.configuration.UserPreference
import com.ffss.datax.configuration.repository.PreferenceTypeRepository;
import com.ffss.datax.configuration.repository.PreferenceValueRepository
import com.ffss.datax.configuration.repository.SystemPreferenceRepository
import com.ffss.datax.configuration.repository.UserPreferenceRepository

@Log4j
@Service
class UserPreferenceService {

	@Autowired
	UserPreferenceRepository userPreferenceRepository

	@Autowired
	PreferenceValueRepository preferenceValueRepository

	@Autowired
	SystemPreferenceRepository systemPreferenceRepository

	@Autowired
	PreferenceTypeRepository preferenceTypeRepository


	def getPreference(Long userId,Long type) {
		def preference = userPreferenceRepository.getValue(userId, type);
		if(preference == null){
			preference = systemPreferenceRepository.getValue(type)
		}
		getAllPreferenceValues(preference?.preferenceType.id,preference?.preferenceValue.id)
	}


	@Transactional
	def updatePreference(userId, data){
		def userPreference = null
		PreferenceValue preferenceValue = preferenceValueRepository.findOne(data.preferenceValueId.asType(Long.class))
		if(preferenceValue != null){
			userPreference = userPreferenceRepository.getValue(userId, data.preferenceTypeId.asType(Long.class))
			if(userPreference == null){
				userPreference = new UserPreference()
				userPreference.userId = userId
				userPreference.preferenceType = preferenceTypeRepository.findOne(data.preferenceTypeId.asType(Long.class))
			}
			userPreference.preferenceValue = preferenceValue
			userPreferenceRepository.save(userPreference)
		}
		userPreference
	}


	def getAllPreferenceValues(Long preferenceTypeId,Long preferenceValueId){
		preferenceValueRepository.getDisplayValue(preferenceTypeId).collect{
			def isDefault = false
			if(it.id == preferenceValueId){
				isDefault=true
			}
			[name:it.displayValue,default: isDefault, preferenceValueId:it.id,preferenceTypeId:it.preferenceType.id]
		}
	}
}

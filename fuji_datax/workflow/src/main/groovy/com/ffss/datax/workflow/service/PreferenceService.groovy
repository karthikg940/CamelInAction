package com.ffss.datax.workflow.service

import groovy.util.logging.Log4j

import javax.annotation.PostConstruct

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.core.env.Environment
import org.springframework.stereotype.Service

import com.ffss.datax.common.constants.PreferenceEnum
import com.ffss.datax.workflow.constants.WorkflowConstants
import com.ffss.datax.workflow.repository.PreferenceRepository
import com.ffss.datax.workflow.repository.UserRepository
/**
 * The Class PreferenceService.
 *
 * @author Virtusa|Polaris
 */
@Log4j
@Service
class PreferenceService {
	@Autowired
	UserRepository userRepository

	@Autowired
	PreferenceRepository preferenceRepository

	@Autowired
	private Environment env

	def submitOnSign = false

	@PostConstruct
	void init() {
		this.submitOnSign = env.getProperty(WorkflowConstants.SUBMIT_ON_SIGN)
	}

	/**
	 * Method to get the preference based on logged in user Organization Id .
	 *
	 * @param userId - the user id
	 * @return preference
	 */
	def findPreference(userId) {
		def retVal
		def org = userRepository.findOne(userId)
		if(org){
			def preference = preferenceRepository.findByOrganizationId(org.organization.id.asType(Long))
			retVal =getPreference(preference)
			log.info("preference is - ${retVal}")
		}
		retVal
	}
	/**
	 * Get the preference
	 * @param preference
	 * @return
	 */
	def getPreference(preference){
		def preferenceMap = [:]
		preference.each{ pref ->
			if(pref.isEnabled == WorkflowConstants.FLAG_YES){
				preferenceMap[pref.masterPreference.id] = true
			}
		}
		def isSubmitOnSign = false
		if(submitOnSign == (WorkflowConstants.VALUE_TRUE)){
			isSubmitOnSign = true
		}

		[qaEnabled:preferenceMap.containsKey(PreferenceEnum.POCQA.value),
			attestationEnabled:preferenceMap.containsKey(PreferenceEnum.POCAttending.value),
			pocQaAttending:preferenceMap.containsKey(PreferenceEnum.POCQAAttending.value),
			submitOnSign:isSubmitOnSign]
	}
}

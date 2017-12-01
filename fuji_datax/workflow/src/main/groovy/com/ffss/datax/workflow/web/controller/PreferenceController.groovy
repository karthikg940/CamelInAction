package com.ffss.datax.workflow.web.controller

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.RestController

import com.ffss.datax.common.constants.CustomErrorCode
import com.ffss.datax.security.util.SecurityUtil
import com.ffss.datax.workflow.service.PreferenceService

/**
 * The Class PreferenceController.
 * @author Virtusa|Polaris
 */
@RestController
@RequestMapping(value='/api/preference')
class PreferenceController {

	@Autowired
	PreferenceService preferenceService

	/**
	 * API to get the preference
	 * @return preference
	 */
	@RequestMapping(value='',method=RequestMethod.GET)
	def getPreference() {
		def preference=preferenceService.findPreference(SecurityUtil.retrieveUserId())
		preference?preference: new ResponseEntity(CustomErrorCode.ER_404.value, HttpStatus.NOT_FOUND)
	}
}


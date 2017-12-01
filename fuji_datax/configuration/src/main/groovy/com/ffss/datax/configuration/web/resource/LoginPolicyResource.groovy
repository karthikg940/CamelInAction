package com.ffss.datax.configuration.web.resource

import groovy.util.logging.Log4j

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.RestController

import com.ffss.datax.common.constants.CustomErrorCode
import com.ffss.datax.security.util.SecurityUtil
import com.ffss.datax.configuration.service.LoginPolicyService
import com.ffss.datax.configuration.web.transformer.LoginPolicyTransformer


/**
 * LoginPolicyResource provides api's for CRUD operations.
 */
@Log4j
@RestController
@RequestMapping('api/config')
class LoginPolicyResource {

	@Autowired
	LoginPolicyService loginPolicyService

	@Autowired
	LoginPolicyTransformer loginPolicyTransformer

	/**
	 * Save password policy if the validation of passwordObject returns true .
	 *
	 * @param password the password
	 * @return the saved Id
	 */
	@RequestMapping(value='/passwordpolicy',method=RequestMethod.POST)
	def savePasswordPolicy(@RequestBody passwordConfigPolicy) {

		log.debug('Request received for saving the passwordPolicy')

		def response = ResponseEntity.badRequest()
		if (loginPolicyService.validatePasswordPolicy(passwordConfigPolicy)) {
			def passwordPolicy = loginPolicyService.savePasswordPolicyConfig(passwordConfigPolicy,SecurityUtil.retrieveUserId())
			response = ResponseEntity.created(new URI("/api/config/passwordpolicy/${passwordPolicy.id}".toString()))
			log.debug('Password policy has been saved to the DB')
		}
		else {
			log.debug('Password policy object mandatory validation fails')
			response.body(CustomErrorCode.ER_400.value)
		}
		response.build()
	}

	/**
	 * Update password policy based on the passwordConfigurationId.
	 *
	 * @param configId the passwordConfigurationId
	 * @param password the password
	 * @return the status 
	 */
	@RequestMapping(value='/{configId}/passwordpolicy',method=RequestMethod.PUT)
	def updatePasswordPolicy(@PathVariable('configId') configId,@RequestBody passwordConfigPolicy) {

		log.debug("Request received for updating the password policy for configId-${configId}")

		def response = ResponseEntity.badRequest()
		if (loginPolicyService.validatePasswordPolicy(passwordConfigPolicy)) {
			def passwordPolicy = loginPolicyService.updatePasswordPolicy(passwordConfigPolicy,configId.asType(Long),SecurityUtil.retrieveUserId())
			if(passwordPolicy){
				log.debug('Password policy has been successfully updated')
				response = ResponseEntity.ok()
			}
		}
		else {
			log.debug('Password policy mandatory validation fails')
			response.body(CustomErrorCode.ER_400.value)
		}
		response.build()
	}

	/**
	 * Gets the password policy based on the passwordConfigurationId.
	 *
	 * @return the password policy
	 */
	@RequestMapping(value='/passwordpolicy',method=RequestMethod.GET)
	def findPasswordConfigurationPolicy() {

		log.debug('Request received for fetching the passwordConfiguration')
		def passwordConfig = loginPolicyService.findPasswordPolicy()
		loginPolicyTransformer.loginPolicyTransform(passwordConfig)
	}
}

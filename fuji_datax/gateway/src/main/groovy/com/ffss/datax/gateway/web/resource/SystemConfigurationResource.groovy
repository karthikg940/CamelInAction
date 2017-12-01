package com.ffss.datax.gateway.web.resource

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.RequestHeader
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.RestController

import com.ffss.datax.gateway.constants.GatewayConstants
import com.ffss.datax.gateway.service.LoginService
import com.ffss.datax.gateway.service.SystemConfigurationService
/**
 *The Class SystemConfigurationResource.
 *
 *@author Virtusa|Polaris
 */
@RestController
class SystemConfigurationResource {

	@Autowired
	LoginService loginService

	@Autowired
	SystemConfigurationService systemConfigurationService

	/**
	 * API to check ldap is configured or not
	 * 
	 * @return a JSON object ldapConfigEnabled of true or false
	 */
	@RequestMapping(value = 'auth/passwordpolicy', method=RequestMethod.GET)
	def getLdapConfigInfo() {
		loginService.findLdapConfig()
	}

	@RequestMapping(value = 'api/config/passwordpolicy', method=RequestMethod.GET)
	def findPasswordConfigurationPolicy(@RequestHeader('Authorization') token) {

		systemConfigurationService.findPasswordConfigurationPolicy(GatewayConstants.BEARER+token)
		
	}
}

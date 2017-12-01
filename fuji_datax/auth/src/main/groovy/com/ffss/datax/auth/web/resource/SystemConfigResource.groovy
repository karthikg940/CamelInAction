package com.ffss.datax.auth.web.resource

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.RestController

import com.ffss.datax.auth.service.SystemConfigurationService
import com.ffss.datax.auth.web.transformer.SystemConfigTransformer

/**
 * The Class SystemConfigResource.
 *
 * @author Virtusa|Polaris
 */
@RestController
@RequestMapping('api/pwdpolicy')
class SystemConfigResource {
    
	/** System configuration service. **/
	@Autowired
	SystemConfigurationService systemConfigurationService

	/** System configuration Transformer. **/
	@Autowired
	SystemConfigTransformer systemConfigTransformer

	/**
	 * Get the Organizaiton ldap configuration details
	 * 
	 * return true or false
	 */
	
	@RequestMapping(value='',method=RequestMethod.GET)
	def getSystemConfig(){
		def sysConfig = systemConfigurationService.getSystemConfig()
		systemConfigTransformer.transform(sysConfig)
	}
}

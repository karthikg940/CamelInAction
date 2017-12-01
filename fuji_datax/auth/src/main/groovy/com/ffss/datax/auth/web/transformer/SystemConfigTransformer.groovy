package com.ffss.datax.auth.web.transformer

import org.springframework.stereotype.Component

import com.ffss.datax.auth.constants.AuthConstants
import com.ffss.datax.common.domain.configuration.SystemConfiguration

/**
 * 
 * System configuration transformer
 * @author Virtusa|Polaris
 *
 */
@Component
class SystemConfigTransformer {

	/**
	 * Find the ldap is enabled or disabled
	 * If system configuration value is 'N' return false
	 * If system configuration value is 'Y' return true
	 * @param sysConfig
	 * @return true or false 
	 */
	def transform(SystemConfiguration sysConfig){
		def retVal = true
		if(sysConfig.sysConfigValue ==  AuthConstants.FLAG_N){
			retVal = false
		}
		
		[ldapConfigEnabled:retVal]
	}
}

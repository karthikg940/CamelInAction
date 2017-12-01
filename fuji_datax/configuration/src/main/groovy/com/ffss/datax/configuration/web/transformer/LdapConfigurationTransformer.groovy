package com.ffss.datax.configuration.web.transformer

import org.springframework.stereotype.Component

/**
 * Transform the JSON output
 * @author Virtusa|Polaris
 *
 */
@Component
class LdapConfigurationTransformer {

	def transformAll(data){
		[id:data[0].id, directoryType:data[0].directoryType,
			remoteServer:data[0].remoteServer, accessGroup:data[0].accessGroup, searchRoot:data[0].searchRoot,
			ldapPort:data[0].ldapPort, userDn:data[0].userDn, manageDn:data[0].manageDn, managePassword:data[0].managePassword ]
	}
	def transform(data){
		[id:data.id, directoryType:data.directoryType,
			remoteServer:data.remoteServer, accessGroup:data.accessGroup, searchRoot:data.searchRoot,
			ldapPort:data.ldapPort, userDn:data.userDn, manageDn:data.manageDn, managePassword:data.managePassword ]
	}

	def transformValid(retVal){
		[isValidConn:retVal.asType(Boolean)]
	}
}


package com.ffss.datax.auth.service

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.ldap.core.LdapTemplate
import org.springframework.ldap.core.support.LdapContextSource
import org.springframework.stereotype.Service

import com.ffss.datax.auth.repository.LdapConfigurationRepository
import com.ffss.datax.auth.repository.PersonLdapRepository
/**
 * The Ldap configuration service class
 * 
 * @author Virtusa|Polaris
 *
 */
@Service
class LdapConfigurationService {

	/** Ldap configuration repository **/
	@Autowired
	LdapConfigurationRepository ldapConfigurationRepository

	/** Ldap preson repository **/
	@Autowired
	PersonLdapRepository personLdapRepository

   /**
    * Get the ldap context source
    * @param ldapconfigData
    * @return LdapContextSource
    * @throws Exception
    */
	LdapContextSource getContextSource(ldapconfigData) throws Exception{

		def ldapURL = new StringBuffer().append('ldap://')
				.append(ldapconfigData.remoteServer)
				.append(':' )
				.append(ldapconfigData.ldapPort)
				.toString()


		def base = ldapconfigData.searchRoot

		LdapContextSource ldapContextSource = new LdapContextSource()
		ldapContextSource.setUrl(ldapURL)
		ldapContextSource.setBase(base)

		if(ldapconfigData.manageDn)
			ldapContextSource.setUserDn(ldapconfigData.manageDn)

		if(ldapconfigData.managePassword)
			ldapContextSource.setPassword(ldapconfigData.managePassword)

		ldapContextSource.afterPropertiesSet()

		ldapContextSource
	}

    /**
     * get the ldaptemplate
     * @param ldapconfigData
     * @return ldapTemplate
     * @throws Exception
     */
	LdapTemplate ldapTemplate(ldapconfigData) throws Exception{
		LdapTemplate ldapTemplate = new LdapTemplate(getContextSource(ldapconfigData))
		ldapTemplate.setIgnorePartialResultException(true)
		ldapTemplate.setContextSource(getContextSource(ldapconfigData))
		ldapTemplate
	}

	/**
	 * 
	 * Authenticate user in Ldap with username and credentials
	 * @param userName
	 * @param credentials
	 * @return true or false
	 */
	boolean authenticate(userName,credentials){
		//TO-DO - get the Ldap configuration informaiton by Organizaiton Id instead of findAll()
		def existLdapConfig = ldapConfigurationRepository.findAll()
        def retVal = false
		def ldapconfigData = [remoteServer:existLdapConfig[0].remoteServer,ldapPort:existLdapConfig[0].ldapPort,
			searchRoot:existLdapConfig[0].searchRoot ,manageDn:existLdapConfig[0].manageDn,managePassword:existLdapConfig[0].managePassword]

		personLdapRepository.setLdapTemplate(ldapTemplate(ldapconfigData))

		def userBase = existLdapConfig[0].userDn
		def userDn
		
			userDn = personLdapRepository.getDnForUser(userBase,userName)
			
		if(userDn){
		 retVal = personLdapRepository.authenticateUser(userDn,credentials)
		}

		retVal
	}
}

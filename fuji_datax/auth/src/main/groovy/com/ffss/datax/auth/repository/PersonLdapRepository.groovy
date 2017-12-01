package com.ffss.datax.auth.repository

import static org.springframework.ldap.query.LdapQueryBuilder.query

import javax.naming.directory.DirContext

import org.springframework.ldap.core.*
import org.springframework.ldap.core.support.AbstractContextMapper
import org.springframework.ldap.core.support.LdapContextSource
import org.springframework.ldap.support.LdapUtils
import org.springframework.stereotype.Component
import org.springframework.ldap.AuthenticationException

/**
 *
 * @author Virtusa|Polaris
 *
 */

@Component
class PersonLdapRepository {
	private LdapTemplate ldapTemplate

	/**
	 * Set the ldap template
	 * @param ldapTemplate
	 */
	void setLdapTemplate(LdapTemplate ldapTemplate) {
		this.ldapTemplate = ldapTemplate
	}


	/**
	 * Authenticate user by userDn and credentials
	 * @param userDN
	 * @param credentials
	 * @return true or false
	 */
	def authenticateUser(userDN,credentials){
		LdapContextSource contextSource = ldapTemplate.contextSource
		DirContext ctx = null
		try {
			ctx = contextSource.getContext(userDN, credentials)
			true
		}
		catch (AuthenticationException e) {
			// Context creation failed - authentication did not succeed
			false
		}
		finally {
			// It is imperative that the created DirContext instance is always
			// closed
			LdapUtils.closeContext(ctx)
		}
	}


	/**
	 * Get the userDn by user name and searchbase
	 * @param searchBase
	 * @param userName
	 * @return userDN
	 */
	String getDnForUser(searchBase,userName) {
		
		List<String> result = ldapTemplate.search(
				query().filter(searchBase,userName),
				new AbstractContextMapper() {
					protected String doMapFromContext(DirContextOperations ctx) {
						ctx.nameInNamespace
					}
				})
		
		//Check the list size if greater then one return null
		if(result.size() != 1) {
			result = null
		}
		
		// Get the first values from the list. Always that list contains only one values
		result?result.get(0):null
	}
}

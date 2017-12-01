package com.ffss.datax.configuration.config

import static org.springframework.ldap.query.LdapQueryBuilder.query

import org.springframework.ldap.core.*
import org.springframework.ldap.core.support.AbstractContextMapper

/**
 * @author Virtusa|Polaris
 *
 */
class PersonRepo {
	private LdapTemplate ldapTemplate

	/**
	 * Set the ldap template
	 * @param ldapTemplate
	 */
	void setLdapTemplate(LdapTemplate ldapTemplate) {
		this.ldapTemplate = ldapTemplate
	}

	/**
	 * Get the userDn by user name and searchbase
	 * @param searchBase
	 * @param userName
	 * @return userDN
	 */
	String getDnForUser(searchBase,userName) {
		def retVal = true
		List<String> result = ldapTemplate.search(
				query().filter(searchBase,userName),
				new AbstractContextMapper() {
					protected String doMapFromContext(DirContextOperations ctx) {
						ctx.nameInNamespace
					}
				})
		//Check the list size if greater then one return false
		if(result.size() != 1) {
			retVal = false
		}

		retVal
	}
}
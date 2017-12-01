
package com.ffss.datax.configuration.service

import groovy.util.logging.Log4j

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.ldap.core.LdapTemplate
import org.springframework.ldap.core.support.LdapContextSource
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

import com.ffss.datax.common.domain.configuration.LdapConfig
import com.ffss.datax.configuration.config.PersonRepo
import com.ffss.datax.configuration.repository.LdapConfigurationRepository
import com.ffss.datax.configuration.repository.OrganizationRepository
import com.ffss.datax.configuration.repository.SystemConfigurationRepository
import com.ffss.datax.configuration.repository.UserRepository
import com.ffss.datax.security.util.SecurityUtil

/**
 * Perform services related to ldap configuration
 * @author Virtusa|Polaris
 *
 */
@Log4j
@Service
class LdapConfigurationService {

	@Autowired
	LdapConfigurationRepository ldapConfigurationRepository

	@Autowired
	UserRepository userRepository

	@Autowired
	OrganizationRepository organizationRepository

	@Autowired
	SystemConfigurationRepository systemConfigurationRepository

	/**
	 * Method to save ldap configurations to ldap_config table
	 * @param ldapconfigData
	 * @return
	 */
	@Transactional
	def save(ldapconfigData) {
		def user=userRepository.findOrgVal(SecurityUtil.retrieveUserId())
		def retVal
		retVal = ldapConfigurationRepository.save(new LdapConfig(
				directoryType:ldapconfigData.directoryType,
				remoteServer:ldapconfigData.remoteServer,accessGroup:ldapconfigData.accessGroup,
				searchRoot:ldapconfigData.searchRoot,ldapPort:ldapconfigData.ldapPort.asType(Long),
				userDn:ldapconfigData.userDn,
				manageDn:ldapconfigData.manageDn,managePassword:ldapconfigData.managePassword,
				organization:organizationRepository.findOne(user.organization.id.asType(Long))))
		log.info(' Ldap saved successfully')
		if(retVal){
			//TODO:Needs to change the code based on Org Structure
			def sysConfig = systemConfigurationRepository.findAll()
			sysConfig[0].sysConfigValue='Y'
			systemConfigurationRepository.save(sysConfig)
			log.info(" Ldap is configured successfully for organization id : ${user.organization.id}")
		}
		retVal
	}

	/**
	 * Method to validate whether the LDAP configuration provided is correct or not
	 * @param ldapconfigData
	 * @return val - True or False, depending on the connection is successful or not
	 */
	def ldapTestConnection(ldapconfigData) {
		def val = false

		if(ldapconfigData.remoteServer && ldapconfigData.ldapPort && ldapconfigData.userDn){
			try{
				PersonRepo dao = new PersonRepo()
				dao.setLdapTemplate(ldapTemplate(ldapconfigData))
				def user=userRepository.findByUserName(ldapconfigData.itAdminUserName)
				if(user){
					//To check the user  exists in Active Directory or Not
					val = dao.getDnForUser(ldapconfigData.userDn,ldapconfigData.itAdminUserName)

					log.info("ldap Connection is ${val} for server - ${ldapconfigData.remoteServer} and  Port - ${ldapconfigData.ldapPort}")
				}
			}catch(Exception ex){
				log.info('Exception occured')
				log.error("Test connection failed for Server - ${ldapconfigData.remoteServer} and Port - ${emailConfig.port}", ex)
				return false
			}
		}
		val
	}

	//TODO:Needs to refactor based on Org structure
	/**
	 * Method to update ldap configurations based on ldapConfig id
	 * @param data - data Obj contains ldap configuration data which has to update
	 * @return 
	 */
	@Transactional
	def update(id, data){
		def existLdapConfig = ldapConfigurationRepository.findOne(id.asType(Long))
		if(existLdapConfig){
			existLdapConfig.with{
				directoryType= data.directoryType
				remoteServer = data.remoteServer
				accessGroup = data.accessGroup
				searchRoot =data.searchRoot
				ldapPort = data.ldapPort.asType(Long)
				userDn = data.userDn
				manageDn = data.manageDn
				managePassword = data.managePassword
			}
			ldapConfigurationRepository.save(existLdapConfig)
			log.info("ldap configuration updated sucesssfully for id -${id}")
		}
		existLdapConfig
	}

	//TODO:Need to refactor the findAll() to findOne(id), based on Org Structure
	/**
	 * Method to get the ldap configurations
	 * @param ldapconfigData
	 * @return 
	 */
	def findall() {
		ldapConfigurationRepository.findAll()
	}

	/**
	 *To set the LDAP context for given server and port
	 *
	 * @return ldapContextSource
	 */
	LdapContextSource getContextSource(ldapconfigData) throws Exception{
		def ldapURL = 'ldap://'+ldapconfigData.remoteServer+':'+ldapconfigData.ldapPort
		def base = ldapconfigData.searchRoot

		LdapContextSource ldapContextSource = new LdapContextSource()
		ldapContextSource.setUrl(ldapURL)
		ldapContextSource.setBase(base)
		ldapContextSource.afterPropertiesSet()
		ldapContextSource
	}

	/**
	 * Create the LDAP Template for ldapconfigData
	 *@return - the LDAP template
	 */
	LdapTemplate ldapTemplate(ldapconfigData) throws Exception{
		LdapTemplate ldapTemplate = new LdapTemplate(getContextSource(ldapconfigData))
		ldapTemplate.setIgnorePartialResultException(true)
		ldapTemplate.setContextSource(getContextSource(ldapconfigData))
		ldapTemplate
	}
}

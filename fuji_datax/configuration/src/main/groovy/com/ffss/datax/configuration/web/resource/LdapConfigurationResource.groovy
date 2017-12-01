package com.ffss.datax.configuration.web.resource

import groovy.util.logging.Log4j

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.RestController

import com.ffss.datax.common.constants.CustomErrorCode
import com.ffss.datax.configuration.service.LdapConfigurationService
import com.ffss.datax.configuration.web.transformer.LdapConfigurationTransformer

/**
 * Controller with all APIs of ldap configuration service.
 * @author Virtusa|Polaris
 */
@Log4j
@RestController
@RequestMapping(value='/api/ldapconfig')
class LdapConfigurationResource {

	@Autowired
	LdapConfigurationService ldapConfigurationService

	@Autowired
	LdapConfigurationTransformer ldapConfigurationTransformer

	/**
	 * API to save ldap configuration
	 * @param ldapconfigData
	 * @return
	 */
	@RequestMapping(value='',method=RequestMethod.POST)
	def save(@RequestBody ldapconfigData) {
		def retVal = ResponseEntity.created(new URI("/api/ldapconfig/${ldapConfigurationService.save(ldapconfigData).id}".toString()))
		retVal.build()
	}

	/**
	 * API to test ldap configuration.
	 * @param ldapconfigData - object containing LDAP configurations
	 * @return status True or False
	 */
	@RequestMapping(value='/validate',method=RequestMethod.POST)
	def ldapTestConnection(@RequestBody ldapconfigData){
		ldapConfigurationTransformer.transformValid(ldapConfigurationService.ldapTestConnection(ldapconfigData))
	}

	/**
	 * API to update ldap configuration by ldapConfig id
	 * @param id - ldapConfig id
	 * @param ldapconfigData
	 * @return
	 */
	@RequestMapping(value='/{id}', method=RequestMethod.PUT)
	def update(@PathVariable('id') Long id, @RequestBody ldapconfigData){

		log.info("Request for updation of LDAP configuration for id -${id}")

		def retVal = ldapConfigurationService.update(id, ldapconfigData)
		retVal?ldapConfigurationTransformer.transform(retVal):new ResponseEntity(CustomErrorCode.ER_404.value+'id', HttpStatus.NOT_FOUND)
	}

	//TODO:Need to refactor the findAll() to findOne(id), based on Org Structure
	/**
	 * API to get LDAP configuration 
	 * @return retVal - LdapConfigurationObject 
	 */
	@RequestMapping(value='', method=RequestMethod.GET)
	def getLdapConfig(){
		def retVal = ldapConfigurationService.findall()
		retVal?ldapConfigurationTransformer.transformAll(retVal):new ResponseEntity(CustomErrorCode.ER_404.value, HttpStatus.NOT_FOUND)
	}
}


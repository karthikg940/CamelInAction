package com.ffss.datax.configuration.web.controller

import groovy.util.logging.Log4j

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.RestController

import com.ffss.datax.common.constants.CustomErrorCode
import com.ffss.datax.configuration.service.OrganizationService
import com.ffss.datax.configuration.web.transformer.OrganizationTransformer

/**
 * Class OrganizationController provides api's for fetching the organizationList.
 * 
 * @author Virtusa|Polaris
 */
@Log4j
@RestController
@RequestMapping(value='/api/organization')
class OrganizationController {
	
	@Autowired
	OrganizationService organizationService
	
	@Autowired
	OrganizationTransformer organizationTransformer

	/**
	 * Method for fetching all the organizations.
	 *
	 * @return the organizations
	 */
	@RequestMapping(value='',method = RequestMethod.GET)
	def findAllOrganizations(){
		log.debug('Request received for fetching all the organizations')
		def organizationList = organizationService.findOrganizations()
		organizationList?organizationTransformer.transformAll(organizationList):new ResponseEntity(CustomErrorCode.ER_404.value, HttpStatus.NOT_FOUND)
	}
}

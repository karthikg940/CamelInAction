package com.ffss.datax.configuration.web.controller

import groovy.util.logging.Log4j

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.RestController

import com.ffss.datax.common.constants.CustomErrorCode
import com.ffss.datax.configuration.service.PermissionService
import com.ffss.datax.configuration.web.transformer.PermissionTransformer

/**
 * Class PermissionController  provides api's for fetching the permissionList.
 * 
 * @author Virtusa|Polaris
 */
@Log4j
@RestController
@RequestMapping(value='/api/permissions')
class PermissionController {
	
	@Autowired
	PermissionService permissionService
	
	@Autowired
	PermissionTransformer permissionTransformer
	
	/**
	 * method for getting all the permissions.
	 *
	 * @return the permission Object
	 */
	@RequestMapping(value='', method = RequestMethod.GET)
	def findAllPermissions(){
		log.debug('Request received for fetching all the permission')
		def permissionList = permissionService.findPermissions()
		permissionList?permissionTransformer.transformAll(permissionList):new ResponseEntity(CustomErrorCode.ER_404.value, HttpStatus.NOT_FOUND)
	}

}

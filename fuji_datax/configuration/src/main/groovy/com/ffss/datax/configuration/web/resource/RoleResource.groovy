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
import com.ffss.datax.configuration.service.RoleService
import com.ffss.datax.configuration.web.transformer.RoleTransformer

/**
 * Class RoleResource for CRUD operations.
 *
 * @author Virtusa|Polaris
 */
@Log4j
@RestController
@RequestMapping('/api/role')
class RoleResource {

	/** The role service. */
	@Autowired
	RoleService roleService

	/** The role transformer. */
	@Autowired
	RoleTransformer roleTransformer

	/**
	 * method to creates the New role and its associations like permission.
	 *
	 * @param roleData - the role data
	 * 
	 */
	@RequestMapping(value='',method=RequestMethod.POST)
	def addRole(@RequestBody roleData ){
		def validationResponse = roleService.validatePermissions(roleData.permission)
		def response = ResponseEntity.badRequest()
		if(validationResponse==true){
			response = ResponseEntity.created(new URI("/api/role/${roleService.saveRole(roleData).id}"))
		}
		else{
			response.body(CustomErrorCode.ER_400.value)
		}
		response.build()
	}

	/**
	 * Gets the role and its associations if available based on the roleId .
	 *
	 * @param id the roleId
	 * @return the role
	 */
	@RequestMapping(value='/{id}',method = RequestMethod.GET)
	def findRole(@PathVariable('id') Long id) {
		def role = roleService.findRoleById(id)
		role?roleTransformer.transformRole(role):new ResponseEntity(CustomErrorCode.ER_400.value, HttpStatus.NOT_FOUND)
	}

	/**
	 * Update role and its associations like permission etc based on the roleId
	 *
	 * @param id - the Id of Role
	 * @param data - the data which has to Update
	 * 
	 */
	@RequestMapping(value='/{id}',method = RequestMethod.PUT)
	def updateRole(@PathVariable('id') Long id,@RequestBody data) {
		def validData = roleService.validatePermissions(data.permission)
		def response = ResponseEntity.badRequest()
		if(validData==true){
			response = roleService.updateRole(id,data)?ResponseEntity.ok():ResponseEntity.notFound()
		}
		else{
			response.body(CustomErrorCode.ER_400.value)
		}
		response.build()
	}

	/**
	 * Gets all the roles and its associations like permission etc.
	 *
	 * @return the list of All roles 
	 */
	@RequestMapping(value='',method = RequestMethod.GET)
	def findAllRoles() {
		roleTransformer.transformAll(roleService.findAllRoles())
	}

	/**
	 * Delete roles and its associations like permission etc based on the roleId .
	 *
	 * @param id - the id of role
	 * 
	 */
	@RequestMapping(value='/{id}',method = RequestMethod.DELETE)
	def deleteRole(@PathVariable('id') Long id) {

		def response = ResponseEntity.notFound().build()
		def deleteRole = roleService.deleteRole(id)
		if(deleteRole){
			log.info("Role has been deleted for the roleId -${id}")
			response= ResponseEntity.noContent().build()
		}
		response
	}
}
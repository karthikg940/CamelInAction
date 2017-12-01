package com.ffss.datax.configuration.web.controller

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

import com.ffss.datax.configuration.service.RoleService

/**
 * Class RoleController provides api's for doing service other than CRUD operations.
 * 
 * @author Virtusa|Polaris
 */
@RestController
@RequestMapping(value='/api/role')
class RoleController {

	@Autowired
	RoleService roleService

	/**
	 * method for checking Duplicate roleName
	 *
	 * @param roleName - the role name
	 * @return the true if the roleName is present else false
	 */
	@RequestMapping(value='/search',method=RequestMethod.GET)
	def checkRolePresent(@RequestParam('name')  roleName) {
		[isPresent:roleService.checkRoleNamePresent(roleName)]
	}

	/**
	 * Method for reallocation of roles from oldRoleId to newRoleId
	 * @param id - the id of role which we want to delete
	 * @param newRoleId - the id of role to which we want to reAllocate
	 * 
	 */
	@RequestMapping(value='/{id}/reallocate',method=RequestMethod.PUT)
	def reAllocateRoles(@PathVariable('id') Long id ,@RequestParam('roleId') Long newRoleId){
		def existingRoleObj,newRoleObj
		def response = ResponseEntity.badRequest()
		//gets the role object for current Id
		existingRoleObj = roleService.findRoleById(id.asType(Long))
		//gets the role object for reAllocate Id
		newRoleObj  = roleService.findRoleById(newRoleId.asType(Long))
		// check for both role objects are there or not
		if(existingRoleObj && newRoleObj){
			//if objects are there, calls the reAllocateRoles()
			roleService.reAllocateRoles(existingRoleObj,newRoleObj)
			response = ResponseEntity.ok().build()
		}
		else{
			// if id or newRoleId or not there returns Not_Found
			response = ResponseEntity.notFound().build()
		}
		response
	}
}

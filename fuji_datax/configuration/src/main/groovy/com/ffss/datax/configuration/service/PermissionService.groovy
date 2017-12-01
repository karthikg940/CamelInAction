package com.ffss.datax.configuration.service

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

import com.ffss.datax.configuration.repository.PermissionRepository

/**
 * class PermissionService for fetching the entire permissionList.
 * 
 * @author Virtusa|Polaris
 */
@Service
class PermissionService {
	
	@Autowired
	PermissionRepository permissionRepository
	
	/**
	 * Gets all the permissionList from the dataBase.
	 *
	 * @return the permissions
	 */
	def findPermissions() {
		permissionRepository.findAll()
	}
	
}

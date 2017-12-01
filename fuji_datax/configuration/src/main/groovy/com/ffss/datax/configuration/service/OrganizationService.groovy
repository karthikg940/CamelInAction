package com.ffss.datax.configuration.service

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

import com.ffss.datax.configuration.repository.OrganizationRepository

/**
 * Class OrganizationService for fetching the entire organizations.
 * 
 * @author Virtusa|Polaris
 */
@Service
class OrganizationService {
	
	@Autowired
	OrganizationRepository organizationRepository
	
	/**
	 * Gets the organizations.
	 *
	 * @return the organizations
	 */
	def findOrganizations() {
		organizationRepository.findAll()
	}
}

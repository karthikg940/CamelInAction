package com.ffss.datax.workflow.service

import groovy.util.logging.*

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

import com.ffss.datax.workflow.repository.UserRepository


/**
 * The Class UserService.
 *
 * @author Virtusa|Polaris
 */
@Service
class UserService {
	
	/** The user repository. */
	@Autowired
	UserRepository userRepository
	
	/**
	 * Find the user.
	 *
	 * @param userId the user id
	 * @return user
	 */
	def findOne(userId) {
		userRepository.findOne(userId)
	}
	
}

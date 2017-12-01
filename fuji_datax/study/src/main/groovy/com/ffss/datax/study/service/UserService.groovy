package com.ffss.datax.study.service

import groovy.util.logging.*

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

import com.ffss.datax.study.repository.UserAccountRepository

/**
 *
 *
 *@author Virtusa|Polaris
 */
@Service
class UserService {
	@Autowired
	UserAccountRepository userRepository

	def findOne(userId) {
		userRepository.findOne(userId)
	}
	def findPersonName(personId) {
		def personUser=userRepository.findUser(personId)
		personUser
	}
	def findAllUsers(){
		userRepository.findAll()
	}
	
	def findAdminUsersByOrgId(orgId){
		userRepository.findAdminUsersByOrgId(orgId)
	}

	def findSystemUser(){
		userRepository.findByUserName()
	}
}

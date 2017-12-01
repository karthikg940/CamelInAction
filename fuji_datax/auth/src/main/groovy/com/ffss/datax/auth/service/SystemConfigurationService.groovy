package com.ffss.datax.auth.service


import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

import com.ffss.datax.auth.repository.OrgLoginConfigMapRepository
import com.ffss.datax.auth.repository.SystemConfigRepository
/**
 * @author Virtusa|Polaris
 */

@Service
class SystemConfigurationService {

	@Autowired
	OrgLoginConfigMapRepository orgLoginConfigMapRepository

	@Autowired
	SystemConfigRepository systemConfigRepository

	/**
	 * get the ldap information by orgId
	 * 
	 * @return ldap information
	 */
	def getSystemConfig(){
		//TO-DO - get the configuration based on OrgId
		systemConfigRepository.findAll()
	}

	/**
	 * get the threshold information
	 * 
	 * @param orgId
	 * @return accountlockThreshold 
	 */
	def getThresholdValue(orgId){
		def orgAccountThreshold = orgLoginConfigMapRepository.findByOrganizationId(orgId.asType(Long))
		def result
		if(orgAccountThreshold){
			result = orgAccountThreshold.accountLockThreshold
		}
		else{
			def defAccountThreshold = orgLoginConfigMapRepository.findDefaultValue()
			result = defAccountThreshold.accountLockThreshold
		}
		result
	}

	/**
	 * Get the user password expiry details by OrgId
	 * @param orgId
	 * @return userDefinedPwdExpiry
	 */
	def getUserPwdExpiryDetails(orgId){
		def orgUserPwdExpiryDetails = orgLoginConfigMapRepository.findByOrganizationId(orgId.asType(Long))
		def retVal
		if(orgUserPwdExpiryDetails){
			retVal = orgUserPwdExpiryDetails.userDefinedPwdExpiry
		}
		else{
			def defUserPwdExpiryDetails = orgLoginConfigMapRepository.findDefaultValue()
			retVal = defUserPwdExpiryDetails.userDefinedPwdExpiry
		}
		retVal
	}

   /**
    * get the password length by OrgId
    * 	
    * @param orgId
    * @return passWordLen
    */
	def getUserPwdLengthDetails(orgId){
		def orgUserPwdExpiryDetails = orgLoginConfigMapRepository.findByOrganizationId(orgId.asType(Long))
		def retVal
		if(orgUserPwdExpiryDetails){
			retVal = orgUserPwdExpiryDetails.passWordMinLen
		}
		else{
			def defUserPwdExpiryDetails = orgLoginConfigMapRepository.findDefaultValue()
			retVal = defUserPwdExpiryDetails.passWordMinLen
		}
		retVal.asType(Integer)
	}
}


package com.ffss.datax.configuration.service

import groovy.util.logging.Log4j

import org.joda.time.DateTime
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

import com.ffss.datax.common.domain.configuration.EmailConfig
import com.ffss.datax.configuration.repository.EmailConfigurationRepository
import com.ffss.datax.configuration.service.feign.NotificationService
import com.ffss.datax.security.util.SecurityUtil
/**
 * @author Virtusa|Polaris
 */
@Log4j
@Service
class EmailConfigurationService {

	@Autowired
	EmailConfigurationRepository emailConfigurationRepository

	@Autowired
	NotificationService notificationService

	/**
	 * To save email configurations to email_config table
	 * 
	 * @param id The email Configuration DB record Id
	 * @param emailConfig Object containing the email configurations
	 */
	@Transactional
	def save(id, emailConfig) {
		log.info("Saving the email configuration for Id - ${id}")


		def retVal = emailConfigurationRepository.saveAndFlush(new EmailConfig (
				id:id,
				orgId: emailConfig.orgId,
				isSSL: emailConfig.isSSL.asType(Boolean),
				isAuth: emailConfig.isAuth.asType(Boolean),
				isEnable: emailConfig.isEnable.asType(Boolean),
				userName: emailConfig.userName,
				password: emailConfig.password,
				port: emailConfig.port.asType(Integer),
				server: emailConfig.server,
				defaultEmail:emailConfig.defaultEmail,
				updatedBy: SecurityUtil.retrieveUserId(),
				updatedDateTime: DateTime.now()))

		log.info("Successfully saved Email configurations for Id - ${id}")
		retVal
	}

	/**
	 * To retrieve email configurations by orgId 
	 * @param orgId
	 * @return
	 */
	def retrieve(orgId) {
		log.info("Retreiving Email Configurations for organisation with Id - ${orgId}")
		emailConfigurationRepository.findByOrgId(orgId)
	}

	/**
	 * This method invokes the Notification service for testing whether the email configurations provided are correct or not
	 * 
	 * @param emailConfig Object containing the email configurations
	 * 
	 * @return True or False, depending on the connection is successful or not
	 */
	def checkConnection(emailConfig) {
		log.info("In email checkConnection Service method, invoking notification service to checkConnection for server - ${emailConfig.server}")

		notificationService.checkConnection(emailConfig, SecurityUtil.retrieveAuthToken())
	}
}

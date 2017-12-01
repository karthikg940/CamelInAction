package com.ffss.datax.configuration.web.resource

import groovy.util.logging.Log4j

import javax.ws.rs.QueryParam

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.ResponseBody
import org.springframework.web.bind.annotation.RestController

import com.ffss.datax.configuration.service.EmailConfigurationService
/**
 * The Class EmailConfigurationResource.
 * 
 * @author Virtusa|Polaris
 */
@Log4j
@RestController
@RequestMapping(value='/api/configuration/email')
class EmailConfigurationResource {

	@Autowired
	EmailConfigurationService emailConfigurationService

	/**
	 * API to save email configurations
	 * @param configId
	 * @param emailConfig
	 * @return
	 */
	@RequestMapping(value='/{id}',method=RequestMethod.PUT)
	def save(@PathVariable('id') Long configId, @RequestBody emailConfig) {
		log.info("Request received for saving of email configurations related to configuration Id - ${configId}")

		emailConfigurationService.save(configId,emailConfig)
	}

	/**
	 * API to retrieve email configurations by giving orgId as parameter
	 * @param orgId
	 * @return
	 */
	@RequestMapping(value='', method=RequestMethod.GET)
	def retrieve(@QueryParam('orgId') Long orgId){
		log.info("Request received for retrival of email configuration information for the organisation with Id - ${orgId}")

		emailConfigurationService.retrieve(orgId)
	}

	/**
	 * API to test email configurations.
	 * @param emailConfig object containing email configurations
	 * 
	 * @return a JSON object with the connection status of Success or Failed
	 */
	@RequestMapping(value='/checkConnection', method=RequestMethod.POST)
	@ResponseBody
	def emailConTest(@RequestBody emailConfig) {
		log.info("Request received to perform a email test connectionl for server - ${emailConfig.server}")

		emailConfigurationService.checkConnection(emailConfig)
	}
}


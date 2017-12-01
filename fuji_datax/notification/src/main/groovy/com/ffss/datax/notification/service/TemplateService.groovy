package com.ffss.datax.notification.service

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

import com.ffss.datax.notification.repository.TemplateInfoRepository

/**
 * Perform services related to Templates
 * @author Virtusa|Polaris
 *
 */
@Service('templateService')
class TemplateService {

	@Autowired
	TemplateInfoRepository templateInfoRepository

	/**
	 * Retrieve the template path by orgId and template name
	 * @param template name sent by the JSON input
	 * @param orgId
	 */
	def getTemplatePath(tempName,orgId){
		templateInfoRepository.findTemplate(tempName,orgId)
	}
}

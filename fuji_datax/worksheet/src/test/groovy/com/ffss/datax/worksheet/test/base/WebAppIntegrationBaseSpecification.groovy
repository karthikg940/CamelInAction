/**
 *
 */
package com.ffss.datax.worksheet.test.base


import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status

import javax.servlet.Filter

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.setup.MockMvcBuilders
import org.springframework.web.context.WebApplicationContext

import spock.lang.Specification

import com.ffss.datax.worksheet.service.SignatureAttestationService
import com.ffss.datax.worksheet.service.SignatureService
import com.ffss.datax.worksheet.service.WorksheetService
import com.ffss.datax.worksheet.service.WorksheetSubmissionService
import com.ffss.datax.worksheet.service.feign.StudyService
import com.ffss.datax.worksheet.service.feign.StudyWorkflowService

/**
 * Common functionalities required for all tests go here.
 * 
 */
class WebAppIntegrationBaseSpecification extends Specification {
	MockMvc mockMvc
	MockMvc unSecuredmockMvc
	@Autowired
	WebApplicationContext wac

	@Autowired
	Filter shiroFilterFactoryBean

	/**
	 * Sets up the mock web application context.
	 */
	def setup() {
		this.mockMvc = MockMvcBuilders.webAppContextSetup(this.wac).addFilters(shiroFilterFactoryBean).build()
		this.unSecuredmockMvc = MockMvcBuilders.webAppContextSetup(this.wac).build()
		mockFeignClients()
	}

	def mockFeignClients() {
		def mockStudyService = [
			updateStudyStatus : {id,request,token,orgId->
				return []
			},updateStudyType : {id,request,token->
				return []
			},submitStudyToQA : {id,request,token,orgId->
				return []
			}
		] as StudyService

		def mockStudyWorkflowService = [
			getPreference:{token-> 
				return[attestationEnabled:false,qaEnabled:true] 
			},
			getUser:{id,request,token->
				return [[id:1001]]
			}

		] as StudyWorkflowService

		wac.getBean(WorksheetService.class).studyStatusService  = mockStudyService
		wac.getBean(SignatureService.class).studyStatusService = mockStudyService
		wac.getBean(WorksheetService.class).studyStatusService = mockStudyService
		wac.getBean(WorksheetSubmissionService.class).studyWorkflowService = mockStudyWorkflowService
		wac.getBean(WorksheetSubmissionService.class).studyStatusService = mockStudyService
		wac.getBean(SignatureAttestationService.class).studyStatusService = mockStudyService
	}
}

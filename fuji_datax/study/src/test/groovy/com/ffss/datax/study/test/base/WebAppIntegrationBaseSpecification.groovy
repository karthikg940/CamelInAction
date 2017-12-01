package com.ffss.datax.study.test.base

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*

import groovy.sql.Sql
import javax.servlet.Filter

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.setup.MockMvcBuilders
import org.springframework.web.context.WebApplicationContext

import spock.lang.Specification

import com.ffss.datax.common.constants.NotificationStatusEnum
import com.ffss.datax.common.domain.notification.NotificationEventInfo
import com.ffss.datax.common.service.AsyncAuditService
import com.ffss.datax.common.service.AuditLoggerService
import com.ffss.datax.study.config.DataSources
import com.ffss.datax.study.repository.NotificationEventInfoRepository
import com.ffss.datax.study.service.StudyAssignmentService
import com.ffss.datax.study.service.StudyInfoService
import com.ffss.datax.study.service.StudyService
import com.ffss.datax.study.service.StudySubmitToEMRService
import com.ffss.datax.study.service.feign.StudyNotificationService
import com.ffss.datax.study.service.feign.StudyReportService
import com.ffss.datax.study.service.feign.StudyWorkflowService
import com.ffss.datax.study.web.transformer.StudyListTransformer

/**
 * Common functionalities required for all tests go here.
 * 
 */
class WebAppIntegrationBaseSpecification extends Specification {
	MockMvc mockMvc

	MockMvc unsecuredMockMvc

	@Autowired
	WebApplicationContext wac

	@Autowired
	Filter shiroFilterFactoryBean
	
	Sql sql
	
	@Autowired
	DataSources dataSources

	static  counter =0
	
	static def orgsThatWereValidated = []
	static def orgIds
	
	static orgId =1L
	
	def eventCodes;
	
	static def eventCodeList=['ALERT_ADMIN_POC','ALERT_ADMIN_QA','ALERT_POC_IDLE','ALERT_QA_IDLE','ALERT_ATTENDING_IDLE','ALERT_QA']
	
	//static def orgToUserMap = [76000001L:[1004,1005], 76000002L:[1006,1007], 1001L:[1003],1L:[1001,1002],]
	static def orgToUserMap = [1L:[1001,1002,1003], 1001L:[1004,1005], 1002L:[1006,1007]]
	
	def validatedOrgId = null
	/**
	 * Sets up the mock web application context.
	 */
	def setup() {
		this.mockMvc = MockMvcBuilders.webAppContextSetup(this.wac).addFilters(shiroFilterFactoryBean).build()
		this.unsecuredMockMvc = MockMvcBuilders.webAppContextSetup(this.wac).build()
		mockFeignClients()
		mockRepositories()
		mockNotificationFeign()
		sql = new Sql(dataSources.vnaDataSource())
	}

	def mockFeignClients() {
		def mockCreateTask = [
			createTask : { request,token->
				return [id:100,currentStatus:'Pending']
			},
			updateTask : { id,request,token->
				return [id:100,currentStatus:'Assigned']
			},
			updateTask : { id,request,token->
				return [id:100,currentStatus:'Pending']
			},
			updateTask : { id,request,token->
				return [id:100,currentStatus:'Signed']
			},
			getUser : { id,request,token->
				return [[id:1004,prefix:"Dr",firstName:"Cris",middleName:"",lastName:"Renella"]]
			},
			getUser : { id,request,token->
				if(request.type == 'attending')
					return [[id:1004,prefix:"Dr",firstName:"Cris",middleName:"",lastName:"Renella"]]
				else if(request.type == 'performing')
					return [[id:1004,prefix:"Dr",firstName:"Cris",middleName:"",lastName:"Renella"]]
				else if(request.type == 'qa')
					return [[id:1004,prefix:"Dr",firstName:"Cris",middleName:"",lastName:"Renella"]]
			},
			createUserTask :{ request,token->
				return [id:100,currentStatus:'Pending']
			},
			updateUserTask : { request,token->
				return [id:100,currentStatus:'Pending']
			},
			updateUserTask : { request,token->
				return [id:100,currentStatus:'Signed']
			},
			getPreference : { token->
				return [qaEnabled:false,attestationEnabled:false]
			},
			getStudyStatus : { request,token->
				return []
			},
			deleteUserTask : { request,token->
				return []
			}

		] as StudyWorkflowService
		wac.getBean(StudyInfoService.class).studyWorkflowService = mockCreateTask
		wac.getBean(StudyAssignmentService.class).studyWorkflowService = mockCreateTask
		wac.getBean(StudyService.class).studyWorkflowService = mockCreateTask
		wac.getBean(StudySubmitToEMRService.class).studyWorkflowService = mockCreateTask
		wac.getBean(StudyListTransformer.class).studyWorkflowService = mockCreateTask
		
		//Analystics Report Mock
		def mockReportTask = {orgId,id, token->
			return getMockReportResponse()
		} as StudyReportService
		wac.getBean(StudySubmitToEMRService.class).studyReportService = mockReportTask
		
		//AsyncAuditService Mock
		def mockAsyncAuditService = [
			auditLogger : { content, eventCode, microServiceName,entityName, token ->
				[]}
		] as AuditLoggerService

		wac.getBean(AsyncAuditService.class).auditLoggerService = mockAsyncAuditService
	}

	def mockRepositories() {

		def mockEventInfo = [
			findEventByCode : {eventCode ->
				NotificationEventInfo eventInfo = new NotificationEventInfo()
				eventInfo.id = 100L
				eventInfo.orgId = 1L
				eventInfo.eventCode = eventCode
				eventInfo.eventType = 'INAPP'
				if(eventInfo.eventCode== eventCodeList.getAt(0))
				eventInfo.eventDetails = '{"message": "The Study (<StudyUID>) is pending performing physician assignment/action for more than <time> Hours"}'
				else if(eventInfo.eventCode== eventCodeList.getAt(1))
				eventInfo.eventDetails = '{"message": "The Study (<StudyUID>) is pending QA reviewer  assignment for more than <time> Hours"}'
				else if(eventCode == 'ALERT_POC_IDLE' || eventCode == 'ALERT_QA_IDLE' || eventCode == 'ALERT_ATTENDING_IDLE')
				eventInfo.eventDetails = '{	"message": "The Study (1.2.840.113619.2.1.1.322987881.621) is pending action for more than 48 Hours"}'
				else if(eventCode == 'ALERT_ADMIN_POC' || eventCode =='ALERT_ADMIN_QA')
				eventInfo.eventDetails = '{	"message": "The Study (1.2.840.113619.2.1.1.322987881.621) is pending assignment/action for more than 48 Hours"}'
				else if(eventCode == 'ALERT_QA')
				eventInfo.eventDetails = '{"message":" The following Study - <StudyUUID>, was submitted for QA Review by <FullName>"}'
				
				eventCodes=eventCode
				eventInfo
				
			}
		] as NotificationEventInfoRepository

		wac.getBean(StudyService.class).eventInfoRepository = mockEventInfo

	}
	
	
	def mockNotificationFeign(){
		def mockNotification = [
			notificationSave : { id,request,token ->
				assert id==2
				if(eventCodes==eventCodeList.get(0))
				{
					assert request.notification.message == "The Study (1.2.840.113619.2.1.1.322987881.621) is pending performing physician assignment/action for more than 48 Hours"
					assert request.notification.to == orgToUserMap.get(request.orgId)
				}
				else if(eventCodes==eventCodeList.get(1))
				{
					assert request.notification.message == "The Study (1.2.840.113619.2.1.1.322987881.621) is pending QA reviewer  assignment for more than 48 Hours"
					assert request.notification.to == orgToUserMap.get(request.orgId)
				}
				if(eventCodes == eventCodeList.getAt(2) || eventCodes == eventCodeList.getAt(3) || eventCodes == eventCodeList.getAt(4))
				{
					assert request.notification.message == "The Study (1.2.840.113619.2.1.1.322987881.621) is pending action for more than 48 Hours"
					assert request.notification.to == [1004]
				}
				else if(eventCodes == eventCodeList.getAt(5))
				{
					assert request.notification.message == " The following Study - 1.2.840.113619.2.1.1.322987881.621, was submitted for QA Review by Dr. John Williams"
					assert request.notification.to == orgToUserMap.get(request.orgId) 
				}
				counter = counter+1
				orgsThatWereValidated.add(request.orgId)
				[NotificationStatusEnum.SUCCESS]
			}] as StudyNotificationService

		wac.getBean(StudyService.class).studyNotificationService = mockNotification

	}
	
	
	ResponseEntity<byte[]> getMockReportResponse() {
		return new ResponseEntity<byte[]>("I am returning a PDF",HttpStatus.OK)
	}
}

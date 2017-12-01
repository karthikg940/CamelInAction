package com.ffss.datax.study.test.web.resource



import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status
import groovy.json.JsonOutput
import spock.lang.Specification;

import javax.ws.rs.core.MediaType

import org.joda.time.DateTime
import org.joda.time.DateTimeUtils
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.context.WebApplicationContext;

import com.ffss.datax.common.constants.NotificationStatusEnum
import com.ffss.datax.common.constants.StudyLookup
import com.ffss.datax.common.domain.notification.NotificationEventInfo
import com.ffss.datax.common.domain.study.StudyTaskMap
import com.ffss.datax.common.domain.workflow.UserTaskStage
import com.ffss.datax.common.domain.workflow.WorkflowTask
import com.ffss.datax.study.repository.ConfigurationRepository
import com.ffss.datax.study.repository.NotificationEventInfoRepository
import com.ffss.datax.study.repository.StudyLookupRepository
import com.ffss.datax.study.repository.StudyRepository
import com.ffss.datax.study.repository.StudyTaskMapRepository
import com.ffss.datax.study.repository.UserAccountRepository
import com.ffss.datax.study.repository.UserTaskStageRepository
import com.ffss.datax.study.repository.WorkflowTaskRepository
import com.ffss.datax.study.service.StudyService
import com.ffss.datax.study.service.feign.StudyNotificationService
import com.ffss.datax.study.test.base.CustomMillisProvider
import com.ffss.datax.study.test.base.TransactionalWebIntegrationTest
import com.ffss.datax.study.test.base.WebAppIntegrationBaseSpecification
import com.ffss.datax.study.web.resource.StudyScheduler

 
@TransactionalWebIntegrationTest
class NotificationAlertsSpec extends WebAppIntegrationBaseSpecification{
	
	@Autowired
	StudyRepository studyRepository
	
	@Autowired
	ConfigurationRepository configurationRepository
	
	@Autowired
	StudyScheduler studyScheduler
	
	@Autowired
	StudyLookupRepository studyProgressRepository
	
	@Autowired
	WorkflowTaskRepository workflowTaskRepository
	
	@Autowired
	TypeConfigRepository typeConfigRepository
	
	@Autowired
	WorkflowConfigRepository workflowConfigRepository
	
	@Autowired
	UserAccountRepository userRepository

	@Autowired
	StudyTaskMapRepository studyTaskMapRepository
	
	@Autowired
	UserTaskStageRepository userTaskStageRepository
	
	@Autowired
	TaskRoleConfigRepository taskRoleConfigRepository
	
	@Autowired
	TaskAssignedUserRepository taskAssignedUserRepository
	
	@Autowired
	StudyLookupRepository studyLookupRepository
	
	@Autowired
	NotificationEventInfoRepository notificationEventInfoRepository;
	
	@Autowired
	WebApplicationContext wac
	
	static def orgsThatWereValidated = []
	
	static def eventCodeList=['ALERT_ADMIN_POC','ALERT_ADMIN_QA']
	def eventCodes
	static  counter =0
	def orgs = []
	
	//2 aging alerts
	def 'To validate whether aging notification alert is sent to all admin users at poc level and qa level'(){
		given: 'There is a study already available in the DB and was not worked on'
		
		when:'the time crosses the threshold for idle time'
		studyRepository.findAll().each(){
			it.lastStatusChangedDateTime=DateTime.now()
			studyRepository.save(it)
		
		}
		orgs = [1L,1002L]
		DateTimeUtils.setCurrentMillisProvider(new CustomMillisProvider(date:DateTime.now().plusHours(48)))
		studyScheduler.perform()
		then:'aging alert gets generated to all users who belongs to particular organization'
		orgs.each{
			assert it in orgsThatWereValidated
		}
		orgsThatWereValidated.clear()
	}
	
	void resetCounter(){
		counter = 0
	}
	
	
	def 'To validate whether notification alert is sent to all users at qa level'(studyId,orgId,data,expectedStatus){
		
		given: 'A new study is moved/submitted to qa level when QA workflow mode is enabled for the organization'
		
		when: 'the study is at new state'
		print "data"+data
			  def token = 'eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MTAwMSwidXNlck5hbWUiOiJqb2hudyJ9.N9NB9ioZUSOhtiSziPA10h4PpjOlzBV0ztqqvcuaOp9RqxkRUa3XvvX7GrTPQTy4vxuNd59ve7OBq-dVcPP65g'
			  
			createTask("QAUnassigned",1001L)
			
			def submitStudyToQA = this.mockMvc.perform(put("/api/org/${orgId}/examtype/${studyId}/submittoqa")
			.header("Authorization","Bearer "+token)
			.content(JsonOutput.toJson(data))
			.contentType(MediaType.APPLICATION_JSON))
			
			submitStudyToQA.andExpect(status().is(expectedStatus))
			
		then:'immediate alert is broadcasted to all users who belongs to particular organization'
		assert 1L in orgsThatWereValidated
		
		where :
			
			studyId << [76000000000001,76000000000001]
			orgId << [1,1]
			data << [[studyId: 76000000000001, userid:null],[studyId: 76000000000001, userid:1002]]
			expectedStatus << [200,200]
	}
	
	def createTask(status,userId){
		
				def workFlowTask = workflowTaskRepository.save(new WorkflowTask(typeConfig:typeConfigRepository.findOneByTypeName('study'),workflowConfig:workflowConfigRepository.findOne(2L),currentStatus:'QAUnassigned',assignedUser:null,
				triggeringUser:userRepository.findOne(userId)))
		
				def studyTaskMap = studyTaskMapRepository.save(new StudyTaskMap(workflowTask:workflowTaskRepository.findOne(workFlowTask.id)
				,study:studyRepository.findOne(76000000000001L)))
		
				def userTaskStage = userTaskStageRepository.save(new UserTaskStage(user:null,
				workflowTask:workflowTaskRepository.findOne(workFlowTask.id)))
				
				def study = studyRepository.findOne(76000000000001L)
				study.studyTaskMap = studyTaskMapRepository.findOne(studyTaskMap.id)
				study.status = studyLookupRepository.findOne(StudyLookup."${status}".value)
				studyRepository.save(study)
			}
	
	
	 
	}

package com.ffss.datax.study.test.web.resource

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*
import groovy.json.JsonOutput
import groovy.json.JsonSlurper

import java.text.SimpleDateFormat

import javax.ws.rs.core.MediaType

import org.joda.time.DateTime
import org.springframework.beans.factory.annotation.Autowired

import com.ffss.datax.common.domain.study.StudyTaskMap
import com.ffss.datax.common.domain.workflow.TaskAssignedUser
import com.ffss.datax.common.domain.workflow.UserTaskStage
import com.ffss.datax.common.domain.workflow.WorkflowTask
import com.ffss.datax.common.util.CommonUtil
import com.ffss.datax.study.repository.StudyLookupRepository
import com.ffss.datax.study.repository.StudyRepository
import com.ffss.datax.study.repository.StudyTaskMapRepository
import com.ffss.datax.study.repository.UserAccountRepository
import com.ffss.datax.study.repository.UserTaskStageRepository
import com.ffss.datax.study.repository.WorkflowTaskRepository
import com.ffss.datax.study.test.base.TransactionalWebIntegrationTest
import com.ffss.datax.study.test.base.WebAppIntegrationBaseSpecification

@TransactionalWebIntegrationTest
class OrgBasedStudiesSpec extends WebAppIntegrationBaseSpecification {
	
	@Autowired
	WorkflowTaskRepository workflowTaskRepository

	@Autowired
	TypeConfigRepository typeConfigRepository

	@Autowired
	WorkflowConfigRepository workflowConfigRepository

	@Autowired
	UserAccountRepository userAccountRepository

	@Autowired
	StudyTaskMapRepository studyTaskMapRepository

	@Autowired
	StudyRepository studyRepository

	@Autowired
	UserTaskStageRepository userTaskStageRepository
	
	@Autowired
	TaskRoleConfigRepository taskRoleConfigRepository
	
	@Autowired
	StudyLookupRepository lookupRepository

	@Autowired
	TaskAssignedUserRepository taskAssignedUserRepository

	def 'fetch all the studies list for the user based on the organization'(orgId, countOfRecords, fromDate, toDate,type, request, expectedStatus){
		given: ' the user who belongs to particular organization is logged in'
		when: ' user wants to display all the studies'

		def studyListResponse = this.mockMvc.perform(post("/api/org/${orgId}/studylist?type=${type}&fromDate=${fromDate}&toDate=${toDate}")
				.header("Authorization", "Bearer "+StudyTestData.token)
				.accept(MediaType.APPLICATION_JSON)
				.content(JsonOutput.toJson(request))
				.contentType(MediaType.APPLICATION_JSON))
		print "the response is" +studyListResponse

		then:'display all the studies only for the particular organization'

		studyListResponse.andExpect(status().is(expectedStatus))
		assert new JsonSlurper().parseText(studyListResponse.andReturn().response.contentAsString).results.size() == countOfRecords

		where:
		orgId <<[1, 1001, 1002]
		countOfRecords << [3, 2, 1]
		fromDate << [CommonUtil.getDate(), CommonUtil.getDate(), CommonUtil.getDate()]
		toDate <<   [CommonUtil.getDate(), CommonUtil.getDate(), CommonUtil.getDate()]
		type <<['allstudies', 'allstudies', 'allstudies']
		request <<[StudyTestData.request, StudyTestData.request, StudyTestData.request]
		expectedStatus<<[200, 200, 200]
	}

	def 'fetch all my studies list for the user based the organization'(orgId, countOfRecords, fromDate, toDate,type, request, expectedStatus){
		given:'the user who belongs to the particular organization is logged in'
		addStudies(76000000000001,1002L,4003L,30L,3L)

		when:'user  wants to fetch the qa studies'
		def studyListResponse = this.mockMvc.perform(post("/api/org/${orgId}/studylist?type=${type}&fromDate=${fromDate}&toDate=${toDate}")
				.header("Authorization", "Bearer "+StudyTestData.token)
				.accept(MediaType.APPLICATION_JSON)
				.content(JsonOutput.toJson(request))
				.contentType(MediaType.APPLICATION_JSON))

		then:'display the qa assigned studies of the user based on his logged in organization'
		studyListResponse.andExpect(status().is(expectedStatus))
		assert new JsonSlurper().parseText(studyListResponse.andReturn().response.contentAsString).size() == countOfRecords

		where:
		orgId <<[1, 1001, 1002]
		countOfRecords << [1, 1, 1]
		fromDate << [CommonUtil.getDate(), CommonUtil.getDate(), CommonUtil.getDate()]
		toDate <<   [CommonUtil.getDate(), CommonUtil.getDate(), CommonUtil.getDate()]
		type <<['mystudies', 'mystudies', 'mystudies']
		request <<[StudyTestData.request, StudyTestData.request, StudyTestData.request]
		expectedStatus<<[200, 200, 200]
	}

	def 'fetch qa studies list for the user based the organization'(orgId, countOfRecords, fromDate, toDate,type, request, expectedStatus){
		given:'the user who belongs to the particular organization is logged in'
		
		addStudies(76000000000001,1002L,4006L,30L,3L)

		when:'user  wants to fetch the qa studies'
		def studyListResponse = this.mockMvc.perform(post("/api/org/${orgId}/studylist?type=${type}&fromDate=${fromDate}&toDate=${toDate}")
				.header("Authorization", "Bearer "+StudyTestData.token)
				.accept(MediaType.APPLICATION_JSON)
				.content(JsonOutput.toJson(request))
				.contentType(MediaType.APPLICATION_JSON))

		then:'display the qa assigned studies of the user based on his logged in organization'
		studyListResponse.andExpect(status().is(expectedStatus))
		assert new JsonSlurper().parseText(studyListResponse.andReturn().response.contentAsString).results.size() == countOfRecords

		where:
		orgId <<[1, 1001, 1002]
		countOfRecords << [3, 2, 1]
		fromDate << [CommonUtil.getDate(), CommonUtil.getDate(), CommonUtil.getDate()]
		toDate <<   [CommonUtil.getDate(), CommonUtil.getDate(), CommonUtil.getDate()]
		type <<['qastudies', 'qastudies', 'qastudies']
		request <<[StudyTestData.request, StudyTestData.request, StudyTestData.request]
		expectedStatus<<[200, 200, 200]
	}

	def 'fetch all the my attestation studies list for the user based on the organization'(orgId, countOfRecords, fromDate, toDate,type, request, expectedStatus){
		given: ' the user who belongs to particular organization is logged in'
		addStudies(76000000000001,1002L,4010L,30L,3L)
		
		when: ' user wants to display all the studies'

		def studyListResponse = this.mockMvc.perform(post("/api/org/${orgId}/studylist?type=${type}&fromDate=${fromDate}&toDate=${toDate}")
				.header("Authorization", "Bearer "+StudyTestData.token)
				.accept(MediaType.APPLICATION_JSON)
				.content(JsonOutput.toJson(request))
				.contentType(MediaType.APPLICATION_JSON))
		print "the response is" +studyListResponse

		then:'display all the studies only for the particular organization'

		studyListResponse.andExpect(status().is(expectedStatus))
		assert new JsonSlurper().parseText(studyListResponse.andReturn().response.contentAsString).results.size() == countOfRecords

		where:
		orgId <<[1, 1001, 1002]
		countOfRecords << [3, 2, 1]
		fromDate << [CommonUtil.getDate(), CommonUtil.getDate(), CommonUtil.getDate()]
		toDate <<   [CommonUtil.getDate(), CommonUtil.getDate(), CommonUtil.getDate()]
		type <<['myattestation', 'myattestation', 'myattestation']
		request <<[StudyTestData.request, StudyTestData.request, StudyTestData.request]
		expectedStatus<<[200, 200, 200]
	}
	
	void addStudies(studyId,userId,status,taskroleConf,wfcId){
		
		def stat = lookupRepository.findOne(status)
		def workflowTask = workflowTaskRepository.save(new WorkflowTask(
				typeConfig:typeConfigRepository.findOneByTypeName("Study"),
				workflowConfig:workflowConfigRepository.findOne(wfcId),
				currentStatus:stat.name,
				assignedUser:userAccountRepository.findOne(userId),
				triggeringUser:userAccountRepository.findOne(userId))
				)

		def studyTaskMap = studyTaskMapRepository.save(new StudyTaskMap(
				study:studyRepository.findOne(studyId),
				workflowTask:workflowTaskRepository.findOne(workflowTask.id.asType(Long.class)))
				)

		def userTaskStage = userTaskStageRepository.save(new UserTaskStage(
				workflowTask:workflowTask,
				user:userAccountRepository.findOne(userId),
				taskRoleConfig:taskRoleConfigRepository.findOne(taskroleConf))
				)
		def study = studyRepository.findOne(studyId)
		if(study) {
			study.studyTaskMap = studyTaskMap
			study.status =stat
			studyRepository.save(study)
		}
		def taskAssignedUser = taskAssignedUserRepository.save(new TaskAssignedUser(workflowTask:workflowTask))
	}
	
}

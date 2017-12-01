package com.ffss.datax.study.test.web.resource

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*
import groovy.json.JsonOutput
import groovy.json.JsonSlurper

import javax.ws.rs.core.MediaType

import org.springframework.beans.factory.annotation.Autowired

import com.ffss.datax.common.domain.study.StudyExamTypeMap
import com.ffss.datax.common.domain.study.StudyTaskMap
import com.ffss.datax.common.domain.workflow.TaskAssignedUser
import com.ffss.datax.common.domain.workflow.UserTaskStage
import com.ffss.datax.common.domain.workflow.WorkflowTask
import com.ffss.datax.study.repository.ExamTypeMapRepository
import com.ffss.datax.study.repository.StudyExamTypeMapRepository
import com.ffss.datax.study.repository.StudyLookupRepository
import com.ffss.datax.study.repository.StudyRepository
import com.ffss.datax.study.repository.StudyTaskMapRepository
import com.ffss.datax.study.repository.UserAccountRepository
import com.ffss.datax.study.repository.UserTaskStageRepository
import com.ffss.datax.study.repository.WorkflowTaskRepository
import com.ffss.datax.study.test.base.TransactionalWebIntegrationTest
import com.ffss.datax.study.test.base.WebAppIntegrationBaseSpecification

@TransactionalWebIntegrationTest
class StudyListSpec extends WebAppIntegrationBaseSpecification {

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
	StudyRepository studyRepository

	@Autowired
	UserTaskStageRepository userTaskStageRepository
	@Autowired
	TaskRoleConfigRepository taskRoleConfigRepository
	@Autowired
	StudyExamTypeMapRepository studyExamTypeMapRepository

	@Autowired
	ExamTypeMapRepository examTypeMapRepository
	@Autowired
	StudyLookupRepository studyProgressRepository

	@Autowired
	TaskAssignedUserRepository taskAssignedUserRepository


	def 'Fetch all the mystudies for the study list'(orgId,token,type,fromDate,toDate,expectedResult,expectedStatus,request){

		given: " You are logged in"

		when: " User want to fetch All the studies"
		addTask(76000000000001,1002L,4003L,30L,3L)
		def res = this.mockMvc.perform(post("/api/org/${orgId}/studylist?type=${type}&fromDate=${fromDate}&toDate=${toDate}")
				.header("Authorization","Bearer "+token)
				.accept(MediaType.APPLICATION_JSON)
				.content(JsonOutput.toJson(request))
				.contentType(MediaType.APPLICATION_JSON))

		then: " The expected status is"

		res.andExpect(status().is(expectedStatus))
		if (expectedStatus == 200) {
			validateResult(expectedResult, new JsonSlurper().parseText(res.andReturn().response.contentAsString))
		}
		where :
		
		orgId << [1001,1001,1001,1001,1001,1001,1001,1001]
		
		token << [StudyTestData.token1, StudyTestData.token1, StudyTestData.token1, StudyTestData.token1, StudyTestData.token1, StudyTestData.token1, StudyTestData.token1, StudyTestData.token1]

		type <<     ['mystudies', 'mystudies', 'mystudies', 'mystudies', 'mystudies', 'mystudies', 'mystudies', 'mystudies']

		fromDate << ['', '2016-01-31', '2016-08-31', '2015-12-07', '', '2017-01-31', '2016-08-31', '2015-01-31']

		toDate <<   ['', '2017-04-27', '2017-03-14', '2017-04-27', '', '2017-01-31', '201-03-14', '2017-04-27']

		expectedResult << [StudyTestData.expectedStudies, StudyTestData.emptyResult, StudyTestData.expectedStudies, StudyTestData.emptyResult, StudyTestData.expectedStudies, StudyTestData.emptyResult, StudyTestData.expectedStudies, StudyTestData.emptyResult]

		expectedStatus << [200, 200, 200, 200, 200, 200, 200, 200]

		request <<[StudyTestData.request, StudyTestData.request, StudyTestData.request, StudyTestData.request, StudyTestData.request1, StudyTestData.request1, StudyTestData.request1, StudyTestData.request1]
	}

	def 'Fetch all the studies for the study list'(orgId,token,type,fromDate,toDate,expectedStatus,request){

		given: " You are logged in"

		when: " User want to fetch All the studies"
		def res = this.mockMvc.perform(post("/api/org/${orgId}/studylist?type=${type}&fromDate=${fromDate}&toDate=${toDate}")
				.header("Authorization","Bearer "+token)
				.accept(MediaType.APPLICATION_JSON)
				.content(JsonOutput.toJson(request))
				.contentType(MediaType.APPLICATION_JSON))

		then: " The expected status is"

		res.andExpect(status().is(expectedStatus))
		where :
		orgId << [1001,1001,1001,1001,1001,1001,1001,1001]
		
		token << [StudyTestData.token1, StudyTestData.token1, StudyTestData.token1, StudyTestData.token1, StudyTestData.token1, StudyTestData.token1, StudyTestData.token1, StudyTestData.token1]

		type <<     ['', '', '', '', 'allstudies', 'allstudies', 'allstudies', 'allstudies']

		fromDate << ['', '2016-01-31', '2016-08-31', '2015-12-07', '', '2017-01-31', '2016-08-31', '2015-01-31']

		toDate <<   ['', '2017-04-27', '2017-03-14', '2017-04-27', '', '2017-01-31', '201-03-14', '2017-04-27']

		expectedStatus << [200, 200, 200, 200, 200, 200, 200, 200]

		request <<[StudyTestData.request, StudyTestData.request, StudyTestData.request, StudyTestData.request, StudyTestData.request, StudyTestData.request, StudyTestData.request, StudyTestData.request]
	}

	def 'Fetch all the studies submitted for QA in the study list'(orgId,token,type,fromDate,toDate,expectedResult,expectedStatus,request){

		given: " You are logged in"

		when: " User want to fetch All the studies"
		addTask(76000000000001,1002L,4006L,31L,23L)
		def res = this.mockMvc.perform(post("/api/org/${orgId}/studylist?type=${type}&fromDate=${fromDate}&toDate=${toDate}")
				.header("Authorization","Bearer "+token)
				.accept(MediaType.APPLICATION_JSON)
				.content(JsonOutput.toJson(request))
				.contentType(MediaType.APPLICATION_JSON))

		then: " The expected status is"

		res.andExpect(status().is(expectedStatus))
		if (expectedStatus == 200) {
			validateResult(expectedResult, new JsonSlurper().parseText(res.andReturn().response.contentAsString))
		}
		where :
		orgId << [1001,1001,1001,1001,1001,1001,1001,1001] 
		
		token << [StudyTestData.token1, StudyTestData.token1, StudyTestData.token1, StudyTestData.token1, StudyTestData.token1, StudyTestData.token1, StudyTestData.token1, StudyTestData.token1]

		type <<     ['qastudies', 'qastudies', 'qastudies', 'qastudies', 'qastudies', 'qastudies', 'qastudies', 'qastudies']

		fromDate << ['', '2016-01-31', '2016-08-31', '2015-12-07', '', '2017-01-31', '2016-08-31', '2015-01-31']

		toDate <<   ['', '2017-04-27', '2017-03-14', '2017-04-27', '', '2017-01-31', '201-03-14', '2017-04-27']

		expectedResult << [StudyTestData.expectedStudies, StudyTestData.emptyResult, StudyTestData.expectedStudies, StudyTestData.emptyResult, StudyTestData.expectedStudies, StudyTestData.emptyResult, StudyTestData.expectedStudies, StudyTestData.emptyResult]

		expectedStatus << [200, 200, 200, 200, 200, 200, 200, 200]

		request <<[StudyTestData.request, StudyTestData.request, StudyTestData.request, StudyTestData.request, StudyTestData.request1, StudyTestData.request1, StudyTestData.request1, StudyTestData.request1]
	}

	def 'Fetch all the  studies for attestaion in the study list'(orgId,token,type,fromDate,toDate,expectedResult,expectedStatus,request){

		given: " You are logged in"

		when: " User want to fetch All the studies"
		addTask(76000000000001,1002L,4010L,31L,23L)
		def res = this.mockMvc.perform(post("/api/org/${orgId}/studylist?type=${type}&fromDate=${fromDate}&toDate=${toDate}")
				.header("Authorization","Bearer "+token)
				.accept(MediaType.APPLICATION_JSON)
				.content(JsonOutput.toJson(request))
				.contentType(MediaType.APPLICATION_JSON))

		then: " The expected status is"

		res.andExpect(status().is(expectedStatus))

		if (expectedStatus == 200) {
			validateResult(expectedResult,new JsonSlurper().parseText(res.andReturn().response.contentAsString))
		}
		where :
		orgId << [1001,1001,1001,1001,1001,1001,1001,1001]
			
		token << [StudyTestData.token1, StudyTestData.token1, StudyTestData.token1, StudyTestData.token1, StudyTestData.token1, StudyTestData.token1, StudyTestData.token1, StudyTestData.token1]

		type <<     ['myattestation', 'myattestation', 'myattestation', 'myattestation', 'myattestation', 'myattestation', 'myattestation', 'myattestation']

		fromDate << ['', '2016-01-31', '2016-08-31', '2015-12-07', '', '2017-01-31', '2016-08-31', '2015-01-31']

		toDate <<   ['', '2017-04-27', '2017-03-14', '2017-04-27', '', '2017-01-31', '201-03-14', '2017-04-27']

		expectedResult << [StudyTestData.emptyResult, StudyTestData.emptyResult, StudyTestData.emptyResult, StudyTestData.emptyResult, StudyTestData.emptyResult, StudyTestData.emptyResult, StudyTestData.emptyResult, StudyTestData.emptyResult]
		expectedStatus << [200, 200, 200, 200, 200, 200, 200, 200]
		request <<[StudyTestData.request, StudyTestData.request, StudyTestData.request, StudyTestData.request, StudyTestData.request1, StudyTestData.request1, StudyTestData.request1, StudyTestData.request1]
	}


	void validateResult(expectedResult,actualResult) {
		if(actualResult.results[0] == null) {
			def actualRes = actualResult.results[0]
			def expectedRes = expectedResult.results[0]
			assert expectedRes == actualRes
		}

		else{
			['results'].each{

				['patient'].each{
					assert expectedResult.results.patient.size() == actualResult.results[0].patient.size()
				}

				['studyId', 'studyType'].each{
					assert expectedResult.results.studyId == actualResult.results[0].studyId
					assert expectedResult.results.studyType == actualResult.results[0].studyType
				}

				['modality', 'examType', 'tags'].each{

					assert expectedResult.results.modality.size() == actualResult.results[0].modality.size()
					assert expectedResult.results.examType.size() == actualResult.results[0].examType.size()
					assert expectedResult.results.tags.size() == actualResult.results[0].tags.size()
				}

				['status'].each{

					assert expectedResult.results.status == actualResult.results[0].status
				}


				['requestingphysician', 'referringphysician'].each {
					assert expectedResult.results.requestingphysician.size() == actualResult.results[0].requestingphysician.size()
					assert expectedResult.results.referringphysician.size() == actualResult.results[0].referringphysician.size()
				}
			}
		}
	}

	void addTask(studyId,userId,status,taskroleConf,wfcId){
		def stat = studyProgressRepository.findOne(status)
		def workflowTask = workflowTaskRepository.save(new WorkflowTask(
				typeConfig:typeConfigRepository.findOneByTypeName("Study"),
				workflowConfig:workflowConfigRepository.findOne(wfcId),
				currentStatus:stat.name,
				assignedUser:userRepository.findOne(userId),
				triggeringUser:userRepository.findOne(userId))
				)

		def studyTaskMap = studyTaskMapRepository.save(new StudyTaskMap(
				study:studyRepository.findOne(studyId),
				workflowTask:workflowTaskRepository.findOne(workflowTask.id.asType(Long.class)))
				)

		def userTaskStage = userTaskStageRepository.save(new UserTaskStage(
				workflowTask:workflowTask,
				user:userRepository.findOne(userId),
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
	void addExamTypeMap(studyId){
		def stat
		stat = studyProgressRepository.findOne(4003L)
		def examTypeMap = studyExamTypeMapRepository.save(new StudyExamTypeMap(
				type:"study",
				study:studyRepository.findOne(studyId),
				examTypeMap:examTypeMapRepository.findOne(9001L))
				)

		def study = studyRepository.findOne(studyId)
		if(study) {
			study.studyExamTypeMap = examTypeMap
			study.status = stat
			studyRepository.save(study)
		}
	}

	def 'To fetch all the statuses'(token,expectedResult,expectedStatus){
		given: " You are logged in"

		when: " User want to fetch All the statuses for dropdown"

		def res = this.mockMvc.perform(get("/api/study/statusList")
				.header("Authorization","Bearer "+token)
				.accept(MediaType.APPLICATION_JSON))
				then: " The expected status is"

		res.andExpect(status().is(expectedStatus))
		def actualResult= new JsonSlurper().parseText(res.andReturn().response.contentAsString)
		if (expectedStatus == 200) {
			if(actualResult == null) {
				assert expectedResult == actualResult
			}

		}
		where :
		token << [StudyTestData.token1]
		expectedResult <<[StudyTestData.statusList]
		expectedStatus<<200
		}

		def 'Fetch all the studies for the anonymous patient study list'(orgId,token,type,fromDate,toDate,expectedResult,expectedStatus,request){

				given: " You are logged in and you have allStudies study list data with patient name as 'Anonymized' and 'Hannah' "

				when: " User want to fetch All the studies of 'Anonymized' and 'Hannah' "
				addTask(76000000000001,1002L,4003L,30L,3L)
				def res = this.mockMvc.perform(post("/api/org/${orgId}/studylist?type=${type}&fromDate=${fromDate}&toDate=${toDate}")
						.header("Authorization","Bearer "+token)
						.accept(MediaType.APPLICATION_JSON)
						.content(JsonOutput.toJson(request))
						.contentType(MediaType.APPLICATION_JSON))

				then: " The expected status should be 'Anonymized' patient study list and 'Hannah' patient study list"

				res.andExpect(status().is(expectedStatus))
				if (expectedStatus == 200) {
					def actResult = new JsonSlurper().parseText(res.andReturn().response.contentAsString);
					validateResult(expectedResult,actResult)
				}
				where :
				orgId << [1001,1]
				token << [StudyTestData.token1,StudyTestData.token1]

				type <<     ['allstudies','allstudies']

				fromDate << ['2016-09-11','2016-09-11']

				toDate <<   ['2017-09-14','2017-09-14']

				expectedResult << [StudyTestData.expectedStudies_validRecord,StudyTestData.expectedStudies_Anonymized24]

				expectedStatus << [200,200]

				request <<[StudyTestData.request_validRecord,StudyTestData.anonymizedRequest]
			}
		
}

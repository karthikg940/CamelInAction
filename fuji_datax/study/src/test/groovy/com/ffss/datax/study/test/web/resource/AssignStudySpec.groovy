package com.ffss.datax.study.test.web.resource

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*
import groovy.json.JsonOutput
import groovy.json.JsonSlurper

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.MediaType

import com.ffss.datax.common.domain.study.StudyExamTypeMap
import com.ffss.datax.common.domain.study.StudyTaskMap
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
class AssignStudySpec extends WebAppIntegrationBaseSpecification {

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
	TaskRoleConfigRepository taskRoleConfigRepository
	
	@Autowired
	StudyExamTypeMapRepository studyExamTypeMapRepository

	@Autowired
	ExamTypeMapRepository examTypeMapRepository
	
	@Autowired
	StudyLookupRepository StudyProgressRepository
	
	@Autowired
	UserTaskStageRepository userTaskStageRepository


	def 'Test Assign a Study to user'(id,expectedStatus,userId,testData) {
		given: 'User logged in'
		when: ' A study status is new / study is unassigned'
		def token = StudyTestData.token1
		def response = this.mockMvc.perform(post("/api/study/${id}/pocassign")
				.header("Authorization","Bearer "+token)
				.contentType(MediaType.APPLICATION_JSON))
		then: 'status should change to assigned'
		response.andExpect(status().is(expectedStatus))
		if (expectedStatus == 200) {
			def  res = new JsonSlurper().parseText(response.andReturn().response.contentAsString)
			res.prefix = testData.prefix
			res.firstName = testData.firstName
		}
		where:
		id << [76000000000001, 76000000000001]
		expectedStatus << [200, 200]
		userId<<[1002L, 1001L]
		testData << [StudyTestData.reAssignResp, StudyTestData.reAssignRes]
	}

	def 're-assign a self study to Other'(studyId,expectedStatus,userId,testData) {
		given: 'A study status is study is Assigned or Inprogress'

		def token = StudyTestData.token
		def response = this.mockMvc.perform(post("/api/study/${studyId}/pocassign")
				.header("Authorization","Bearer "+token)
				.contentType(MediaType.APPLICATION_JSON))
		response.andExpect(status().is(expectedStatus))
		addTask(studyId,userId,4002L,30L,1L)
		when: ' user want to reassign the study to othre user'
		def reAssgnRes = this.mockMvc.perform(put("/api/study/${studyId}/reassignuser/${userId}")
				.header("Authorization","Bearer "+token)
				.contentType(MediaType.APPLICATION_JSON))
		then:'update the userId'
		response.andExpect(status().is(expectedStatus))
		if (expectedStatus == 200) {
			def  res = new JsonSlurper().parseText(response.andReturn().response.contentAsString)
			res.prefix = testData.prefix
			res.firstName = testData.firstName
		}
		where:
		studyId << [76000000000001, 76000000000001,76000000000001]
		expectedStatus << [200, 200 ,200]
		userId<<[1002L, 1001L,5001L]
		testData << [StudyTestData.reAssignResp, StudyTestData.reAssignRes,[:]]
	}

	def 'un-assign a self study'(studyId,expectedStatus,userId) {
		given: 'A study status is study is Assigned or Inprogress'

		def token = StudyTestData.token
		def response = this.mockMvc.perform(post("/api/study/${studyId}/pocassign")
				.header("Authorization","Bearer "+token)
				.contentType(MediaType.APPLICATION_JSON))
		response.andExpect(status().is(expectedStatus))
		addTask(studyId,userId,4002L,30L,1L)
		when: ' user want to unassign a study'
		def resp = this.mockMvc.perform(put("/api/study/${studyId}/modifystatus")
				.header("Authorization","Bearer "+token)
				.contentType(MediaType.APPLICATION_JSON))
		then: 'unassign a study and update the status to new'
		resp.andExpect(status().is(expectedStatus))
		where :
		studyId << [76000000000001]
		expectedStatus <<[200]
		userId <<[1001L]
	}
	def "un-assign study and un associate the worksheet"(studyId, expectedStatus,userId) {
		given : "we have study which is associated with study"
		def token = StudyTestData.token1
		def response = this.mockMvc.perform(post("/api/study/${studyId}/pocassign")
				.header("Authorization","Bearer "+token)
				.contentType(MediaType.APPLICATION_JSON))
		response.andExpect(status().is(expectedStatus))
		addTask(studyId,userId,4003L,30L,1L)
		addExamTypeMap(studyId)
		when : "we get the exam type which is belogngs to study"
		def res = this.mockMvc.perform(delete("/api/study/${studyId}/admin/modifystatus")
				.header("Authorization","Bearer "+token)
				.contentType(MediaType.APPLICATION_JSON))
		then : "un associate worksheet, un-assign study to that user, move to new state"
		res.andExpect(status().is(404))
		where :
		studyId <<[76000000000001]
		expectedStatus << [200]
		userId <<[1001L]
	}
	def 'assign study to user by Admin'(studyId,userId,data,testData,expectedStatus) {
		given: 'User logged in'
		when: ' A study status is new / study is unassigned'
		def token = StudyTestData.token1
		def response = this.mockMvc.perform(post("/api/study/${studyId}/admin/${userId}")
				.header("Authorization","Bearer "+token)
				.contentType(MediaType.APPLICATION_JSON))
		then: 'status should change to assigned'

		response.andExpect(status().is(expectedStatus))
		if (expectedStatus == 200) {

			def resp = this.mockMvc.perform(post("/api/task")
					.header("Authorization","Bearer "+token)
					.content(JsonOutput.toJson(data))
					.contentType(MediaType.APPLICATION_JSON))
			def  res = new JsonSlurper().parseText(response.andReturn().response.contentAsString)
			res.prefix = testData.prefix
			res.firstName = testData.firstName
		}
		where:
		studyId << [76000000000001]
		userId << [1001]
		data << [[type:"study",user:1001]]
		testData << [StudyTestData.reAssignResp]
		expectedStatus << [200]
	}

	def 'Test Assign a Study to QAuser'(id,expectedStatus,userId,testData) {
		given: 'User logged in'
		when: ' A study status is QAUnAssigned'
		def token = StudyTestData.token1
		addTask(id,userId,4005L,31L,23L)
		and: 'user signed the worksheet and submits to QA '
		def resp = this.mockMvc.perform(post("/api/study/${id}/qaassign")
				.header("Authorization","Bearer "+token)
				.contentType(MediaType.APPLICATION_JSON))
		then: 'status should change to QAAssigned'
		resp.andExpect(status().is(expectedStatus))
		if (expectedStatus == 200) {
			def  res = new JsonSlurper().parseText(resp.andReturn().response.contentAsString)
			res.prefix = testData.prefix
			res.firstName = testData.firstName
		}
		where:
		id << [76000000000001, 76000000000001]
		expectedStatus << [200, 200]
		userId<<[1002L, 1001L]
		testData << [StudyTestData.reAssignResp, StudyTestData.reAssignRes]
	}
	def "study submitted to Qa"(studyId,expectedStatus,orgId,userId) {
		print "orgId"+orgId
		given : 'User logged in'

		when: ' A study status is signed'
		addTask(studyId,userId,4005L,31L,23L)
		def token = StudyTestData.token1
		 
		def response = this.mockMvc.perform(put("/api/org/${orgId}/examtype/${studyId}/submittoqa")
				.header("Authorization","Bearer "+token)
				.content(JsonOutput.toJson([studyId:76000000000001,userid:null]))
				.contentType(MediaType.APPLICATION_JSON))
		then : "study status get change to QAUnassigned"
		response.andExpect(status().is(expectedStatus))
		if (expectedStatus == 200) {
			def resp = this.mockMvc.perform(put("/api/task/${studyId}")
					.header("Authorization","Bearer "+token)
					.contentType(MediaType.APPLICATION_JSON))
		}

		where :
		studyId <<[76000000000001,76000000000001]
		expectedStatus << [200,200]
		orgId << [1001,1001]
		userId << [1004L,1005L]
	}

	def 'check POC and Attending are same' (studyId,expectedStatus, expectedresult) {
		given: 'we have preference call and users id'
		def token = StudyTestData.token1
		addTask(studyId,1001L,4003L,30L,1L)
		when: 'both the users are same and attending preference is true'

		def res=this.mockMvc.perform(get("/api/study/${studyId}/attestation/uservalidate")
				.header("Authorization","Bearer "+token)
				.accept(MediaType.APPLICATION_JSON))

		then: 'we expect the status as true'
		res.andExpect(status().is(expectedStatus))

		def result = new JsonSlurper().parseText(res.andReturn().response.contentAsString)
		assert result.size() == expectedresult.size()

		where:
		studyId << [76000000000001]
		expectedStatus << [200]
		expectedresult << [StudyTestData.userAssignedStatus]
	}
	
	def 'check  Attending user is Assigned or Not' (studyId,expectedStatus, expectedresult) {
		given: 'we have preference call and users id'
		def token = StudyTestData.token1
		addTask(studyId,1001L,4003L,32L,25L)
		when: 'both the users are same and attending preference is true'

		def res=this.mockMvc.perform(get("/api/study/${studyId}/assignuser")
				.header("Authorization","Bearer "+token)
				.accept(MediaType.APPLICATION_JSON))

		then: 'we expect the status as true'
		res.andExpect(status().is(expectedStatus))

		def result = new JsonSlurper().parseText(res.andReturn().response.contentAsString)
		assert result.size() == expectedresult.size()

		where:
		studyId << [76000000000001]
		expectedStatus << [200]
		expectedresult << [StudyTestData.userAssignedStatus]
	}
	
	def 'Assign  Attending user to study' (studyId,expectedStatus,userid,expectedResult) {
		given: 'we have strudyId'
		def token = StudyTestData.token1
		addTask(studyId,1001L,4002L,30L,1L)
		when: 'the Poc want to add the Attending user '
		def res=this.mockMvc.perform(put("/api/study/${studyId}/assigntoattendUser/${userid}")
				.header("Authorization","Bearer "+token)
				.accept(MediaType.APPLICATION_JSON))

		then: 'expected status is'
		and: 'the Poc want to add the Attending user '
		//addTask(studyId,1001L,4004L,32L,25L)
		def resp=this.mockMvc.perform(put("/api/study/${studyId}/assigntoattendUser/${userid}")
				.header("Authorization","Bearer "+token)
				.accept(MediaType.APPLICATION_JSON))

		then: 'expected status is'
		res.andExpect(status().is(expectedStatus))
		if (expectedStatus == 200) {
			def resJsn= new JsonSlurper().parseText(resp.andReturn().response.contentAsString)
			['prefix', 'firstName', 'middleName', 'lastName'].each{
				assert expectedResult.prefix == resJsn.prefix
				assert expectedResult.firstName == resJsn.firstName
				assert expectedResult.middleName== resJsn.middleName
				assert expectedResult.lastName== resJsn.lastName
			}
		}
		where:
		studyId << [76000000000001]
		expectedStatus << [200]
		userid<<[1002]
		expectedResult<<[StudyTestData.reAssignRes]
	}

	void addTask(studyId,userId,status,taskroleConf,wfcId){
		def stat = StudyProgressRepository.findOne(status)
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
	}
	void addExamTypeMap(studyId){
		def stat
		stat = StudyProgressRepository.findOne(4003L)
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
}

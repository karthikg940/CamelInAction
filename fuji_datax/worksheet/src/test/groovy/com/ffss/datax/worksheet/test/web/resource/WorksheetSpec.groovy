package com.ffss.datax.worksheet.test.web.resource

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status

import javax.ws.rs.core.MediaType

import org.springframework.beans.factory.annotation.Autowired

import com.ffss.datax.common.constants.StudyLookup
import com.ffss.datax.common.domain.study.StudyTaskMap
import com.ffss.datax.common.domain.workflow.UserTaskStage
import com.ffss.datax.common.domain.workflow.WorkflowTask
import com.ffss.datax.worksheet.repository.StudyLookupRepository
import com.ffss.datax.worksheet.repository.StudyRepository
import com.ffss.datax.worksheet.test.base.TransactionalWebIntegrationTest
import com.ffss.datax.worksheet.test.base.WebAppIntegrationBaseSpecification
import com.ffss.datax.worksheet.test.repository.StudyTaskMapRepository
import com.ffss.datax.worksheet.test.repository.TypeConfigRepository
import com.ffss.datax.worksheet.test.repository.UserRepository
import com.ffss.datax.worksheet.test.repository.UserTaskStageRepository
import com.ffss.datax.worksheet.test.repository.WorkflowConfigRepository
import com.ffss.datax.worksheet.test.repository.WorkflowTaskRepository

import groovy.json.JsonOutput
import groovy.json.JsonSlurper
import spock.lang.Ignore

@TransactionalWebIntegrationTest
class WorksheetSpec extends WebAppIntegrationBaseSpecification {

	@Autowired
	StudyTaskMapRepository studyTaskMapRepository

	@Autowired
	WorkflowTaskRepository workflowTaskRepository

	@Autowired
	UserTaskStageRepository userTaskStageRepository

	@Autowired
	UserRepository userRepository

	@Autowired
	WorkflowConfigRepository workflowConfigRepository

	@Autowired
	StudyRepository studyRepository

	@Autowired
	TypeConfigRepository typeConfigRepository

	@Autowired
	StudyLookupRepository studyLookupRepository
	
	@Ignore
	def "get worksheet and QA Worksheettemplates"(token,expectedResult,expectedStatus){

		given:'we have examtypes'

		when:'user want to get the worksheet template'

		def res=this.mockMvc.perform(get("/api/template/search")
				.header("Authorization","Bearer "+token)
				.accept(MediaType.APPLICATION_JSON))

		then:'the expected status is'
		res.andExpect(status().is(expectedStatus))

		
		and: ' fethcing the details for QA Worksheet'
		def resForQaTemplate=this.mockMvc.perform(get("/api/template/search/qa")
				.header("Authorization","Bearer "+token)
				.accept(MediaType.APPLICATION_JSON))

		then:'the expected status is'
		res.andExpect(status().is(expectedStatus))

		where :
		token << [WorksheetTestData.token1]
		expectedResult << [WorksheetTestData.TestData1]
		expectedStatus << [200]
	}

	

	def "get template content based on id"(token,templateId,expectedResult,expectedStatus){

		given:'we have examtypes'

		when:'user want to get the worksheet template content based on templateId'

		def res=this.mockMvc.perform(get("/api/template/${templateId}")
				.header("Authorization","Bearer "+token)
				.accept(MediaType.APPLICATION_JSON))

		then:'the expected status is'
		res.andExpect(status().is(expectedStatus))

		if (expectedStatus == 200) {
			validateTemplateContent(expectedResult,new JsonSlurper().parseText(res.andReturn().response.contentAsString))
		}

		where :
		token << [WorksheetTestData.token1, WorksheetTestData.token1]
		templateId << [7001, 1212]
		expectedResult << [WorksheetTestData.TestData2, [:]]
		expectedStatus << [200, 404]
	}


	void validateTemplateContent(expectedResult,actualResult){
		['result'].each{

			assert expectedResult.result.id == actualResult.result.id
			assert expectedResult.result.name == actualResult.result.name
			assert expectedResult.result.content.size() == actualResult.result.content.size()
		}
	}

	def "Changing the study status to submitted"(studyId, data,expectedStatus) {

		given: 'We have saved templates for the given exam type'
		when: 'We save a worksheet'
		def res = this.mockMvc.perform(post("/api/worksheet")
				.header("Authorization","Bearer "+WorksheetTestData.token1)
				.content(JsonOutput.toJson(data))
				.contentType(MediaType.APPLICATION_JSON))

		res.andExpect(status().isCreated())

		and: "we have worksheet related to study "

		then: "we found worksheet which is belongs to that study"

//		def token = WorksheetTestData.token1
//		def responce = mockMvc.perform(put("/api/worksheet/${studyId}/examtype/submissionstatus")
//				.header("Authorization","Bearer "+token)
//				.contentType(MediaType.APPLICATION_JSON))

		then: "Changed the study status"
//		responce.andExpect(status().is(expectedStatus))

		where :
		studyId << [76000000000001]
		data<<[WorksheetTestData.saveData[3]]
		expectedStatus << [200]
	}

	def " submitting the study to QA"(studyId, data,expectedStatus) {

		given: 'We have saved templates for the given exam type'
		when: 'We save a worksheet'
		def res = this.mockMvc.perform(post("/api/worksheet")
				.header("Authorization","Bearer "+WorksheetTestData.token1)
				.content(JsonOutput.toJson(WorksheetTestData.saveData[0]))
				.contentType(MediaType.APPLICATION_JSON))

		res.andExpect(status().isCreated())

		and: "we have QA worksheet and submitting a QA worksheet template to common queue"

		def token = WorksheetTestData.token1
		def responce = mockMvc.perform(put("/api/worksheet/submittoqa")
				.header("Authorization","Bearer "+token)
				.content(JsonOutput.toJson(data))
				.contentType(MediaType.APPLICATION_JSON))

		then: "submitted a study to QA"
		responce.andExpect(status().is(expectedStatus))

		and: ' submitting a qa worksheet to the particular user'
		def submitToUser = mockMvc.perform(put("/api/worksheet/submittoqa")
				.header("Authorization","Bearer "+token)
				.content(JsonOutput.toJson(data))
				.contentType(MediaType.APPLICATION_JSON))

		then: "submitted a study to QA"
		submitToUser.andExpect(status().is(expectedStatus))

		and: ' submitting a study for a particular user'

		def submitStudyToUser = mockMvc.perform(put("/api/worksheet/submittoqa")
				.header("Authorization","Bearer "+token)
				.content(JsonOutput.toJson([studyId: 76000000000001, userId: 1001]))
				.contentType(MediaType.APPLICATION_JSON))

		then: "submitted a study to QA"
		submitStudyToUser.andExpect(status().is(expectedStatus))
		and:' checking for study which is not there'
		def submitToUserNeg = mockMvc.perform(put("/api/worksheet/submittoqa")
				.header("Authorization","Bearer "+token)
				.content(JsonOutput.toJson([studyId: 76000000000002, userId: null]))
				.contentType(MediaType.APPLICATION_JSON))

		then: "submitted a study to QA"
		submitToUserNeg.andExpect(status().is(404))
		where :
		studyId << [76000000000001]
		data<<[WorksheetTestData.submitToQa]
		expectedStatus << [200]
	}

	def  'submitting the study to attending'(studyId, data,expectedStatus) {

		given: 'We have saved templates for the given exam type'
		when: 'We save a worksheet'
		def res = this.mockMvc.perform(post("/api/worksheet")
				.header("Authorization","Bearer "+WorksheetTestData.token1)
				.content(JsonOutput.toJson(WorksheetTestData.saveData[0]))
				.contentType(MediaType.APPLICATION_JSON))

		then:' create task for QAInProgres study'
		res.andExpect(status().isCreated())
		createTask('QAInProgress')
		and: "we have QA worksheet and submitting a QA worksheet template to common queue"

		def token = WorksheetTestData.token1
		def responseForQAInProgress = mockMvc.perform(put("/api/worksheet/${studyId}/submittoattending")
				.header("Authorization","Bearer "+token)
				.content(JsonOutput.toJson(data))
				.contentType(MediaType.APPLICATION_JSON))

		then: "submitted a study to QA"
		responseForQAInProgress.andExpect(status().is(expectedStatus))
		then:' create task for Pending study'
		createTask('Pending')
		def responseForPending = mockMvc.perform(put("/api/worksheet/${studyId}/submittoattending")
				.header("Authorization","Bearer "+token)
				.content(JsonOutput.toJson(data))
				.contentType(MediaType.APPLICATION_JSON))

		then: "submitted a study to QA"
		responseForPending.andExpect(status().is(expectedStatus))

		and: ' Having the study status as QaAssigned and submitting a study to attending'
		createTask('QAAssigned')
		def responseForQaAssigned = mockMvc.perform(put("/api/worksheet/${studyId}/submittoattending")
				.header("Authorization","Bearer "+token)
				.content(JsonOutput.toJson(data))
				.contentType(MediaType.APPLICATION_JSON))

		then: "submitted a study to QA"
		responseForQaAssigned.andExpect(status().is(expectedStatus))
		where :
		studyId << [76000000000001]
		data<<[WorksheetTestData.submitToQa]
		expectedStatus << [200]
	}

	def createTask(status){

		def workFlowTask = workflowTaskRepository.save(new WorkflowTask(typeConfig:typeConfigRepository.findOneByTypeName('study'),workflowConfig:workflowConfigRepository.findOne(1L),currentStatus:'Pending',assignedUser:userRepository.findOne(1001L),
		triggeringUser:userRepository.findOne(1001L)))

		def studyTaskMap = studyTaskMapRepository.save(new StudyTaskMap(workflowTask:workflowTaskRepository.findOne(workFlowTask.id)
		,study:studyRepository.findOne(76000000000001L)))


		def userTaskStage = userTaskStageRepository.save(new UserTaskStage(user:userRepository.findOne(1001L),
		workflowTask:workflowTaskRepository.findOne(workFlowTask.id)))

		def study = studyRepository.findOne(76000000000001L)
		study.studyTaskMap = studyTaskMapRepository.findOne(studyTaskMap.id)
		study.status = studyLookupRepository.findOne(StudyLookup."${status}".value)
		studyRepository.save(study)
	}
}


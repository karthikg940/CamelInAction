package com.ffss.datax.worksheet.test.web.resource

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status
import groovy.json.JsonOutput
import groovy.json.JsonSlurper

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.MediaType

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

@TransactionalWebIntegrationTest
class WorksheetCrudSpec extends WebAppIntegrationBaseSpecification {

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

	def 'Test saving a worksheet'(token,data,expectedStatus,id,request) {
		given: 'We have saved templates for the given exam type'
		when: 'We save a worksheet'
		def res = this.mockMvc.perform(post("/api/worksheet")
				.header("Authorization","Bearer "+token)
				.content(JsonOutput.toJson(data))
				.contentType(MediaType.APPLICATION_JSON))

		then: 'The worksheet gets saved'
		res.andExpect(status().is(expectedStatus))

		if (expectedStatus == 201) {

			def getRes = this.mockMvc.perform(get(res.andReturn().response.headers['Location'].value)
					.header("Authorization","Bearer "+token))
			if(!getRes.andReturn().response.contentAsString){
				getRes.andExpect(status().isNotFound())
			}
			else{

				def getJson = new JsonSlurper().parseText(getRes.andReturn().response.contentAsString)
				assert getJson.template.id == data.template.id
				getRes.andExpect(status().isOk())
			}
		}

		def resForNegCase = this.mockMvc.perform(post("/api/worksheet")
				.header("Authorization","Bearer "+token)
				.content(JsonOutput.toJson(WorksheetTestData.saveData[4]))
				.contentType(MediaType.APPLICATION_JSON))

		then: 'The worksheet gets saved'
		resForNegCase.andExpect(status().is(400))

		where:
		token << [WorksheetTestData.token1]
		data << [WorksheetTestData.saveData[0]]
		expectedStatus << [WorksheetTestData.expectedSaveStatus[0]]
		id<< [WorksheetTestData.examTypeIds[0]]
		request<< [WorksheetTestData.request]
	}

	def 'Test fetch the saved worksheet for an exam type'(token,examTypeId,expectedResult) {
		given: ' We have saved a worksheet'
		def res = this.mockMvc.perform(post("/api/worksheet")
				.header("Authorization","Bearer "+token)
				.content(JsonOutput.toJson(WorksheetTestData.saveData[0]))
				.contentType(MediaType.APPLICATION_JSON))

		res.andExpect(status().is(201))

		when: ' You fetch a worksheet for an exam type for procedural worksheet'
		def searchRes = this.mockMvc.perform(get("/api/worksheet/search?studyId=76000000000001&type=Procedural")
				.header("Authorization","Bearer "+token)
				.contentType(MediaType.APPLICATION_JSON))

		then: ' The data received is validated against the expected result'
		searchRes.andExpect(status().isOk())

		and: ' Fetching the worksheet for an QA type'
		def searchResForQa = this.mockMvc.perform(get("/api/worksheet/search?studyId=76000000000001&type=QA")
				.header("Authorization","Bearer "+token)
				.contentType(MediaType.APPLICATION_JSON))

		then: ' The data received is validated against the expected result'
		searchResForQa.andExpect(status().isOk())
		where:
		token << [WorksheetTestData.token1, WorksheetTestData.token1]
		examTypeId << WorksheetTestData.examTypeIds
		expectedResult << WorksheetTestData.searchResults
	}


	def 'Test updating a worksheet'(token) {
		given: 'We have saved worksheets for the given exam type'

		def res = this.mockMvc.perform(post("/api/worksheet")
				.header("Authorization","Bearer "+token)
				.content(JsonOutput.toJson(WorksheetTestData.saveData[0]))
				.contentType(MediaType.APPLICATION_JSON))

		res.andExpect(status().is(201))
		and: 'We saved a worksheet'

		def updateres = this.mockMvc.perform(put(res.andReturn().response.headers['Location'].value)
				.header("Authorization","Bearer "+token)
				.content(JsonOutput.toJson(WorksheetTestData.updateData))
				.contentType(MediaType.APPLICATION_JSON))

		and: 'The worksheet gets updated'
		updateres.andExpect(status().is(200))

		def updateWorksheet = this.mockMvc.perform(put("/api/worksheet/7878787788")
				.header("Authorization","Bearer "+token)
				.content(JsonOutput.toJson(WorksheetTestData.updateData))
				.contentType(MediaType.APPLICATION_JSON))

		and: 'The worksheet gets updated'
		updateWorksheet.andExpect(status().is(404))

		def getRes = this.mockMvc.perform(get(res.andReturn().response.headers['Location'].value)
				.header("Authorization","Bearer "+token))

		getRes.andExpect(status().isOk())
		def getJson = new JsonSlurper().parseText(getRes.andReturn().response.contentAsString)
		assert getJson.content == WorksheetTestData.updateData.content

		where:
		token << [WorksheetTestData.token1]
	}


	def 'Test delete a worksheet'(token) {
		given: 'We have saved worksheets for the given exam type'
		def res = this.mockMvc.perform(post("/api/worksheet")
				.header("Authorization","Bearer "+token)
				.content(JsonOutput.toJson(WorksheetTestData.wrkshtDelete))
				.contentType(MediaType.APPLICATION_JSON))
		res.andExpect(status().is(201))
		when: 'We delete a worksheet'
		def deleteres = this.mockMvc.perform(delete(res.andReturn().response.headers['Location'].value)
				.header("Authorization","Bearer "+token))
		then: 'The worksheet gets deleted'
		deleteres.andExpect(status().is(204))
		def getRes = this.mockMvc.perform(get(res.andReturn().response.headers['Location'].value)
				.header("Authorization","Bearer "+token))
		getRes.andExpect(status().is(404))
		def checkres = this.mockMvc.perform(delete(res.andReturn().response.headers['Location'].value)
				.header("Authorization","Bearer "+token))
		checkres.andExpect(status().is(404))

		where:
		token << [WorksheetTestData.token1]
	}

	def ' Updating a QAWorksheet'(token,data,expectedStatus,id){
		createTask('QAAssigned')
		given: 'We have saved templates for the given exam type and the studyStatus in QAAssigned'
		when: 'We save a worksheet'
		def res = this.mockMvc.perform(post("/api/worksheet")
				.header("Authorization","Bearer "+token)
				.content(JsonOutput.toJson(data))
				.contentType(MediaType.APPLICATION_JSON))

		then: 'The worksheet gets saved and updating a study status to QAInProgress'
		createTask('QAInProgress')
		res.andExpect(status().is(expectedStatus))
		def respForQAInProgress = this.mockMvc.perform(post("/api/worksheet")
				.header("Authorization","Bearer "+token)
				.content(JsonOutput.toJson(data))
				.contentType(MediaType.APPLICATION_JSON))

		then: 'The worksheet gets saved and updating a study status to respForQAInProgress'

		respForQAInProgress.andExpect(status().is(expectedStatus))

		where:
		token << [WorksheetTestData.token1]
		data << [WorksheetTestData.saveData[3]]
		expectedStatus << [WorksheetTestData.expectedSaveStatus[0]]
		id<< [WorksheetTestData.examTypeIds[0]]
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

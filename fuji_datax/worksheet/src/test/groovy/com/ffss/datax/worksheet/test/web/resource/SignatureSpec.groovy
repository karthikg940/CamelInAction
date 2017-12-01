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
class SignatureSpec extends WebAppIntegrationBaseSpecification {

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

	def 'Saving the Signature'(wrkshtData,wrkshtType) {
		given: 'Got a wrksht for Signature'
		when: 'Got signature for a worksheet'
		def respForWrksht = this.mockMvc.perform(post("/api/worksheet")
				.header("Authorization","Bearer "+WorksheetTestData.token1)
				.content(JsonOutput.toJson(wrkshtData))
				.contentType(MediaType.APPLICATION_JSON))

		then: 'The worksheet gets saved'
		respForWrksht.andExpect(status().is(201))

		String[] wrkshtFrag= respForWrksht.andReturn().response.headers['Location'].value.split("/");
		String wrkshtId =  wrkshtFrag[wrkshtFrag.length-1];

		and: ' for the saved worksheet update or create the workFlowTask for possible flow'

		if(wrkshtType != 'QA'){
			createTask('Signed')

			then: ' Insert the signature for the saved worksheet'

			def saveSignature = this.mockMvc.perform(post("/api/template/sign")
					.header("Authorization","Bearer "+SignatureTestData.token)
					.content(JsonOutput.toJson(SignatureTestData.insertSignature(wrkshtId,'poc')))
					.contentType(MediaType.APPLICATION_JSON))
			then: "we expect the status"
			saveSignature.andExpect(status().is(201))

			def saveSignatureNeg = this.mockMvc.perform(post("/api/template/sign")
					.header("Authorization","Bearer "+SignatureTestData.token)
					.content(JsonOutput.toJson(SignatureTestData.insertSignature(1212,'')))
					.contentType(MediaType.APPLICATION_JSON))
			then: "we expect the status"
			saveSignatureNeg.andExpect(status().is(400))

			getSignature(wrkshtId)
			and:' delete the signature for a worksheet'
			def deleteSignature = this.mockMvc.perform(delete(saveSignature.andReturn().response.headers['Location'].value)
					.header("Authorization","Bearer "+SignatureTestData.token)
					.contentType(MediaType.APPLICATION_JSON))
			then: "we expect the status"
			deleteSignature.andExpect(status().is(204))
		}
		else{

			createTask('QAAssigned')
			def saveSignatureForQAAssigned = this.mockMvc.perform(post("/api/template/sign")
					.header("Authorization","Bearer "+SignatureTestData.token)
					.content(JsonOutput.toJson(SignatureTestData.insertSignature(wrkshtId,'qa')))
					.contentType(MediaType.APPLICATION_JSON))
			then: "we expect the status"
			saveSignatureForQAAssigned.andExpect(status().is(201))
			getSignature(wrkshtId)
			and:' delete the signature for a worksheet'


			createTask('QAInProgress')
			def saveSignatureForQAInProgress = this.mockMvc.perform(post("/api/template/sign")
					.header("Authorization","Bearer "+SignatureTestData.token)
					.content(JsonOutput.toJson(SignatureTestData.insertSignature(wrkshtId,'qa')))
					.contentType(MediaType.APPLICATION_JSON))

			then: "we expect the status"
			saveSignatureForQAInProgress.andExpect(status().is(201))
			getSignature(wrkshtId)
			and:' delete the signature for a worksheet'
			def deleteSignatureQAInProgress = this.mockMvc.perform(delete(saveSignatureForQAInProgress.andReturn().response.headers['Location'].value)
					.header("Authorization","Bearer "+SignatureTestData.token)
					.contentType(MediaType.APPLICATION_JSON))
			then: "we expect the status"
			deleteSignatureQAInProgress.andExpect(status().is(204))

			and: ' creating a task for QAAttested'
			createTask('Attested')
			def saveSignatureForAttested = this.mockMvc.perform(post("/api/template/sign")
					.header("Authorization","Bearer "+SignatureTestData.token)
					.content(JsonOutput.toJson(SignatureTestData.insertSignature(wrkshtId,'attending')))
					.contentType(MediaType.APPLICATION_JSON))

			then: "we expect the status"
			saveSignatureForAttested.andExpect(status().is(201))
			def deleteSignatureAttested = this.mockMvc.perform(delete(saveSignatureForAttested.andReturn().response.headers['Location'].value)
					.header("Authorization","Bearer "+SignatureTestData.token)
					.contentType(MediaType.APPLICATION_JSON))
			then: "we expect the status"
			deleteSignatureAttested.andExpect(status().is(204))
			and:' delete the signature for a worksheet where signature is not there'
			def deleteSignature = this.mockMvc.perform(delete(saveSignatureForQAInProgress.andReturn().response.headers['Location'].value)
					.header("Authorization","Bearer "+SignatureTestData.token)
					.contentType(MediaType.APPLICATION_JSON))
			then: "we expect the status"
			deleteSignature.andExpect(status().is(404))
		}
		where:
		wrkshtData<<[WorksheetTestData.saveData[0], WorksheetTestData.saveData[1], WorksheetTestData.saveData[2]]
		wrkshtType<<['poc', 'QA', 'attending']
	}

	def createTask(status){

		def workFlowTask = workflowTaskRepository.save(new WorkflowTask(typeConfig:typeConfigRepository.findOneByTypeName('study'),workflowConfig:workflowConfigRepository.findOne(1L),currentStatus:status,assignedUser:userRepository.findOne(1001L),
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

	def getSignature(wrkshtId){
		def getSignature = this.mockMvc.perform(get("/api/template/sign/${wrkshtId}")
				.header("Authorization","Bearer "+SignatureTestData.token)
				.contentType(MediaType.APPLICATION_JSON))
		def getJson = new JsonSlurper().parseText(getSignature.andReturn().response.contentAsString)
		getSignature.andExpect(status().is(200))
	}

	def 'method for delete Qa AttestedSign'(){

		given: 'Got a wrksht for Signature'
		when: 'Got signature for a worksheet'
		def respForWrksht = this.mockMvc.perform(post("/api/worksheet")
				.header("Authorization","Bearer "+WorksheetTestData.token1)
				.content(JsonOutput.toJson(WorksheetTestData.saveData[0]))
				.contentType(MediaType.APPLICATION_JSON))

		then: 'The worksheet gets saved'
		respForWrksht.andExpect(status().is(201))

		String[] wrkshtFrag= respForWrksht.andReturn().response.headers['Location'].value.split("/");
		String wrkshtId =  wrkshtFrag[wrkshtFrag.length-1];

		and: ' for the saved worksheet update or create the workFlowTask for possible flow'

		createTask('Signed')

		then: ' Insert the signature for the saved worksheet'

		def saveSignature = this.mockMvc.perform(post("/api/template/sign")
				.header("Authorization","Bearer "+SignatureTestData.token)
				.content(JsonOutput.toJson(SignatureTestData.insertSignature(wrkshtId,'poc')))
				.contentType(MediaType.APPLICATION_JSON))
		then: "we expect the status"
		saveSignature.andExpect(status().is(201))
		String[] signFrag= saveSignature.andReturn().response.headers['Location'].value.split("/");
		String signId =  signFrag[signFrag.length-1];
		and:' delete the signature for a worksheet'


		def deleteSignature = this.mockMvc.perform(delete("/api/template/attested/sign/${signId}/76000000000001")
				.header("Authorization","Bearer "+SignatureTestData.token)
				.contentType(MediaType.APPLICATION_JSON))
		deleteSignature.andExpect(status().is(200))

		and:' checking for a study which is not there in DB'
		def deleteSignatureNeg = this.mockMvc.perform(delete("/api/template/attested/sign/${signId}/76000000000002")
				.header("Authorization","Bearer "+SignatureTestData.token)
				.contentType(MediaType.APPLICATION_JSON))
		deleteSignatureNeg.andExpect(status().is(404))
	}
}

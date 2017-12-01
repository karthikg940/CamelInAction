package com.ffss.datax.workflow.test.web.resource

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*
import groovy.json.JsonOutput
import groovy.json.JsonSlurper

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.MediaType

import com.ffss.datax.workflow.repository.WorkflowTaskRepository
import com.ffss.datax.workflow.service.WorkflowService
import com.ffss.datax.workflow.test.base.TransactionalWebIntegrationTest
import com.ffss.datax.workflow.test.base.WebAppIntegrationBaseSpecification

@TransactionalWebIntegrationTest
class TaskEngineSpec  extends WebAppIntegrationBaseSpecification{

	@Autowired
	WorkflowTaskRepository workflowTaskRepository

	@Autowired
	WorkflowService workflowService

	def 'create task for study for POC flow'(expectedCreateStatus,expectedUpdateStatus,expectedResult,currentStatus,type,event,study,assignedUser,workflow) {

		given: 'we have events'

		when: 'we want to create task'

		def token = WorkflowData.token

		def res = this.mockMvc.perform(post("/api/task")
				.header("Authorization","Bearer "+token)
				.content(JsonOutput.toJson(type))
				.contentType(MediaType.APPLICATION_JSON))

		then: 'The tasks is created for that event'
		res.andExpect(status().is(expectedCreateStatus))


		def task =  new JsonSlurper().parseText(res.andReturn().response.contentAsString)
		def taskId = task.id

		if(expectedCreateStatus == 201){
			def workflowTask = workflowService.getTask(taskId.asType(Long))
			assert workflowTask.typeConfig?.typeName == "Study"
			assert workflowTask.assignedUser.id ==  1001
			assert workflowTask.currentStatus ==  "Assigned"
		}

		and://update the task to based on event and current status'


		def taskData = workflow[0]
		def updateTaskRes = this.mockMvc.perform(put("/api/task/${taskId}")
				.header("Authorization","Bearer "+token)
				.content(JsonOutput.toJson(taskData))
				.contentType(MediaType.APPLICATION_JSON))

		updateTaskRes.andExpect(status().is(expectedUpdateStatus))

		if(expectedUpdateStatus ==200){
			def retVal = workflowService.getTask(taskId.asType(Long))
			assert retVal.assignedUser.id ==  assignedUser.assignedUser
			assert retVal.typeConfig?.typeName ==  "Study"
			assert retVal.currentStatus == expectedResult[0]


		}

		def taskData1 = workflow[1]
		def updateTaskRes1 = this.mockMvc.perform(put("/api/task/${taskId}")
				.header("Authorization","Bearer "+token)
				.content(JsonOutput.toJson(taskData1))
				.contentType(MediaType.APPLICATION_JSON))

		updateTaskRes.andExpect(status().is(expectedUpdateStatus))

		if(expectedUpdateStatus ==200){
			def retVal = workflowService.getTask(taskId.asType(Long))
			assert retVal.assignedUser.id ==  assignedUser.assignedUser
			assert retVal.typeConfig?.typeName ==  "Study"
			assert retVal.currentStatus == expectedResult[1]


		}

		def taskData2 = workflow[2]
		def updateTaskRes2 = this.mockMvc.perform(put("/api/task/${taskId}")
				.header("Authorization","Bearer "+token)
				.content(JsonOutput.toJson(taskData2))
				.contentType(MediaType.APPLICATION_JSON))

		updateTaskRes.andExpect(status().is(expectedUpdateStatus))

		if(expectedUpdateStatus ==200){
			def retVal = workflowService.getTask(taskId.asType(Long))
			assert retVal.assignedUser.id ==  assignedUser.assignedUser
			assert retVal.typeConfig?.typeName ==  "Study"
			assert retVal.currentStatus == expectedResult[2]


		}

		where:
		expectedCreateStatus<<201
		expectedUpdateStatus<<200
		expectedResult<<[WorkflowData.nextStatusPOC]
		currentStatus<<[WorkflowData.currentStatus]
		type<<[WorkflowData.type]
		event<<[WorkflowData.event]
		study<<[WorkflowData.study]
		assignedUser<<[WorkflowData.assignedUser]
		workflow<<[WorkflowData.pocOnly]
	}


	def 'create task for study for POC,QA & Attending flow'(expectedCreateStatus,expectedUpdateStatus,expectedResult,currentStatus,type,event,study,assignedUser,workflow) {

		given: 'we have events'

		when: 'we want to create task'

		def token = WorkflowData.token

		def res = this.mockMvc.perform(post("/api/task")
				.header("Authorization","Bearer "+token)
				.content(JsonOutput.toJson(type))
				.contentType(MediaType.APPLICATION_JSON))

		then: 'The tasks is created for that event'
		res.andExpect(status().is(expectedCreateStatus))


		def task =  new JsonSlurper().parseText(res.andReturn().response.contentAsString)
		def taskId = task.id

		if(expectedCreateStatus == 201){
			def workflowTask = workflowService.getTask(taskId.asType(Long))
			assert workflowTask.typeConfig?.typeName == "Study"
			assert workflowTask.assignedUser.id ==  1001
			assert workflowTask.currentStatus ==  "Assigned"
		}

		and://update the task to based on event and current status'


		def taskData = workflow[0]
		def updateTaskRes = this.mockMvc.perform(put("/api/task/${taskId}")
				.header("Authorization","Bearer "+token)
				.content(JsonOutput.toJson(taskData))
				.contentType(MediaType.APPLICATION_JSON))

		updateTaskRes.andExpect(status().is(expectedUpdateStatus))

		if(expectedUpdateStatus ==200){
			def retVal = workflowService.getTask(taskId.asType(Long))
			assert retVal.assignedUser.id ==  assignedUser.assignedUser
			assert retVal.typeConfig?.typeName ==  "Study"
			assert retVal.currentStatus == expectedResult[0]


		}

		def taskData1 = workflow[1]
		def updateTaskRes1 = this.mockMvc.perform(put("/api/task/${taskId}")
				.header("Authorization","Bearer "+token)
				.content(JsonOutput.toJson(taskData1))
				.contentType(MediaType.APPLICATION_JSON))

		updateTaskRes.andExpect(status().is(expectedUpdateStatus))

		if(expectedUpdateStatus ==200){
			def retVal = workflowService.getTask(taskId.asType(Long))
			assert retVal.assignedUser.id ==  assignedUser.assignedUser
			assert retVal.typeConfig?.typeName ==  "Study"
			assert retVal.currentStatus == expectedResult[1]


		}

		def taskData2 = workflow[2]
		def updateTaskRes2 = this.mockMvc.perform(put("/api/task/${taskId}")
				.header("Authorization","Bearer "+token)
				.content(JsonOutput.toJson(taskData2))
				.contentType(MediaType.APPLICATION_JSON))

		updateTaskRes.andExpect(status().is(expectedUpdateStatus))

		if(expectedUpdateStatus ==200){
			def retVal = workflowService.getTask(taskId.asType(Long))
			assert retVal.assignedUser.id ==  assignedUser.assignedUser
			assert retVal.typeConfig?.typeName ==  "Study"
			assert retVal.currentStatus == expectedResult[2]


		}

		def taskData3 = workflow[3]
		def updateTaskRes3 = this.mockMvc.perform(put("/api/task/${taskId}")
				.header("Authorization","Bearer "+token)
				.content(JsonOutput.toJson(taskData3))
				.contentType(MediaType.APPLICATION_JSON))

		updateTaskRes.andExpect(status().is(expectedUpdateStatus))

		if(expectedUpdateStatus ==200){
			def retVal = workflowService.getTask(taskId.asType(Long))
			assert retVal.assignedUser.id ==  assignedUser.assignedUser
			assert retVal.typeConfig?.typeName ==  "Study"
			assert retVal.currentStatus == expectedResult[3]


		}

		def taskData4 = workflow[4]
		def updateTaskRes4 = this.mockMvc.perform(put("/api/task/${taskId}")
				.header("Authorization","Bearer "+token)
				.content(JsonOutput.toJson(taskData4))
				.contentType(MediaType.APPLICATION_JSON))

		updateTaskRes.andExpect(status().is(expectedUpdateStatus))

		if(expectedUpdateStatus ==200){
			def retVal = workflowService.getTask(taskId.asType(Long))
			assert retVal.assignedUser.id ==  assignedUser.assignedUser
			assert retVal.typeConfig?.typeName ==  "Study"
			assert retVal.currentStatus == expectedResult[4]


		}

		def taskData5 = workflow[5]
		def updateTaskRes5 = this.mockMvc.perform(put("/api/task/${taskId}")
				.header("Authorization","Bearer "+token)
				.content(JsonOutput.toJson(taskData5))
				.contentType(MediaType.APPLICATION_JSON))

		updateTaskRes.andExpect(status().is(expectedUpdateStatus))

		if(expectedUpdateStatus ==200){
			def retVal = workflowService.getTask(taskId.asType(Long))
			assert retVal.assignedUser.id ==  assignedUser.assignedUser
			assert retVal.typeConfig?.typeName ==  "Study"
			assert retVal.currentStatus == expectedResult[5]


		}

		def taskData6 = workflow[6]
		def updateTaskRes6 = this.mockMvc.perform(put("/api/task/${taskId}")
				.header("Authorization","Bearer "+token)
				.content(JsonOutput.toJson(taskData6))
				.contentType(MediaType.APPLICATION_JSON))

		updateTaskRes.andExpect(status().is(expectedUpdateStatus))

		if(expectedUpdateStatus ==200){
			def retVal = workflowService.getTask(taskId.asType(Long))
			assert retVal.assignedUser.id ==  assignedUser.assignedUser
			assert retVal.typeConfig?.typeName ==  "Study"
			assert retVal.currentStatus == expectedResult[6]


		}

		def taskData7 = workflow[7]
		def updateTaskRes7 = this.mockMvc.perform(put("/api/task/${taskId}")
				.header("Authorization","Bearer "+token)
				.content(JsonOutput.toJson(taskData7))
				.contentType(MediaType.APPLICATION_JSON))

		updateTaskRes.andExpect(status().is(expectedUpdateStatus))

		if(expectedUpdateStatus ==200){
			def retVal = workflowService.getTask(taskId.asType(Long))
			assert retVal.assignedUser.id ==  assignedUser.assignedUser
			assert retVal.typeConfig?.typeName ==  "Study"
			assert retVal.currentStatus == expectedResult[7]


		}

		def taskData8 = workflow[8]
		def updateTaskRes8 = this.mockMvc.perform(put("/api/task/${taskId}")
				.header("Authorization","Bearer "+token)
				.content(JsonOutput.toJson(taskData8))
				.contentType(MediaType.APPLICATION_JSON))

		updateTaskRes.andExpect(status().is(expectedUpdateStatus))

		if(expectedUpdateStatus ==200){
			def retVal = workflowService.getTask(taskId.asType(Long))
			assert retVal.assignedUser.id ==  assignedUser.assignedUser
			assert retVal.typeConfig?.typeName ==  "Study"
			assert retVal.currentStatus == expectedResult[8]


		}

		where:
		expectedCreateStatus<<201
		expectedUpdateStatus<<200
		expectedResult<<[WorkflowData.nextStatusPOCQaAttend]
		currentStatus<<[WorkflowData.currentStatus]
		type<<[WorkflowData.type]
		event<<[WorkflowData.event]
		study<<[WorkflowData.study]
		assignedUser<<[WorkflowData.assignedUser]
		workflow<<[WorkflowData.pocQaAttendOnly]
	}

	def 'UnAssign flow'(expectedCreateStatus,expectedUpdateStatus,expectedResult,currentStatus,type,event,study,assignedUser,workflow) {

		given: 'we have events'

		when: 'we want to create task'

		def token = WorkflowData.token

		def res = this.mockMvc.perform(post("/api/task")
				.header("Authorization","Bearer "+token)
				.content(JsonOutput.toJson(type))
				.contentType(MediaType.APPLICATION_JSON))

		then: 'The tasks is created for that event'
		res.andExpect(status().is(expectedCreateStatus))


		def task =  new JsonSlurper().parseText(res.andReturn().response.contentAsString)
		def taskId = task.id

		if(expectedCreateStatus == 201){
			def workflowTask = workflowService.getTask(taskId.asType(Long))
			assert workflowTask.typeConfig?.typeName == "Study"
			assert workflowTask.assignedUser.id ==  1001
			assert workflowTask.currentStatus ==  "Assigned"
		}

		and://update the task to based on event and current status'


		def taskData = workflow
		def updateTaskRes = this.mockMvc.perform(put("/api/task/${taskId}")
				.header("Authorization","Bearer "+token)
				.content(JsonOutput.toJson(taskData))
				.contentType(MediaType.APPLICATION_JSON))

		updateTaskRes.andExpect(status().is(expectedUpdateStatus))

		if(expectedUpdateStatus ==200){
			def retVal = workflowService.getTask(taskId.asType(Long))
			assert retVal.assignedUser.id ==  assignedUser.assignedUser
			assert retVal.typeConfig?.typeName ==  "Study"
			assert retVal.currentStatus == expectedResult[0]


		}
		where:
		expectedCreateStatus<<201
		expectedUpdateStatus<<200
		expectedResult<<[WorkflowData.nextStatusUnassign]
		currentStatus<<[WorkflowData.currentStatus]
		type<<[WorkflowData.type]
		event<<[WorkflowData.event]
		study<<[WorkflowData.study]
		assignedUser<<[WorkflowData.assignedUser]
		workflow<<[WorkflowData.unAssign]
	}

	def getCreatedLocation(response) {
		response.andReturn().getResponse().getHeader("Location")
	}

	
}
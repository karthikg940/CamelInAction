package com.ffss.datax.workflow.test.web.resource

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*
import groovy.json.JsonOutput

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.MediaType

import com.ffss.datax.common.domain.workflow.UserTaskStage
import com.ffss.datax.common.domain.workflow.WorkflowTask
import com.ffss.datax.workflow.repository.TaskRoleConfigRepository
import com.ffss.datax.workflow.repository.UserRepository
import com.ffss.datax.workflow.repository.UserTaskStageRepository
import com.ffss.datax.workflow.repository.WorkflowConfigRepository
import com.ffss.datax.workflow.repository.WorkflowTaskRepository
import com.ffss.datax.workflow.test.base.TransactionalWebIntegrationTest
import com.ffss.datax.workflow.test.base.WebAppIntegrationBaseSpecification

@TransactionalWebIntegrationTest
class UserTaskSpec extends WebAppIntegrationBaseSpecification{

	@Autowired
	WorkflowTaskRepository workflowTaskRepository

	@Autowired
	WorkflowConfigRepository workflowConfigRepository

	@Autowired
	UserRepository userRepository

	@Autowired
	UserTaskStageRepository userTaskStageRepository

	@Autowired
	TaskRoleConfigRepository taskRoleConfigRepository
	
	def ' User task management '(token,expectedStatus) {
		def id = workFlowTask()
		given: ' having a study displayed in the studyList'

		when: ' study assignment by the user'

		def response = this.mockMvc.perform(post('/api/task/createusertask')
				.header('Authorization','Bearer '+token)
				.content(JsonOutput.toJson(WorkflowData.createUserTask(id)))
				.contentType(MediaType.APPLICATION_JSON))

		then: ' study will be assigned and task will be created'
		response.andExpect(status().is(expectedStatus))
		and: ' Updation of usertask'
		def updateId = workFlowTask()
		def updateUserTask = this.mockMvc.perform(post('/api/task/updateusertask')
				.header('Authorization','Bearer '+token)
				.content(JsonOutput.toJson(WorkflowData.createUserTask(updateId)))
				.contentType(MediaType.APPLICATION_JSON))

		then: ' study will be assigned and task will be created'
		updateUserTask.andExpect(status().is(200))
		
		and: ' getting the user for particaulr task'
		def getUserTask = this.mockMvc.perform(post("/api/task/user/${updateId}")
			.header('Authorization','Bearer '+token)
			.content(JsonOutput.toJson(WorkflowData.getUser))
			.contentType(MediaType.APPLICATION_JSON))

		then: ' expected the status for fetched the user for particular task'
		getUserTask.andExpect(status().is(200))
	
		/*and :' deleting the userTask'
		def workFlowId = workFlowTask()
		def deleteUserTask = this.mockMvc.perform(post('/api/task/deleteUserTask')
				.header('Authorization','Bearer '+token)
				.content(JsonOutput.toJson(WorkflowData.createUserTask(workFlowId)))
				.contentType(MediaType.APPLICATION_JSON))

		then: ' study will be assigned and task will be deleted'
		deleteUserTask.andExpect(status().is(200))
		*/
		where:
		token<<[WorkflowData.token]
		expectedStatus<<[201]
	}

	def workFlowTask(){
		def workFlow = workflowTaskRepository.save(new WorkflowTask(
				workflowConfig:workflowConfigRepository.findOne(3L),
				assignedUser:userRepository.findOne(1001L),
				triggeringUser:userRepository.findOne(1001L)))
		
		def userTaskStage = userTaskStageRepository.save(new UserTaskStage(user:userRepository.findOne(1001L),
		workflowTask:workFlow,taskRoleConfig:taskRoleConfigRepository.findOne(30L)))
		
		workFlow.id
	}
}

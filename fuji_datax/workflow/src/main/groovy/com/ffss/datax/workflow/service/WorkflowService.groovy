package com.ffss.datax.workflow.service

import groovy.util.logging.*

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

import com.ffss.datax.common.constants.TypeConfigEnum
import com.ffss.datax.common.domain.workflow.UserTaskStage
import com.ffss.datax.common.domain.workflow.WorkflowTask
import com.ffss.datax.workflow.constants.WorkflowConstants
import com.ffss.datax.workflow.repository.EventWorkflowRepository
import com.ffss.datax.workflow.repository.TaskRoleConfigRepository
import com.ffss.datax.workflow.repository.TypeConfigRepository
import com.ffss.datax.workflow.repository.UserTaskStageRepository
import com.ffss.datax.workflow.repository.WorkflowConfigRepository
import com.ffss.datax.workflow.repository.WorkflowTaskRepository


/**
 * The Class WorkflowService.
 *
 * @author Virtusa|Polaris
 */
@Log4j
@Service
class WorkflowService {

	@Autowired
	WorkflowTaskRepository workflowTaskRepository

	@Autowired
	TypeConfigRepository  typeConfigRepository

	@Autowired
	WorkflowConfigRepository workflowConfigRepository

	@Autowired
	EventWorkflowRepository  eventWorkflowRepository

	@Autowired
	UserTaskStageRepository userTaskStageRepository

	@Autowired
	UserService userService

	@Autowired
	TaskRoleConfigRepository taskRoleConfigRepository

	/**
	 * To save the task details for study
	 * 
	 * @param type - type of study
	 * @param loginUserId - current logged In user
	 */
	@Transactional
	def createTask(type,loginUserId){
		def workflowConfig
		def typeConfig = typeConfigRepository.findByTypeName(type)
		def user = userService.findOne(loginUserId)
		if(typeConfig.id==TypeConfigEnum.Study.value){
			workflowConfig = getStudyWorkflowConig(WorkflowConstants.NEW,typeConfig.id,WorkflowConstants.USER_ASSIGN)
		}
		def workflowTask = workflowTaskRepository.save(new WorkflowTask(
				typeConfig:typeConfig,
				workflowConfig:workflowConfig,
				currentStatus:workflowConfig.nextStatus,
				assignedUser:user,
				triggeringUser:user))
		// save the user,task details for study
		createUserTask(workflowTask.id.asType(Long),WorkflowConstants.ROLE_PERFORMING,loginUserId)
		workflowTask
	}

	/**
	 * Method to get the workFlow task details
	 * @param id
	 * @return
	 */
	def getTask(id){
		workflowTaskRepository.findOne(id)
	}

	/**
	 * Method to get the event and workFlow configuration details
	 * @param currentStatus - current status of study
	 * @param typeId - type id
	 * @param eventName - name of the event
	 * @return
	 */
	def getStudyWorkflowConig(currentStatus,typeId,eventName){

		def event =  eventWorkflowRepository.findByEventName(eventName)
		workflowConfigRepository.findByStatusEventIdAndTypeId(currentStatus,typeId,event?.id)
	}
	/**
	 * Method to assign the task to user
	 * @param workflowTask - task id
	 * @param taskRoleName - role of the user
	 * @param loginUserId - current logged In user
	 * @return userTask - created userTask object
	 */
	@Transactional
	def createUserTask(workflowTask,taskRoleName,loginUserId) {
		def userTask = userTaskStageRepository.save(new UserTaskStage(
				user:userService.findOne(loginUserId),
				workflowTask:workflowTaskRepository.findOne(workflowTask),
				taskRoleConfig:taskRoleConfigRepository.findByTaskRoleTaskRoleName(taskRoleName)))
		userTask
	}

	/**
	 * Method to update the user by task id
	 * @param workflowTaskId - task id
	 * @param loginUserId - logged in user
	 * @return
	 */
	@Transactional
	def updateUserTask(workflowTaskId,loginUserId) {

		def user = workflowTaskRepository.getUser(workflowTaskId,WorkflowConstants.ROLE_PERFORMING)
		def newUser = userService.findOne(loginUserId)
		user.collect{
			it.userTaskStage.collect{ it.user = newUser }
		}
		workflowTaskRepository.save(user)
		user
	}
	/**
	 * Method to delete the user by task id
	 * @param workflowTaskId
	 * @return
	 */
	@Transactional
	def deleteUserTask(workflowTaskId) {
		def task = workflowTaskRepository.getUser(workflowTaskId,WorkflowConstants.ROLE_PERFORMING)
		def assignedUser = task.collect{ it.userTaskStage }
		userTaskStageRepository.delete([assignedUser[0].id])
	}

	/**
	 * Method to update the task
	 * @param id - task id
	 * @param request 
	 * @return task 
	 */
	@Transactional
	def updateTask(id,request){
		WorkflowTask task = workflowTaskRepository.findOne(id)
		if (task) {
			def eventTrigger = workflowConfigRepository.findByStatusAndEvent(task.currentStatus,request.event)
			if(eventTrigger && eventTrigger.nextStatus) {
				task.currentStatus = eventTrigger.nextStatus
				workflowTaskRepository.save(task)
			}
		}
		task
	}
	/**
	 * Method to get the assigned user for task
	 * @param id
	 * @param type
	 * @return
	 */
	def getUser(id,type){
		workflowTaskRepository.getUser(id,type)
	}
}

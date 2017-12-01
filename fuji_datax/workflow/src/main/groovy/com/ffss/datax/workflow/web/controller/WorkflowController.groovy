package com.ffss.datax.workflow.web.controller

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.RestController

import com.ffss.datax.workflow.service.WorkflowService
import com.ffss.datax.workflow.transformer.WorkflowTransformer



/**
 * The Class WorkflowController.
 * @author Virtusa|Polaris
 */
@RestController
@RequestMapping(value='/api/task')
class WorkflowController {

	@Autowired
	WorkflowService workflowService

	@Autowired
	WorkflowTransformer workflowTransformer

	/**
	 *API to create the user task 
	 * @param request
	 * @return
	 */
	@RequestMapping(value='/createusertask',method=RequestMethod.POST,produces = 'application/json')
	def createUserTask(@RequestBody request){
		def userTask = workflowService.createUserTask(request.workflowTask.asType(Long),request.taskRoleName,request.loginUserId.asType(Long))
		userTask?new ResponseEntity([id:userTask.id],HttpStatus.CREATED):ResponseEntity.status(HttpStatus.BAD_REQUEST).build()
	}

	/**
	 *API to update the user task
	 * @param request
	 * @return
	 */
	@RequestMapping(value='/updateusertask',method=RequestMethod.POST,produces = 'application/json')
	def updateUserTask(@RequestBody request){
		def userTask = workflowService.updateUserTask(request.workflowTask.asType(Long),request.loginUserId.asType(Long))
		userTask?new ResponseEntity([id:userTask.id],HttpStatus.OK):ResponseEntity.status(HttpStatus.BAD_REQUEST).build()
	}

	/**
	 * API to delete the user from the task
	 * @param request
	 * @return
	 */
	@RequestMapping(value='/deleteUserTask',method=RequestMethod.POST,produces = 'application/json')
	def deleteUserTask(@RequestBody request){
		workflowService.deleteUserTask(request.workflowTask.asType(Long))
	}
	
	/**
	 * API to get the user for the task by taskId
	 * @param request
	 * @param id - taskId
	 * @return
	 */
	@RequestMapping(value='user/{id}',method=RequestMethod.POST)
	def getUser(@RequestBody request,@PathVariable('id') Long id){
		def user = workflowService.getUser(id,request.type)
		new ResponseEntity<String>(workflowTransformer.userTransform(user),HttpStatus.OK)
	}
}


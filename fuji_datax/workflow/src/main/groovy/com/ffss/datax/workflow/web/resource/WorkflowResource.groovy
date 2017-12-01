package com.ffss.datax.workflow.web.resource

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.RestController

import com.ffss.datax.common.constants.CustomErrorCode
import com.ffss.datax.workflow.service.WorkflowService

/**
 * The Class WorkflowResource.
 * @author Virtusa|Polaris
 */
@RestController
@RequestMapping(value='/api/task')
class WorkflowResource {

	@Autowired
	WorkflowService workflowService

	/**
	 * API to create a task for study
	 * @param request - request object
	 * @return task - a task object
	 */
	@RequestMapping(value='',method=RequestMethod.POST,produces = 'application/json')
	def createTask(@RequestBody request){
		def task = workflowService.createTask(request.type,request.user.asType(Long))
		task?new ResponseEntity([id:task.id,currentStatus:task.currentStatus],HttpStatus.CREATED):ResponseEntity.status(HttpStatus.BAD_REQUEST).build()
	}

	/**
	 * API to update a task 
	 * @param id - workFlow taskId
	 * @param request - requestObject
	 * @return task - a task object
	 */
	@RequestMapping(value='/{id}',method=RequestMethod.PUT)
	def updateTask(@PathVariable('id') Long id,@RequestBody request){

		def task = workflowService.updateTask(id,request)
		task?new ResponseEntity([id:task.id,currentStatus:task.currentStatus],HttpStatus.OK):new ResponseEntity(CustomErrorCode.ER_404.value, HttpStatus.NOT_FOUND)
	}
	
	/**
	 * API to get the task details
	 * @param id - workFlow taskId
	 * @return
	 */
	@RequestMapping(value='/{id}',method=RequestMethod.GET)
	def getTask(@PathVariable('id') Long id){

		def task = workflowService.getTask(id)
		task?task:new ResponseEntity(CustomErrorCode.ER_404.value+'task', HttpStatus.NOT_FOUND)
	}
}
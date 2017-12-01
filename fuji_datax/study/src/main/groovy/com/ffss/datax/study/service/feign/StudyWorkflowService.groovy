package com.ffss.datax.study.service.feign

import org.springframework.cloud.netflix.feign.FeignClient
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestHeader
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.ResponseBody

/**
 *
 * Feign client for get the next workflow status
 *
 * @author Virtusa|Polaris
 */

@FeignClient('http://workflow')
interface StudyWorkflowService
{
	@RequestMapping(value='/api/task',method=RequestMethod.POST)
	@ResponseBody def createTask(@RequestBody request,@RequestHeader('Authorization') token)
	
	@RequestMapping(value='/api/task/createusertask',method=RequestMethod.POST)
	@ResponseBody def createUserTask(@RequestBody request,@RequestHeader('Authorization') token)

	@RequestMapping(value='/api/task/{id}',method=RequestMethod.PUT)
	@ResponseBody def updateTask(@PathVariable('id') Long id,@RequestBody request,@RequestHeader('Authorization') token)
	
	@RequestMapping(value='/api/preference',method=RequestMethod.GET)
	@ResponseBody def getPreference(@RequestHeader('Authorization') token)
	
	@RequestMapping(value='/api/task/user/{id}',method=RequestMethod.POST)
	@ResponseBody def getUser(@PathVariable('id') Long id,@RequestBody request,@RequestHeader('Authorization') token)

	@RequestMapping(value='/api/task/updateusertask',method=RequestMethod.POST)
	@ResponseBody def updateUserTask(@RequestBody request,@RequestHeader('Authorization') token)
	
	@RequestMapping(value='/api/task/deleteUserTask',method=RequestMethod.POST)
	@ResponseBody def deleteUserTask(@RequestBody request,@RequestHeader('Authorization') token)
	
}
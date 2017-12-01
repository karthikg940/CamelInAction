package com.ffss.datax.worksheet.service.feign

import org.springframework.cloud.netflix.feign.FeignClient
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestHeader
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.ResponseBody

/**
 * Feign client for get the next workflow status.
 *
 * @author Virtusa|Polaris
 */

@FeignClient('http://workflow')
interface StudyWorkflowService
{
	
	/**
	 * Gets the preference.
	 *
	 * @param token the token
	 * @return the preference
	 */
	@RequestMapping(value='/api/preference',method=RequestMethod.GET)
	@ResponseBody def getPreference(@RequestHeader('Authorization') token)
	
	/**
	 * Gets the user.
	 *
	 * @param id the id
	 * @param request the request
	 * @param token the token
	 * @return the user
	 */
	@RequestMapping(value='/api/task/user/{id}',method=RequestMethod.POST)
	@ResponseBody def getUser(@PathVariable('id') Long id,@RequestBody request,@RequestHeader('Authorization') token)
		
}
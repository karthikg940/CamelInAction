package com.ffss.datax.worksheet.service.feign

import org.springframework.cloud.netflix.feign.FeignClient
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestHeader
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.ResponseBody

/**
 * Feign client for updating study status.
 *
 * @author Virtusa|Polaris
 */

@FeignClient('http://study')
interface StudyService
{	
	
	/**
	 * Update study status.
	 *
	 * @param id the id
	 * @param request the request
	 * @param token the token
	 */
	@RequestMapping(value='/api/org/{orgId}/examtype/{id}/status',method=RequestMethod.PUT)
	@ResponseBody def updateStudyStatus(@PathVariable('id') Long id,@RequestBody request, @RequestHeader('Authorization') token,@PathVariable('orgId') Long orgId)

	/**
	 * Submit study to QA.
	 *
	 * @param id the id
	 * @param request the request
	 * @param token the token
	 */
	@RequestMapping(value='/api/org/{orgId}/examtype/{id}/submittoqa',method=RequestMethod.PUT)
	@ResponseBody def submitStudyToQA(@PathVariable('id') Long id,@RequestBody request, @RequestHeader('Authorization') token,@PathVariable('orgId') Long orgId)
	
	/**
	 * Update study type.
	 *
	 * @param id the id
	 * @param content the content
	 * @param token the token
	 */
	@RequestMapping(value='/api/examtype/{id}/study',method=RequestMethod.PUT)
	@ResponseBody def updateStudyType(@PathVariable('id') Long id,@RequestBody content, @RequestHeader('Authorization') token)
	
	
}
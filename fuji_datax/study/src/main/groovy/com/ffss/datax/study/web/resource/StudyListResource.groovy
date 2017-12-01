package com.ffss.datax.study.web.resource


import org.joda.time.DateTime
import org.joda.time.DateTimeZone
import org.joda.time.format.DateTimeFormat
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

import com.ffss.datax.security.util.SecurityUtil
import com.ffss.datax.study.constants.StudyConstants
import com.ffss.datax.study.service.StudyService
import com.ffss.datax.study.service.UserService
import com.ffss.datax.study.web.transformer.StudyListTransformer


/**
 * The Class StudyListResource.
 */

@RestController
@RequestMapping('/api/org')
class StudyListResource {

	/** The study service. */
	@Autowired
	StudyService studyService

	/** The study list transformer. */
	@Autowired
	StudyListTransformer studyListTransformer

	/** The user service. */
	@Autowired
	UserService userService

	/** The pattern. */
	String pattern = StudyConstants.DATEFORMAT_YEAR

	DateTime from,to
	/**
	 * Gets the.
	 *
	 * @param type - mystudies,myattestations,qastudies,allstudies
	 * @param fromDate the from date
	 * @param toDate the to date
	 * @param request search filter params - pocName,patientName,examType,status
	 * @return the studies
	 */
	@RequestMapping(value='/{orgId}/studylist',method=RequestMethod.POST)
	def get(@RequestParam('type') type,@RequestParam('fromDate') fromDate,@RequestParam('toDate') toDate,@RequestBody request, @PathVariable('orgId') Long orgId) {

		def studyListResponse
		def token = SecurityUtil.retrieveAuthToken()
		def userId = SecurityUtil.retrieveUserId()
		if(fromDate==('') && toDate==('')) {
			from = new DateTime().minusDays(1).withZone(DateTimeZone.UTC)
			to = new DateTime().withZone(DateTimeZone.UTC)

			if(type==('')) {
				studyListResponse = studyService.getDataForStudies(from,to,StudyConstants.ALLSTUDIES,userId,request, orgId)
			}
			else
				studyListResponse = studyService.getDataForStudies(from,to,type,userId,request, orgId) 
		}
		else {
			from  = DateTime.parse(fromDate+StudyConstants.DEFAULTSTARTTIME, DateTimeFormat.forPattern(pattern))
			to  = DateTime.parse(toDate+StudyConstants.DEFAULTENDTIME, DateTimeFormat.forPattern(pattern))
			if(type==('')) {
				studyListResponse = studyService.getDataForStudies(from,to,StudyConstants.ALLSTUDIES,userId,request, orgId) 
			}
			else
				studyListResponse = studyService.getDataForStudies(from,to,type,userId,request, orgId) 
		}
		
		new ResponseEntity<String>(studyListTransformer.transform(studyListResponse,token),HttpStatus.OK)
	}
	
}
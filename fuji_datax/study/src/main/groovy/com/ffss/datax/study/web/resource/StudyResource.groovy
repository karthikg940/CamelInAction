package com.ffss.datax.study.web.resource

import groovy.json.JsonSlurper

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.RestController

import com.ffss.datax.common.constants.CustomErrorCode
import com.ffss.datax.security.util.SecurityUtil
import com.ffss.datax.study.constants.OrderStatus
import com.ffss.datax.study.service.OrderService
import com.ffss.datax.study.service.StudyService
import com.ffss.datax.study.service.StudySubmitToEMRService
import com.ffss.datax.study.validator.StudyValidationHandler
import com.ffss.datax.study.web.transformer.OrderRequestTransformer
import com.ffss.datax.study.web.transformer.StudySubmitToEmrTransformer
import com.ffss.datax.study.web.transformer.StudyTransformer

/**
 * The Class StudyResource.
 *
 * @author Virtusa|Polaris
 */
@RestController
@RequestMapping('/api/study')
class StudyResource {


	/** The study service. */
	@Autowired
	StudyService studyService

	/** The study transformer. */
	@Autowired
	StudyTransformer studyTransformer

	@Autowired
	StudySubmitToEmrTransformer submitToEmrTransformer
	@Autowired
	StudySubmitToEMRService studySubmitToEMRService

	@Autowired
	StudyValidationHandler studyValidationHandler

	@Autowired
	OrderService orderService

	@Autowired
	OrderRequestTransformer orderRequestTransformer


	/**
	 * Gets the details of particular study.
	 *
	 * @param id the id
	 * @return the study JSON data
	 */
	@RequestMapping(value='/{id}',method=RequestMethod.GET)
	def get(@PathVariable('id') Long id) {
		def token = SecurityUtil.retrieveAuthToken()
		def study = studyService.findOneWithChildren(id)
		study?studyTransformer.transform(study,token): new ResponseEntity(CustomErrorCode.ER_404.value+'studyId', HttpStatus.NOT_FOUND)
	}

	/**
	 * Delete study.
	 * @param id the studyId
	 */
	@RequestMapping(value='/{id}', method=RequestMethod.DELETE)
	def deleteStudy(@PathVariable('id') Long id){
		def study = studyService.deleteStudy(id)
		study?ResponseEntity.ok().build(): new ResponseEntity(CustomErrorCode.ER_404.value+'studyid', HttpStatus.NOT_FOUND)
	}

	/**
	 * Gets the status list.
	 *
	 * @return the status list
	 */
	@RequestMapping(value='/statusList', method=RequestMethod.GET)
	def getStatusList(){
		def statusList = studyService.findStatusList()
		studyTransformer.transformStatusList(statusList)
	}

	@RequestMapping(value='/{studyid}/complete',method=RequestMethod.PUT)
	def studySubmitToEMR(@PathVariable('studyid') Long studyId){
		def response
		def order
		def study = studyService.findPatientDetailsByStudyId(studyId)
		if (!study) {
			return ResponseEntity.notFound().build()
		}
		def accessionNumberObj = study.accessionNumber
		if(accessionNumberObj){
			order = orderService.findOrder(accessionNumberObj.accessionNumber)
			response = studyValidationHandler.validate(study,order)
		}
		else{
			response = OrderStatus.NONORDERED
		}
		switch(response){

			case OrderStatus.VALID:
				response=studySubmitToEMRService.submitToEmr(study,order)
				break

			case OrderStatus.MISMATCH:
				response = HttpStatus.PRECONDITION_FAILED
				break

			case OrderStatus.NONORDERED:
				response = HttpStatus.PRECONDITION_REQUIRED
				break
		}
		ResponseEntity.status(response).build()
	}

	@RequestMapping(value='/{studyId}/order', method = RequestMethod.POST)
	def createOrderForStudy(@PathVariable('studyId') Long studyId){
		
		def response =orderService.create(studyId)
		ResponseEntity.status(response).build()
	}

	@RequestMapping(value='/{studyId}/order', method = RequestMethod.DELETE)
	def cancelOrder(@PathVariable('studyId') Long studyId){

		def res = orderService.cancel(studyId)
		ResponseEntity.status(res).build()
	}
}

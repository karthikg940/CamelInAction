package com.ffss.datax.worksheet.web.controller

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

import com.ffss.datax.common.constants.CustomErrorCode
import com.ffss.datax.worksheet.service.WorksheetService
import com.ffss.datax.worksheet.service.WorksheetSubmissionService
import com.ffss.datax.worksheet.service.WorksheetTemplateService
import com.ffss.datax.worksheet.web.transformer.WorksheetTransformer

/**
 * The Class WorksheetController.
 */
@RestController
@RequestMapping('/api/worksheet')
class WorksheetController {

	/** The worksheet service. */
	@Autowired
	WorksheetService worksheetService

	/** The worksheet submission service. */
	@Autowired
	WorksheetSubmissionService worksheetSubmissionService

	/** The worksheet transformer. */
	@Autowired
	WorksheetTransformer worksheetTransformer

	/** The worksheet template service. */
	@Autowired
	WorksheetTemplateService worksheetTemplateService

	/**
	 * Search by exam type.
	 *
	 * @param studyId the study id
	 * @param type the type
	 * 
	 */
	@RequestMapping(value='/search',method=RequestMethod.GET)
	def searchByExamType(@RequestParam(value='studyId') Long studyId,@RequestParam(value='type') String type) {
		def retVal = worksheetTemplateService.searchByType(studyId,type)
		retVal?[result:worksheetTransformer.transformOne(retVal)]:[result:null]
	}

	/**
	 * Removes the worksheet.
	 *
	 * @param studyId the study id
	 * 
	 */
	@RequestMapping(value='/study/{studyId}',method=RequestMethod.DELETE)
	def removeWorksheet(@PathVariable('studyId') Long studyId) {
		def status = worksheetService.removeWorksheet(studyId)
		status?worksheetTransformer.deleteWorkSheetTrans(status):new ResponseEntity(CustomErrorCode.ER_404.value+'worksheetId', HttpStatus.NOT_FOUND)
	}

	/**
	 * Review worksheet.
	 *
	 * @param qaData the qa data
	 * 
	 */
	@RequestMapping(value='/submittoqa',method=RequestMethod.PUT)
	def reviewWorksheet(@RequestBody qaData) {
		def retval = worksheetSubmissionService.submitWorksheet(qaData)
		retval?new ResponseEntity(CustomErrorCode.ER_204.value, HttpStatus.OK):new ResponseEntity(CustomErrorCode.ER_404.value +qaData, HttpStatus.NOT_FOUND)
	}

	/**
	 * Submit to attending.
	 *
	 * @param studyId the study id
	 * 
	 */
	@RequestMapping(value='/{id}/submittoattending',method=RequestMethod.PUT)
	def submitToAttending(@PathVariable('id') Long studyId) {
		worksheetSubmissionService.submitToattending(studyId)?ResponseEntity.ok().build():new ResponseEntity(CustomErrorCode.ER_404.value, HttpStatus.NOT_FOUND)
	}

	/**
	 * Gets the QA worksheet id.
	 *
	 * @param studyId the study id
	 * @return the QA worksheet id
	 */
	@RequestMapping(value='/study/{id}',method=RequestMethod.GET)
	def getQAWorksheetId(@PathVariable('id') studyId) {
		def qaId = worksheetService.getQAWorksheetId(studyId.asType(Long))
		qaId?[qaId:qaId]:new ResponseEntity(CustomErrorCode.ER_404.value, HttpStatus.NOT_FOUND)
	}
}

package com.ffss.datax.configuration.web.controller

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
import com.ffss.datax.configuration.service.ExamTypeService
import com.ffss.datax.configuration.web.transformer.ExamTypeListTransformer
/**
 * The Class ExamTypeController.
 * @author Virtusa|Polaris
 */
@RestController
@RequestMapping('/api/exam')
class ExamTypeController {
	@Autowired
	ExamTypeService examtypeService

	@Autowired
	ExamTypeListTransformer examTypeListTransformer

	/**
	 * API to check for unique examtype name
	 * @param examtypeName
	 * @return true or false
	 */
	@RequestMapping(value='/search',method=RequestMethod.GET)
	def examtypeNameValidator(@RequestParam('name')  examtypeName) {
		[isPresent:examtypeService.ifexamtypeNamePresent(examtypeName)]
	}

	/**
	 *API to get List of cptcodes
	 * @return
	 */
	@RequestMapping(value='/cptcode',method=RequestMethod.GET)
	def getCptCodes() {
		def cptCodes = examtypeService.findCptCodesList()
		examTypeListTransformer.transformCptCodes(cptCodes)
	}

	/**
	 *API to get List of templates
	 * @return
	 */
	@RequestMapping(value='/template',method=RequestMethod.GET)
	def getTemplates() {
		def templates = examtypeService.findTemplates()
		examTypeListTransformer.transformWorksheetTemplates(templates)
	}

	/**
	 * API to enable or disable examtype by examtypeId
	 * @param examid
	 * @param renderDetails - true or false
	 * @return 'Y' if renderDetails is true else 'N'
	 */
	@RequestMapping(value='/{examid}/renderexamtype', method=RequestMethod.PUT)
	def changeUserStatus(@PathVariable('examid') Long examid ,@RequestBody renderDetails) {
		def retVal = examtypeService.updateStatus(examid, renderDetails)
		retVal?examTypeListTransformer.transformExam(retVal):new ResponseEntity(CustomErrorCode.ER_404.value, HttpStatus.NOT_FOUND)
	}
	/**
	 * API to get list of tags associated with examtype by examtypeId
	 * @param examid
	 * @return
	 */
	@RequestMapping(value='/{examid}/tags', method=RequestMethod.GET)
	def getTags(@PathVariable('examid') Long examid) {
		def retVal = examtypeService.getTagsForExamType(examid)
		retVal?examTypeListTransformer.transformTagsForExamType(retVal):new ResponseEntity(CustomErrorCode.ER_404.value, HttpStatus.NOT_FOUND)
	}
}

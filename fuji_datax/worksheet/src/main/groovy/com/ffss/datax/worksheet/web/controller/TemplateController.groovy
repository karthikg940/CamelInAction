package com.ffss.datax.worksheet.web.controller

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

import com.ffss.datax.common.constants.CustomErrorCode
import com.ffss.datax.worksheet.service.WorksheetTemplateService
import com.ffss.datax.worksheet.web.transformer.WorksheetTemplateTransformer

/**
 * Description.
 *
 * @author Virtusa|Polaris
 */

@RestController
@RequestMapping('/api/template')
class TemplateController {

	/** The worksheet service. */
	@Autowired
	WorksheetTemplateService worksheetService
	
	/** The worksheet transformer. */
	@Autowired
	WorksheetTemplateTransformer worksheetTransformer

	/**
	 * Gets the template id.
	 *
	 * @return the template id
	 */
	@RequestMapping(value='/search',method=RequestMethod.GET)
	def getTemplateId(@RequestParam('studyId') Long studyId,@RequestParam('examTypeFlag') boolean typeFlag) {
		def worksheet = worksheetService.searchProceduralExamType(studyId,typeFlag)
		new ResponseEntity<String>(worksheetTransformer.transform(worksheet,typeFlag), HttpStatus.OK)
	}
 
	/**
	 * Gets the template.
	 *
	 * @param templateId the template id
	 * @return the template
	 */
	@RequestMapping(value='/{id}',method=RequestMethod.GET)
	def getTemplate(@PathVariable('id') Long templateId) {
		def worksheetTemplate = worksheetService.findOne(templateId)
		worksheetTemplate?worksheetTransformer.transformTemplate(worksheetTemplate): new ResponseEntity(CustomErrorCode.ER_404.value, HttpStatus.NOT_FOUND)
	}
	
	/**
	 * Gets the template for QA.
	 *
	 * @return the template for QA
	 */
	@RequestMapping(value='/search/qa',method=RequestMethod.GET)
	def getTemplateForQA() {
		def worksheet = worksheetService.searchQAExamType()
		new ResponseEntity<String>(worksheetTransformer.transformQa(worksheet), HttpStatus.OK)
	}
	
}

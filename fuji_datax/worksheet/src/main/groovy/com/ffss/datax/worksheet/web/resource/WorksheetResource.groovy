package com.ffss.datax.worksheet.web.resource

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.RestController

import com.ffss.datax.common.constants.CustomErrorCode
import com.ffss.datax.common.log.Auditable
import com.ffss.datax.worksheet.service.WorksheetService
import com.ffss.datax.worksheet.web.transformer.WorksheetTransformer
import com.ffss.datax.worksheet.web.validator.WorksheetValidator

/**
 * The Class WorksheetResource.
 */
@RestController
@RequestMapping('/api/worksheet')
class WorksheetResource {

	/** The worksheet validator. */
	@Autowired
	WorksheetValidator worksheetValidator

	/** The worksheet service. */
	@Autowired
	WorksheetService worksheetService

	/** The worksheet transformer. */
	@Autowired
	WorksheetTransformer worksheetTransformer

	/**
	 * Save.
	 *
	 * @param worksheet the worksheet
	 */
	@RequestMapping(value='',method=RequestMethod.POST)
	@Auditable(eventCode=115L, microServiceName='worksheet', contentPosition=0,entityName='Worksheet')
	def save(@RequestBody worksheet) {
		def errors = worksheetValidator.validate(worksheet)
		def retVal = ResponseEntity.badRequest()
		if (!errors) {
			retVal = ResponseEntity.created(new URI("/api/worksheet/${worksheetService.saveWorksheet(worksheet).id}"))
		}
		else {
			retVal.body(CustomErrorCode.ER_400.value)
		}

		retVal.build()
	}

	/**
	 * Gets the.
	 *
	 * @param id the id
	 */
	@RequestMapping(value='/{id}',method=RequestMethod.GET)
	def get(@PathVariable('id') Long id) {
		def worksheet = worksheetService.findOne(id)
		worksheet?worksheetTransformer.transformOne(worksheet):new ResponseEntity(CustomErrorCode.ER_404.value+'worksheetId', HttpStatus.NOT_FOUND)
	}


	/**
	 * Delete by id.
	 *
	 * @param id the id
	 */
	@RequestMapping(value='/{id}',method=RequestMethod.DELETE)
	def deleteById(@PathVariable('id') Long id) {
		def retVal = worksheetService.fetchById(id)
		if(retVal){
			worksheetService.deleteById(id)
			retVal = new ResponseEntity(CustomErrorCode.ER_204.value, HttpStatus.NO_CONTENT)
		}
		else{
			retVal = new ResponseEntity(CustomErrorCode.ER_404.value, HttpStatus.NOT_FOUND)
		}
		retVal
	}

	/**
	 * Update.
	 *
	 * @param id the id
	 * @param worksheet the worksheet
	 */
	@RequestMapping(value='/{id}',method=RequestMethod.PUT)
	@Auditable(eventCode=116L, microServiceName='worksheet', id=0,entityName='Worksheet')
	def update(@PathVariable('id') Long id,@RequestBody worksheet) {
		worksheetService.update(id,worksheet)?ResponseEntity.ok().build():new ResponseEntity(CustomErrorCode.ER_404.value, HttpStatus.NOT_FOUND)
	}
}

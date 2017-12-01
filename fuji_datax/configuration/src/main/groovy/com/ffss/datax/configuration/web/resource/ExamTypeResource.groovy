package com.ffss.datax.configuration.web.resource

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.RestController

import com.ffss.datax.common.constants.CustomErrorCode
import com.ffss.datax.configuration.service.ExamTypeService
import com.ffss.datax.configuration.web.transformer.ExamTypeListTransformer
/**
 * The Class ExamTypeResource.
 * @author Virtusa|Polaris
 */
@RestController
@RequestMapping('/api/exam')
class ExamTypeResource {

	@Autowired
	ExamTypeListTransformer examTypeListTransformer
	@Autowired
	ExamTypeService examtypeService

	/**
	 * API to save examtypes
	 * @param examTypeObj -the examTypeObj contains the information which needs to save
	 * @return
	 */
	@RequestMapping(value='',method=RequestMethod.POST)
	def saveExamType(@RequestBody examTypeObj) {
		ResponseEntity.created(new URI("/api/exam/${examtypeService.saveExamType(examTypeObj).id}".toString())).build()
	}

	/**
	 * API to get exam type by id
	 * @param examid
	 * @return
	 */
	@RequestMapping(value='/{examid}',method=RequestMethod.GET)
	def getExamType(@PathVariable('examid') Long examid) {
		def examType = examtypeService.getExamType(examid)
		def cptCodes = examtypeService.getUnusedCptCodes(examType)
		examTypeListTransformer.transformExamtypeCptcodes(examType,cptCodes)
	}

	/**
	 * API to update exam type by id
	 * @param id - examtype id
	 * @param examTypeObj - the examTypeObj contains the information which needs to be update 
	 * @return
	 */
	@RequestMapping(value='/{examid}',method=RequestMethod.PUT)
	def updateExamType(@PathVariable('examid') Long id,@RequestBody examTypeObj) {
		examtypeService.updateExamType(id,examTypeObj)?ResponseEntity.ok().build():new ResponseEntity(CustomErrorCode.ER_404.value, HttpStatus.NOT_FOUND)
	}

	/**
	 * API to delete exam type by id
	 * @param examid
	 * @return
	 */
	@RequestMapping(value='/remove/{examid}',method=RequestMethod.DELETE)
	def deleteExamType(@PathVariable('examid') Long examid) {
		def examType = examtypeService.getExamType(examid)
		if(examType){
			examtypeService.deleteExamTypeById(examid)
			ResponseEntity.ok().build()
		}
		else
			ResponseEntity.notFound().build()
	}

	/**
	 * API to get the list of examtypes
	 * @return
	 */
	@RequestMapping(value='',method=RequestMethod.GET)
	def getExamTypes(){
		examTypeListTransformer.transformAll(examtypeService.findAll())
	}
}

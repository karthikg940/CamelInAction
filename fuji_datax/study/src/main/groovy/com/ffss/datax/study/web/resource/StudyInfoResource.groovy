package com.ffss.datax.study.web.resource

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
import com.ffss.datax.common.log.Auditable
import com.ffss.datax.security.util.SecurityUtil
import com.ffss.datax.study.service.StudyInfoService
import com.ffss.datax.study.service.StudyService
import com.ffss.datax.study.service.UserService
import com.ffss.datax.study.web.transformer.StudyTransformer


/**
 * The Class ExamTypeResource.
 */
@RestController
@RequestMapping('/api')
class StudyInfoResource {

	/** The exam type service. */
	@Autowired
	StudyInfoService examTypeService

	/** The study service. */
	@Autowired
	StudyService studyService

	@Autowired
	StudyTransformer studyTransformer

	@Autowired
	UserService userService


	/**
	 * Update study status.
	 *
	 * @param id the id
	 * @param request the request
	 * @return status
	 */
	@RequestMapping(value='/org/{orgId}/examtype/{id}/status',method=RequestMethod.PUT)
	def updateStudyWorkflowStage(@PathVariable('id') Long id,@RequestBody request,@PathVariable('orgId') Long orgId) {
		def loginUserId = SecurityUtil.retrieveUserId()
		examTypeService.updateStudyWorkflowStage(id,request.event,loginUserId,orgId)?ResponseEntity.ok().build():new ResponseEntity(CustomErrorCode.ER_404.value+'studyId', HttpStatus.NOT_FOUND)
	}


	/**
	 * Update study exam.
	 *
	 * @param id the id
	 * @param templateName the template name
	 * @return the examtype
	 */
	@RequestMapping(value='/examtype/{id}/exam/{examTypeName}/template/{templateName}',method=RequestMethod.PUT)
	@Auditable(eventCode=112L, microServiceName='studylist', id=0,entityName='Study')
	def associateExamTypeToStudy(@PathVariable('id') Long id, @PathVariable('examTypeName') String examTypeName,@PathVariable('templateName') String templateName) {
		def loginUserId = SecurityUtil.retrieveUserId()
		def examType = examTypeService.findExamtypeForTemplate(id,examTypeName,templateName)
		def exam = examTypeService.associateExamTypeToStudy(id,examTypeName,loginUserId)
		exam?studyTransformer.transformExamAssociation(exam,examType): new ResponseEntity(CustomErrorCode.ER_404.value+'examTypeName', HttpStatus.NOT_FOUND)
	}

	/**
	 * Submit study to QA.
	 *
	 * @param id the id
	 * @param request the request
	 * @return the qa user
	 */
	@RequestMapping(value='/org/{orgId}/examtype/{id}/submittoqa',method=RequestMethod.PUT)
	@Auditable(eventCode=114L, microServiceName='studylist', id=0,entityName='Study')
	def updateStudyWorkflowToQAPool(@PathVariable('id') Long id,@RequestBody request,@PathVariable('orgId') Long orgId) {
		studyService.updateStudyWorkflowToQAPool(id,request.userid,orgId)?ResponseEntity.ok().build():ResponseEntity.notFound().build()
	}

	/**
	 * Update study type.
	 *
	 * @param id the id
	 * @param content the content
	 * @return the studytype
	 */
	@RequestMapping(value='/examtype/{id}/study',method=RequestMethod.PUT)
	@Auditable(eventCode=113L, microServiceName='studylist', id=0,entityName='Study')
	def updateStudyType(@PathVariable('id') Long id,@RequestBody content) {
		def loginUserId = SecurityUtil.retrieveUserId()
		examTypeService.updateStudyType(id,content,loginUserId)?ResponseEntity.ok().build():ResponseEntity.notFound().build()
	}

	/**
	 * get the list of examTypes for template
	 * @param templateName
	 * @return examTypes
	 */
	@RequestMapping(value='/examtype/search', method=RequestMethod.GET)
	def getExamTypesBytemplateName(@RequestParam('templateName') templateName){
		def retVal = examTypeService.getExamTypesBytemplateName(templateName)
		retVal?studyTransformer.transformExamTypes(retVal): new ResponseEntity(CustomErrorCode.ER_404.value+'templateName', HttpStatus.NOT_FOUND)
	}
}

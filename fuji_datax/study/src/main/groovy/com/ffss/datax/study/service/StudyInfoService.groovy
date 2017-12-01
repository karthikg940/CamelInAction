package com.ffss.datax.study.service

import org.joda.time.DateTime
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

import com.ffss.datax.common.constants.StudyLookup
import com.ffss.datax.common.constants.StudyStatusEnum
import com.ffss.datax.common.constants.StudyWorkFlowEventEnum
import com.ffss.datax.common.domain.study.ExamType
import com.ffss.datax.common.domain.study.StudyExamTypeMap
import com.ffss.datax.common.domain.study.StudyTaskMap
import com.ffss.datax.security.util.SecurityUtil
import com.ffss.datax.study.constants.StudyConstants
import com.ffss.datax.study.repository.ExamTypeMapRepository
import com.ffss.datax.study.repository.ExamTypeRepository
import com.ffss.datax.study.repository.ExamWorksheetTemplateRepository
import com.ffss.datax.study.repository.StudyExamTypeMapRepository
import com.ffss.datax.study.repository.StudyLookupRepository
import com.ffss.datax.study.repository.StudyRepository
import com.ffss.datax.study.repository.StudyTaskMapRepository
import com.ffss.datax.study.service.feign.StudyWorkflowService


/**
 * The Class StudyInfoService.
 */
@Service
class StudyInfoService {

	/** The study repository. */
	@Autowired
	StudyRepository studyRepository

	/** The study exam type map repository. */
	@Autowired
	StudyExamTypeMapRepository studyExamTypeMapRepository

	/** The study lookup repository. */
	@Autowired
	StudyLookupRepository studyLookupRepository

	/** The exam type map repository. */
	@Autowired
	ExamTypeMapRepository examTypeMapRepository

	/** The exam repository. */
	@Autowired
	ExamTypeRepository examRepository

	/** The study workflow service. */
	@Autowired
	StudyWorkflowService studyWorkflowService

	/** The study task map repository. */
	@Autowired
	StudyTaskMapRepository studyTaskMapRepository

	/** The exam wrksht template repository. */
	@Autowired
	ExamWorksheetTemplateRepository examWrkshtTemplateRepository

	/** The study service. */
	@Autowired
	StudyService studyService

	/** The new template name. */
	static newTemplateName,/** The exam type match. */
examTypeMatch
	
	/**
	 * Update study workflow stage.
	 *
	 * @param id the id
	 * @param event the event
	 * @param userId the user id
	 * @return the update the study status
	 */
	@Transactional
	def updateStudyWorkflowStage(id,event,userId,orgId) {
		def token = SecurityUtil.retrieveAuthToken()
		def retVal = studyRepository.findOne(id)
		def lookupOld = studyLookupRepository.findOne(StudyLookup.New.value)
		print "lookUpOld" +lookupOld 
		print "status"+ retVal.status
		def nextstatus
		def task
		def studyTask
		if(!retVal.status || retVal.status==lookupOld){
			task = studyWorkflowService.createTask([type:StudyConstants.STUDY,user:userId],token)
			nextstatus = task.currentStatus
			studyTask = studyTaskMapRepository.save(new StudyTaskMap(study:retVal,workflowTask:task))
		}
		else {
			print "entered"
			studyTask = getStudyTask(retVal)
			def updateTask =  studyWorkflowService.updateTask(studyTask?.workflowTask?.id,[event:event,assignedUser:userId],token)
			nextstatus = updateTask.currentStatus
			print "status next"+nextstatus
		}

		def lookup = studyLookupRepository.findByNameIgnoreCase(nextstatus)
		retVal.status = lookup
		retVal.updatedDateTime=DateTime.now()
		retVal = studyRepository.save(retVal)

		//@Todo Need to refactor this code, when this ExamTypeServer is refactored
		if (event == StudyWorkFlowEventEnum.QASUBMITFORATTENDING.value || event == StudyWorkFlowEventEnum.POCSUBMITFORATTENDING.value) {
			//Retrieving the User who the study is assigned to be attested by
			def attestingUser = studyWorkflowService.getUser(retVal.studyTaskMap.workflowTask.id, [type:StudyConstants.ROLE_ATTENDING], token)
			if (userId.asType(Long) != attestingUser.id) {
				def eventInfo = studyService.eventInfoRepository.findEventByCode(StudyConstants.ATTESTATION_ALERT)
				studyService.sendAlertforUser(retVal.id, attestingUser.id, userId, eventInfo, token, orgId)
			}
		}
		retVal
	}

	/**
	 * associate study exam type.
	 *
	 * @param id the id
	 * @param examTypeName the exam type name
	 * @param userId the user id
	 * @return the examtype
	 */
	@Transactional
	def associateExamTypeToStudy(id,examTypeName,userId) {
		def study
		def orgId = SecurityUtil.retreiveOrgId()
		def examid=examTypeMapRepository.findByExamTypeName(examTypeName)
		def studymap=studyExamTypeMapRepository.findStudyExamTypeByStudyId(id)
		if(!studymap) {
			studyExamTypeMapRepository.save(new StudyExamTypeMap(
					study:studyRepository.findOne(id.asType(Long)),
					examTypeMap:examTypeMapRepository.findOne(examid.id.asType(Long)),
					type:StudyConstants.STUDY
					))
			study = studyRepository.findStudyDetails(id)
			createExamType(study,examid)
			studyRepository.save(study)
			updateStudyWorkflowStage(id,StudyWorkFlowEventEnum.WORKSHEETSAVEPENDING.value,userId,orgId)
		}
		else {
			study = studyRepository.findStudyDetails(id)
			createExamType(study,examid)
			studymap.examTypeMap=examTypeMapRepository.findOne(examid.id.asType(Long))
			studyExamTypeMapRepository.save(studymap)
			updateStudyWorkflowStage(id,StudyWorkFlowEventEnum.WORKSHEETSAVEPENDING.value,userId,orgId)
		}

		examid
	}

	/**
	 * Find examtype for template.
	 *
	 * @param studyId the study id
	 * @param examTypeName the exam type name
	 * @param templateName the template name
	 * @return true/false
	 */
	def findExamtypeForTemplate(studyId,examTypeName,templateName){
		def templateStatus = false
		def studymap=studyExamTypeMapRepository.findStudyExamTypeByStudyId(studyId)
		if(examTypeName.equalsIgnoreCase(templateName)) {
			templateStatus = true
		}
		else if(studymap){
			def exam=examWrkshtTemplateRepository.findExamWorksheetTemplateByTemplateName(templateName)
			exam.collect{
				templateStatus = (studymap.examTypeMap?.id == it.examTypeMap.id)
			}
		}
		templateStatus
	}

	/**
	 * Creates the exam type.
	 *
	 * @param study the study
	 * @param examid the examid
	 * @return the examtype
	 */
	@Transactional
	def createExamType(study,examid){
		study.each{
			it.series.each{
				def examType = examRepository.findExamTypeBySeriesId(it.id.asType(Long))
				if(examType){
					examType.examTypeMap = examTypeMapRepository.findOne(examid.id)
					examTypeMapRepository.save(examType)
				}
				else{
					examTypeMapRepository.save(new ExamType(series:it,examTypeMap:examTypeMapRepository.findOne(examid.id)))
				}
			}
		}
	}

	/**
	 * Update study type.
	 *
	 * @param id the id
	 * @param content the content
	 * @param userId the user id
	 * @return the studytype
	 */
	@Transactional
	def updateStudyType(id,content,userId){
		def study = studyRepository.findworksheetByStudyId(id.asType(Long))
		def userStudyType = study.worksheet.collect{ it.examWorksheetType }
		def orgId = SecurityUtil.retreiveOrgId()
		if(study){
			if(content){
				study.studyType = content.wrk1.examoverview?content.wrk1.examoverview.type:''
				studyRepository.save(study)
			}
			else{
				study.studyType=''
				studyRepository.save(study)
			}
		}
		def currentStatus = studyLookupRepository.findOne(study.status.id)
		def event
		def procedural = [StudyConstants.PROCEDURAL]
		def qa = [StudyConstants.PROCEDURAL, StudyConstants.QA]
		if(userStudyType==(procedural)){
			if(currentStatus.name == StudyStatusEnum.PENDING.value){
				event=StudyWorkFlowEventEnum.ASSOCIATION.value
			}
			else if(currentStatus.name == StudyStatusEnum.QA_ASSIGNED.value){
				event=StudyWorkFlowEventEnum.QAWORKSHEETTYPEUPDATE.value
			}
			else if (currentStatus.name == StudyStatusEnum.QA_INPROGRESS.value) {
				event=StudyWorkFlowEventEnum.QAWORKSHEETUPDATE.value
			}
		}
		else if(userStudyType==(qa)){
			if(currentStatus.name == StudyStatusEnum.QA_ASSIGNED.value){
				event=StudyWorkFlowEventEnum.QAASSOCIATION.value
			}
			else if(currentStatus.name == StudyStatusEnum.QA_INPROGRESS.value){
				event=StudyWorkFlowEventEnum.QAWORKSHEETTYPEUPDATE.value
			}
			else {
				event=StudyWorkFlowEventEnum.QAWORKSHEETTYPEUPDATE.value
			}
		}
		def status=updateStudyWorkflowStage(id,event,userId,orgId)
		status
	}

	/**
	 * Gets the exam types bytemplate name.
	 *
	 * @param templateName the template name
	 * @return examTypes
	 */

	def	getExamTypesBytemplateName(templateName) {
		examTypeMapRepository.findExamTypesByTemplateName(templateName)
	}

	/**
	 * Gets the study task.
	 *
	 * @param study the study
	 * @return the study task
	 */
	def getStudyTask(study){
		studyTaskMapRepository.findOneByStudyId(study.id)
	}
}

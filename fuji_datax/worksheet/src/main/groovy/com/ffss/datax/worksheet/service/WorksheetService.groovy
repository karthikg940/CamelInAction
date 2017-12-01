package com.ffss.datax.worksheet.service

import groovy.json.JsonOutput

import javax.transaction.Transactional

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

import com.ffss.datax.common.constants.StudyStatusEnum
import com.ffss.datax.common.constants.StudyWorkFlowEventEnum
import com.ffss.datax.common.domain.worksheet.Worksheet
import com.ffss.datax.security.util.SecurityUtil
import com.ffss.datax.worksheet.constants.WorksheetConstants
import com.ffss.datax.worksheet.repository.ExamTypeRepository
import com.ffss.datax.worksheet.repository.StudyRepository
import com.ffss.datax.worksheet.repository.WorksheetRepository
import com.ffss.datax.worksheet.repository.WorksheetTemplateRepository
import com.ffss.datax.worksheet.service.feign.StudyService

/**
 * The Class WorksheetService.
 */
@Service
class WorksheetService {

	/** The worksheet repository. */
	@Autowired
	WorksheetRepository worksheetRepository

	/** The worksheet template repository. */
	@Autowired
	WorksheetTemplateRepository worksheetTemplateRepository

	/** The exam type repository. */
	@Autowired
	ExamTypeRepository examTypeRepository

	/** The study status service. */
	@Autowired
	StudyService studyStatusService

	/** The study repository. */
	@Autowired
	StudyRepository studyRepository
	
	/**
	 * Save worksheet.
	 *
	 * @param worksheet the worksheet
	 */
	@Transactional
	def saveWorksheet(worksheet) {

		def retVal
		def type= worksheet.wrkshtType.type
		def token = SecurityUtil.retrieveAuthToken()
		def studyStatus=studyRepository.findOne(worksheet.study.id.asType(Long))

		def currentStudyStatus=studyStatus.status?studyStatus.status.name:StudyStatusEnum.NEW.value
		qaWorksheetUpdate(worksheet.study?.id,currentStudyStatus,type,token)
		retVal = worksheetRepository.save(new Worksheet(
				template:worksheetTemplateRepository.findOne(worksheet.template.id.asType(Long)),
				examType:(type==WorksheetConstants.PROCEDURAL_WORKSHEET)?getExamType(worksheet.examType.id):null,
				content:JsonOutput.toJson(worksheet.content),
				examWorksheetType:type,
				study:studyRepository.findOne(worksheet.study.id.asType(Long))
				))
		retVal
	}

	/**
	 * Qa worksheet update.
	 *
	 * @param studyId the study id
	 * @param currentStudyStatus the current study status
	 * @param type the type
	 * @param token the token
	 */
	def qaWorksheetUpdate(studyId,currentStudyStatus,type,token){
		//Fo QA Worksheet
		def orgId=SecurityUtil.retreiveOrgId()
		if(type==WorksheetConstants.QA_WORKSHEET){

			if(currentStudyStatus == StudyStatusEnum.QA_ASSIGNED.value){
				studyStatusService.updateStudyStatus(studyId.asType(Long),[event:StudyWorkFlowEventEnum.QAWORKSHEETTYPEUPDATE.value],token,orgId)
			}
			else if(currentStudyStatus == StudyStatusEnum.QA_INPROGRESS.value){
				studyStatusService.updateStudyStatus(studyId.asType(Long),[event:StudyWorkFlowEventEnum.QAWORKSHEETUPDATE.value],token,orgId)
			}
		}
	}


	/**
	 * Find one.
	 *
	 * @param id the id
	 */
	def findOne(id) {
		worksheetRepository.findOne(id)
	}


	/**
	 * Delete by id.
	 *
	 * @param id the id
	 */
	@Transactional
	def deleteById(id) {
		def worksheet = worksheetRepository.findWorksheetWithStudy(id)
		def studyId=worksheet.study.id
		def token = SecurityUtil.retrieveAuthToken()
		studyStatusService.updateStudyType(studyId.asType(Long),[],token)
		worksheetRepository.delete(id)
	}

	/**
	 * Removes the worksheet.
	 *
	 * @param studyId the study id
	 */
	@Transactional
	def removeWorksheet(studyId) {
		def worksheet = worksheetRepository.findWorksheetByStudy(studyId)
		if(worksheet) {
			def status = worksheetRepository.deleteWorksheet(worksheet.id.asType(Long))
			if(status == 1){
				status = true
				status
			}
		}
	}

	/**
	 * Fetch by id.
	 *
	 * @param id the id
	 */
	def fetchById(id) {
		worksheetRepository.findOne(id)
	}

	/**
	 * Update.
	 *
	 * @param id the id
	 * @param worksheet the worksheet
	 */
	@Transactional
	def update(id,worksheet) {
		//updates both Procedural and QA worksheet thereby changing the respective status
		def existingWorksheet = worksheetRepository.findOne(id)

		def token = SecurityUtil.retrieveAuthToken()

		if (existingWorksheet) {
			def worksheetType=existingWorksheet.examWorksheetType
			existingWorksheet.content = JsonOutput.toJson(worksheet.content)
			worksheetRepository.save(existingWorksheet)
			if(worksheet.content && worksheetType==WorksheetConstants.PROCEDURAL_WORKSHEET){
				studyStatusService.updateStudyType(existingWorksheet.study.id.asType(Long),worksheet.content,token)
			}
			else if (!worksheet.content && worksheetType==WorksheetConstants.PROCEDURAL_WORKSHEET) {
				studyStatusService.updateStudyType(existingWorksheet.study.id.asType(Long),worksheet.content,token)
			}
		}
		existingWorksheet
	}

	/**
	 * Gets the exam type.
	 *
	 * @param examTypeId the exam type id
	 * @return the exam type
	 */
	def getExamType(examTypeId){
		def retVal
		if(examTypeId){
			retVal = examTypeRepository.findOne(examTypeId.asType(Long))
		}
		retVal
	}
	
	/**
	 * Gets the QA worksheet id.
	 *
	 * @param id the id
	 * @return the QA worksheet id
	 */
	def getQAWorksheetId(id){
		
		def qaWorksheet  = worksheetRepository.findQaWorksheetByStudyId(id)
		qaWorksheet.id
	}
}

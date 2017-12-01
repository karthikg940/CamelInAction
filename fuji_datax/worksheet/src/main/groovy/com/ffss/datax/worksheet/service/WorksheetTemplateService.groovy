package com.ffss.datax.worksheet.service

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

import com.ffss.datax.worksheet.constants.WorksheetConstants
import com.ffss.datax.worksheet.repository.ExamWorksheetTemplateRepository
import com.ffss.datax.worksheet.repository.StudyRepository
import com.ffss.datax.worksheet.repository.WorksheetRepository
import com.ffss.datax.worksheet.repository.WorksheetTemplateRepository
import com.ffss.datax.worksheet.web.validator.WorksheetValidator

/**
 * The Class WorksheetTemplateService.
 *
 * @author Virtusa|Polaris
 */

@Service
class WorksheetTemplateService {

	/** The exam worksheet template repo. */
	@Autowired
	ExamWorksheetTemplateRepository examWorksheetTemplateRepo

	/** The worksheet template repository. */
	@Autowired
	WorksheetTemplateRepository worksheetTemplateRepository

	/** The worksheet validator. */
	@Autowired
	WorksheetValidator worksheetValidator

	/** The worksheet repository. */
	@Autowired
	WorksheetRepository worksheetRepository

	@Autowired
	StudyRepository studyRepository
	
	/**
	 * Search procedural exam type.
	 *
	 */
	def searchProceduralExamType(studyId,typeFlag) {
		def study = studyRepository.findOne(studyId)
		def templateList
		if(study){
			if(typeFlag == true){
				def examTypeForStudy = studyRepository.getExamTypeForStudy(studyId)
				templateList = examWorksheetTemplateRepo.findByExamTypeMapExamTypeDesc(examTypeForStudy.studyExamTypeMap.examTypeMap.examTypeDesc)
				
			}
			else{
				templateList = worksheetTemplateRepository.findProceduralWorksheetTemplate()
			}
		}
		templateList
	}

	/**
	 * Search QA exam type.
	 *
	 */
	def searchQAExamType() {

		examWorksheetTemplateRepo.findQAExamWorksheetTemplate()
	}

	/**
	 * Find one.
	 *
	 * @param templateId the template id
	 */
	def findOne(templateId) {

		worksheetTemplateRepository.findOne(templateId)
	}

	/**
	 * Search by exam type.
	 *
	 * @param studyId the study id
	 * @param type the type
	 */
	def searchByType(studyId,type) {
		def retVal
		if(type==(WorksheetConstants.PROCEDURAL_WORKSHEET)){
			retVal = worksheetRepository.findWorksheetByTypeProcedural(studyId)
		}
		else if(type==(WorksheetConstants.QA_WORKSHEET)){
			retVal = worksheetRepository.findWorksheetByTypeQA(studyId)
		}

		retVal?retVal[0]:null
	}
}

package com.ffss.datax.worksheet.service

import org.joda.time.DateTime
import org.joda.time.format.DateTimeFormat
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

import com.ffss.datax.common.constants.StudyStatusEnum
import com.ffss.datax.common.constants.StudyWorkFlowEventEnum
import com.ffss.datax.common.constants.WrkshtLookup
import com.ffss.datax.common.domain.worksheet.WorksheetSignature
import com.ffss.datax.security.util.SecurityUtil
import com.ffss.datax.worksheet.constants.WorksheetConstants
import com.ffss.datax.worksheet.repository.StudyLookupRepository
import com.ffss.datax.worksheet.repository.StudyRepository
import com.ffss.datax.worksheet.repository.WorksheetLookupRepository
import com.ffss.datax.worksheet.repository.WorksheetRepository
import com.ffss.datax.worksheet.repository.WorksheetSignatureRepository
import com.ffss.datax.worksheet.service.feign.StudyService

/**
 * The Class SignatureService.
 */
@Service
class SignatureService {

	/** The signature repository. */
	@Autowired
	WorksheetSignatureRepository signatureRepository

	/** The worksheet repository. */
	@Autowired
	WorksheetRepository worksheetRepository

	/** The worksheet lookup repository. */
	@Autowired
	WorksheetLookupRepository worksheetLookupRepository

	/** The study status service. */
	@Autowired
	StudyService studyStatusService

	/** The study repository. */
	@Autowired
	StudyRepository studyRepository

	/** The study lookup repository. */
	@Autowired
	StudyLookupRepository studyLookupRepository

	/**
	 * Save signature.
	 *
	 * @param signedData the signed data
	 * 
	 */
	@Transactional
	def saveSignature(signedData){

		def role=signedData.type
		def retVal
		String pattern = WorksheetConstants.DATEFORMAT_YEAR
		def worksheet = worksheetRepository.findOne(signedData.worksheet.id.asType(Long))
		def pocDateTime = DateTime.parse(signedData.timestamp , DateTimeFormat.forPattern(pattern))
		def studyId = worksheet?worksheet.study.id:null
		def study = studyRepository.findStudyTaskById(studyId.asType(Long))
		def orgId=SecurityUtil.retreiveOrgId()

		if(worksheet && study) {
			def currentStatus = study.studyTaskMap.workflowTask.currentStatus
			retVal=signatureRepository.save(new WorksheetSignature(
					worksheet:worksheetRepository.findOne(signedData.worksheet.id.asType(Long)),
					signedName:signedData.sign,
					wrkShtStatus:role.equalsIgnoreCase(WorksheetConstants.ROLE_POC)?StudyStatusEnum.SIGNED.value:role.equalsIgnoreCase(WorksheetConstants.ROLE_QA)?StudyStatusEnum.QA_INPROGRESS.value:StudyStatusEnum.ATTESTED.value,
					pocDateTime:pocDateTime))
			def lookupName
			def event
			if(role.equalsIgnoreCase(WorksheetConstants.ROLE_POC)){
				lookupName = WrkshtLookup.Signed.value
				event = StudyWorkFlowEventEnum.POCSIGNED.value
			}
			else if(role.equalsIgnoreCase(WorksheetConstants.ROLE_QA)){
				lookupName = WrkshtLookup.QAInProgress.value
				if(currentStatus==StudyStatusEnum.QA_ASSIGNED.value){
					event = StudyWorkFlowEventEnum.QAWORKSHEETSAVE.value
				}
				else if(currentStatus==StudyStatusEnum.QA_INPROGRESS.value){
					event = StudyWorkFlowEventEnum.QASIGNED.value
				}
			}
			else if(role.equalsIgnoreCase(WorksheetConstants.ROLE_ATTENDING)){
				lookupName = WrkshtLookup.Attested.value
				event = StudyWorkFlowEventEnum.POCATTESTATION.value
			}

			worksheet.lookupId = worksheetLookupRepository.findOne(lookupName)
			worksheetRepository.save(worksheet)
			def token = SecurityUtil.retrieveAuthToken()

			studyStatusService.updateStudyStatus(worksheet.study?.id.asType(Long),[event:event],token,orgId)
		}
		retVal?retVal:[id:'']
	}

	/**
	 * Delete signature.
	 *
	 * @param id the id
	 * 
	 */
	@Transactional
	def deleteSignature(id){
		def retVal = signatureRepository.findOne(id.asType(Long))

		if(retVal){
			signatureRepository.delete(retVal.id)
			def worksheetId=retVal.worksheet?.id
			def worksheet = worksheetRepository.findWorksheetWithStudy(worksheetId.asType(Long))
			def status= worksheet.study.status.name
			def token = SecurityUtil.retrieveAuthToken()
			def orgId=SecurityUtil.retreiveOrgId()
			def lookUpName
			def event
			if(worksheet) {
				if(status.equalsIgnoreCase(StudyStatusEnum.QA_INPROGRESS.value)){
					lookUpName = WrkshtLookup.QAInProgress.value
					event = StudyWorkFlowEventEnum.DELETEQASIGN.value
				}
				else if (status.equalsIgnoreCase(StudyStatusEnum.SIGNED.value)){
					lookUpName = WrkshtLookup.Pending.value
					event = StudyWorkFlowEventEnum.DELETEPOCSIGN.value
				}
				else if (status.equalsIgnoreCase(StudyStatusEnum.ATTESTED.value)){
					event = StudyWorkFlowEventEnum.DELETEATTENDINGSIGN.value
				}
				if(!status.equalsIgnoreCase(StudyStatusEnum.ATTESTED.value)){
					worksheet.lookupId = worksheetLookupRepository.findOne(lookUpName)
					worksheetRepository.save(worksheet)
				}
				studyStatusService.updateStudyStatus(worksheet.study?.id.asType(Long),[event:event],token,orgId)
				retVal
			}
		}
	}

	/**
	 * Gets the sign.
	 *
	 * @param id the id
	 * @return the sign
	 */
	def getSign(id){
		def retVal = signatureRepository.findSignatureByWorksheetId(id.asType(Long))
		retVal
	}
}

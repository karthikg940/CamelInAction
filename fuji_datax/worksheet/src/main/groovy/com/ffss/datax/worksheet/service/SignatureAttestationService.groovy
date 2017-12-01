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
import com.ffss.datax.worksheet.repository.StudyRepository
import com.ffss.datax.worksheet.repository.WorksheetLookupRepository
import com.ffss.datax.worksheet.repository.WorksheetRepository
import com.ffss.datax.worksheet.repository.WorksheetSignatureRepository
import com.ffss.datax.worksheet.service.feign.StudyService

/**
 * The Class SignatureAttestationService.
 */
@Service
class SignatureAttestationService {

	/** The signature repository. */
	@Autowired
	WorksheetSignatureRepository signatureRepository

	/** The worksheet repository. */
	@Autowired
	WorksheetRepository worksheetRepository

	/** The worksheet lookup repository. */
	@Autowired
	WorksheetLookupRepository worksheetLookupRepository

	/** The study repository. */
	@Autowired
	StudyRepository studyRepository

	/** The study status service. */
	@Autowired
	StudyService studyStatusService
	/*
	 * Inserting two records in signature table
	 * if the POC and Attending user are same
	 */

	/**
	 * Save attested sign.
	 *
	 * @param signedData the signed data
	 * 
	 */
	@Transactional
	def saveAttendingSign(signedData){

		//Inserting two records in signature table if the POC and Attending user are same
		def wrkshtStatus = [StudyStatusEnum.SIGNED.value, StudyStatusEnum.ATTESTED.value]
		def role=signedData.type
		def retVal
		String pattern = WorksheetConstants.DATEFORMAT_YEAR
		def pocDateTime = DateTime.parse(signedData.timestamp , DateTimeFormat.forPattern(pattern))

		if(role.equalsIgnoreCase(WorksheetConstants.ROLE_POC)){
			(0..1).each{
				retVal = signatureRepository.save(new WorksheetSignature(
						worksheet:worksheetRepository.findOne(signedData.worksheet.id.asType(Long)),
						signedName:signedData.sign,wrkShtStatus:wrkshtStatus[it], pocDateTime:pocDateTime))
			}
		}

		def worksheet = worksheetRepository.findOne(signedData.worksheet.id.asType(Long))
		if(worksheet) {
			if(role.equalsIgnoreCase(WorksheetConstants.ROLE_POC)){
				worksheet.lookupId = worksheetLookupRepository.findOne(WrkshtLookup.Attested.value)
				worksheetRepository.save(worksheet)
			}
		}
		retVal
	}

	/**
	 * Delete poc attested signature.
	 *
	 * @param id the id
	 * 
	 */
	@Transactional
	def deletePocAttestedSignature(id){
		def retVal = signatureRepository.findOne(id.asType(Long))
		def orgId=SecurityUtil.retreiveOrgId()
		if(retVal){
			def token = SecurityUtil.retrieveAuthToken()
			signatureRepository.deleteAttestedSignature(retVal.worksheet.id.asType(Long))
			def worksheetId=retVal.worksheet.id
			def wrksht = worksheetRepository.findOne(worksheetId.asType(Long))
			if(wrksht) {
				studyStatusService.updateStudyStatus(wrksht.study?.id.asType(Long),[event:StudyWorkFlowEventEnum.POCATTESTATIONSIGNDELETE.value],token,orgId)
				retVal
			}
		}
	}

	/**
	 * Delete qa attested signature.
	 *
	 * @param id the id
	 * @param studyId the study id
	 * 
	 */
	@Transactional
	def deleteQaAttestedSignature(id, studyId){
		def retVal = signatureRepository.findOne(id.asType(Long))
		def orgId=SecurityUtil.retreiveOrgId()
		if(retVal){
			def token = SecurityUtil.retrieveAuthToken()
			signatureRepository.delete(retVal.id.asType(Long))
			def worksheetByStudy = worksheetRepository.findWorksheetByStudyTypeProcedural(studyId.asType(Long))
			signatureRepository.deleteAttestedSign(worksheetByStudy.id.asType(Long))

			def worksheetId=retVal.worksheet.id
			def wrksht = worksheetRepository.findOne(worksheetId.asType(Long))
			if(wrksht) {
				studyStatusService.updateStudyStatus(wrksht.study?.id.asType(Long),[event:StudyWorkFlowEventEnum.QAATTESTATIONSIGNDELETE.value],token,orgId)
				retVal
			}
		}
	}
}

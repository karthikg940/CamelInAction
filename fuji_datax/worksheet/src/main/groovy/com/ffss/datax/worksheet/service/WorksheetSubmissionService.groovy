package com.ffss.datax.worksheet.service

import org.joda.time.DateTime
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

import com.ffss.datax.common.constants.StudyStatusEnum
import com.ffss.datax.common.constants.StudyWorkFlowEventEnum
import com.ffss.datax.common.constants.WrkshtLookup
import com.ffss.datax.security.util.SecurityUtil
import com.ffss.datax.worksheet.constants.WorksheetConstants
import com.ffss.datax.worksheet.repository.StudyRepository
import com.ffss.datax.worksheet.repository.WorksheetLookupRepository
import com.ffss.datax.worksheet.repository.WorksheetRepository
import com.ffss.datax.worksheet.service.feign.StudyService
import com.ffss.datax.worksheet.service.feign.StudyWorkflowService

/**
 * The Class WorksheetSubmissionService.
 */
@Service
class WorksheetSubmissionService {

	/** The study status service. */
	@Autowired
	StudyService studyStatusService

	/** The worksheet repository. */
	@Autowired
	WorksheetRepository worksheetRepository

	/** The study workflow service. */
	@Autowired
	StudyWorkflowService studyWorkflowService

	/** The worksheet lookup repository. */
	@Autowired
	WorksheetLookupRepository worksheetLookupRepository

	/** The study repository. */
	@Autowired
	StudyRepository studyRepository


	/**
	 * Submit worksheet.
	 *
	 * @param qaData the qa data
	 */
	def submitWorksheet(qaData) {
		//submits a qa worksheet
		def studyId = qaData?qaData.studyId:''
		def userId = qaData?qaData.userId:''
		def token = SecurityUtil.retrieveAuthToken()

		def retVal = worksheetRepository.findWorksheetByStudy(studyId)
		if(retVal){
			if(userId){
				retVal.lookupId=worksheetLookupRepository.findOne(WrkshtLookup.QAAssigned.value)
			}
			else{
				retVal.lookupId=worksheetLookupRepository.findOne(WrkshtLookup.QAUnassigned.value)
			}
			def orgId = SecurityUtil.retreiveOrgId()
			studyStatusService.submitStudyToQA(studyId.asType(Long),[userid:userId.asType(Long)],token,orgId)
			worksheetRepository.save(retVal)
		}

		retVal
	}

	/**
	 * Submit toattending.
	 *
	 * @param studyId the study id
	 */
	def submitToattending(studyId){
		//submits a study to attending
		def token = SecurityUtil.retrieveAuthToken()
		def study = studyRepository.findStudyTaskById(studyId.asType(Long))
		def task = study.studyTaskMap.workflowTask.id
		study.attendingAssignedDateTime = DateTime.now()
		study.lastStatusChangedDateTime = DateTime.now()
		study.alerted = 'N'
		studyRepository.save(study)
		def attendingUser = studyWorkflowService.getUser(task, [type:WorksheetConstants.ROLE_ATTENDING], token)
		def attendingUserId = attendingUser[0].id
		def qaUser = studyWorkflowService.getUser(task, [type:WorksheetConstants.ROLE_QA], token)
		def qaUserId = qaUser[0].id

		def event

		if(study.status.name == StudyStatusEnum.QA_INPROGRESS.value){
			if(attendingUserId==qaUserId){
				event = StudyWorkFlowEventEnum.QAATTESTATIONSIGN.value
			}
			else{
				event = StudyWorkFlowEventEnum.QASUBMITFORATTENDING.value
			}
		}else if(study.status.name == StudyStatusEnum.PENDING.value){
			event = StudyWorkFlowEventEnum.POCATTESTATIONSIGN
		}else{
			event = StudyWorkFlowEventEnum.POCSUBMITFORATTENDING.value
		}
		
		def orgId=SecurityUtil.retreiveOrgId()
		studyStatusService.updateStudyStatus(studyId.asType(Long),[event:event],token,orgId)
		study
	}


}

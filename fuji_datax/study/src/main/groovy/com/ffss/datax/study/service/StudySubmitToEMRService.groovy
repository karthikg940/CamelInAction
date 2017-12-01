package com.ffss.datax.study.service

import javax.servlet.http.HttpServletResponse

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.http.MediaType
import org.springframework.http.RequestEntity
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Service
import org.springframework.web.client.RestTemplate

import com.ffss.datax.common.constants.PreferenceEnum
import com.ffss.datax.common.constants.StudyWorkFlowEventEnum
import com.ffss.datax.common.constants.WrkshtLookup
import com.ffss.datax.security.util.SecurityUtil
import com.ffss.datax.study.config.DataSources
import com.ffss.datax.study.constants.StudyConstants
import com.ffss.datax.study.repository.WorksheetLookupRepository
import com.ffss.datax.study.repository.WorksheetRepository
import com.ffss.datax.study.service.feign.StudyReportService
import com.ffss.datax.study.service.feign.StudyWorkflowService
import com.ffss.datax.study.web.transformer.StudySubmitToEmrTransformer

@Service
class StudySubmitToEMRService {
	@Autowired
	StudyWorkflowService studyWorkflowService

	@Autowired
	StudyService studyStatusService

	@Autowired
	WorksheetRepository worksheetRepository

	@Autowired
	WorksheetLookupRepository worksheetLookupRepository

	@Autowired
	StudyInfoService examTypeService

	@Autowired
	RestTemplate restTemplate

	@Autowired
	StudySubmitToEmrTransformer submitToEMRTransformer

	@Autowired
	DataSources dataSources

	@Autowired
	StudyReportService studyReportService

	@Value('${mirthchannel.submitToEmrUrl}')
	String submitToEmrUrl


	HttpServletResponse response


	//172.25.242.135, //localhost:9001
	def submitToEmr(study, order){
		def submitStudyData = submitToEMRTransformer.transform(study,order,getReportData(study))
		RequestEntity request = RequestEntity.post(new URI(submitToEmrUrl)).accept(MediaType.APPLICATION_JSON).body(submitStudyData);
		def resp = restTemplate.exchange(request, Object).statusCode
		if(resp)
			changeStatusToComplete(study.id)
		resp
	}
	def getReportData(study){
		ResponseEntity<byte[]>  entity = studyReportService.getPdfForSubmitToEMR(SecurityUtil.retreiveOrgId(), study.worksheet[0].id,SecurityUtil.retrieveAuthToken())
		byte[] pdfAsBytes = entity.getBody();
		def encodedPdf = Base64.getEncoder().encodeToString(pdfAsBytes)
	}

	def changeStatusToComplete(studyId){
		def loginUserId = SecurityUtil.retrieveUserId()
		def token = SecurityUtil.retrieveAuthToken()

		def wrksheetObj
		def preference = studyWorkflowService.getPreference(token)
		def event
		def type

		switch(preference){

			case {PreferenceEnum.isQaEnable(preference)} :
				event = StudyWorkFlowEventEnum.QASUBMIT.value
				type = StudyConstants.QA
				break

			case {PreferenceEnum.isAttendingEnable(preference)} :
				event = StudyWorkFlowEventEnum.ATTENDINGSUBMITEMR.value
				type = StudyConstants.PROCEDURAL
				break
			case {PreferenceEnum.isQaAttendingEnable(preference)} :
				event = StudyWorkFlowEventEnum.ATTENDINGSUBMITEMR.value
				type = StudyConstants.QA
				break
			default:
				event = StudyWorkFlowEventEnum.POCSUBMITEMR.value
				type = StudyConstants.PROCEDURAL
		}
		wrksheetObj= worksheetRepository.findWorksheetByStudyAndType(studyId.asType(Long),type)
		wrksheetObj.lookupId=worksheetLookupRepository.findOne(WrkshtLookup.Submitted.value)
		examTypeService.updateStudyWorkflowStage(studyId.asType(Long),event,loginUserId,SecurityUtil.retreiveOrgId())

		worksheetRepository.save(wrksheetObj)
		wrksheetObj
	}
}
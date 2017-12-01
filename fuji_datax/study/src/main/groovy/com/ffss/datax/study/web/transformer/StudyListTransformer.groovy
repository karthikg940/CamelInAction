package com.ffss.datax.study.web.transformer

import org.joda.time.format.DateTimeFormat
import org.joda.time.format.DateTimeFormatter
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component

import com.ffss.datax.common.domain.configuration.TagsExamTypeMap
import com.ffss.datax.common.domain.study.Patient
import com.ffss.datax.common.domain.study.PatientIdentifier
import com.ffss.datax.common.domain.study.Series
import com.ffss.datax.common.domain.study.Study
import com.ffss.datax.common.domain.study.StudyExamTypeMap
import com.ffss.datax.common.domain.study.StudyLookup
import com.ffss.datax.common.domain.study.StudyTaskMap
import com.ffss.datax.study.constants.StudyConstants
import com.ffss.datax.study.service.feign.StudyWorkflowService

@Component
class StudyListTransformer {

	@Autowired
	StudyWorkflowService studyWorkflowService

	static DateTimeFormatter formatter = DateTimeFormat.forPattern(StudyConstants.DATEFORMAT_YEAR)
	def defUser =[[id:'',prefix:'',firstName:'',middleName:'',lastName:'']]

	def transform(studies,token) {
		[
			results:transformAll(studies,token)
		]
	}

	def transformAll(List<Study> studies,token) {
		studies.collect {
			[studyId:it.id,studyNo:it.studyId,deleted:it.deleted,studyType:it.studyType?it.studyType:'',date:formatter.print(it.vnaCreatedDateTime),patient:transformPatient(it.patient),modality:transformModality(it.series),
				examType:it.studyExamTypeMap?transformExamType(it.studyExamTypeMap):'Unspecified',tags:transformTags(it.tags),requestingphysician:transformRequestingPhy(it.series[0]),referringphysician:transformReferringPhysician(it.series[0])
				, status:transformstatus(it.status),assignedUser:it.studyTaskMap?transformUsers(it.studyTaskMap,'performing',token):defUser,studyUid:it.studyUid,qaUser:it.studyTaskMap?transformUsers(it.studyTaskMap,'qa',token):defUser,attendingUser:it.studyTaskMap?transformUsers(it.studyTaskMap,'attending',token):defUser]
		}.unique()
	}
	def transformPatient(Patient patient) {
		[id:patient.patientIdentifier?transformPatientIdentifier(patient.patientIdentifier):'',mrnno:patient.patientIdentifier?transformPatientIdentifier(patient.patientIdentifier):'',prefix:patient.prefix?patient.prefix:'',firstName:patient.firstName?patient.firstName:'',middleName:patient.middleName?patient.middleName:'',lastName:patient.lastName?patient.lastName:'']
	}


	def transformPatientIdentifier(PatientIdentifier patientIdentifier){
		patientIdentifier.medicalId
	}

	def transformModality(List<Series> series) {
		series.collect { it.modality }
	}

	def transformExamType(StudyExamTypeMap studyExamTypeMap) {
		studyExamTypeMap.collect{ it.examTypeMap.examTypeDesc }
	}

	def transformTags(List<TagsExamTypeMap> tags) {
		tags.collectMany {
			[it.tagDescription]
		}.unique{a,b->a<=>b}
	}

	def transformRequestingPhy(series){

		series?.operator?[id:series.operator.id?series.operator.id:'',prefix:series.operator.prefix?series.operator.prefix:'',firstName:series.operator.firstName?series.operator.firstName:'',middleName:series.operator.middleName?series.operator.middleName:'',lastName:series.operator.lastName?series.operator.lastName:'']:defUser[0]
	}


	def transformReferringPhysician(series){

		series?.performingPhysician?[id:series.performingPhysician.id?series.performingPhysician.id:'',prefix:series.performingPhysician.prefix?series.performingPhysician.prefix:'',firstName:series.performingPhysician.firstName?series.performingPhysician.firstName:'',middleName:series.performingPhysician.middleName?series.performingPhysician.middleName:'',lastName:series.performingPhysician.lastName?series.performingPhysician.lastName:'']:defUser[0]
	}

	def transformstatus(StudyLookup status){
		def statusList =[]
		status.each{
			statusList.add(it.name)
		}

		statusList?statusList:['New']
	}

	def transformUsers(StudyTaskMap studyTaskMap, String type,token){
		def task = studyTaskMap.workflowTask.id
		def user = studyWorkflowService.getUser(task,[type:type],token)
		user?user:defUser
	}
}

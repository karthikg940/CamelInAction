package com.ffss.datax.study.web.transformer

import java.text.DateFormat
import java.text.SimpleDateFormat

import org.joda.time.format.DateTimeFormat
import org.joda.time.format.DateTimeFormatter
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component

import com.ffss.datax.common.domain.configuration.ExamTypeMap
import com.ffss.datax.common.domain.configuration.TagsExamTypeMap
import com.ffss.datax.common.domain.study.Patient
import com.ffss.datax.common.domain.study.PatientIdentifier
import com.ffss.datax.common.domain.study.Series
import com.ffss.datax.common.domain.study.SopInstance
import com.ffss.datax.common.domain.study.Study
import com.ffss.datax.common.domain.study.StudyExamTypeMap
import com.ffss.datax.common.domain.study.StudyLookup
import com.ffss.datax.common.domain.study.StudyTaskMap
import com.ffss.datax.common.domain.userprofile.UserAccount
import com.ffss.datax.study.constants.StudyConstants
import com.ffss.datax.study.repository.StudyLookupRepository
import com.ffss.datax.study.service.feign.StudyWorkflowService

@Component
class StudyTransformer {

	@Autowired
	StudyWorkflowService studyWorkflowService
	@Autowired
	StudyLookupRepository studyProgressRepository

	static DateTimeFormatter formatter = DateTimeFormat.forPattern(StudyConstants.DATEFORMAT_YEAR)
	DateFormat df = new SimpleDateFormat(StudyConstants.DATEFORMAT)
	def defUser =[
		[id:'',prefix:'',firstName:'',middleName:'',lastName:'']
	]
	def transform(studies,token) {


		transformAll(studies,token)
	}
	def userName(name) {

		transformUserName(name)
	}

	def userAttestedStatus(value) {
		[userAttestedStatus: value]
	}

	def transformAttendingUserPresent(){
		[status:true]
	}
	def transformAttendingUserNotPresent(){
		[status:false]
	}
	def unAssignStudyTrans(statusChange) {
		[status:statusChange]
	}

	def transformUserName(UserAccount userAccount) {
		[id:userAccount.id?userAccount.id:'', prefix:userAccount.prefix?userAccount.prefix:'',firstName:userAccount.firstName?userAccount.firstName:'',middleName:userAccount.middleName?userAccount.middleName:'', lastName:userAccount.lastName?userAccount.lastName:'']
	}

	def transformAll(Study studies,token) {
		studies.collect {
			[studyId:it.id,studyNo:it.studyId,deleted:it.deleted,studyType:it.studyType?it.studyType:'',date:formatter.print(it.vnaCreatedDateTime),age:it.patientAge,height:it.patientHeight,weight:it.patientWeight,patient:transformPatient(it.patient),modality:transformModality(it.series),
				department:transformDepartment(it.series),examType:transformStudyExamType(it.studyExamTypeMap),requestingphysician:transformRequestingPhy(it.series[0]),referringphysician:transformReferringPhysician(it.series[0])
				, dicomProtocol:checkDicomProtocol(it.sopInstance),status:transformstatus(it.status),Images:transformImg(it.sopInstance),tags:transformTags(it.tags),assignedUser:it.studyTaskMap?transformUsers(it.studyTaskMap,'performing',token):defUser,studyUid:it.studyUid,qaUser:it.studyTaskMap?transformUsers(it.studyTaskMap,'qa',token):defUser,attendingUser:it.studyTaskMap?transformUsers(it.studyTaskMap,'attending',token):defUser,objectId:transformSopUid(it.series,it.sopInstance)]
		}
	}

	def transformPatient(Patient patient) {
		[id:patient.patientIdentifier?transformPatientIdentifier(patient.patientIdentifier):'',mrnno:patient.patientIdentifier?transformPatientIdentifier(patient.patientIdentifier):'',prefix:patient.prefix?patient.prefix:'',firstName:patient.firstName?patient.firstName:'',middleName:patient.middleName?patient.middleName:'',lastName:patient.lastName?patient.lastName:'',
			gender:patient.gender?patient.gender:'Unknown',dob:patient.birthDate?df.format(patient.birthDate):'']
	}

	def transformPatientIdentifier(PatientIdentifier patientIdentifier){
		patientIdentifier.medicalId
	}

	def transformModality(List<Series> series) {
		series.collectMany { [it.modality]}.unique{a,b->a<=>b}
	}
	def transformDepartment(List<Series> series) {
		series.collectMany { [it.department]}.unique{a,b->a<=>b}
	}

	def transformStudyExamType(StudyExamTypeMap studyExamTypeMap) {
		def retVal = []
		studyExamTypeMap?.examTypeMap?.each{
			retVal.add([id:it.id,examtype:it.examTypeDesc])
		}

		def unspecified = []
		unspecified.add(['examtype':'Unspecified'])

		retVal?[retVal]:[unspecified]
	}

	def transformTags(List<TagsExamTypeMap> tags) {
		tags.collectMany { [it.tagDescription]}.unique{a,b->a<=>b}
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

	def transformImg (List<SopInstance> sopInstance){
		sopInstance.collect{ it.imageNumber }.size()
	}

	def transformExamAssociation(ExamTypeMap exam,examType){
		[id:exam.id,name:exam.examTypeDesc,status:examType]
	}

	def transformExamTypes(exams){
		[results:transformExam(exams)]
	}
	def transformExam(examtypes){
		examtypes.collect{
			[id:it.id,name:it.examTypeDesc]
		}
	}

	def transformUsers(StudyTaskMap studyTaskMap, String type,token){
		def task = studyTaskMap.workflowTask.id
		def user = studyWorkflowService.getUser(task,[type:type],token)
		user?user:defUser
	}

	def transformStatusList(List<StudyLookup> statusList){
		def attested = studyProgressRepository.findByNameIgnoreCase('Attested')
		def submitted = studyProgressRepository.findByNameIgnoreCase('Submitted')
		statusList.add(attested)
		statusList.add(submitted)
		statusList.collect{
			[id:it.id,name:it.name]
		}
	}

	def transformSopUid(List<Series> series,List<SopInstance> sopInstance){
		def objectUid = []
		series.each {seriesObj->
			sopInstance.each {sop->
				if(seriesObj.seriesUid == sop.series.seriesUid)
					objectUid.add(seriesUid:seriesObj.seriesUid,sopUid:sop.instanceUid,frameCount:sop.frameCount)
			}
		}

		objectUid
	}

	def checkDicomProtocol(List<SopInstance> sopInstance){
		def retVal = true
		def sopClassId = ['a3.1', 'a6', 'a6.1']
		sopInstance.each{
			if(it.cUid in sopClassId)
				retVal = false
		}
		retVal
	}
}

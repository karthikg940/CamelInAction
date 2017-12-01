package com.ffss.datax.study.web.transformer

import java.text.DateFormat
import java.text.SimpleDateFormat

import org.joda.time.DateTime
import org.joda.time.format.DateTimeFormat
import org.joda.time.format.DateTimeFormatter
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component

import com.ffss.datax.common.domain.study.Order
import com.ffss.datax.common.domain.study.Patient
import com.ffss.datax.common.domain.study.PatientIdentifier
import com.ffss.datax.common.domain.study.Person
import com.ffss.datax.common.domain.study.Series
import com.ffss.datax.common.domain.study.Study
import com.ffss.datax.common.domain.study.StudyExamTypeMap
import com.ffss.datax.common.domain.study.StudyTaskMap
import com.ffss.datax.study.constants.StudyConstants
import com.ffss.datax.study.service.feign.StudyWorkflowService

@Component
class OrderCancelTransformer {
	@Autowired
	StudyWorkflowService studyWorkflowService



	def defUser =[[id:'',prefix:'',firstName:'',middleName:'',lastName:'']]
	DateFormat	df= new SimpleDateFormat(StudyConstants.DATEFORMAT)
	static DateTimeFormatter formatter = DateTimeFormat.forPattern("yyyyMMddHHmmss")

	static idInc='1'
	def token
	def orderControlCode
	def placerId

	def transform(Study studies, tkn, controlCode , Order order){
		token=tkn
		placerId=order.orderId
		orderControlCode=controlCode
		[studyId:studies.id,
			studyNo:studies.studyId,
			messageHeader:transformHeader(),
			patientIdentification:transformPatient(studies.patient),
			patientVisit:transformVisit(studies),
			commonOrder:transformOrder(studies),
			observationRequest:transformOBR(studies)
		]
	}

	def transformHeader(){

		[
			sendingApplication:'dataX',
			sendingFacility:'',
			receivingApplication:'openEMR',
			receivingFacility:'',
			dateTimeOfMsg:formatter.print(DateTime.now()),
			messgaeType:transforMsgType(),
			msgControlId:formatter.print(DateTime.now()),
			processingId:'P',
			versionId:'2.6',
			characterSet:''

		]
	}
	def transforMsgType(){
		[
			msgCode:'ORM',
			triggerEvent:'O01'
		]
	}
	def transformPatient(Patient patient) {
		[   id:patient.id,
			mrnno:patient.patientIdentifier?transformPatientIdentifier(patient.patientIdentifier):'',
			prefix:patient.prefix?patient.prefix:'',
			firstName:patient.firstName?patient.firstName:'',
			middleName:patient.middleName?patient.middleName:'',
			lastName:patient.lastName?patient.lastName:'',
			gender:patient.gender?patient.gender:'Unknown',
			ehnicOrigin:patient.ethnicOrigin,
			birthDate:patient.birthDate?df.format(patient.birthDate):''
		]
	}

	def transformPatientIdentifier(PatientIdentifier patientIdentifier){
		[medicalId:patientIdentifier.medicalId,
			idType:patientIdentifier.idType
		]
	}

	def transformVisit(Study studies){
		[   id:idInc,
			patientClass:"E",
			requestingphysician:transformReqPhy(studies.requestingPhysician),
			referringphysician:transformReqPhy(studies.referringPhysician),
			visitNumber:''
		]
	}

	def transformOrder(Study studies){
		[
			orderControl:orderControlCode,
			placerOrderNumber:placerId,
			fillerOrderNumber:'',
			placerGroupNumber:'',
			orderStatus:'',
			responseFlag:'',
			dateTimeOfTransaction:formatter.print(DateTime.now()),
			orderingProvider:studies.studyTaskMap?transformUsers(studies.studyTaskMap,'performing',token):transformOperatingPhy(studies.series),
			advancedBeneficiaryNoticeCode:'2'
		]
	}
	def transformReqPhy(Person requestingPhy){
		requestingPhy?[id:requestingPhy.id?requestingPhy.id:'',firstName:requestingPhy.firstName?requestingPhy.firstName:'',lastName:requestingPhy.lastName?requestingPhy.lastName:'']:defUser[0]
	}
	def transformOperatingPhy(series){
		series?.collect{
			it.operator?[id:it.operator.id?it.operator.id:'',firstName:it.operator.firstName?it.operator.firstName:'',lastName:it.operator.lastName?it.operator.lastName:'']:defUser[0]
		}
	}

	def transformReferringPhysician(series){

		series?.performingPhysician?[id:series.performingPhysician.id?series.performingPhysician.id:'',firstName:series.performingPhysician.firstName?series.performingPhysician.firstName:'',middleName:series.performingPhysician.middleName?series.performingPhysician.middleName:'',lastName:series.performingPhysician.lastName?series.performingPhysician.lastName:'']:defUser[0]
	}

	def transformOBR(Study studies){
		[   id:idInc,
			placerOrderNum:placerId,
			fillerOrderNum:'',
			universalServiceIdentifier:transformStudyExamType(studies.studyExamTypeMap),
			priority:'R',
			requestedDateTime:formatter.print(DateTime.now()),
			observationDateTime:'',
			dangerCode:'',
			orderingProvider:studies.studyTaskMap?transformUsers(studies.studyTaskMap,'performing',token):transformOperatingPhy(studies.series),
			placerField1:'P',
			fillerField1:'',
			resultRptOrStatusChangeDateTime:'',
			diagnosticServSectId:transformModality(studies.series)
		]
	}

	def transformStudyExamType(StudyExamTypeMap studyExamTypeMap) {
		def retVal = []
		studyExamTypeMap?.examTypeMap?.each{
			retVal.add(id:it.id,examtype:it.examTypeDesc)
		}

		def unspecified = []
		unspecified.add('examtype':'Unspecified')

		retVal?retVal:unspecified
	}

	def transformModality(List<Series> series) {
		series.collectMany { [it.modality]}.unique{a,b->a<=>b}
	}

	def transformUsers(StudyTaskMap studyTaskMap, String type,token){
		def task = studyTaskMap.workflowTask.id
		def user = studyWorkflowService.getUser(task,[type:type],token)
	}
}

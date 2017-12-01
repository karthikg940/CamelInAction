package com.ffss.datax.study.web.transformer

import groovy.json.JsonSlurper

import java.text.DateFormat
import java.text.SimpleDateFormat

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component

import com.ffss.datax.common.domain.study.Order
import com.ffss.datax.common.domain.study.Patient
import com.ffss.datax.common.domain.study.PatientIdentifier
import com.ffss.datax.common.domain.study.Series
import com.ffss.datax.common.domain.study.Study
import com.ffss.datax.common.domain.study.StudyExamTypeMap
import com.ffss.datax.common.domain.worksheet.Worksheet
import com.ffss.datax.study.constants.StudyConstants
import com.ffss.datax.study.content.generator.GeneratorFactory
import com.ffss.datax.study.repository.StudyLookupRepository
import com.ffss.datax.study.service.feign.StudyWorkflowService

@Component
class StudySubmitToEmrTransformer {

	@Autowired
	StudyWorkflowService studyWorkflowService
	@Autowired
	StudyLookupRepository studyProgressRepository
	@Autowired
	GeneratorFactory generatorFactory

	DateFormat	df= new SimpleDateFormat(StudyConstants.DATEFORMAT)
	DateFormat hl7 = new SimpleDateFormat(StudyConstants.HL7_DATEFORMAT)

	def defUser =[[id:'',prefix:'',firstName:'',middleName:'',lastName:'']]
	static idInc='1'
	def obxValueType = ['TX', 'TX', 'TX', 'TX', 'ED']

	final String noIndications = 'No Indications of any condition'
	final String noViews  = 'No Views obtained'
	final String noFindings = 'No Findings obtained'
	final String noInterpretations = 'No Interpretations found'
	final String noEmbeddedPdf = 'No embedded pdf'
	final String pdfHeader = 'PDF^TEXT^^Base64^'

	def transform(Study studies , Order order, def encodedPdf) {
		[studyId:studies.id,	studyNo:studies.studyId,
			messageHeader:[
				fieldSeparator : '|',
				encodingCharacters:'^~\\&',
				sendingApplication:'dataXUS',
				sendingFacility:'sendingFacility',
				receivingApplication:'EMR',
				receivingFacility:'receivingFacility',
				DateTimeOfMessage:hl7.format(new Date()),
				messageType:'ORU^R01',
				messageControlId :'',
				processingId : 'P',
				versionId :'2.6'
			],
			patientIdentification:transformPatient(studies.patient),
			patientVisit:transformVisit(studies),
			observationRequest:transformOBR(studies, order),
			observations:transformOBX(studies.worksheet[0],encodedPdf)
		]
	}

	def transformOBX(Worksheet worksheet,encodedPdf){
		// Supports only ACEP for now.
		def obxResultsMap = generatorFactory.getGenerator("ACEP", worksheet.study.studyExamTypeMap.examTypeMap.examTypeDesc).transform(worksheet)
		def list = []
		def id = transformIdentifier(worksheet)
		obxResultsMap.each {key, value ->
			list.add(obxRow(key, "TX", id, value))
		}
		list.add(obxRow(obxResultsMap.size()+1, "ED", id, pdfHeader+encodedPdf))
		list

	}

	def obxRow (sequence, valueType, id, object) {
		[   id:sequence,
			valueType: valueType,
			observationIdentifier:id,
			observationSubId:sequence,
			observationValue:object.toString(),
			interpretationCode:'',
			resultStatus:''
		]
	}

	def transformIdentifier(Worksheet worksheet){
		worksheet.study.studyExamTypeMap.examTypeMap.id+'^'+worksheet.study.studyExamTypeMap.examTypeMap.examTypeDesc
	}

	def transformOBR(Study studies, Order order){
		[   id:order.id,
			controlCode:order.controlCode,
			placerOrderNum:order.orderId,
			fillerOrderNum:(order?.accessionNumber)?order.accessionNumber:'',
			universalServiceIdentifier:(order.examType)?order.examType:studies.description,
			priority:order.reportStatus,
			requestedDateTime:order.createdDateTime,
			observationDateTime:order.observationDateTime,
			orderingProvider:transformReferringPhysician(studies.series),
			diagnosticServSectId:transformModality(studies.series)
		]
	}

	def transformPatient(Patient patient) {
		[id:idInc,
			patientId : patient.id,
			mrnno:patient.patientIdentifier?transformPatientIdentifier(patient.patientIdentifier):'',
			prefix:patient.prefix?patient.prefix:'',
			firstName:patient.firstName?patient.firstName:'',
			middleName:patient.middleName?patient.middleName:'',
			lastName:patient.lastName?patient.lastName:'',
			gender:patient.gender?patient.gender:'Unknown',
			ehnicOrigin:patient.ethnicOrigin,
			birthDate:patient.birthDate?hl7.format(patient.birthDate):''
		]
	}

	def transformPatientIdentifier(PatientIdentifier patientIdentifier){
		[medicalId:patientIdentifier.medicalId,
			idType:patientIdentifier.idType
		]
	}

	def transformVisit(studies){
		[   id:idInc,
			requestingphysician:transformRequestingPhy(studies.series),
			referringphysician:transformReferringPhysician(studies.series),
			visitNumber:''
		]
	}
	def transformModality(List<Series> series) {
		series.collectMany { [it.modality]}.unique{a,b->a<=>b}
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


	def transformRequestingPhy(series){
		series?.operator?[idNumber:series.operator.id?series.operator.id:'',firstName:series.operator.firstName?series.operator.firstName:'',lastName:series.operator.lastName?series.operator.lastName:'']:defUser[0]
	}

	def transformReferringPhysician(series){
		series?.performingPhysician?[idNumber:series.performingPhysician.id?series.performingPhysician.id:'',firstName:series.performingPhysician.firstName?series.performingPhysician.firstName:'',middleName:series.performingPhysician.middleName?series.performingPhysician.middleName:'',lastName:series.performingPhysician.lastName?series.performingPhysician.lastName:'']:defUser[0]
	}
}

package com.ffss.datax.analytics.service

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

import com.ffss.datax.analytics.constants.AnalyticsConstants
import com.ffss.datax.analytics.report.generator.GeneratorFactory
import com.ffss.datax.analytics.repository.AccessionNumberRepository
import com.ffss.datax.analytics.repository.PatientRepository
import com.ffss.datax.analytics.repository.PatientWorkListRepository
import com.ffss.datax.analytics.repository.StudyRepository
import com.ffss.datax.analytics.repository.WorksheetRepository
import com.ffss.datax.analytics.repository.WorksheetTemplateRepository
import com.ffss.datax.analytics.service.feign.StudyWorkflowService
import com.ffss.datax.security.util.SecurityUtil


/**
 * Invokes exporter with worksheet and template 
 * content along with specified output format.
 *
 * @author Virtusa|Polaris
 */
@Service
class ReportGenerationService {

	/** The worksheet template repository. */
	@Autowired
	WorksheetTemplateRepository worksheetTemplateRepository

	/** The worksheet repository. */
	@Autowired
	WorksheetRepository worksheetRepository

	/** The worksheet exporter. */
	@Autowired
	WorksheetExporter worksheetExporter

	/** The study repository. */
	@Autowired
	StudyRepository studyRepository

	/** The patient repository. */
	@Autowired
	PatientRepository patientRepository

	/** The study workflow service. */
	@Autowired
	StudyWorkflowService studyWorkflowService

	/** The accession number repository. */
	@Autowired
	AccessionNumberRepository accessionNumberRepository

	/** The patient worklist repository. */
	@Autowired
	PatientWorkListRepository patientWorklistRepository

	@Autowired
	GeneratorFactory factory

	@Autowired
	StructuredReportExporter srExporter


	/** The patient data. */
	static  patientData, /** The study data. */
	studyData, /** The sign data. */
	signData, /** The accession number. */
	accessionNumber,

	/** The patient work list. */
	patientWorkList,
	/** The prfmng physician. */
	prfmngPhysician,
	/** The referring physician. */
	referringPhysician,
	/** The qa physician. */
	qaPhysician

	def format = 'pdf'

	/**
	 * Find worksheet and export.
	 *
	 * @param id -  The worksheetId
	 * 
	 */
	def findWrkshtAndExport(id){
		def template, templateContent, worksheet, worksheetContent,
		taskId, pocUser, attndngUser, task, qaUser

		def token = SecurityUtil.retrieveAuthToken()

		worksheet = worksheetRepository.findOne(id)
		def type = worksheet.examWorksheetType
		if(worksheet){
			template = worksheetTemplateRepository.findOne(worksheet.template.id.asType(Long))
			worksheetContent = worksheet.content
			templateContent = template.templateContent
			studyData = studyRepository.findOne(worksheet.study.id.asType(Long))
			task = studyRepository.getTask(worksheet.study.id.asType(Long))
			taskId = task.studyTaskMap.workflowTask.id
			pocUser = studyWorkflowService.getUser(taskId, [type:AnalyticsConstants.ROLE_PERFORMING], token)
			prfmngPhysician = pocUser[0]

			attndngUser = studyWorkflowService.getUser(taskId, [type:AnalyticsConstants.ROLE_ATTENDING], token)
			referringPhysician = attndngUser[0]

			qaUser = studyWorkflowService.getUser(taskId, [type:AnalyticsConstants.ROLE_QA], token)
			qaPhysician = qaUser[0]
			patientData = patientRepository.findOne(studyData.patient.id.asType(Long))
			signData = worksheet.worksheetSignature
			patientWorkList = patientWorklistRepository.getPatientWorkList(studyData.patient.id.asType(Long))
			accessionNumber = accessionNumberRepository.getAccessionNumber( worksheet.study.id)
		}
		def format = 'pdf'
		def responseStream
		//Generates two reports - Procedural and QA from saved worksheet content
		if(type.equalsIgnoreCase(AnalyticsConstants.PROCEDURAL))
			responseStream = worksheetExporter.export(templateContent, worksheetContent, format)
		else
			responseStream = worksheetExporter.qaexport(worksheetContent, format)
		responseStream
	}


	/**
	 * Export SR document measurements
	 *
	 * @param studyId -  The StudyId
	 *
	 */
	def exportSrDocument(studyId){
		def measurementsMap = factory.get('',AnalyticsConstants.X_PORTE,'').transform(studyId)
		def token = SecurityUtil.retrieveAuthToken()
		studyData = studyRepository.findOne(studyId.asType(Long))
		patientData = patientRepository.findOne(studyData.patient.id.asType(Long))
		def task = studyRepository.getTask(studyId.asType(Long))
		def taskId  = task.studyTaskMap.workflowTask.id
		def pocUser = studyWorkflowService.getUser(taskId, [type:AnalyticsConstants.ROLE_PERFORMING], token)
		prfmngPhysician = pocUser[0]
		def attndngUser = studyWorkflowService.getUser(taskId, [type:AnalyticsConstants.ROLE_ATTENDING], token)
		referringPhysician = attndngUser[0]
		def qaUser = studyWorkflowService.getUser(taskId, [type:AnalyticsConstants.ROLE_QA], token)
		qaPhysician = qaUser[0]

		def responseStream = srExporter.exportSrDoc(measurementsMap, format)
		responseStream
	}
}

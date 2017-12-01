package com.ffss.datax.analytics.test.web.resource

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*

import javax.ws.rs.core.MediaType

import org.springframework.beans.factory.annotation.Autowired;

import com.ffss.datax.analytics.repository.PatientRepository
import com.ffss.datax.analytics.repository.StudyRepository;
import com.ffss.datax.analytics.test.base.TransactionalWebIntegrationTest
import com.ffss.datax.analytics.test.base.WebAppIntegrationBaseSpecification
import com.ffss.datax.common.domain.study.Patient
import com.ffss.datax.common.domain.study.PatientIdentifier
import com.ffss.datax.common.domain.study.StudyExamTypeMap
import com.ffss.datax.common.domain.study.StudyTaskMap
import com.ffss.datax.common.domain.workflow.TaskAssignedUser
import com.ffss.datax.common.domain.workflow.UserTaskStage
import com.ffss.datax.common.domain.workflow.WorkflowTask

@TransactionalWebIntegrationTest
class ExportSrDocumentSpec extends WebAppIntegrationBaseSpecification{

	@Autowired
	StudyRepository studyRepository
	@Autowired
	StudyLookupRepository studyProgressRepository
	@Autowired
	WorkflowTaskRepository workflowTaskRepository
	@Autowired
	TypeConfigRepository typeConfigRepository
	@Autowired
	WorkflowConfigRepository workflowConfigRepository
	@Autowired
	UserAccountRepository userRepository
	@Autowired
	StudyTaskMapRepository studyTaskMapRepository
	@Autowired
	UserTaskStageRepository userTaskStageRepository
	@Autowired
	TaskAssignedUserRepository taskAssignedUserRepository
	@Autowired
	StudyExamTypeMapRepository studyExamTypeMapRepository
	@Autowired
	TaskRoleConfigRepository taskRoleConfigRepository
	@Autowired
	ExamTypeMapRepository examTypeMapRepository
	@Autowired
	PatientRepository patientRepository
	@Autowired
	PatientIdentifierRepository patientIdentifierRepository


	def 'export sr document with data sets'  (studyId, token, expectedStatus) {

		addStudy(76000000000001)
		addTask(76000000000001,1001L)

		given: 'We have studies available in the database'

		when: 'We fetch the sr document for that study and try to export with data sets'

		def response = this.mockMvc.perform(get("/api/export/structuredreport/study/${studyId}")
				.header("Authorization","Bearer " + token)
				.accept(MediaType.APPLICATION_JSON))

		then: ' A pdf byte array with sr measurements obtained'
		response.andExpect(status().is(expectedStatus))

		where :
		studyId << [76000000000001]
		token << [StatisticsTestData.token]
		expectedStatus << [200]
	}


	def addStudy(studyId){
		def study = studyRepository.findOne(studyId)
		def patientIdentifierList = []
		patientIdentifierList.add(new PatientIdentifier( id:76000000020080, medicalId : '1896239', idType: 'iviz',
		patient: patientRepository.save(new Patient(id:76000000020080))))
		def patient = patientRepository.save(new Patient(id:76000000020080,
		firstName: 'Mark',
		lastName: 'Weber',
		gender: 'M',
		patientIdentifier : patientIdentifierRepository.save(patientIdentifierList)))
		if(study) {
			study.patient = patient
			studyRepository.save(study)
		}
	}

	def workflowTask
	def studyTaskMap
	def userTaskStage
	def studyExamTypeMap
	void addTask(studyId,userId){
		def stat = studyProgressRepository.findOne(4003L)
		workflowTask = workflowTaskRepository.save(new WorkflowTask(
				typeConfig:typeConfigRepository.findOneByTypeName("Study"),
				workflowConfig:workflowConfigRepository.findOne(3L),
				currentStatus:stat.name,
				assignedUser:userRepository.findOne(userId),
				triggeringUser:userRepository.findOne(userId))
				)

		studyTaskMap = studyTaskMapRepository.save(new StudyTaskMap(
				study:studyRepository.findOne(studyId),
				workflowTask:workflowTaskRepository.findOne(workflowTask.id.asType(Long.class)))
				)

		userTaskStage = userTaskStageRepository.save(new UserTaskStage(
				workflowTask:workflowTask,
				user:userRepository.findOne(userId),
				taskRoleConfig:taskRoleConfigRepository.findOne(30L))
				)

		studyExamTypeMap = studyExamTypeMapRepository.save(new StudyExamTypeMap(
				study :  studyRepository.findOne(studyId),
				examTypeMap : examTypeMapRepository.findOne(9001L)
				))

		def study = studyRepository.findOne(studyId)

		if(study) {
			study.studyExamTypeMap = studyExamTypeMap
			study.studyTaskMap = studyTaskMap
			study.status = stat
			studyRepository.save(study)
		}
		def taskAssignedUser = taskAssignedUserRepository.save(new TaskAssignedUser(workflowTask:workflowTask))
	}
}

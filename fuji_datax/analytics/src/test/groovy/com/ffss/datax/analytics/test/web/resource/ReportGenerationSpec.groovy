package com.ffss.datax.analytics.test.web.resource

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*

import org.joda.time.DateTime
import org.springframework.beans.factory.annotation.Autowired

import groovy.json.JsonSlurper
import org.springframework.http.MediaType
import com.ffss.datax.analytics.test.base.TransactionalWebIntegrationTest
import com.ffss.datax.analytics.test.base.WebAppIntegrationBaseSpecification
import com.ffss.datax.common.constants.WrkshtLookup
import com.ffss.datax.common.domain.study.ExamType
import com.ffss.datax.common.domain.study.StudyExamTypeMap
import com.ffss.datax.common.domain.study.StudyTaskMap
import com.ffss.datax.common.domain.workflow.TaskAssignedUser
import com.ffss.datax.common.domain.workflow.UserTaskStage
import com.ffss.datax.common.domain.workflow.WorkflowTask
import com.ffss.datax.common.domain.worksheet.Worksheet
import com.ffss.datax.common.domain.worksheet.WorksheetLookup
import com.ffss.datax.common.domain.worksheet.WorksheetSignature
import com.ffss.datax.common.domain.worksheet.WorksheetTemplate

import com.ffss.datax.analytics.repository.StudyRepository
import com.ffss.datax.analytics.repository.WorksheetRepository
import com.ffss.datax.analytics.test.web.resource.SeriesRepository
import com.ffss.datax.analytics.test.web.resource.ExamTypeRepository
import com.ffss.datax.analytics.test.web.resource.ExamTypeMapRepository
import com.ffss.datax.analytics.test.web.resource.StudyLookupRepository
import com.ffss.datax.analytics.test.web.resource.WorkflowTaskRepository
import com.ffss.datax.analytics.test.web.resource.TypeConfigRepository
import com.ffss.datax.analytics.test.web.resource.WorkflowConfigRepository
import com.ffss.datax.analytics.test.web.resource.UserAccountRepository
import com.ffss.datax.analytics.test.web.resource.StudyTaskMapRepository
import com.ffss.datax.analytics.test.web.resource.UserTaskStageRepository
import com.ffss.datax.analytics.test.web.resource.TaskRoleConfigRepository
import com.ffss.datax.analytics.test.web.resource.TaskAssignedUserRepository

@TransactionalWebIntegrationTest
class ReportGenerationSpec extends WebAppIntegrationBaseSpecification {

	@Autowired
	StudyRepository studyRepository
	@Autowired
	ExamTypeRepository examRepository
	@Autowired
	WorksheetRepository worksheetRepository
	@Autowired
	SeriesRepository seriesRepository
	@Autowired
	ExamTypeMapRepository examTypeMapRepository
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
	TaskRoleConfigRepository taskRoleConfigRepository
	@Autowired
	TaskAssignedUserRepository taskAssignedUserRepository
	@Autowired
	WorksheetSignatureRepository worksheetSignatureRepository
	@Autowired
	StudyExamTypeMapRepository studyExamTypeMapRepository


	def 'export filled worksheet into a pdf'  (token, expectedStatus) {

		Long wrkshtId = addWorksheet(76000000000001,'Procedural')
		addTask(76000000000001,1001L)
		given:'we have a study with filled worksheet'

		when: 'we try to export worksheet into a pdf report'
		def getResponse=this.mockMvc.perform(get("/api/export/worksheet/${wrkshtId}")
				.header("Authorization","Bearer "+token)
				.accept(MediaType.APPLICATION_JSON))

		then: 'we expect the status'
		getResponse.andExpect(status().is(expectedStatus))

		and : "Invoke the alternative API"
		def byteResponseArr=this.mockMvc.perform(get("/api/org/1/study/worksheet/${wrkshtId}/report")
				.header("Authorization","Bearer "+token)
				.accept(MediaType.APPLICATION_JSON))
		byteResponseArr.andExpect(status().isOk())
		where :
		token << [StatisticsTestData.token]

		expectedStatus << [200]
	}

	def worksheet
	def signatures = []

	def addWorksheet(studyId, wrkshtType) {
		def study = studyRepository.findOne(studyId)

		worksheet= worksheetRepository.save(new Worksheet(
				template:new WorksheetTemplate(id:7001L),
				examWorksheetType:wrkshtType,
				study:study,
				examType:examRepository.findOne(7001L),
				content: wrkshtContent,
				lookupId:new WorksheetLookup(id:WrkshtLookup.Pending.value)))

		def signature = worksheetSignatureRepository.save(new WorksheetSignature(
				signedName: 'Dr. John Williams',
				pocDateTime: DateTime.now(),
				worksheet: worksheetRepository.findOne(worksheet.id)))

		signatures.add(signature)

		def wrkshtObj = worksheetRepository.findOne(worksheet.id)

		wrkshtObj.worksheetSignature = signatures
		worksheetRepository.save(wrkshtObj)

		wrkshtObj.id
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
			study.alerted='N'
			studyRepository.save(study)
		}
		def taskAssignedUser = taskAssignedUserRepository.save(new TaskAssignedUser(workflowTask:workflowTask))
	}

	static wrkshtContent = '{"wrk1":{"examoverview":{"type":"Diagnostic","category":"Resuscitative","exam":"Initial exam"},"indications":{"default":{"value":{"cardiac-arrest":true,"chest-wall-injury":true,"hypertension":true,"hypotension":true,"dyspnea":true,"chest-pain":true}}},"views":{"subxiphoid-4-chamber":{"value":{"subxiphoid-4-chamber":"adequate"}},"parasternal-long-axis":{"value":{"parasternal-long-axis":"adequate"}},"parasternal-short-axis":{"value":{"parasternal-short-axis":"limited"}},"subxiphoid-long-axis-ivc-view":{"value":{"subxiphoid-long-axis-ivc-view":"adequate"}}},"findings":{"pericardial-effusion":{"value":{"pericardial-effusion":"present"},"if-present":{"value":{"if-present":"small"}},"evidence-of-tamponade":{"value":{"evidence-of-tamponade":"ivc-plethoric"}}},"global-ventricular-function":{"value":{"global-ventricular-function":"hyperdynamic"}}},"interpretations":{"standard":{"value":{"cardiac-dysfunction":true,"pericardial-effusion":true,"pericardialeffusion":true,"pericardialeffusion-size":{"value":{"pericardialeffusion-size":"small"}}}}}}}'
}
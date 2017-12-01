package com.ffss.datax.study.test.web.resource

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*

import org.joda.time.DateTime
import org.joda.time.DateTimeUtils
import org.springframework.beans.factory.annotation.Autowired

import com.ffss.datax.common.domain.study.StudyTaskMap
import com.ffss.datax.common.domain.workflow.TaskAssignedUser
import com.ffss.datax.common.domain.workflow.UserTaskStage
import com.ffss.datax.common.domain.workflow.WorkflowTask
import com.ffss.datax.study.repository.ExamTypeMapRepository
import com.ffss.datax.study.repository.StudyExamTypeMapRepository
import com.ffss.datax.study.repository.StudyLookupRepository
import com.ffss.datax.study.repository.StudyRepository
import com.ffss.datax.study.repository.StudyTaskMapRepository
import com.ffss.datax.study.repository.UserAccountRepository
import com.ffss.datax.study.repository.UserTaskStageRepository
import com.ffss.datax.study.repository.WorkflowTaskRepository
import com.ffss.datax.study.test.base.CustomMillisProvider
import com.ffss.datax.study.test.base.TransactionalWebIntegrationTest
import com.ffss.datax.study.test.base.WebAppIntegrationBaseSpecification
import com.ffss.datax.study.web.resource.StudyScheduler

@TransactionalWebIntegrationTest
class StudySchedulerSpec extends WebAppIntegrationBaseSpecification {

	@Autowired
	StudyScheduler studyScheduler

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
	StudyRepository studyRepository

	@Autowired
	UserTaskStageRepository userTaskStageRepository
	@Autowired
	TaskRoleConfigRepository taskRoleConfigRepository
	@Autowired
	StudyExamTypeMapRepository studyExamTypeMapRepository

	@Autowired
	ExamTypeMapRepository examTypeMapRepository
	@Autowired
	StudyLookupRepository studyProgressRepository

	@Autowired
	TaskAssignedUserRepository taskAssignedUserRepository


	def 'alert users when study is Idle for more than threshold time '(){

		given:'There are 2 studies already available in the DB and one of them was not worked on'
		when:'the time crosses the threshold for idle time'
		
		studyRepository.findAll().each {
			it.lastStatusChangedDateTime = DateTime.now()
			studyRepository.save(it)
		}
		DateTimeUtils.setCurrentMillisProvider(new CustomMillisProvider(date:DateTime.now().plusHours(48)))
		studyScheduler.perform()
		then:'only one alert gets generated'
		resetCounter()
		assert counter == 0

		and:' The study is assigned to The performing physician'
		addTask(76000000000001,1004L,4003L,30L,3L)
		then:'Trigger an alert to assigned user when the assigned study is idle for more than threshold time'
		studyScheduler.perform()
		resetCounter()
		assert counter == 0

		and:'The study is submitted for QAReviewers pool'
		updateStudy(76000000000001)
		then:'Trigger an alert  when Study is pending for QAReviewers assignment for more than threshold time'
		studyScheduler.perform()
		resetCounter()
		assert counter == 0

		and:'The study is assigned to QA Reviewer'
		updateTask(76000000000001,1004L,4006L,31L,23L)
		then:'Trigger an alert to QAReviewer when the assigned study is idle for more than threshold time'
		studyScheduler.perform()
		resetCounter()
		assert counter == 0

		and:'The study is submitted for attestation '
		updateTask(76000000000001,1004L,4010L,31L,23L)
		then:'Trigger an alert to Attending physician when the study is pending for attestaion '
		studyScheduler.perform()
		resetCounter()
		assert counter == 0

		and:'There are no Idle studies in configured threshold time'
		DateTimeUtils.setCurrentMillisSystem()
		then:'No alert has to trigger'
		studyScheduler.perform()
		assert counter == 0
	}


	def workflowTask
	def studyTaskMap
	def userTaskStage
	void addTask(studyId,userId,status,taskroleConf,wfcId){
		def stat = studyProgressRepository.findOne(status)
		workflowTask = workflowTaskRepository.save(new WorkflowTask(
				typeConfig:typeConfigRepository.findOneByTypeName("Study"),
				workflowConfig:workflowConfigRepository.findOne(wfcId),
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
				taskRoleConfig:taskRoleConfigRepository.findOne(taskroleConf))
				)
		def study = studyRepository.findOne(studyId)
		if(study) {
			study.studyTaskMap = studyTaskMap
			study.status =stat
			study.alerted='N'
			//study.lastStatusChangedDateTime = DateTime.now()
			studyRepository.save(study)
		}
		def taskAssignedUser = taskAssignedUserRepository.save(new TaskAssignedUser(workflowTask:workflowTask))
	}
	void resetCounter(){
		counter = 0
	}

	void updateStudy(studyId){
		def study = studyRepository.findOne(studyId)
		if(study) {
			study.status =studyProgressRepository.findOne(4005L)
			study.alerted='N'
			//study.lastStatusChangedDateTime = DateTime.now()
			studyRepository.save(study)
		}
	}

	void updateTask(studyId,userId,status,taskroleConf,wfcId){
		def stat = studyProgressRepository.findOne(status)

		def workflowTaskObj = workflowTaskRepository.findOne(workflowTask.id)
		workflowTaskObj.typeConfig=typeConfigRepository.findOneByTypeName("Study")
		workflowTaskObj.workflowConfig=workflowConfigRepository.findOne(wfcId)
		workflowTaskObj.currentStatus=stat.name
		workflowTaskObj.assignedUser=userRepository.findOne(userId)
		workflowTaskObj.triggeringUser=userRepository.findOne(userId)

		def studyMap = studyTaskMapRepository.findOne(studyTaskMap.id)
		studyMap.study=studyRepository.findOne(studyId)
		studyMap.workflowTask=workflowTaskRepository.findOne(workflowTaskObj.id.asType(Long.class))

		def userStage = userTaskStageRepository.findOne(userTaskStage.id)
		userStage.workflowTask=workflowTask
		userStage.user=userRepository.findOne(userId)
		userStage.taskRoleConfig=taskRoleConfigRepository.findOne(taskroleConf)
		def study = studyRepository.findOne(studyId)
		if(study) {
			study.studyTaskMap = studyMap
			study.status =stat
			study.alerted='N'
		//	study.lastStatusChangedDateTime = DateTime.now()
			studyRepository.save(study)
		}
	}
}

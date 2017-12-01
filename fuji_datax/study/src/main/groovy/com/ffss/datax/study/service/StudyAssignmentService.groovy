package com.ffss.datax.study.service

import org.joda.time.DateTime
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

import com.ffss.datax.common.constants.StudyLookup
import com.ffss.datax.common.constants.StudyStatusEnum
import com.ffss.datax.common.constants.StudyWorkFlowEventEnum
import com.ffss.datax.security.util.SecurityUtil
import com.ffss.datax.study.constants.StudyConstants
import com.ffss.datax.study.repository.StudyExamTypeMapRepository
import com.ffss.datax.study.repository.StudyLookupRepository
import com.ffss.datax.study.repository.StudyRepository
import com.ffss.datax.study.repository.StudyTaskMapRepository
import com.ffss.datax.study.repository.UserAccountRepository
import com.ffss.datax.study.service.feign.StudyWorkflowService

/**
 * The Class StudyAssignmentService.
 */
@Service
class StudyAssignmentService {

	/** The study repository. */
	@Autowired
	StudyRepository studyRepository

	/** The study task map repository. */
	@Autowired
	StudyTaskMapRepository studyTaskMapRepository

	/** The study lookup repository. */
	@Autowired
	StudyLookupRepository studyLookupRepository

	/** The study exam type map repository. */
	@Autowired
	StudyExamTypeMapRepository studyExamTypeMapRepository

	/** The user repository. */
	@Autowired
	UserAccountRepository userRepository

	/** The study info service. */
	@Autowired
	StudyInfoService studyInfoService

	/** The study workflow service. */
	@Autowired
	StudyWorkflowService studyWorkflowService

	/**
	 * Assign Poc User
	 *
	 * @param id the id
	 * @param userId the user id
	 * @return user
	 */
	@Transactional
	def assignPocUser(id,userId){
		def study=studyRepository.findOne(id)
		def orgId = SecurityUtil.retreiveOrgId()
		study.status?study.status.name:StudyStatusEnum.NEW.value
		def retVal = studyInfoService.updateStudyWorkflowStage(id,StudyWorkFlowEventEnum.USERASSIGN.value,userId,orgId)
		if(retVal){
			study.lastStatusChangedDateTime = DateTime.now()
			study.alerted = StudyConstants.FLAG_NO
			studyRepository.save(study)
		}
	}

	/**
	 * Assign qa user.
	 *
	 * @param id the id
	 * @param userId the user id
	 * @param token the token
	 * @return user
	 */
	@Transactional
	def assignQaUser(id,userId,token){
		def study=studyRepository.findOne(id)
		def orgId = SecurityUtil.retreiveOrgId()
		def userStudy = studyTaskMapRepository.findOneByStudyId(id.asType(Long))
		studyWorkflowService.createUserTask([workflowTask:userStudy.workflowTask.id.asType(Long), loginUserId : userId, taskRoleName:StudyConstants.ROLE_QA],token)
		def retVal = studyInfoService.updateStudyWorkflowStage(id,StudyWorkFlowEventEnum.QAASSIGN.value,userId,orgId)
		if(retVal){
			study.lastStatusChangedDateTime = DateTime.now()
			study.alerted = StudyConstants.FLAG_NO
			studyRepository.save(study)
		}
	}

	/**
	 * Assign poc user by others.
	 *
	 * @param id the id
	 * @param userId the user id
	 * @return user
	 */
	@Transactional
	def assignPocUserByOthers(id,userId){
		def study=studyRepository.findOne(id)
		def orgId = SecurityUtil.retreiveOrgId()
		def currentStatus=study.status?study.status.name:StudyStatusEnum.NEW.value
		def retVal
		if(study){
			if(currentStatus==StudyStatusEnum.NEW.value){
				retVal=studyInfoService.updateStudyWorkflowStage(id,StudyWorkFlowEventEnum.USERASSIGN.value,userId,orgId)
			}
		}
		if(retVal){
			study.lastStatusChangedDateTime = DateTime.now()
			study.alerted = StudyConstants.FLAG_NO
			studyRepository.save(study)
		}
	}

	/**
	 * Unassign study in pending status.
	 *
	 * @param id the id
	 * @return user
	 */
	@Transactional
	def unassignStudyInPendingState(id){
		def study = studyRepository.findStudyDetails(id.asType(Long))
		def task = studyRepository.findTaskByStudyId(id.asType(Long))
		def taskId = task.studyTaskMap.workflowTask.id
		def lookupOld = studyLookupRepository.findOne(StudyLookup.New.value)
		if(study)
			if(study.status.id == StudyLookup.Pending.value || study.status.name == StudyStatusEnum.PENDING.value) {
				study.status = lookupOld
				def exam = studyExamTypeMapRepository.findStudyExamTypeByStudyId(id)
				studyExamTypeMapRepository.deleteStudyExamType(exam.id)
				study.studyType=''
				study.tags=[]
				study.alerted = StudyConstants.FLAG_NO
				study.lastStatusChangedDateTime = study.createdDateTime
				def status = studyTaskMapRepository.deleteStudyTask(taskId)
				studyRepository.save(study)
				if(status==1)
					status=true
				status
			}
	}

	/**
	 * Unassign study in assigned status
	 *
	 * @param id the id
	 * @param userId the user id
	 * @param token the token
	 * @return user
	 */
	@Transactional
	def unassignStudyInAssignedState(id,userId,token){
		def study = studyRepository.findStudyDetails(id.asType(Long))
		def task = studyRepository.findTaskByStudyId(id.asType(Long))
		def taskId = task.studyTaskMap.workflowTask.id
		def user = studyWorkflowService.getUser(taskId, [type:StudyConstants.ROLE_PERFORMING], token)
		def assignedUserId = user[0].id
		if(user){
			def assigneduserId = assignedUserId
			if(assigneduserId == userId){
				if(study.status.id == StudyLookup.Assigned.value || study.status.name == StudyStatusEnum.ASSIGNED.value) {
					studyTaskMapRepository.deleteStudyTask(taskId)
					def lookupOld = studyLookupRepository.findOne(StudyLookup.New.value)
					study.status = lookupOld
					study.lastStatusChangedDateTime = study.createdDateTime
					study.alerted = StudyConstants.FLAG_NO
					studyRepository.save(study)
				}
			}
		}
		user
	}

	/**
	 * Reassign study user.
	 *
	 * @param id the id
	 * @param userId the user id
	 * @param loginUserId the login user id
	 * @return user
	 */
	@Transactional
	def reassignPocUser(id,userId,loginUserId){
		def token = SecurityUtil.retrieveAuthToken()
		def task = studyRepository.findTaskByStudyId(id.asType(Long))
		def taskId = task.studyTaskMap.workflowTask.id
		def user = studyWorkflowService.getUser(taskId, [type:StudyConstants.ROLE_PERFORMING], token)
		def assignedUserId = user[0].id
		def retVal
		def study
		if(user){
			if(assignedUserId == loginUserId){
				retVal=studyWorkflowService.updateUserTask([workflowTask:taskId.asType(Long), loginUserId : userId, taskRoleName:StudyConstants.ROLE_PERFORMING],token)
				if(retVal){
					study=studyRepository.findOne(id)
					study.lastStatusChangedDateTime = DateTime.now()
					study.alerted = StudyConstants.FLAG_NO
					studyRepository.save(study)
				}
			}
		}
		task
	}

	/**
	 * Assign attending user.
	 *
	 * @param id the id
	 * @param userid the userid
	 * @return user
	 */
	def assignAttendinguser(id,userid){
		Object retVal = null
		def token = SecurityUtil.retrieveAuthToken()
		def userStudy = studyTaskMapRepository.findOneByStudyId(id.asType(Long))
		def study = studyRepository.findAttendingUserbyStudyId(id.asType(Long))
		def newUser = userRepository.findOne(userid.asType(Long))
		def assignedUser = study?.collect{
			it.studyTaskMap?.collect{
				it.workflowTask?.collect{
					it.userTaskStage?.collect{ it?.user}
				}
			}
		}
		if(!assignedUser){

			retVal = studyWorkflowService.createUserTask([workflowTask:userStudy.workflowTask.id.asType(Long), loginUserId : userid, taskRoleName:StudyConstants.ROLE_ATTENDING],token)
		}else{
			study?.collect{
				it.studyTaskMap?.collect{
					it.workflowTask?.collect{
						it.userTaskStage?.collect{ it?.user = newUser}
					}
				}
			}
			retVal = studyRepository.save(study)
		}
		retVal
	}
	/**
	 * Check attending user.
	 *
	 * @param id the id
	 * @return true/false
	 */
	def checkAttendingUserPresent(id){
		def study = studyRepository.findAttendingUserbyStudyId(id.asType(Long))
		def assignedUser = study?.collect{
			it.studyTaskMap.collect{
				it.workflowTask?.collect{
					it.userTaskStage?.collect{ it.id	 }
				}
			}
		}

		if(assignedUser == null){
			assignedUser=null
		}
		assignedUser
	}

	/**
	 * User attesated validate.
	 *
	 * @param studyId the study id
	 * @return true/false
	 */
	def autoAttestValidateUsers(studyId){
		def retVal = false
		def token = SecurityUtil.retrieveAuthToken()
		def preferences = studyWorkflowService.getPreference(token)
		def study = studyRepository.findTaskByStudyId(studyId.asType(Long))
		def task = study.studyTaskMap.workflowTask.id
		def attendingUser = studyWorkflowService.getUser(task, [type:StudyConstants.ROLE_ATTENDING], token)
		def attendingUserId = attendingUser[0].id
		def pocUser = studyWorkflowService.getUser(task, [type:StudyConstants.ROLE_PERFORMING], token)
		def pocUserId = pocUser[0].id
		def qaUser = studyWorkflowService.getUser(task, [type:StudyConstants.ROLE_QA], token)
		def qaUserId = qaUser[0].id

		if(study && preferences.attestationEnabled==true && preferences.qaEnabled==false){
			if(attendingUserId == pocUserId){
				retVal = true
			}
		} else if(study && preferences.attestationEnabled==true && preferences.qaEnabled==true){
			if(attendingUserId == qaUserId){
				retVal = true
			}
		}
		retVal
	}
}

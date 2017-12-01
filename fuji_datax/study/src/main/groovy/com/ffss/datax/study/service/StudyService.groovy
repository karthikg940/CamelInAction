package com.ffss.datax.study.service

import groovy.json.JsonSlurper
import groovy.util.logging.Log4j

import org.joda.time.DateTime
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

import com.ffss.datax.common.constants.ChannelEnum
import com.ffss.datax.common.constants.StudyStatusEnum
import com.ffss.datax.security.util.SecurityUtil
import com.ffss.datax.study.constants.StudyConstants
import com.ffss.datax.study.repository.ConfigurationRepository
import com.ffss.datax.study.repository.NotificationEventInfoRepository
import com.ffss.datax.study.repository.StudyExamTypeMapRepository
import com.ffss.datax.study.repository.StudyLookupRepository
import com.ffss.datax.study.repository.StudyRepository
import com.ffss.datax.study.repository.StudyTaskMapRepository
import com.ffss.datax.study.service.feign.StudyNotificationService
import com.ffss.datax.study.service.feign.StudyWorkflowService

/**
 *
 *The Class StudyService.
 * 1. To list all the studies in the database
 * 2. To list all the studies for a particular user
 *
 * @author Virtusa|Polaris
 *
 */
@Log4j
@Service
class StudyService {

	/** The study repository. */
	@Autowired
	StudyRepository studyRepository

	/** The study exam type map repository. */
	@Autowired
	StudyExamTypeMapRepository studyExamTypeMapRepository

	/** The study progress repository. */
	@Autowired
	StudyLookupRepository studyLookupRepository

	/** The exam type service. */
	@Autowired
	StudyInfoService studyInfoService

	/** The study task map repository. */
	@Autowired
	StudyTaskMapRepository studyTaskMapRepository

	/** The study notification service. */
	@Autowired
	StudyNotificationService studyNotificationService

	/** The event info repository. */
	@Autowired
	NotificationEventInfoRepository eventInfoRepository

	/** The user service. */
	@Autowired
	UserService userService

	/** The study search service. */
	@Autowired
	StudySearchService studySearchService

	@Autowired
	StudyWorkflowService studyWorkflowService

	@Autowired
	ConfigurationRepository configurationRepository

	/**
	 * Find one with children.
	 *
	 * @param id the id
	 * @return studies
	 */
	@Transactional(readOnly=true)
	def findOneWithChildren(id) {
		studyRepository.findStudyDetails(id)
	}

	/**
	 * Find all recent study.
	 *
	 * @param fromDate
	 * @param toDate
	 * @param user id
	 * @return studies
	 */
	//TODO: to be revisited later when requirement comes

	/*def findAllRecentStudy(from,to, userId,request) {
	 //get the recent studies for a particular user(with filter parametrs - patientName, pocName, examtype, status)
	 studySearchService.getSearchResult([fromDate:from, toDate:to, userId:userId,createdDate:StudyConstants.VNA_CREATED_DATE, status:[StudyConstants.NEW,StudyConstants.ASSIGNED,StudyConstants.PENDING,
	 StudyConstants.SIGNED,StudyConstants.QA_ASSIGNED,StudyConstants.QA_INPROGRESS,StudyConstants.SUBMITTED,StudyConstants.SUBMITTED_FOR_ATTESTATION,StudyConstants.ATTESTED],role:[StudyConstants.ROLE_PERFORMING, StudyConstants.ROLE_QA, StudyConstants.ROLE_ATTENDING],
	 patientName:request.patientName,filterStatus:request.searchStatus,examType:request.searchExamType,pocName:request.pocName])
	 }*/

	/**
	 * Find all studies.
	 *
	 * @param from the from
	 * @param to the to
	 * @param request the request
	 * @return studies
	 */
	def findStudies(from, to,request, orgId) {
		//Get all the studies between dates from and to (with filter parametrs - patientName, pocName, examtype, status)
		studySearchService.getSearchResult([fromDate:from, toDate:to,userId:null, orgId:orgId, createdDate:StudyConstants.VNA_CREATED_DATE,
			patientName:request.patientName,filterStatus:request.searchStatus,examType:request.searchExamType,pocName:request.pocName])
	}

	/**
	 * Find all my studies.
	 *
	 * @param from the from
	 * @param to the to
	 * @param userId the user id
	 * @param request the request
	 * @return studies
	 */
	def findMyStudies(from,to,userId,request, orgId) {
		//Get all studies for user in performing role (with filter parametrs - patientName, pocName, examtype, status and organization)
		studySearchService.getSearchResult([fromDate:from, toDate:to, userId:userId, orgId:orgId, createdDate:StudyConstants.VNA_CREATED_DATE, role:[StudyConstants.ROLE_PERFORMING],
			status:[StudyStatusEnum.ASSIGNED.value, StudyStatusEnum.PENDING.value, StudyStatusEnum.SIGNED.value],
			patientName:request.patientName,filterStatus:request.searchStatus,examType:request.searchExamType,pocName:request.pocName])
	}

	/**
	 * Find qa studies.
	 *
	 * @param from the from
	 * @param to the to
	 * @param userId the user id
	 * @param request the request
	 * @return studies
	 */
	def findQaStudies(from, to,userId,request,orgId) {
		//Get all studies for user in qa role (with filter parametrs - patientName, pocName, examtype, status)
		studySearchService.getSearchResult([fromDate:from, toDate:to, userId:userId,orgId:orgId, createdDate:StudyConstants.QA_ASSIGNED_DATE, role:[StudyConstants.ROLE_QA],
			status:[StudyStatusEnum.QA_ASSIGNED.value, StudyStatusEnum.QA_INPROGRESS.value, StudyStatusEnum.SUBMITTED.value],
			patientName:request.patientName,filterStatus:request.searchStatus,examType:request.searchExamType,pocName:request.pocName])
	}

	/**
	 * find the all studies for attestation.
	 *
	 * @param from the from
	 * @param to the to
	 * @param userId the user id
	 * @param request the request
	 * @return the all studies for attestation
	 */
	def findStudiesForAttestation(from, to,userId,request,orgId) {
		//Get all studies for user in attending role (with filter parametrs - patientName, pocName, examtype, status)
		studySearchService.getSearchResult([fromDate:from, toDate:to, userId:userId, orgId:orgId, createdDate:StudyConstants.ATTENDING_ASSIGNED_DATE, role:[StudyConstants.ROLE_ATTENDING],
			status:[StudyStatusEnum.SUBMITTED_FOR_ATTESTATION.value, StudyStatusEnum.ATTESTED.value, StudyStatusEnum.SUBMITTED.value],
			patientName:request.patientName,filterStatus:request.searchStatus,examType:request.searchExamType,pocName:request.pocName])
	}

	/**
	 * Delete.
	 *
	 * @param studyId the study id
	 * 
	 */
	@Transactional
	def deleteStudy(studyId){
		def study = studyRepository.findOne(studyId)
		if(study){
			study.deleted=StudyConstants.FLAG_YES
			studyRepository.save(study)
		}
		study
	}

	/**
	 * Update study reviewer.
	 *
	 * @param id the id
	 * @param userId the user id
	 * @return study
	 */
	@Transactional
	def updateStudyWorkflowToQAPool(id,userId,orgId){
		def study = studyRepository.findOne(id)
		def token = SecurityUtil.retrieveAuthToken()
		//def orgId = SecurityUtil.retreiveOrgId()
		def userStudy = studyTaskMapRepository.findOneByStudyId(id.asType(Long))
		//get login user id
		def dataxUserId=SecurityUtil.retrieveUserId()

		//get alert type
		def eventInfo=eventInfoRepository.findEventByCode(StudyConstants.QA_ALERT)
		def users = []
		if(userStudy){
			studyInfoService.updateStudyWorkflowStage(id,StudyStatusEnum.QA_UNASSIGNED.value,userId,orgId)
			if(userId){
				users.add(userId)
			}else{
				def allUsers=userService.findAdminUsersByOrgId(orgId)

				allUsers.each{
					users.add(it.id)
				}
			}
			//send Alerts to all users assigned
			sendAlertforUser(id,users,dataxUserId,eventInfo,token,orgId)
			//TODO: This should be called from workflow microservice
		}
		study.qaAssignedDateTime = DateTime.now()
		study.lastStatusChangedDateTime = DateTime.now()
		study.alerted = StudyConstants.FLAG_NO
		studyRepository.save(study)
	}


	/**
	 * Send alertfor user.
	 *
	 * @param id the id
	 * @param users the users
	 * @param dataxUserId the datax user id
	 * @param eventInfo the event info
	 * @param token the token
	 * @return alert
	 */
	def sendAlertforUser(id,users,dataxUserId,eventInfo,token,orgId){

		//get user info
		def dataxUser = userService.findOne(dataxUserId.asType(Long))

		def firstName=dataxUser.firstName
		def lastName=dataxUser.lastName
		def fullNameWithPrefix=(dataxUser.prefix?dataxUser.prefix+'. ':'')+firstName+' '+lastName

		//Retrieve Study from StudyId
		def study = studyRepository.findOne(id)

		//get message format from notification_event_info table
		def jsonSlurper = new JsonSlurper()
		def notificationJsonObject = jsonSlurper.parseText(eventInfo.eventDetails)
		def messageFormat=notificationJsonObject[StudyConstants.MESSAGE]
		//modify the message according to format
		def message=messageFormat.replaceAll('<FullName>',fullNameWithPrefix).replaceAll('<StudyUUID>',study.studyUid)

		//make the json call
		//TODO: This should be changed when ORGID is fixed
		studyNotificationService.notificationSave(ChannelEnum.INAPP.value,
				[notification:[from:dataxUserId,
						to:users,message:message],orgId:orgId],token)
	}

	/**
	 * Gets the status list.
	 *
	 * @return the status list
	 */
	def findStatusList(){
		//Filter status drop down for each studylist page
		def statuslist  = studyLookupRepository.findStatusByName()
		statuslist
	}

	/**
	 * Gets the data for studies.
	 *
	 * @param from the from
	 * @param to the to
	 * @param type the type
	 * @param userId the user id
	 * @param request the request
	 * @return the data for studies
	 */
	def getDataForStudies(from,to,type,userId,request, orgId){
		def study
		if(type==(StudyConstants.MYSTUDIES))
			study=findMyStudies(from,to, userId,request, orgId)
		else if(type==(StudyConstants.ALLSTUDIES))
			study = findStudies(from, to,request, orgId)
		else if(type==(StudyConstants.MYATTESTATION))
			study = findStudiesForAttestation(from,to,userId,request, orgId)
		else
			study = findQaStudies(from, to,userId,request, orgId)
		

		study
	}

	/**
	 * Method to get Idle studies
	 * @return
	 */
	def configuredTimeLimit
	def findIdleStudiesAndAlert(token,  thresholdtime , configuredTime){
		configuredTimeLimit =configuredTime
		def studies = studyRepository.findIdleStudies(thresholdtime)
		String status
		studies.each{
			if(it.alerted.equalsIgnoreCase(StudyConstants.FLAG_NO)){
				(!it.status || it.status == 'null')?(status = StudyConstants.NEW):(status = it.status.name)
								 
				def orgId = it.orgFk				 
               
				switch(status){

					case {status.equalsIgnoreCase(StudyConstants.NEW)} :
						sendAlertToAdmin(it,StudyConstants.ALERT_ADMIN_POC,token, orgId)
																			
						break

					case {status.equalsIgnoreCase('qaunassigned')} :
						sendAlertToAdmin(it,StudyConstants.ALERT_ADMIN_QA,token, orgId)
						break

					case {StudyStatusEnum.isPocIdle(status)} :
						sendAlertToUser(it,StudyConstants.ALERT_POC_IDLE, StudyConstants.ROLE_PERFORMING, token,orgId)
						break

					case { StudyStatusEnum.isQAIdle(status)} :
						sendAlertToUser(it,StudyConstants.ALERT_QA_IDLE,StudyConstants.ROLE_QA,token,orgId)
						break

					case {StudyStatusEnum.isAttendingIdle(status)} :
						sendAlertToUser(it,StudyConstants.ALERT_ATTENDING_IDLE,StudyConstants.ROLE_ATTENDING, token,orgId)
						break

					default : log.info 'Submitted Status'
				}}}
		 
			
	}

	/**
	 * Method to send Alert to Admin users when study is Idle more than threshold time
	 * @param study
	 * @param eventcode
	 * @param token
	 * @return
	 */
	def sendAlertToAdmin(study,eventcode, token, orgId){
				   
		def users=[]
			
		def adminUsers=userService.findAdminUsersByOrgId(orgId)
		adminUsers.each{
			users.add(it.id)
	
												  
		}
		sendAlert(study,eventcode, users, token, orgId)
	}

	/**
	 * Method to send Alert to assigned user when study is Idle more than threshold time
	 * @param study
	 * @param eventcode
	 * @param role
	 * @param token
	 * @return
	 */
	def sendAlertToUser(study, eventcode, role, token,orgId){
		def assignedUser = studyWorkflowService.getUser(study.studyTaskMap.workflowTask.id, [type:role], token)
		sendAlert(study,eventcode, assignedUser.id, token,orgId)
	}

	/**
	 *  Method to send Alerts
	 * @param study
	 * @param eventCode
	 * @param users
	 * @param token
	 * @return
	 */
	def sendAlert(study, eventCode, users, token, orgId){
		def eventInfo=eventInfoRepository.findEventByCode(eventCode)
											   
		def notificationJsonObject = new JsonSlurper().parseText(eventInfo.eventDetails)
		def messageFormat=notificationJsonObject[StudyConstants.MESSAGE]
		def message=messageFormat.replaceAll('<StudyUID>',study.studyUid).replaceAll('<time>',"${configuredTimeLimit}")

		String retVal = studyNotificationService.notificationSave(ChannelEnum.INAPP.value,
				[notification:[from:'',
						to:users,message:message],orgId:orgId],token)

		if(retVal.equalsIgnoreCase('SUCCESS')){
			study.alerted = 'Y'
			studyRepository.save(study)
		}
	}

	def findByOrgId(){
		Long id=1
		configurationRepository.findByOrganizationId(id)

	}

	def findPatientDetailsByStudyId(Long id){
		studyRepository.findPatientDetailsByStudyId(id)
	}

}

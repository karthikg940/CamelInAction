package com.ffss.datax.study.web.resource

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.RestController

import com.ffss.datax.common.constants.CustomErrorCode
import com.ffss.datax.common.log.Auditable
import com.ffss.datax.security.util.SecurityUtil
import com.ffss.datax.study.service.StudyAssignmentService
import com.ffss.datax.study.service.UserService
import com.ffss.datax.study.web.transformer.StudyListTransformer
import com.ffss.datax.study.web.transformer.StudyTransformer

/**
 * The Class StudyAssignmentResource.
 */
@RestController
@RequestMapping('/api/study')
class StudyAssignmentResource {
	
	/** The Constant USERID. */
	static final USERID = 'userId'
	
		/** The study service. */
		@Autowired
		StudyAssignmentService studyAssignmentService
	
		/** The user service. */
		@Autowired
		UserService userService
	
		/** The study transformer. */
		@Autowired
		StudyTransformer studyTransformer
	
		/** The studylist transformer. */
		@Autowired
		StudyListTransformer studylistTransformer
	
		
		
	/**
	 * Change study status.
	 *
	 * @param id the id
	 * @return the Assigned User Name
	 */
	@RequestMapping(value='/{id}/pocassign',method=RequestMethod.POST)
	@Auditable(eventCode=109L, microServiceName='studylist', id=0,entityName='Study')
	def assignPocUser(@PathVariable('id') Long id) {
		def userId = SecurityUtil.retrieveUserId()
		studyAssignmentService.assignPocUser(id,userId)
		def personName=userService.findPersonName(userId)
		personName?studyTransformer.transformUserName(personName): new ResponseEntity(CustomErrorCode.ER_404.value, HttpStatus.NOT_FOUND)
	}

	/**
	 * Assign qa user.
	 *
	 * @param id the id
	 * @return user
	 */
	@RequestMapping(value='/{id}/qaassign',method=RequestMethod.POST)
	@Auditable(eventCode=109L, microServiceName='studylist', id=0,entityName='Study')
	def assignQaUser(@PathVariable('id') Long id) {
		def userId = SecurityUtil.retrieveUserId()
		def token = SecurityUtil.retrieveAuthToken()
		studyAssignmentService.assignQaUser(id,userId,token)
		def personName=userService.findPersonName(userId)
		personName?studyTransformer.transformUserName(personName): new ResponseEntity(CustomErrorCode.ER_404.value, HttpStatus.NOT_FOUND)
	}

	/**
	 * Assign study by admin.
	 *
	 * @param id the id
	 * @param userId the user id
	 * @return the Assigned User Name
	 */
	@RequestMapping(value='/{id}/admin/{userId}',method=RequestMethod.POST)
	@Auditable(eventCode=109L, microServiceName='studylist', id=0,entityName='Study')
	def assignPocUserByOthers(@PathVariable('id') Long id,@PathVariable('userId') Long userId) {
		studyAssignmentService.assignPocUserByOthers(id,userId)
		def personName=userService.findPersonName(userId)
		personName?studyTransformer.transformUserName(personName): new ResponseEntity(CustomErrorCode.ER_404.value, HttpStatus.NOT_FOUND)
	}

	/**
	 * Unassign study by admin.
	 *
	 * @param id the id
	 * @return the status
	 */
	@RequestMapping(value='/{id}/admin/modifystatus',method=RequestMethod.DELETE)
	@Auditable(eventCode=110L, microServiceName='studylist', contentPosition=0,id=0,entityName = 'Study')
	def unassignStudyInPendingState(@PathVariable('id') Long id){
		def statusChange=studyAssignmentService.unassignStudyInPendingState(id)
		statusChange?studyTransformer.unAssignStudyTrans(statusChange): new ResponseEntity(CustomErrorCode.ER_404.value, HttpStatus.NOT_FOUND)
	}

	/**
	 * Unassign study.
	 *
	 * @param id the id
	 * 
	 */
	@RequestMapping(value='/{id}/modifystatus',method=RequestMethod.PUT)
	@Auditable(eventCode=110L, microServiceName='studylist', contentPosition=0,id=0,entityName = 'Study')
	def unassignStudyInAssignedState(@PathVariable('id') Long id){
		def token = SecurityUtil.retrieveAuthToken()
		def userId = SecurityUtil.retrieveUserId()
		def statusChange=studyAssignmentService.unassignStudyInAssignedState(id,userId,token)
		statusChange?ResponseEntity.ok().build():new ResponseEntity(CustomErrorCode.ER_404.value+USERID, HttpStatus.NOT_FOUND)
	}


	/**
	 * Reassign poc user.
	 *
	 * @param id the id
	 * @param userId the user id
	 * @return the java.lang. object
	 */
	@RequestMapping(value='/{id}/reassignuser/{userId}',method=RequestMethod.PUT)
	@Auditable(eventCode=111L, microServiceName='studylist', contentPosition=0,id=0,entityName = 'Study')
	def reassignPocUser(@PathVariable('id') Long id,@PathVariable('userId') Long userId) {
		def personName
		def loginUserId = SecurityUtil.retrieveUserId()
		def reassignusername = studyAssignmentService.reassignPocUser(id,userId,loginUserId)
		if(!reassignusername){
			return new ResponseEntity(CustomErrorCode.ER_404.value+USERID, HttpStatus.NOT_FOUND)
		}
		personName=userService.findPersonName(userId)
		personName?studyTransformer.transformUserName(personName): new ResponseEntity(CustomErrorCode.ER_404.value+'personId', HttpStatus.NOT_FOUND)
	}


	/**
	 * assign Study To Attending User.
	 *
	 * @param id the studyId
	 * @param userid the attending userId
	 * @return the user Json Data
	 */
	@RequestMapping(value='/{id}/assigntoattendUser/{userid}', method=RequestMethod.PUT)
	def assignAttendinguser(@PathVariable('id')Long id, @PathVariable('userid') Long userid){
		def study = studyAssignmentService.assignAttendinguser(id, userid)
		study?studyTransformer.transformUserName(userService.findPersonName(userid)):new ResponseEntity(CustomErrorCode.ER_404.value+'study id '+id, HttpStatus.NOT_FOUND)
	}


	/**
	 * check Attending User.
	 *
	 * @param id the id
	 * @return the user Json Data
	 */
	@RequestMapping(value='{id}/assignuser', method=RequestMethod.GET)
	def checkAttendingUserPresent(@PathVariable('id') Long id){
		def assignedUser = studyAssignmentService.checkAttendingUserPresent(id)
		assignedUser?studyTransformer.transformAttendingUserPresent():studyTransformer.transformAttendingUserNotPresent()
	}

	/**
	 * Auto attest validate users.
	 *
	 * @param studyId the study id
	 * @return true/false
	 */
	@RequestMapping(value='/{studyId}/attestation/uservalidate',method=RequestMethod.GET)
	def autoAttestValidateUsers(@PathVariable('studyId') Long studyId) {
		def retVal = studyAssignmentService.autoAttestValidateUsers(studyId)
		retVal?studyTransformer.userAttestedStatus(retVal):studyTransformer.userAttestedStatus(false)
	}

}

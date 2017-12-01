package com.ffss.datax.configuration.service

import javax.transaction.Transactional

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

import com.ffss.datax.common.constants.ChannelEnum
import com.ffss.datax.common.constants.Constants
import com.ffss.datax.common.constants.NotificationEventEnum
import com.ffss.datax.security.util.SecurityUtil
import com.ffss.datax.configuration.constants.ConfigurationConstants
import com.ffss.datax.configuration.repository.UserRepository
import com.ffss.datax.configuration.service.feign.UserNotificationService
/**
 * Class UserConfigService for user related activities.
 *
 * @author Virtusa|Polaris
 */

@Service
class UserConfigService {

	@Autowired
	UserRepository userRepository

	@Autowired
	UserNotificationService userNotificationService

	/**
	 * make a call to notification service to send userName
	 * @param userData
	 * @return
	 */
	def sendUserName(userData){

		//TODO: Need to change this to send the subject and get rid of orgId hard coding
		userNotificationService.notificationSave(ChannelEnum.EMAIL.value,
				[notification:[
						to:[userData.email],data:[username:userData.userName],template:ConfigurationConstants.USER_CREATION,
						eventId:NotificationEventEnum.USERCREATION.value],orgId:1],SecurityUtil.retrieveAuthToken())
	}

	/**
	 * make a call to notification service to send password
	 * @param userData
	 * @param systemGenereatedPassword
	 */
	def sendPassword(userData,systemGenereatedPassword){

		//TODO: Need to change this to send the subject and get rid of orgId hard coding
		userNotificationService.notificationSave(ChannelEnum.EMAIL.value,
				[notification:[to:[userData.email],data:[password:systemGenereatedPassword],template:ConfigurationConstants.FORGOT_PASSWORD,
						eventId:NotificationEventEnum.PASSWORDGENERATION.value],orgId:1],SecurityUtil.retrieveAuthToken())
	}


	/**
	 * Method for check userName present in DB.
	 * @param userName the userName
	 * @return true if user is present in Database else false
	 */
	def checkUserNamePresent(userName){
		def present = userRepository.findByUserName(userName)
		present?true:false
	}

	/**
	 * Method for check email present in DB.
	 * @param emailAddress the email address
	 * @return true if mail is present in Database else false
	 */
	def checkMailPresent(emailAddress){
		def present = userRepository.findByEmailAddressIgnoreCase(emailAddress.toString())
		present?true:false
	}
	/**
	 * Method for activate or deactivate user.
	 * @param id the userId
	 * @param userDetails the user details
	 * @return the user object
	 */
	@Transactional
	def updateStatus(userId, userDetails) {
		def user = userRepository.findOne(userId)
		if(user) {
			if(userDetails.status == ConfigurationConstants.BOOLEAN_FALSE) {
				user.isActive = Constants.FLAG_NO
				userRepository.save(user)
			}
			else if(userDetails.status == ConfigurationConstants.BOOLEAN_TRUE) {
				user.isActive = Constants.FLAG_YES
				userRepository.save(user)
			}
			user
		}
	}

	/**
	 * FindUsers will find all active users.
	 * @param userId the user id
	 * @return the users object
	 */
	def findUsers(userId) {
		userRepository.findOtherActiveUsers(userId)
	}
}

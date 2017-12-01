package com.ffss.datax.notification.delegate
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component

import com.ffss.datax.common.constants.NotificationStatusEnum
import com.ffss.datax.common.domain.notification.TemplateInfo
import com.ffss.datax.notification.constants.NotificationConstants
import com.ffss.datax.notification.service.MailService
import com.ffss.datax.notification.service.TemplateService

import groovy.json.JsonSlurper
import groovy.util.logging.Log4j

/**
 * Implementation of ChannelDelegator for Email Notification
 * @author Virtusa|Polaris
 *
 */
@Log4j
@Component('emailProcessor')
class EmailProcessor implements ChannelDelegator{

	@Autowired
	private MailService mailService

	@Autowired
	TemplateService templateService

	/**
	 * Override ChannelDelegator, processNotification method
	 * Process Email Notification
	 * @param notificationObj containing email information to be sent
	 * @return The NotificationStatusEnum, either SUCCESS or DISABLED
	 */
	@Override
	NotificationStatusEnum processNotification(notificationObj) {

		//Calls method to process Email notification
		sendEmailNotification(notificationObj)
	}


	private NotificationStatusEnum sendEmailNotification(notificationObj) {

		def jsonSlurper = new JsonSlurper()
		def notificationJsonObject = jsonSlurper.parseText(notificationObj.notification)
		def defaultTempName = NotificationConstants.DEFAULT_TEMPLATE_NAME

		//Adding orgId and notificationId attribute to the notificaitonJsonObj
		notificationJsonObject.orgId = notificationObj.orgId
		notificationJsonObject.notificationId = notificationObj.id

		//get template name as a json parameter
		def tempName=notificationJsonObject.template

		//If there is no json parameter as 'template', make the template name as 'default'
		if(!tempName){

			tempName=defaultTempName
			log.info("Difault email template will be loaded as template parameter is not defined in JSON for Notification - ${notificationObj.id}; ")
		}

		//get template info from db related to template name
		TemplateInfo templateInfo=templateService.getTemplatePath(tempName,notificationObj.orgId)

		//If the template name is not available in db, take the default template path
		if(!templateInfo){

			templateInfo=templateService.getTemplatePath(defaultTempName,notificationObj.orgId)
			log.info("Difault email template will be loaded as the provided template in JSON is invalid for Notification - ${notificationObj.id};")
		}

		//call mail service to send mail
		mailService.sendNotificationEmail(notificationJsonObject,templateInfo)

	}

}

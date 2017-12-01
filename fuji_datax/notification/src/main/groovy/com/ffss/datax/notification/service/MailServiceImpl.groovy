package com.ffss.datax.notification.service

import javax.mail.internet.MimeMessage

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.mail.javamail.JavaMailSender
import org.springframework.mail.javamail.MimeMessageHelper
import org.springframework.mail.javamail.MimeMessagePreparator
import org.springframework.stereotype.Service

import com.ffss.datax.common.constants.NotificationStatusEnum
import com.ffss.datax.common.domain.configuration.EmailConfig
import com.ffss.datax.common.domain.notification.TemplateInfo
import com.ffss.datax.notification.constants.NotificationConstants
import com.ffss.datax.notification.repository.NotificationConfigRepository
import com.ffss.datax.notification.util.NotificationUtil
import com.mitchellbosecke.pebble.PebbleEngine
import com.mitchellbosecke.pebble.template.PebbleTemplate

import groovy.util.logging.Log4j

/**
 * Implements MailService to perform services related to sending emails
 * @author Virtusa|Polaris
 *
 */
@Service('mailService')
@Log4j
class MailServiceImpl implements MailService{

	@Autowired
	NotificationAsyncService notificationAsyncService

	@Autowired
	NotificationConfigRepository configRepository

	@Autowired
	PebbleEngine engine

	@Autowired
	NotificationService notificationService

	@Value('${notification.baseUrl}')
	String baseUrl

	@Override
	NotificationStatusEnum sendNotificationEmail(Object notificationJsonObject, Object templateObject) {

		EmailConfig emailConfig = configRepository.findByOrgId(notificationJsonObject.orgId.asType(Long))

		NotificationStatusEnum retVal = NotificationStatusEnum.SUCCESS

		if (emailConfig?.isEnable) {

			//Creating an Email Sender based on the
			JavaMailSender mailSender = NotificationUtil.createJavaMailSender(emailConfig)

			TemplateInfo template=(TemplateInfo)templateObject

			MimeMessagePreparator preparator = getMessagePreparator(notificationJsonObject,template, emailConfig.defaultEmail)
			mailSender.send(preparator)

		} else {

			log.info("Email is disabled for organization - ${notificationJsonObject.orgId}; Email not sent for Notification record with Id - ${notificationJsonObject.notificationId} ")

			retVal = NotificationStatusEnum.DISABLED
		}

		retVal
	}

	private MimeMessagePreparator getMessagePreparator(Object notificationJsonObject,final TemplateInfo template, String defaultFrom) {

		MimeMessagePreparator preparator = new MimeMessagePreparator() {

					void prepare(MimeMessage mimeMessage) throws Exception {

						MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true)

						//Take json parameter as the subject
						def emailSubject=notificationJsonObject[NotificationConstants.JSON_ATTRIBUTE_SUBJECT]

						//If there is no subject in json take the default subject from template_info table
						if(!emailSubject){

							emailSubject=template.subject
						}

						def from=notificationJsonObject[NotificationConstants.JSON_ATTRIBUTE_FROM]

						//If sender email is null in json get the default
						if(!from){

							from=defaultFrom
						}

						def toObj=notificationJsonObject[NotificationConstants.JSON_ATTRIBUTE_TO]

						//Convert json to a Array
						def to=toObj.toArray(new String[toObj.size()])

						//Set values to MimeMessageHelper
						helper.setSubject(emailSubject)
						helper.setFrom(from)
						helper.setTo(to)

						Map<String, Object> model = new HashMap<String, Object>()
						//Set values to that should pass to the template
						model.put('email', notificationJsonObject)
						model.put('url', baseUrl)

						//Get the template Content as a String with the added dynamic values
						String text = getPebbleTemplateContent(model,template.path)

						// use the true flag to indicate you need a multipart message
						helper.setText(text, true)

					}
				}
		preparator
	}

	/**
	 * @param Map containing data related to email
	 * @param path of the template
	 */
	def getPebbleTemplateContent(Map<String, Object> model,String templatePath) {

		//get template from the given path
		PebbleTemplate compiledTemplate = engine.getTemplate(templatePath)

		Writer writer = new StringWriter()
		compiledTemplate.evaluate(writer, model)

		writer.toString()
	}

}

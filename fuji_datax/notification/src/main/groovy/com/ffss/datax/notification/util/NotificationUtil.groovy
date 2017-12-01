package com.ffss.datax.notification.util

import javax.mail.Session
import javax.mail.Transport

import org.springframework.mail.javamail.JavaMailSender
import org.springframework.mail.javamail.JavaMailSenderImpl

import groovy.util.logging.Log4j

/**
 * Utility Class containing commonly used methods related to Notifications
 * 
 * @author Virtusa|Polaris
 */
@Log4j
class NotificationUtil {

	private final static String EMAIL_PROTOCOL_SMTP = 'smtp'

	static String baseUrl = null

	private final static String MAIL_SMTP_HOST = 'mail.smtp.host'
	private final static String MAIL_SMTP_PORT = 'mail.smtp.port'
	private final static String MAIL_SMTP_USER = 'mail.smtp.user'
	private final static String MAIL_SMTP_AUTH = 'mail.smtp.auth'
	private final static String MAIL_SMTP_SSL = 'mail.smtp.ssl'
	private final static String MAIL_SMTP_TLS = 'mail.smtp.tls'
	private final static String MAIL_SMTP_TRUST = 'mail.smtp.trust'

	/**
	 * This Utility method will test whether it's possible to connect to an Email server with the provided configurations
	 * 
	 * @param emailConfig
	 * 
	 * @return True - when the connection is successful and False otherwise
	 */
	static checkEmailConfiguration(emailConfig) {

		log.info("Check email configuration for Server - ${emailConfig.server} and Port - ${emailConfig.port}")

		Boolean retVal = false

		//Creating a properties object with the configuration info
		Properties props = new Properties()
		props.put(MAIL_SMTP_HOST, emailConfig?.server)
		props.put(MAIL_SMTP_PORT, emailConfig?.port)

		Session session = null
		Transport transport = null

		try {

			if (emailConfig.isAuth) {
				props.put(MAIL_SMTP_USER, emailConfig?.userName)
				props.put(MAIL_SMTP_AUTH, emailConfig?.isAuth)

				//Creating an Email session and retrieving the Transport object with protocol set to "smtp"
				session = Session.getInstance(props)
				transport = session.getTransport(EMAIL_PROTOCOL_SMTP)

				log.debug('About to check email server connectivity using the provided username and password')
				transport.connect(emailConfig.userName, emailConfig.password)
			} else {
				//Creating an Email session and retrieving the Transport object with protocol set to "smtp"
				session = Session.getInstance(props)
				transport = session.getTransport(EMAIL_PROTOCOL_SMTP)

				log.debug('About to check email server connectivity, mail.smtp.auth = false')
				transport.connect()
			}

			retVal = true

			log.info("Test connection is Success for Server - ${emailConfig.server} and Port - ${emailConfig.port}")

		} catch (Exception ex) {
			log.error("Test connection failed for Server - ${emailConfig.server} and Port - ${emailConfig.port}", ex)
		} finally {
			if (transport != null) {
				transport.close()
			}
		}

		retVal
	}

	/**
	 * Creates a JavaMailSender object based on the email configurations parameter
	 * 
	 * @param emailConfig Object containing email configuration used to create the Java mail sender object
	 * 
	 * @return JavaMailSender object 
	 */
	static JavaMailSender createJavaMailSender(emailConfig) {

		//Creating a properties object with the configuration info
		Properties props = new Properties()
		props.put(MAIL_SMTP_HOST, emailConfig?.server)
		props.put(MAIL_SMTP_PORT, emailConfig?.port)
		props.put(MAIL_SMTP_AUTH, emailConfig?.isAuth)
		props.put(MAIL_SMTP_SSL, emailConfig?.isSSL)
		props.put(MAIL_SMTP_TLS, false)
		props.put(MAIL_SMTP_TRUST, '*')

		JavaMailSenderImpl mailSender = new JavaMailSenderImpl()

		mailSender.port = emailConfig.port
		mailSender.host = emailConfig.server

		if (emailConfig.isAuth) {
			mailSender.username = emailConfig.userName
			mailSender.username = emailConfig.password

			props.put(MAIL_SMTP_USER, emailConfig?.userName)
		}

		mailSender.javaMailProperties = props

		mailSender

	}
}

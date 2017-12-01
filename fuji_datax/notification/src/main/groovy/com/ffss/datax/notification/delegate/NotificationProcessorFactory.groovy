package com.ffss.datax.notification.delegate

import org.springframework.beans.BeansException
import org.springframework.context.ApplicationContext
import org.springframework.context.ApplicationContextAware
import org.springframework.stereotype.Component

import com.ffss.datax.common.constants.ChannelEnum

import groovy.util.logging.Log4j

/**
 * Identify the notification type and redirect to its processor
 * @author Virtusa|Polaris
 *
 */
@Component
@Log4j
class NotificationProcessorFactory implements ApplicationContextAware{

	ApplicationContext applicationContext

	/**
	 * Delegate according to the notification type
	 * @param channel
	 */
	ChannelDelegator getContext(int channel,Long notificationId) {

		ChannelDelegator delegator = null

		//If the notification type is INAPP or INAPP SHARE go to INAPP processor
		if((channel as Integer==ChannelEnum.INAPP.value) || (channel as Integer==ChannelEnum.INAPP_SHARE.value)){

			log.info("Notification - ${notificationId} identified as a Inapp notification")
			log.debug("Notification - ${notificationId} calls inAppProcessor")
			delegator = applicationContext.getBean('inAppProcessor', ChannelDelegator)
		}
		else if(channel as Integer==ChannelEnum.EMAIL.value){

			log.info("Notification - ${notificationId} identified as a Email notification")
			log.debug("Notification - ${notificationId} calls emailProcessor")
			delegator = applicationContext.getBean('emailProcessor', ChannelDelegator)
		}
	}

	@Override
	def void setApplicationContext(ApplicationContext applicationContext)
	throws BeansException {

		this.applicationContext = applicationContext
	}
}

package com.ffss.datax.study.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param

import com.ffss.datax.common.domain.notification.NotificationEventInfo


/**
 * The Interface NotificationEventInfoRepository.
 * @author Virtusa|Polaris
 */
interface NotificationEventInfoRepository extends JpaRepository<NotificationEventInfo, Long>{

	/**
	 * Find event by code.
	 *
	 * @param eventCode the event code
	 * @return the notification event info
	 */
	@Query('select e from NotificationEventInfo e where e.eventCode=:eventCode')
	NotificationEventInfo findEventByCode(@Param('eventCode') String eventCode)

	//NotificationEventInfo findByEventCode(String eventCode)
}

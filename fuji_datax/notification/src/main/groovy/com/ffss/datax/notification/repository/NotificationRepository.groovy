package com.ffss.datax.notification.repository

import javax.transaction.Transactional

import org.joda.time.DateTime
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Modifying
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param

import com.ffss.datax.common.domain.notification.Notification

interface NotificationRepository extends JpaRepository<Notification, Long>{

	/**
	 * After picking the alert notification to save on Notification_alert table change the states to PROCESSING
	 * @param status
	 * @param id
	 */
	@Query('update Notification n set n.status=:status where n.id=:id')
	@Modifying
	@Transactional
	void changeNotificationStatus(@Param('status') String status, @Param('id') Long id)

	/**
	 * get error count
	 * @param id
	 * @return error count
	 */
	@Query('select n.errorCount from Notification n where n.id=:id')
	int getErrorCount(@Param('id') Long id)

	/**
	 * increase error count by 1
	 * @param id
	 */
	@Modifying
	@Transactional
	@Query('update Notification n set n.errorCount=n.errorCount+1 where n.id=:id')
	void increaseErrorCountByOne(@Param('id') Long id)

	/**
	 * This method is to change the updatedDateTime of notifications
	 * @param updatedDateTime
	 * @param id
	 */
	@Query('update Notification n set n.updatedDateTime=:updatedDateTime where n.id=:id')
	@Modifying
	@Transactional
	void changeUpdateTime(@Param('updatedDateTime') DateTime updatedDateTime, @Param('id') Long id)
	
	/**
	 * Retrieve All notifications that status is FAILED or DISABLED
	 * @param status
	 * @return Notification
	 */
	@Query('select n from Notification n where n.status=:status or n.status=:status1')
	List<Notification> retrieveFailedDisabledNotifications(@Param('status') String status, @Param('status1') String status1)
}

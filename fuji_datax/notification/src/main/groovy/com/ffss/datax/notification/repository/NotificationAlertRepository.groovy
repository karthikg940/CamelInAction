package com.ffss.datax.notification.repository

import org.joda.time.DateTime
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Modifying
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import org.springframework.stereotype.Repository

import com.ffss.datax.common.domain.notification.NotificationAlert

/**
 * @author Virtusa|Polaris
 *
 */
@Repository
interface NotificationAlertRepository extends JpaRepository<NotificationAlert, Long> {

	/**
	 * Find the all notification related to a datax user
	 * @param user
	 * @return
	 */
	@Query('select n from NotificationAlert n where n.datax_receiver=:user order by n.id desc')
	List<NotificationAlert> findAllUserNotifications(@Param('user') Long user)

	/**
	 * Find the all notification related to a datax user and after a given date
	 * @param user
	 * @return
	 */
	@Query('select n from NotificationAlert n where n.datax_receiver=:user and n.createdDateTime>=:date')
	List<NotificationAlert> findAllUserNotificationsBydate(@Param('user') Long user, @Param('date') DateTime date)

	/**
	 * Find the all notification related to a datax user and between a given dates
	 * @param user
	 * @return
	 */
	@Query('select n from NotificationAlert n where n.datax_receiver=:user and n.createdDateTime between :dateFrom and :dateTo')
	List<NotificationAlert> findAllUserNotificationsBydateBetween(@Param('user') Long user, @Param('dateFrom') DateTime dateFrom, @Param('dateTo') DateTime dateTo)

	/**
	 * This method is to change the status of alert notifications
	 * @param status
	 * @param id
	 */
	@Query('update NotificationAlert n set n.status=:status where n.id=:id')
	@Modifying
	void changeAlertNotificationStatus(@Param('status') String status, @Param('id') Long id)

	/**
	 * Find the all notification related to a datax user
	 * @param user, status
	 * @return json
	 */
	@Query('select n from NotificationAlert n where n.datax_receiver=:dataxUser and n.status=:status')
	List<NotificationAlert> getAlertNotificationStatus(@Param('dataxUser') Long dataxUser,@Param('status') String status)

	/**
	 * This method is to change the updatedDateTime of alert notifications
	 * @param updatedDateTime
	 * @param id
	 */
	@Query('update NotificationAlert n set n.updatedDateTime=:updatedDateTime,n.updatedBy=:updatedBy where n.id=:id')
	@Modifying
	void changeUpdateTimeAndUpdatedBy(@Param('updatedDateTime') DateTime updatedDateTime, @Param('id') Long id, @Param('updatedBy') Long updatedBy)

	/**
	 * get count by status
	 * @param id
	 * @return
	 */
	@Query('select count(n.id) from NotificationAlert n where n.datax_receiver=:dataxUser and n.status=:status')
	int getCountByStatusAndUser(@Param('dataxUser') Long dataxUser,@Param('status') String status)
}

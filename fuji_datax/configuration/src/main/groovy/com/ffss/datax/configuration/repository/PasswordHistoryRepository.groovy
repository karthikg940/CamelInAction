package com.ffss.datax.configuration.repository


import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param

import com.ffss.datax.common.domain.userprofile.PasswordHistory


interface PasswordHistoryRepository extends JpaRepository<PasswordHistory, Long> {


	@Query("select count(*) from PasswordHistory ph where ph.user.id=:id")
	def findPasswordHistoryCountByUser(@Param('id') def id)

	@Query("select ph from PasswordHistory ph where ph.user.id=:id order by ph.id")
	List<PasswordHistory> findHistory(@Param('id') def id)


	@Query("select ph.passwordHash from PasswordHistory ph where ph.user.id=:id")
	List<PasswordHistory> findHistoryOfPasswords(@Param('id') def id)
}



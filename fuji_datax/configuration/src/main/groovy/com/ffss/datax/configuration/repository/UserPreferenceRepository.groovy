package com.ffss.datax.configuration.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import org.springframework.stereotype.Repository

import com.ffss.datax.common.domain.configuration.PreferenceValue
import com.ffss.datax.common.domain.configuration.UserPreference


@Repository
interface UserPreferenceRepository extends JpaRepository<UserPreference, Long>  {
	
	@Query('select userPref from UserPreference userPref join fetch userPref.preferenceValue pv join fetch userPref.preferenceType pt where userPref.userId=:id and pt.id = :preferenceType')
	UserPreference getValue(@Param('id')Long id, @Param("preferenceType") Long preferenceType);
	
}


package com.ffss.datax.configuration.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param

import com.ffss.datax.common.domain.configuration.SystemPreference



interface SystemPreferenceRepository extends JpaRepository<SystemPreference, Long>{

	@Query('select systemPref from SystemPreference systemPref join fetch systemPref.preferenceValue pv join fetch systemPref.preferenceType pt where systemPref.systemPreferenceId=:id')
	SystemPreference getValue(@Param('id') Long id)
}

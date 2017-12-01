package com.ffss.datax.configuration.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param

import com.ffss.datax.common.domain.configuration.PreferenceValue

interface PreferenceValueRepository extends JpaRepository<PreferenceValue, Long>  {
	
	@Query('select prefValue from PreferenceValue prefValue where preferenceType.id=:id')
	List<PreferenceValue> getDisplayValue(@Param('id')Long id)

}

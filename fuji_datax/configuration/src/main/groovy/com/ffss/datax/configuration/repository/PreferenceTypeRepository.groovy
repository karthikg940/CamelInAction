package com.ffss.datax.configuration.repository

import org.springframework.data.jpa.repository.JpaRepository

import com.ffss.datax.common.domain.configuration.PreferenceType

interface PreferenceTypeRepository extends JpaRepository<PreferenceType,Long>  {

}

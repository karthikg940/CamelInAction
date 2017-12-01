package com.ffss.datax.auth.repository

import org.springframework.data.jpa.repository.JpaRepository

import com.ffss.datax.common.domain.configuration.SystemConfiguration

interface SystemConfigRepository extends JpaRepository<SystemConfiguration,Long>{

	
}

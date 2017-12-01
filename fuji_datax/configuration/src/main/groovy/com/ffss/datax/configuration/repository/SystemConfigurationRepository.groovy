package com.ffss.datax.configuration.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

import com.ffss.datax.common.domain.configuration.SystemConfiguration

@Repository
interface SystemConfigurationRepository extends JpaRepository<SystemConfiguration, Long>{
}

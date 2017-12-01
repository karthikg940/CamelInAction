package com.ffss.datax.study.repository

import org.springframework.data.jpa.repository.JpaRepository

import com.ffss.datax.common.domain.configuration.Configuration

interface ConfigurationRepository extends JpaRepository<Configuration, Long>{
	
	Configuration findByOrganizationId(id)
}

package com.ffss.datax.study.config

import javax.sql.DataSource

import org.springframework.boot.autoconfigure.jdbc.DataSourceBuilder
import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Primary

/**
 * 
 * @author Virtusa|Polaris
 *
 */
@Configuration
class DataSources {
	@Primary
	@Bean
	@ConfigurationProperties(prefix='spring.datasources.dbdatax')
	DataSource dataxDataSource() {
		DataSourceBuilder.create().build()
	}
	@Bean
	@ConfigurationProperties(prefix='spring.datasources.dbvna')
	DataSource vnaDataSource() {
		DataSourceBuilder.create().build()
	}
}

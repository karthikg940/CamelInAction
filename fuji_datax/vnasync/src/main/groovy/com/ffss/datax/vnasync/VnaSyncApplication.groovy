package com.ffss.datax.vnasync

import groovy.util.logging.*

import org.hibernate.SessionFactory
import org.springframework.batch.core.configuration.annotation.EnableBatchProcessing
import org.springframework.batch.core.configuration.support.ApplicationContextFactory
import org.springframework.batch.core.configuration.support.GenericApplicationContextFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.EnableAutoConfiguration
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.autoconfigure.domain.EntityScan
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration
import org.springframework.boot.autoconfigure.jdbc.DataSourceTransactionManagerAutoConfiguration
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.ComponentScan
import org.springframework.data.jpa.repository.config.EnableJpaRepositories
import org.springframework.orm.hibernate5.HibernateTemplate
import org.springframework.orm.hibernate5.LocalSessionFactoryBuilder
import org.springframework.transaction.annotation.EnableTransactionManagement

import com.ffss.datax.vnasync.config.DataSources
import com.ffss.datax.vnasync.config.VnaSyncConfiguration

/**
 * 
 * @author Virtusa|Polaris
 *
 */
@Log4j
@SpringBootApplication
@EnableAutoConfiguration(exclude = [DataSourceAutoConfiguration, DataSourceTransactionManagerAutoConfiguration])
@EnableBatchProcessing(modular=false)
@EnableJpaRepositories(basePackages = 'com.ffss.datax.*')
@EntityScan(basePackages=['com.ffss.datax.common.domain','com.ffss.datax.vnasync.domain'])
@ComponentScan(basePackages='com.ffss.datax.*')
@EnableTransactionManagement
class VnaSyncApplication {

	@Autowired
	private DataSources datasources

	static void main(String[] args) {
		SpringApplication.run VnaSyncApplication, args
	}
	@Bean
	ApplicationContextFactory batchJobs() {
		new GenericApplicationContextFactory(VnaSyncConfiguration)
	}

	@Bean
	HibernateTemplate hibernateTemplate() {
		new HibernateTemplate(sessionFactory())
	}

	@Bean
	SessionFactory sessionFactory() {
		new LocalSessionFactoryBuilder(datasources.dataxDataSource())
				.scanPackages(['com.ffss.datax.common.domain', 'com.ffss.datax.vnasync.domain'].toArray(new String[2]))
				.buildSessionFactory()
	}
}


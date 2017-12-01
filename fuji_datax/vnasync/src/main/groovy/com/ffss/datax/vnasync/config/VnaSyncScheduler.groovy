package com.ffss.datax.vnasync.config

import org.springframework.batch.core.launch.support.SimpleJobLauncher
import org.springframework.batch.core.repository.JobRepository
import org.springframework.batch.core.repository.support.MapJobRepositoryFactoryBean
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.scheduling.annotation.EnableScheduling

@Configuration
@EnableScheduling
class VnaSyncScheduler {

	/* @Bean
	 public ResourcelessTransactionManager transactionManager() {
	 return new ResourcelessTransactionManager()
	 }
	 @Bean
	 public MapJobRepositoryFactoryBean mapJobRepositoryFactory(
	 ResourcelessTransactionManager txManager) throws Exception {
	 MapJobRepositoryFactoryBean factory = new 
	 MapJobRepositoryFactoryBean(txManager)
	 factory.afterPropertiesSet()
	 return factory
	 }
	 */
	@Bean
	JobRepository jobRepository(
			MapJobRepositoryFactoryBean factory) throws Exception {
		factory.object
	}

	@Bean
	SimpleJobLauncher jobLauncher(JobRepository jobRepository) {
		SimpleJobLauncher launcher = new SimpleJobLauncher()
		launcher.setJobRepository(jobRepository)
		launcher
	}
}
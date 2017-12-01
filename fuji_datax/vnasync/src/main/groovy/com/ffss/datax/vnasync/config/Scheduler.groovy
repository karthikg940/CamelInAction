package com.ffss.datax.vnasync.config

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.Profile
import org.springframework.scheduling.annotation.Scheduled
import org.springframework.stereotype.Component

@Profile("!test")
@Component
class Scheduler {

	@Autowired
	VnaSyncConfiguration vnaSyncConfiguration
	
	@Scheduled(cron='0 0/5 * * * *')
	def vnsSyncScheduler(){
		vnaSyncConfiguration.perform()
	}
}

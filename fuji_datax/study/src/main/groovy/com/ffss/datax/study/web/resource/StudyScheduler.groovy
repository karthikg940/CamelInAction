package com.ffss.datax.study.web.resource

import org.joda.time.DateTime
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.scheduling.annotation.EnableScheduling
import org.springframework.scheduling.annotation.Scheduled
import org.springframework.stereotype.Controller

import com.ffss.datax.security.util.SecurityUtil
import com.ffss.datax.study.service.StudyService
import com.ffss.datax.study.service.UserService

@Controller
@EnableScheduling
class StudyScheduler {
	@Autowired
	StudyService studyService
	@Autowired
	UserService userService



	@Scheduled(cron='0 0/5 * * * * ')
	void perform(){
		def sysuser = userService.findSystemUser()
		Long id = sysuser.id
		String userName = sysuser.userName
		def config = studyService.findByOrgId()
		int configuredTime = config.thresholdTimeLimit
		def token = SecurityUtil.getSystemSubject(id, userName)
		DateTime thresholdtime =  DateTime.now().minusHours(configuredTime)
		studyService.findIdleStudiesAndAlert(token,  thresholdtime , configuredTime)
	}
}

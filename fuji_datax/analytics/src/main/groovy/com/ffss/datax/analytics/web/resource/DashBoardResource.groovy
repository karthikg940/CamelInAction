package com.ffss.datax.analytics.web.resource

import groovy.util.logging.Log4j

import org.joda.time.DateTime
import org.joda.time.DateTimeZone
import org.joda.time.format.DateTimeFormat
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

import com.ffss.datax.analytics.constants.AnalyticsConstants
import com.ffss.datax.analytics.service.DashboardService
import com.ffss.datax.analytics.web.transformer.DashboardTransformer
import com.ffss.datax.security.util.SecurityUtil

/**
 * Description.
 * @author Virtusa|Polaris
 */
@Log4j
@RestController
@RequestMapping('/api/org')
class DashBoardResource {

	@Autowired
	DashboardService  dashboardService

	@Autowired
	DashboardTransformer dashboardTransformer




	/**
	 * Gets the statisticsbytime.
	 *
	 * @param fromDate 
	 * @param toDate
	 * @return the statistics JSON by time
	 */
	@RequestMapping(value='/{orgId}/analytics/study',method=RequestMethod.GET)
	def getStatisticsByTime(@RequestParam('fromDate') fromDate,	@RequestParam('toDate') toDate, @PathVariable('orgId') Long orgId) {

		DateTime from,to
		def userId = SecurityUtil.retrieveUserId()
		if(fromDate == '' && toDate == ''){
			from = new DateTime().minusDays(1).withZone(DateTimeZone.UTC)
			to = new DateTime().withZone(DateTimeZone.UTC)
		}
		else if(fromDate == toDate){
			from  = DateTime.parse(fromDate+AnalyticsConstants.START_TIME, DateTimeFormat.forPattern(AnalyticsConstants.PATTERN))
			to  = DateTime.parse(toDate+AnalyticsConstants.END_TIME, DateTimeFormat.forPattern(AnalyticsConstants.PATTERN))
		}
		else{
			from  = DateTime.parse(fromDate+AnalyticsConstants.START_TIME, DateTimeFormat.forPattern(AnalyticsConstants.PATTERN))
			to  = DateTime.parse(toDate+AnalyticsConstants.END_TIME, DateTimeFormat.forPattern(AnalyticsConstants.PATTERN))
		}

		def myStudies=dashboardService.getMyStudies(from,to,userId,orgId)
		def allStudies=dashboardService.getAllStudies(from,to, orgId)
		def qaStudies = dashboardService.getQaStudies(from, to,userId, orgId)
		log.debug('Data for studies have been fetched and it is going to transformer')
		dashboardTransformer.transform(myStudies,allStudies, qaStudies)
	}
}

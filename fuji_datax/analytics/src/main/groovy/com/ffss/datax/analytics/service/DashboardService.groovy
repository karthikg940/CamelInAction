package com.ffss.datax.analytics.service

import groovy.util.logging.Log4j

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

import com.ffss.datax.analytics.repository.DashboardRepository

/**
 * DashboardService provides method for fetching the study for qaStudies,
 * allStudies,my Studies assigned to the particular user.
 * @author Virtusa|Polaris
 */
@Log4j
@Service
class DashboardService {

	@Autowired
	DashboardRepository dashboardRepository

	/**
	 * Gets the studies data based on the userId passed.
	 * @param from,to,userId
	 * @return the my studies data based on the particular userId
	 */
	def getMyStudies(from,to,userId,orgId){
		log.debug('Fetches the studies assigned to the particular userId for attestation purpose')
		dashboardRepository.getMyStudiesDataDetails(from,to,userId,orgId)
	}

	/**
	 * Gets the all studies data.
	 * @param from,to,userId
	 * @return the all studies data
	 */
	def getAllStudies(from,to,orgId){
		log.debug('Fetches all the studies ir-respective of the signed in user')
		dashboardRepository.getAllStudiesDetails(from,to,orgId)
	}

	/**
	 * Gets the qa studies based on the userId passed .
	 * @param from,to,userId
	 * @return the qa studies fetched based on the particular userId
	 */
	def getQaStudies(from, to, userId,orgId) {
		log.debug('Fetches the studies assigned to the particular user for qualityAssurance purpose')
		dashboardRepository.getQaStudies(from, to, userId,orgId)
	}
}
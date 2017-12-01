package com.ffss.datax.analytics.service

import org.springframework.beans.BeansException
import org.springframework.context.ApplicationContext
import org.springframework.context.ApplicationContextAware
import org.springframework.stereotype.Component

@Component
class StructuredReportExporter implements ApplicationContextAware{

	/** The ctx. */
	ApplicationContext ctx

	def generator

	/**
	 * Export SR document measurements into pdf
	 * 
	 * @param measurementsMap
	 * @param format
	 * @return responseStream - pdf stream
	 */
	def exportSrDoc(measurementsMap, format){

		generator = ctx.getBean("${format}Generator".toString())
		measurementsMap.each{ k, v -> getFindings("${k}",measurementsMap) }
		def responseStream = generator.clean()
		responseStream
	}


	/**
	 * Get Findings
	 * 
	 * @param docTitle -  SR Container Title
	 * @param measurementsMap
	 * @return
	 */
	def getFindings(docTitle, measurementsMap){
		generator.generateSRTitle(docTitle.toString()) // plotting docTitle
		def findingsMap = measurementsMap.get(docTitle.toString())
		def measurememts = []
		findingsMap.each { k, v ->
			measurememts.add("${k}")
		}
		generator.generateSRFindings(measurememts)
	}

	@Override
	public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
		ctx = applicationContext
	}
}

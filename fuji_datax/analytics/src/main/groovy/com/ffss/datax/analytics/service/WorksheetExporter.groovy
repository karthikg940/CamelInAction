package com.ffss.datax.analytics.service

import groovy.json.JsonSlurper

import org.springframework.beans.BeansException
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.ApplicationContext
import org.springframework.context.ApplicationContextAware
import org.springframework.stereotype.Component

import com.ffss.datax.analytics.constants.AnalyticsConstants


/**
 * Exporter.  Iterates through template and worksheet 
 * contents. Contents along with levels are passed to the 
 * generator. Levels are used to differentiate Worksheet Sections, 
 * Topics and Values respectively
 * @author  Virtusa|Polaris
 */
@Component
class WorksheetExporter implements ApplicationContextAware {

	/** The ctx. */
	ApplicationContext ctx
	
	
	@Autowired
	DicomImageExtractor dicomImageExtractor
	
	
	/**
	 * Invokes section iterator and the generator Generates Procedural Report.
	 *
	 * @param templateStr - The template content
	 * @param worksheetStr - The worksheet content
	 * @param format - The output file format
	 * 
	 */
	def export(templateStr, worksheetStr, format) {

		def template = new JsonSlurper().parseText(templateStr)
		def worksheet = new JsonSlurper().parseText(worksheetStr).wrk1
		def generator = ctx.getBean("${format}Generator".toString())
		def examOverviewSection = worksheet.examoverview
		def examOverview = [Type : examOverviewSection.type, Category : examOverviewSection.category, Exam : examOverviewSection.exam]
		generator.generate('Exam Overview', 1)
		examOverview.each {
			generator.generate(it.key, AnalyticsConstants.NUMERIC_2)
			generator.generate(it.value, AnalyticsConstants.NUMERIC_3)
		}
		template.sections.each{ exportSection(it, worksheet, generator) }
		
		//get images and pass to the generator
		def imageList = dicomImageExtractor.extractListOfImages()
		generator.generateImage(imageList)
		def responseStream = generator.finish()
		responseStream
	}


	/**
	 * Qaexport. - Geneartes QA Report
	 *
	 * @param worksheetStr the worksheet str
	 * @param format the format
	 * 
	 */
	def qaexport(worksheetStr, format) {

		def worksheet = new JsonSlurper().parseText(worksheetStr)
		def generator = ctx.getBean("${format}Generator".toString())
		def qaReport = ['Image Quality' : worksheet.quality?(worksheet.quality).toString():'-', 'Accuracy of interpretation' : worksheet.accuracy?worksheet.accuracy:'-',
			'Accuracy of interpretation compared to gold standards':worksheet.standard?worksheet.standard:'-','Comments' : worksheet.qaValue?worksheet.qaValue:'-']
		qaReport.each {
			generator.generate(it.key, AnalyticsConstants.NUMERIC_2)
			generator.generate(it.value, AnalyticsConstants.NUMERIC_3)
		}
		def responseStream = generator.finish()
		responseStream
	}


	/**
	 * Exports worksheet section.
	 *
	 * @param section - The worksheet section
	 * @param worksheet - The worksheet content
	 * @param generator - The generator
	 * @return the java.lang. object
	 */
	def exportSection(section, worksheet, generator) {
		def wrkSheetSection = worksheet[section.id]
		if (wrkSheetSection) {
			generator.generate(section.name,1)
			section.topics.each {
				exportTopic(it,wrkSheetSection,generator,1)
			}
		}
	}

	/**
	 * Exports worksheet topic.
	 *
	 * @param topic - The topic
	 * @param wrkSheetSection - The worksheet section
	 * @param generator - The generator
	 * @param level the level
	 * @return the java.lang. object
	 */
	def exportTopic(topic,wrkSheetSection,generator,level) {
		def wrkSheetTopic = wrkSheetSection[topic.id]
		if (wrkSheetTopic) {
			generator.generate(topic.name,level+1)
			if (topic.type == 'single-select') {
				def wrkSheetOption = wrkSheetTopic.value?wrkSheetTopic.value[topic.id]:null
				if (wrkSheetOption) {
					def wrkshtOption = wrkSheetOption.toString()[0].toUpperCase() +
							wrkSheetOption.toString()[1..-1]
					generator.generate(wrkshtOption,level+AnalyticsConstants.NUMERIC_2)
				}
			}
			else {
				topic.options.each {
					def wrkSheetOption = wrkSheetTopic.value?wrkSheetTopic.value[it.id]:null
					if (wrkSheetOption) {
						generator.generate(it.name.toString(),level+AnalyticsConstants.NUMERIC_2)
					}
					if (it.topics) {
						it.topics.each {
							exportTopic(it,wrkSheetTopic.value?:wrkSheetTopic,generator,level+AnalyticsConstants.NUMERIC_2)
						}
					}
				}
			}
			if (topic.type == 'text' || topic.type == 'text-number') {
				def wrkSheetValue = wrkSheetTopic.value
				generator.generate(wrkSheetValue,level+AnalyticsConstants.NUMERIC_2)
			}
			if (topic.topics) {
				topic.topics.each {
					exportTopic(it,wrkSheetTopic,generator,level+1)
				}
			}
		}
	}

	/* (non-Javadoc)
	 * @see org.springframework.context.ApplicationContextAware#setApplicationContext(org.springframework.context.ApplicationContext)
	 */
	@Override
	void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
		ctx = applicationContext
	}
}

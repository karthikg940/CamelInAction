package com.ffss.datax.worksheet.web.validator

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component

import com.ffss.datax.worksheet.repository.ExamTypeRepository
import com.ffss.datax.worksheet.repository.WorksheetTemplateRepository

import groovy.util.logging.Log4j

/**
 * The Class WorksheetValidator.
 */
@Log4j
@Component
class WorksheetValidator {

	/** The worksheet template repository. */
	@Autowired
	WorksheetTemplateRepository worksheetTemplateRepository

	/** The exam type repository. */
	@Autowired
	ExamTypeRepository examTypeRepository
	
	/** The Constant TEMPLATE. */
	static final TEMPLATE = 'template'

	/** The ret val. */
	def retVal

	/**
	 * Validate.
	 *
	 * @param worksheet the worksheet
	 * @return the java.lang. object
	 */
	def validate(worksheet) {
		def retVal = []
		['validateTemplate', 'validateContent'].each {
			def validationData = this."${it}"(worksheet)
			if (!validationData.valid) {
				retVal.addAll(validationData.errors)
			}
		}
		retVal
	}

	/**
	 * Validate template.
	 *
	 * @param worksheet the worksheet
	 * @return the java.lang. object
	 */
	def validateTemplate(worksheet) {
		def retVal=[valid:true,errors:[]]
		// TODO - Add error codes
		if (!worksheet.template) {
			retVal.valid = false
			retVal.errors.add([field:TEMPLATE])
		}
		else if (!worksheetTemplateRepository.findOne(worksheet.template.id.asType(Long))) {
			retVal.valid = false
			retVal.errors.add([field:TEMPLATE])
		}
		retVal
	}

	/**
	 * Validate content.
	 *
	 * @param worksheet the worksheet
	 * @return the java.lang. object
	 */
	def validateContent(worksheet) {
		log.info("Worksheet data ${worksheet} for validation")
		[valid:true]
	}



}

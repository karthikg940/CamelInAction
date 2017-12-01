package com.ffss.datax.worksheet.web.transformer

import groovy.json.JsonSlurper

import org.springframework.stereotype.Component

import com.ffss.datax.common.domain.worksheet.WorksheetTemplate

@Component
class WorksheetTemplateTransformer {

	def transform(worksheet,typeFlag) {
		if(typeFlag){
			[
				results:transformqaAll(worksheet)
			]
		}
		else{
			[
				results:transformAll(worksheet)

			]
		}
	}

	def transformAll(worksheet) {

		worksheet.collect { [id:it.id,name:it.templateName]}
	}

	def transformTemplate(worksheetTemplate){
		[
			result:transformContent(worksheetTemplate)
		]
	}
	def transformContent(WorksheetTemplate worksheetTemplate){

		def json = new JsonSlurper().parseText(worksheetTemplate.templateContent)

		[id:worksheetTemplate.id,name:worksheetTemplate.templateName,content:json]
	}

	def transformQa(qaworksheet) {
		[
			results:transformqaAll(qaworksheet)
		]
	}

	def transformqaAll(qaworksheet) {

		qaworksheet.collect { [id:it.worksheetTemplate.id,name:it.worksheetTemplate.templateName]}
	}
}

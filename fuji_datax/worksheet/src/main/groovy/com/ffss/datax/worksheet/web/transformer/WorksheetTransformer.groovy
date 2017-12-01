package com.ffss.datax.worksheet.web.transformer

import groovy.json.JsonSlurper

import org.joda.time.format.DateTimeFormat
import org.joda.time.format.DateTimeFormatter
import org.springframework.stereotype.Component

import com.ffss.datax.worksheet.constants.WorksheetConstants

@Component
class WorksheetTransformer {

	static DateTimeFormatter formatter = DateTimeFormat.forPattern(WorksheetConstants.DATEFORMAT_MONTH)
	def transformOne(worksheet) {
		[id:worksheet.id,template:[id:worksheet.template.id,name:worksheet.template.templateName,content:new JsonSlurper().parseText(worksheet.template.templateContent)],
			examType:[id:worksheet.examType?.id,name:worksheet.study.studyExamTypeMap?worksheet.study.studyExamTypeMap.examTypeMap.examTypeDesc:''],
			content:new JsonSlurper().parseText(worksheet.content),
			assignToUserId:[id:worksheet.assignToUserId?.id,SubmittedDocName:worksheet.assignToUserId?.id]]
	}
	def deleteWorkSheetTrans(status) {
		[status:status]
	}
}
 
package com.ffss.datax.study.content.generator

import org.springframework.stereotype.Component

import com.ffss.datax.common.domain.worksheet.Worksheet

@Component
class GeneratorPluginRegistry {

	def acepRegistry = [:]
	def customRegistry = [:]

	def register(type, worksheet, obj) {
		if (type == WorkSheetType.ACEP) {
			acepRegistry.put(worksheet instanceof Worksheet?worksheet.study.studyExamTypeMap.examTypeMap.examTypeDesc:worksheet, obj)
		} else {
			customRegistry.put(type, obj)
		}
	}

	def get(worksheetType, examType) {
		def registry = acepRegistry
		if (worksheetType == WorkSheetType.CUSTOM) {
			registry = customRegistry
		}
		registry.containsKey(examType)?registry.get(examType):registry.get("Default")
	}
}

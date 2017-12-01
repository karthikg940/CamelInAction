package com.ffss.datax.study.content.generator

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component

import com.ffss.datax.study.content.generator.plugin.GeneratorPlugin

@Component
class GeneratorFactory {

	@Autowired
	GeneratorPluginRegistry pluginRegistry
	
	GeneratorPlugin getGenerator(worksheetType, examType) {
		pluginRegistry.get(worksheetType, examType)
	}
}

package com.ffss.datax.study.content.generator.plugin

import javax.annotation.PostConstruct

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component

import com.ffss.datax.study.content.generator.GeneratorPluginRegistry
import com.ffss.datax.study.content.generator.WorkSheetType

@Component
class DefaultACEPGeneratorPlugin extends AbstractACEPGeneratorPlugin {

	@Autowired
	GeneratorPluginRegistry pluginRegistry


	@Override
	public Object transformOther(Object data) {
		// TODO Auto-generated method stub
		return "";
	}

	@PostConstruct
	def register() {
		pluginRegistry.register(WorkSheetType.ACEP, "Default", this)
	}
}

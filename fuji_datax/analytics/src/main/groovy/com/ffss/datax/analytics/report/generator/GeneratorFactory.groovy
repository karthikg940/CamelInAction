package com.ffss.datax.analytics.report.generator

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component

@Component
class GeneratorFactory {

	@Autowired
	GeneratorPluginRegistry pluginRegistry
	
	/**
	 * Fetch plugin based on the priority. Top priority is for 
	 * template based sr type followed by device based and sopClass 
	 * based type.
	 * 
	 * @param template, deviceAssistant, sopClass - Types of SR 
	 * @return plugin 
	 */
	def get(template, deviceAssistant, sopClass) {
		
		def plugin = null
		if (template) {
			plugin = pluginRegistry.getPluginForTemplate(template)
		}
		if (!plugin && deviceAssistant) {
			plugin = pluginRegistry.getPluginForDevice(deviceAssistant)
		}
		if (!plugin && sopClass) {
			plugin = pluginRegistry.getPluginForSOP(sopClass)
		}
		plugin
	}
}

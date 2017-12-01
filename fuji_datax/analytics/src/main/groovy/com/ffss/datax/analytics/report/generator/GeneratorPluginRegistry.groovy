package com.ffss.datax.analytics.report.generator

import org.springframework.stereotype.Component

@Component
class GeneratorPluginRegistry {

	def deviceRegistry = [:]
	def templateRegistry = [:]
	def sopRegistry = [:]

	/**
	 * Register
	 * 
	 * @param srType
	 * @param pluginType
	 * @param plugin
	 */
	def register(srType, pluginType, plugin){

		if (srType == SRType.Device) {
			deviceRegistry.put(pluginType,plugin)
		}
		else if(srType == SRType.Template) {
			templateRegistry.put(pluginType,plugin)
		}
		else if(srType == SRType.Sop){
			sopRegistry.put(pluginType,plugin)
		}
	}

	/**
	 * Get Plugin for template
	 * 
	 * @param template
	 */
	def getPluginForTemplate(template) {
		templateRegistry.get(template)
	}

	/**
	 * Get Plugin for device
	 * 
	 * @param deviceAssistant
	 */
	def getPluginForDevice(deviceAssistant) {
		deviceRegistry.get(deviceAssistant)
	}

	/**
	 * Get Plugin for sopClass
	 * 
	 * @param clazz
	 */
	def getPluginForSOP(clazz) {
		sopRegistry.get(clazz)
	}
}

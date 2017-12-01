package com.ffss.datax.vnasync.mapper;

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component

@Component
class TagExtractorClassFactory {

	private static def plugins = [:]

	@Autowired
	DefaultTagExtractor defaultTagExtractor

	def getTagExtractor(name){
		def extractor = defaultTagExtractor
		if (name){
			plugins.each { key, value ->
				if (name.toLowerCase().contains(key)) {
					extractor = value
				}
			}
		}
		extractor
	}

	static register(name, clazz) {
		plugins.put(name, clazz)
	}
}

package com.ffss.datax.study.content.generator.plugin;

public interface GeneratorPlugin {

	def register()
	
	def transform(data)
}

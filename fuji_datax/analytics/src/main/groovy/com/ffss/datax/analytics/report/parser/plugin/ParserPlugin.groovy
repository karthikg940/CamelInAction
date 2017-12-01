package com.ffss.datax.analytics.report.parser.plugin

interface ParserPlugin {
	def register()
	def transform(data)
}

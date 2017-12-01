package com.ffss.datax.analytics.report.parser.plugin

import org.springframework.beans.factory.annotation.Autowired
import com.ffss.datax.common.vnasync.mapper.DeviceStrategy

abstract class AbstractDeviceParserPlugin implements ParserPlugin {

	@Autowired
	DeviceStrategy deviceStrategy

	def getFileStream(studyId){
		def dcmStreamList = deviceStrategy.getMapperForStudy(studyId, true)
	}
}

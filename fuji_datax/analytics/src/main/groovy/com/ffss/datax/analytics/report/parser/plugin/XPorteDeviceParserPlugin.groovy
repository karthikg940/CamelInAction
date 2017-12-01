package com.ffss.datax.analytics.report.parser.plugin

import javax.annotation.PostConstruct

import org.dcm4che3.data.Attributes
import org.dcm4che3.data.Tag
import org.dcm4che3.data.Sequence
import org.dcm4che3.io.DicomInputStream
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component

import com.ffss.datax.analytics.constants.AnalyticsConstants
import com.ffss.datax.analytics.report.generator.GeneratorPluginRegistry
import com.ffss.datax.analytics.report.generator.SRType

@Component
class XPorteDeviceParserPlugin extends AbstractDeviceParserPlugin {

	@Autowired
	GeneratorPluginRegistry pluginRegistry

	@PostConstruct
	def register() {
		pluginRegistry.register(SRType.Device, AnalyticsConstants.X_PORTE, this)
	}

	/**
	 * Fetch and read the SR based on studyId
	 * and transforms the measurements into a map
	 *
	 * @param studyId
	 * @return findingsMap
	 */
	def transform(studyId) {

		def dcmStreamList = getFileStream(studyId)
		def srTitle
		def findingsMap = [:]
		def measurementMap = [:]
		def sequenceList = []
		if(dcmStreamList.size() > 0){

			dcmStreamList.each{ fileStream ->
				Attributes attributes = new DicomInputStream(fileStream).readDataset(-1, -1)
				attributes.values.each{
					if(it instanceof Sequence){
						sequenceList.add(it)
					}
				}
				srTitle =  sequenceList[0].get(0).getString(Tag.CodeMeaning)
				sequenceList[1].each{ data ->
					def vrs = data.vrs
					def myData = [:]
					vrs.eachWithIndex {value, index->
						switch (value) {
							case "CS":
								myData.put(AnalyticsConstants.CODE+index, new String(data.values[index]))
								break
							case "SQ":
								myData.put(AnalyticsConstants.CODE_VALUE, data.values[index][0].getString(Tag.CodeValue))
								myData.put(AnalyticsConstants.CODING_SCHEME_DESIGNATOR, data.values[index][0].getString(Tag.CodingSchemeDesignator))
								myData.put(AnalyticsConstants.CODE_MEANING, data.values[index][0].getString(Tag.CodeMeaning))
								break
							case "UT":
								myData.put(AnalyticsConstants.TEXT_VALUE, new String(data.values[index]))
								break
							case "PN":
								myData.put(AnalyticsConstants.TEXT_VALUE, new String(data.values[index]))
								break
							default:
								break
						}
					}
					findingsMap.put(myData.get(AnalyticsConstants.TEXT_VALUE), ['CodeValue':myData.get(AnalyticsConstants.CODE_VALUE), 'CodingSchemeDesignator':myData.get(AnalyticsConstants.CODING_SCHEME_DESIGNATOR), 'CodeMeaning' :myData.get(AnalyticsConstants.CODE_MEANING)])
				}
			}
		}
		measurementMap.put(srTitle, findingsMap)
		
	 measurementMap
	}
}

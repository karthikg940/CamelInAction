package com.ffss.datax.analytics.test.sr

import org.dcm4che3.data.Attributes
import org.dcm4che3.data.Sequence
import org.dcm4che3.data.Tag
import org.dcm4che3.io.DicomInputStream
import org.springframework.util.ResourceUtils

import spock.lang.Specification

class SRParserSpec extends Specification{


	def "Structured Report - Measurement validation" (expectedOutput) {

		def sequenceList = []

		given: "we have an sr report with some measurements"

		File file = ResourceUtils.getFile(this.getClass().getResource("/reports/SRRPRT0"))

		when: "we read its content"

		Attributes attributes = new DicomInputStream(file).readDataset(-1, -1)
		attributes.values.each{
			if(it instanceof Sequence){
				sequenceList.add(it)
			}
		}

		def findingsMap = [:]

		sequenceList[1].each{ data ->
			def vrs = data.vrs
			def myData = [:]
			vrs.eachWithIndex {value, index->
				switch (value) {
					case "CS":
						myData.put("Code"+index, new String(data.values[index]))
						break
					case "SQ":
						myData.put("CodeValue", data.values[index][0].getString(Tag.CodeValue))
						myData.put("CodingSchemeDesignator", data.values[index][0].getString(Tag.CodingSchemeDesignator))
						myData.put("CodeMeaning", data.values[index][0].getString(Tag.CodeMeaning))
						break
					case "UT":
						myData.put("TextValue", new String(data.values[index]))
						break
					case "PN":
						myData.put("TextValue", new String(data.values[index]))
						break
					default:
						break
				}
			}
			findingsMap.put(myData.get('TextValue'), ['CodeValue':myData.get('CodeValue'), 'CodingSchemeDesignator':myData.get('CodingSchemeDesignator'), 'CodeMeaning' :myData.get('CodeMeaning')])
		}

		then: "we compare the read data with the expected data structure"

		assert expectedOutput.size() ==  findingsMap.size()

		where:
		expectedOutput << [SRResultsData.testSRData.get('Cardiac')]
	}
}




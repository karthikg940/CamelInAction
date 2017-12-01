package com.ffss.datax.vnasync.mapper

import org.dcm4che2.data.Tag
import org.springframework.stereotype.Component

@Component
class DefaultTagExtractor {

	def extract(dcmObject) {
		dcmObject.getString(Tag.StudyDescription)
	}
}

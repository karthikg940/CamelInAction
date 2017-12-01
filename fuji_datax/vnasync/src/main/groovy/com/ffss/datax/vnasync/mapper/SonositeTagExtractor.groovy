package com.ffss.datax.vnasync.mapper

import javax.annotation.PostConstruct

import org.dcm4che2.data.Tag
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component

@Component
class SonositeTagExtractor {

	@Autowired
	TagExtractorClassFactory tagExtractorClassFactory

	@PostConstruct
	def register(){
		tagExtractorClassFactory.register("sonosite", this)
		tagExtractorClassFactory.register("fuji", this)
	}

	def extract(dcmObject) {
		def examType = dcmObject.getString(Tag.StudyDescription)
		if(!examType){
			String[] imageType = dcmObject.getStrings(Tag.ImageType)
			if(imageType)
				examType = imageType[imageType.length-2]
		}
		examType
	}
}

package com.ffss.datax.vnasync.test.web.resource

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.context.ContextConfiguration
import org.springframework.transaction.annotation.Transactional;

import spock.lang.Ignore
import spock.lang.Specification

import com.ffss.datax.vnasync.VnaSyncApplication
import com.ffss.datax.vnasync.config.VnaSyncConfiguration
import com.ffss.datax.vnasync.repository.ExamTypeDeviceMapRepository
import com.ffss.datax.vnasync.repository.ExamWorksheetTemplateRepository
import com.ffss.datax.vnasync.repository.StudyExamTypeRepository;
import com.ffss.datax.vnasync.repository.StudyRepository

@ContextConfiguration(classes = VnaSyncApplication.class)
@SpringBootTest
class DicomFrameNumberSpec extends Specification {

	@Autowired
	VnaSyncConfiguration vnaSyncConfiguration
	
	@Autowired
	StudyRepository studyRepository
	
	def ' Getting the frame number for the image'(){
		given: ' VNA receives a study with more than one frame'
		
		when:'the study is synchronized'
		vnaSyncConfiguration.perform()
		
		then: ' the frame count of that study has been correctly identified in the application'
		def study =  studyRepository.getFrameCountForStudyImage(76002L)
		assert study.sopInstance[0].frameCount == 10
		
	}
}

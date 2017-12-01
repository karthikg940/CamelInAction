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
class DicomMappingSpec extends Specification {

	@Autowired
	VnaSyncConfiguration vnaSyncConfiguration
	
	@Autowired
	StudyRepository studyRepository
	
	@Autowired
	ExamWorksheetTemplateRepository examWorksheetTemplateRepository
	
	@Autowired
	StudyExamTypeRepository studyExamTypeRepository
	
	def ' Mapping examtype to the study during vnasync'(){
		
		def study,examType,saveExamTypeforStudy
		
		given:' All dicom configuration setUp is done and scanning a patient having cardiac as the examtype'
		
		vnaSyncConfiguration.perform()
		
		when:' you view the study in DataX'
		
		study =  studyRepository.getExamTypeForStudy(76001L)
		then:' That study will be assigned a cardiac examtype'
		
		assert study.studyExamTypeMap.examTypeMap.examTypeDesc == 'Cardiac'
		
		and:' Taking another study with another exam type'
		
		def anotherStudy =  studyRepository.getExamTypeForStudy(76002L)
		
		when:' the echocardiac examtype has been mapped to Cardiac in dataX DB if matched'
		
		then:' That study will be assigned a cardiac examtype'
		
		assert anotherStudy.studyExamTypeMap.examTypeMap.examTypeDesc == 'Cardiac'
		
		and:' When requesting a worksheet for the study'
		
		def template = examWorksheetTemplateRepository.findByExamTypeMapExamTypeDesc('Cardiac')
		then:' it will show only templates which belong to the cardiac examtype'
		
		assert template.size() == 2
		
	}
	
	def ' Mapping un_specified examtype if the examtype mapping is not found'(){
		def study
		given:' All dicom configuration setup is done and scanning a patient having Renal as the examtype'
		when:' the renal examType is not found in DataX DB'
		
		study =  studyRepository.getExamTypeForStudy(76000000000002L)
		then:' That study examtype will be assigned a Unspecified examtype'
		
		assert study == null
		and:' When requesting a worksheet for the study'
		
		def template = examWorksheetTemplateRepository.findAll()
		then:' it will show all templates which is available in  DataX DB'
		assert template.size() == 6
		
	}
}

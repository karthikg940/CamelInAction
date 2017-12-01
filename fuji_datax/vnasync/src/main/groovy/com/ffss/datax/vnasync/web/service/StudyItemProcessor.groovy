package com.ffss.datax.vnasync.web.service

import groovy.util.logging.*

import org.dcm4che2.data.DicomObject
import org.dcm4che2.data.Tag
import org.dcm4che2.io.DicomInputStream
import org.hibernate.Query
import org.hibernate.Session
import org.springframework.batch.item.ItemProcessor
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.Configuration
import org.springframework.dao.DataAccessException
import org.springframework.orm.hibernate5.HibernateTemplate

import com.ffss.datax.common.domain.study.Study
import com.ffss.datax.common.domain.study.StudyExamTypeMap
import com.ffss.datax.common.vnasync.mapper.DeviceStrategy
import com.ffss.datax.vnasync.mapper.TagExtractorClassFactory;
import com.ffss.datax.vnasync.repository.ExamTypeDeviceMapRepository
import com.ffss.datax.vnasync.repository.ExamTypeRepository
import com.ffss.datax.vnasync.repository.StudyRepository

/**
 * 
 * @author Virtusa|Polaris
 *
 */
@Log4j
@Configuration
class StudyItemProcessor implements ItemProcessor<Study,Study>{

	@Autowired
	HibernateTemplate template

	@Autowired
	StudyRepository studyRepository

	@Autowired
	DeviceStrategy deviceStrategy

	@Autowired
	ExamTypeRepository examTypeRepository

	@Autowired
	ExamTypeDeviceMapRepository examTypeDeviceMapRepository

	@Autowired
	TagExtractorClassFactory tagExtractorClassFactory
	@Override
	Study process(Study item) throws DataAccessException {
		Long studyid = item.id
		String stmo = item.stmo

		Session session = template.sessionFactory.openSession()
		Query query = session.createQuery(
				'select count(*) from Study study where study.id=:studyId')
		query.setLong('studyId', studyid)
		Long count = (Long)query.uniqueResult()

		Query queryOrgFk = session.createQuery(
				'select id from Organization organization where organization.orgName=:stmoName')
		queryOrgFk.setString('stmoName', stmo)

		Long orgFk = (Long)queryOrgFk.uniqueResult()
		item.setOrgFk(orgFk)
		if(count==0){
			template.saveOrUpdate(item)
		}

		Query studyExamtype = session.createQuery(
				'select study.studyExamTypeMap from Study study where study.id=:studyId')
		studyExamtype.setLong('studyId', studyid)
		StudyExamTypeMap examTypeMap = (StudyExamTypeMap)studyExamtype.uniqueResult()

		if(!examTypeMap){
			def mappedExamType = mapExamType(item,item.description)
			if(mappedExamType){
				item.studyExamTypeMap = mappedExamType
				template.saveOrUpdate(item)
			}
		}
		session.close()
		item
	}


	public def mapExamType(Study study,String examType) {
		def dcmStreamList,dcmStream
		if (!examType) {
			dcmStreamList = deviceStrategy.getMapperForStudy(study.id,false)
			if(dcmStreamList.size() > 0){
				def stream =  dcmStreamList.get(0)
				dcmStream = new DicomInputStream(stream)
				DicomObject dcmObject = dcmStream.readDicomObject()
				if(dcmObject)
					examType = tagExtractorClassFactory.getTagExtractor(dcmObject.getString(Tag.Manufacturer)).extract(dcmObject)
			}
		}

		def aliasMapper
		aliasMapper = examTypeDeviceMapRepository.findByAliasNameIgnoreCase(examType)
		def mappedExamType = null
		if(aliasMapper){
			mappedExamType = new StudyExamTypeMap(study:study,
			examTypeMap:examTypeRepository.findOne(aliasMapper.examTypeMap.id))
		} else{
			def exam = examTypeRepository.findByExamTypeDescIgnoreCase(examType)
			if(exam) {
				mappedExamType = new StudyExamTypeMap(study:study,
				examTypeMap:examTypeRepository.findOne(exam.id))
			}
		}
		if(mappedExamType)
			template.saveOrUpdate(mappedExamType)
		mappedExamType
	}
}

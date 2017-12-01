package com.ffss.datax.vnasync.web.service

import groovy.util.logging.*

import org.hibernate.HibernateException
import org.hibernate.Query
import org.hibernate.Session
import org.springframework.batch.item.ItemProcessor
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.Configuration
import org.springframework.dao.DataAccessException
import org.springframework.orm.hibernate5.HibernateTemplate

import com.ffss.datax.common.domain.study.SopInstance
import com.ffss.datax.common.vnasync.mapper.DeviceStrategy;


/**
 * 
 * @author Virtusa|Polaris
 *
 */
@Log4j
@Configuration
class SopItemProcessor implements ItemProcessor<SopInstance,SopInstance>{

	@Autowired
	private HibernateTemplate template

	@Autowired
	DeviceStrategy deviceStrategy

	@Override
	SopInstance process(SopInstance item) throws DataAccessException {
		Long sopInstanceid = item.id
		Session session = template.sessionFactory.openSession()
		try{
			Query query = session.createQuery(
					'select count(*) from SopInstance sopInstance where sopInstance.id=:orgid')
			query.setLong('orgid', sopInstanceid)
			Long count = (Long)query.uniqueResult()
			frameNumberForInstance(item)
		}catch(HibernateException e) {
			log.error('Exception :',e)
		}finally{
			session.close()
		}
		item
	}

	def frameNumberForInstance(sopInstance){

		def frameCount = deviceStrategy.getFrameNumberForDicomFile(sopInstance)
		frameCount?frameCount:(frameCount =0)
		sopInstance.frameCount = frameCount.asType(Long)
		template.saveOrUpdate(sopInstance)
	}
}

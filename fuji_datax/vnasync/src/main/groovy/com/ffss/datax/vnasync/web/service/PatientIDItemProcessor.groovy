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

import com.ffss.datax.common.domain.study.PatientIdentifier


/**
 * 
 * @author Virtusa|Polaris
 *
 */
@Log4j
@Configuration
class PatientIDItemProcessor implements ItemProcessor<PatientIdentifier,PatientIdentifier>{

	@Autowired
	private HibernateTemplate template

	@Override
	PatientIdentifier process(PatientIdentifier item) throws DataAccessException {
		Long orgid = item.id

		Session session = template.sessionFactory.openSession()
		try{
			Query query = session.createQuery(
					'select count(*) from PatientIdentifier patient where patient.id=:orgid')
			query.setLong('orgid', orgid)
			Long count = (Long)query.uniqueResult()
			if(count> 0) {

				template.saveOrUpdate(item)

				return null
			}
		}catch(HibernateException e) {
			log.error('Exception :',e)
		}finally{
			session.close()
		}
		item
	}
}

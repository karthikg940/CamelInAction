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

import com.ffss.datax.common.domain.study.Series
/**
 * 
 * @author Virtusa|Polaris
 *
 */
@Log4j
@Configuration
class SeriesItemProcessor implements ItemProcessor<Series,Series>{

	@Autowired
	private HibernateTemplate template
	
	@Override
	Series process(Series item) throws DataAccessException {
		Long seriesid = item.id

		Session session = template.sessionFactory.openSession()
		try{
			Query query = session.createQuery(
					'select count(*) from Series series where series.id=:orgid')
			query.setLong('orgid', seriesid)
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

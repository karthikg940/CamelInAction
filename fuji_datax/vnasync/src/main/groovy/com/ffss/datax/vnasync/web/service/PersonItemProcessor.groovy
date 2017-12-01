package com.ffss.datax.vnasync.web.service

import org.hibernate.Query
import org.hibernate.Session
import org.springframework.batch.item.ItemProcessor
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.Configuration
import org.springframework.orm.hibernate5.HibernateTemplate

import com.ffss.datax.common.domain.study.Person

/**
 * 
 * @author Virtusa|Polaris
 *
 */
@Configuration
class PersonItemProcessor implements ItemProcessor<Person,Person>{

	@Autowired
	private HibernateTemplate template

	@Override
	Person process(Person item) throws Exception {
		Long personid = item.id

		Session session = template.sessionFactory.openSession()

		Query query = session.createQuery(
				'select count(*) from Person person where person.id=:orgid')
		query.setLong('orgid', personid)
		Long count = (Long)query.uniqueResult()
		if(count> 0) {

			template.saveOrUpdate(item)

			return null
		}
		session.close()
		item
	}
}

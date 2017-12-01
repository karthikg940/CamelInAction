package com.ffss.datax.vnasync.web.service


import org.hibernate.Query
import org.hibernate.Session
import org.springframework.batch.item.ItemProcessor
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.Configuration
import org.springframework.orm.hibernate5.HibernateTemplate

import com.ffss.datax.common.domain.userprofile.Organization


/**
 * 
 * @author Virtusa|Polaris
 *
 */
@Configuration
class OrganizationItemProcessor implements ItemProcessor<Organization,Organization> {

	//private static final Logger log = LoggerFactory.getLogger(PersonItemProcessor.class)

	@Autowired
	private HibernateTemplate template

	@Override
	Organization process(final Organization  org) throws Exception {
		Long orgid = org.id

		Session session = template.sessionFactory.openSession()

		Query query = session.createQuery(
				'select count(*) from Organization org where org.id=:orgid')
		query.setLong('orgid', orgid)
		Long count = (Long)query.uniqueResult()


		if(count> 0) {

			template.saveOrUpdate(org)

			return null

		}


		session.close()
		org
	}

}


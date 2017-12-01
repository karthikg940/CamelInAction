/**
 * Copyright (c) 2017 Eli Lilly and Company.  All rights reserved.
 */
package com.lilly.esb.iep.fileservices.processor;

import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

import org.apache.camel.Exchange;
import org.apache.camel.Processor;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.orm.hibernate3.HibernateTemplate;

import com.lilly.esb.iep.fileservices.constants.Constants;

 
/**
 * Gets sql query from sharepoint,process the extracted resultset
 * 
 */
public class DataSourceProcessor implements Processor  {
	
	private static final String YES = "Yes";
	
	private static final String HASH = "#";
	
	private static final Logger LOGGER = LoggerFactory
            .getLogger(DataSourceProcessor.class);
	
    HibernateTemplate hibernateTemplate;
	
	public HibernateTemplate getHibernateTemplate() {
		return hibernateTemplate;
	}

	public void setHibernateTemplate(HibernateTemplate hibernateTemplate) {
		this.hibernateTemplate = hibernateTemplate;
	}

	/**
	 * process and set the result to exchange body as list
	 * @param Exchange object
	 */
	@Override
	public void process(Exchange exchange) throws Exception {
		LOGGER.info("Method Entry : DataSourceProcessor.process");
		String sql=exchange.getProperty(Constants.SQL_QUERY).toString();
		SessionFactory sessionFactory = hibernateTemplate.getSessionFactory();
		Session session = sessionFactory.openSession();
		long start = System.currentTimeMillis();
		SQLQuery sqlQuery = session.createSQLQuery(sql);
		long end = System.currentTimeMillis();
		LOGGER.info("Time taken for query execution " + (end - start));
		//	Referring the custom implementation of AliasToEntityMapResultTransformer
		//	To retain the column ordering the SQL ResultSet
		sqlQuery.setResultTransformer(AliasToEntityLinkedHashMapResultTransformer.INSTANCE);
		start = System.currentTimeMillis();
		List<LinkedHashMap<String, String>> list = sqlQuery.list();
		end = System.currentTimeMillis();
		LOGGER.info("Time taken for resultset extraction " + (end - start));
		if(YES.equalsIgnoreCase((String)exchange.getProperty(Constants.INCLUDE_HEADER)) && !list.isEmpty()) {
			LinkedHashMap<String, String> firstRecord = list.get(0);
			LinkedHashMap<String, String> headerRecord = new LinkedHashMap<String, String>();
			Set entrySet = firstRecord.entrySet();
			Iterator entrySetIter = entrySet.iterator();
			boolean firstField = true;
			while(entrySetIter.hasNext()) {
				Entry<String, String> entry = (Entry<String, String>) entrySetIter.next();
				if(firstField)
					headerRecord.put(entry.getKey(), HASH + entry.getKey());
				else
					headerRecord.put(entry.getKey(), entry.getKey());
				firstField = false;					
			}
			list.add(0, headerRecord);
			LOGGER.info("Header record added to the original data list ");
		}
		exchange.getIn().setBody(list);
		session.close();
	}


}
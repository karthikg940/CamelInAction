
/**
 * Copyright (c) 2017 Eli Lilly and Company.  All rights reserved.
 */

package com.lilly.esb.iep.sip.aggregator;

import java.util.ArrayList;

import org.apache.camel.Exchange;
import org.apache.camel.processor.aggregate.AggregationStrategy;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.lilly.esb.iep.sip.constants.Constants;

/**
 * Aggregates and returns list of Breadcrumb Id's of Failed Studies and those caught with Validation Exception.
 * @author C241920
 *
 */
public class ExceptionAggregator implements AggregationStrategy  {
	
	private final static Logger LOGGER = LoggerFactory
			.getLogger(ExceptionAggregator.class);

	@Override
	public Exchange aggregate(Exchange oldExchange, Exchange newExchange) {

		Boolean studyFailureFlag = newExchange.getProperty(Constants.STUDY_CREATE_FAILURE_FLAG, Boolean.class);
		Boolean sponsorFailureFlag = newExchange.getProperty(Constants.SPONSOR_CREATE_FAILURE_FLAG, Boolean.class);
		String breadcrumbId = (String) newExchange.getProperty(Constants.BREADCRUMB_ID);
		Object exception = newExchange.getProperty(Exchange.EXCEPTION_CAUGHT);
		ArrayList<String> listOfServiceNowTicket = null;
		LOGGER.info("exception " + exception + " studyFailureFlag " + studyFailureFlag+" sponsorFailureFlag " + sponsorFailureFlag );
		if (oldExchange == null)
		{
			if(studyFailureFlag!=null && sponsorFailureFlag!=null)
			{
				listOfServiceNowTicket = new ArrayList<String>();
					if (exception != null || studyFailureFlag  || sponsorFailureFlag)  
					{ 
						listOfServiceNowTicket.add(breadcrumbId);
					}
				newExchange.getIn().setBody(listOfServiceNowTicket);
				LOGGER.info("newExchange " + listOfServiceNowTicket);	
			}
			return newExchange;		
		} 
		else 
		{
			if(studyFailureFlag!=null  && sponsorFailureFlag!=null)
			{
				if (exception != null || studyFailureFlag  || sponsorFailureFlag)
				{
					listOfServiceNowTicket = oldExchange.getIn().getBody(ArrayList.class);
					listOfServiceNowTicket.add(breadcrumbId);
				}
				LOGGER.info("oldExchange " + listOfServiceNowTicket);
			}	
			return oldExchange;
		}
	}

}

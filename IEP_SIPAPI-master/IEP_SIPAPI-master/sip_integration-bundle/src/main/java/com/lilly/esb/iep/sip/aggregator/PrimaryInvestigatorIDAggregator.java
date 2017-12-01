/**
* Copyright (c) 2017 Eli Lilly and Company.  All rights reserved.
*/

package com.lilly.esb.iep.sip.aggregator;

import java.util.ArrayList;

import org.apache.camel.Exchange;
import org.apache.camel.processor.aggregate.AggregationStrategy;

import com.microsoft.schemas.ado._2007._08.dataservices.PrimaryInvestigatorMapping;

/**
 * Aggregates the PrimaryMapping object into list 
 * 
 * @author C241254
 *
 */



public class PrimaryInvestigatorIDAggregator implements AggregationStrategy {

	/**
	 * Aggregates the oldExchange object with newExchange object and return exchange object
	 *
	 */
	@Override
	public Exchange aggregate(Exchange oldExchange, Exchange newExchange) {

		PrimaryInvestigatorMapping primaryInvestigatorMappingEntry = newExchange.getIn()
				.getBody(PrimaryInvestigatorMapping.class);

		ArrayList<PrimaryInvestigatorMapping> primaryInvestigatorMappingList = null;
		if (oldExchange == null) {

			primaryInvestigatorMappingList = new ArrayList<PrimaryInvestigatorMapping>();
			primaryInvestigatorMappingList.add(primaryInvestigatorMappingEntry);

			newExchange.getIn().setBody(primaryInvestigatorMappingList);
			return newExchange;
		} else {

			primaryInvestigatorMappingList = oldExchange.getIn().getBody(ArrayList.class);
			primaryInvestigatorMappingList.add(primaryInvestigatorMappingEntry);

			return oldExchange;
		}
		 

	}
}

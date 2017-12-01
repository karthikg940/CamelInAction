/**
* Copyright (c) 2017 Eli Lilly and Company.  All rights reserved.
*/

package com.lilly.esb.iep.sip.aggregator;

import org.apache.camel.Exchange;
import org.apache.camel.processor.aggregate.AggregationStrategy;

import com.lilly.esb.iep.sip.constants.Constants;


/**
 * 
 * Aggregates the data for Study Update Entry time split process
 * 
 * @author C241254
 *
 */
public class SharePointEntryAggregator implements AggregationStrategy {

	@Override
	public Exchange aggregate(Exchange oldExchange, Exchange newExchange) {

		if (oldExchange == null) {
			return newExchange;
		}
		
		String oldBody = oldExchange.getIn().getBody(String.class);
		String newBody = newExchange.getIn().getBody(String.class);
		String body = oldBody + newBody;
		oldExchange.getIn().setBody(body);
		return oldExchange;

	}

}

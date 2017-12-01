/**
* Copyright (c) 2017 Eli Lilly and Company.  All rights reserved.
*/

package com.lilly.esb.iep.sip.aggregator;

import java.util.ArrayList;

import org.apache.camel.Exchange;
import org.apache.camel.processor.aggregate.AggregationStrategy;

import com.microsoft.schemas.ado._2007._08.dataservices.FacilityMapping;

/**
 * Aggregates the facilityMapping object into list 
 * 
 * @author C241254
 *
 */


public class FacilityIDAggregator implements AggregationStrategy {
	
	/**
	 * Aggregates the oldExchange object with newExchange object and return exchange object
	 *
	 */

	@Override
	public Exchange aggregate(Exchange oldExchange, Exchange newExchange) {

		FacilityMapping facilityMappingEntry = newExchange.getIn().getBody(
				FacilityMapping.class);
		ArrayList<FacilityMapping> facilityMappingList = null;

		if (oldExchange == null) {
			facilityMappingList = new ArrayList<FacilityMapping>();
			facilityMappingList.add(facilityMappingEntry);
			newExchange.getIn().setBody(facilityMappingList);
			return newExchange;
		}

		else {
			facilityMappingList = oldExchange.getIn().getBody(ArrayList.class);
			facilityMappingList.add(facilityMappingEntry);
			return oldExchange;
		}
	}

}

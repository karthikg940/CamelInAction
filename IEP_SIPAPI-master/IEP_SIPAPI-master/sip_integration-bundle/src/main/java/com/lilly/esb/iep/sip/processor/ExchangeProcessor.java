/**
* Copyright (c) 2017 Eli Lilly and Company.  All rights reserved.
*/

package com.lilly.esb.iep.sip.processor;

import org.apache.camel.Exchange;
import org.apache.camel.Processor;

/**
 * Clears the body of an exchange object.
 * 
 * @author C241254
 *
 */
public class ExchangeProcessor implements Processor {

	@Override
	public void process(Exchange exchange) throws Exception {

		exchange.getOut().setBody(null);

	}

}

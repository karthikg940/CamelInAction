/**
 * Copyright (c) 2017 Eli Lilly and Company.  All rights reserved.
 */
package com.lilly.esb.iep.sip.routebuilder;

import org.apache.camel.builder.RouteBuilder;

/**
 * Abstract RouteBuilder to be extended by all SIP integrations routebuilders.
 *
 * 
 */
public abstract class AbstractSipRouteBuilder extends RouteBuilder {

	@Override
	public void configure() throws Exception {
		  onException(Throwable.class)
          .handled(true)
          .processRef("defaultExceptionProcessor");        
	}

	protected String dispatchUri(String milestone, boolean includeBody) {
		 return "audit:dispatch?dispatch.milestone=SIP_" + milestone
	        		+ "_MILESTONE&dispatch.encrypt={{com.lilly.esb.iep.sip.encrypt.password}}&dispatch.includeBody=" + includeBody;
	}

	protected String dispatchError(String milestone, boolean includeBody) {
		return "error:dispatch?dispatch.milestone=" + milestone + "&dispatch.encrypt={{com.lilly.esb.iep.sip.encrypt.password}}&dispatch.includeBody=" + includeBody;
	}

}

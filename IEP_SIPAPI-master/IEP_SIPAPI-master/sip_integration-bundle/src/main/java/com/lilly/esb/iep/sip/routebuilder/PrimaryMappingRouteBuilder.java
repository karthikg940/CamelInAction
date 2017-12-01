/**
* Copyright (c) 2017 Eli Lilly and Company.  All rights reserved.
*/

package com.lilly.esb.iep.sip.routebuilder;

import java.net.HttpURLConnection;

import org.apache.camel.Exchange;

import com.lilly.esb.iep.sip.aggregator.PrimaryInvestigatorIDAggregator;
import com.lilly.esb.iep.sip.constants.Constants;


/**
 * 
 * Gets the data from sharepoint and process the data
 * 
 * @author C241254
 *
 */
public class PrimaryMappingRouteBuilder extends AbstractSipRouteBuilder {

	 
	@Override
	public void configure() throws Exception {
		super.configure();


		from("direct:PrimaryInvestigatorIDSharePointCall").routeId("process-sip-primaryInvestigatorIdSharePointCall")
				.processRef("exchangeProcessor")
				.setHeader(Exchange.BREADCRUMB_ID,property(Constants.BREADCRUMB_ID))
				.wireTap(dispatchUri("MAKE_PI_SHAREPOINT_CALL", false))
				.setHeader(Exchange.HTTP_METHOD, constant("GET"))
				.processRef("sharePointBasicAuthHeaderProcessor")
				.setHeader(Exchange.HTTP_QUERY,simple("{{com.lilly.esb.iep.sip.primaryMappinglist.query}}"))
				.inOut("https4://{{com.lilly.esb.iep.sip.primaryMappinglist.site}}?throwExceptionOnFailure=false")
				.convertBodyTo(String.class)
				.to("direct:process-sip-initial-response-status-code")
				.wireTap(dispatchUri("PRIMARY_SHAREPOINT_PAYLOAD",true))
				.choice()
				.when(header(Exchange.HTTP_RESPONSE_CODE).isNotEqualTo(constant(HttpURLConnection.HTTP_OK)))
				.log("response code from PI sharepoint is ${header.CamelHttpResponseCode}")
				.setProperty(Constants.SHAREPOINT_FLAG,constant(false))
				.otherwise()
				.setBody(xpath("//m:properties").namespace("m","http://schemas.microsoft.com/ado/2007/08/dataservices/metadata"))
				.split(body(), new PrimaryInvestigatorIDAggregator())
				.unmarshal("jaxbDataFormatPrimary")
				.end()
				.setProperty(Constants.PRIMARY_SHAREPOINT_DATA, body())
				.processRef("exchangeProcessor") 
				.removeHeader(Exchange.HTTP_QUERY)
				;

	}
}

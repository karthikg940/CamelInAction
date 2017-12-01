package com.lilly.esb.iep.fileservices.processor;

import org.apache.camel.Exchange;

import com.lilly.esb.iep.fileservices.constants.Constants;
import com.lilly.iep.common.exception.request.InvalidRequestException;
import com.lilly.iep.common.processor.DefaultRequestProcessor;

/**
 * 
 * Extends DefaultRequestProcessor, and validates sharepoint data and throws exception if any required data is missing.
 * @author C241920
 * 
 */

public class RestRequestProcessor extends DefaultRequestProcessor{

	
	/**
	 * Validates required headers in incoming rest request and throws exception if parameters are incorrect
	 */
	@Override
	public void process(Exchange exchange) throws Exception {
		// TODO Auto-generated method stub
		super.process(exchange);
		StringBuilder exceptionMsg = new StringBuilder("Incorrect Parameter or SharePoint config not available (SubscriptionId) : ");
		String subscriptionId = (String) exchange.getProperty(Constants.IEP_HEADER_SUBSCRIPTION_ID);
		exceptionMsg=exceptionMsg.append(subscriptionId);
		throw new InvalidRequestException(exceptionMsg.toString());
	}
	
	/**
	 * Validates xslt for .xml file output type and throws exception if not provided
	 */
	public void processEmptyXsltException(Exchange exchange) throws Exception
	{
		String xsltTemplate = (String) exchange.getProperty(Constants.XSLT);
		if (xsltTemplate.isEmpty() || xsltTemplate.equals(null)) {
			StringBuilder exceptionMsg = new StringBuilder(
					"Please provide valid XSLT for xml file generation");
			exceptionMsg = exceptionMsg.append(xsltTemplate);
			throw new Exception(exceptionMsg.toString());
		}
	}
	
	/**
	 * Validates delimiter for .OUT, .CSV , .DAT file output types and throws exception if not provided
	 */
	public void processEmptyDelimiterException(Exchange exchange) throws Exception
	{
		String delimiter = (String) exchange.getProperty(Constants.DEIMITER_VALUE);
		if (delimiter.isEmpty() || delimiter.equals(null)) {
			StringBuilder exceptionMsg = new StringBuilder(
					"Please provide valid Delimiter");
			exceptionMsg = exceptionMsg.append(delimiter);
			throw new Exception(exceptionMsg.toString());
		}
		
	}
	
}

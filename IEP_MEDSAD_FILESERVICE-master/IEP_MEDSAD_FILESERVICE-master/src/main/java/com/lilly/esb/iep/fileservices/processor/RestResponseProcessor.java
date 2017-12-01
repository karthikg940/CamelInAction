package com.lilly.esb.iep.fileservices.processor;

import org.apache.camel.Exchange;
import com.lilly.iep.common.exception.processor.DefaultExceptionProcessor;
import com.lilly.iep.common.exception.request.InvalidRequestException;

/**
 * processes the outgoing message
 * 
 * @author C241920
 * 
 */

public class RestResponseProcessor extends DefaultExceptionProcessor {

	/**
	  * Constructs response for onException flow
	  */
	
	 @Override
	    protected void doProcess(Exception exception, Exchange exchange) throws Exception {
		 
		if (exception != null) {
			exchange.getOut().setBody(
					"error ocurred! please check the servicenow ticket" + "\n"
							+ exception.getMessage());

			if (exception.getClass().equals(InvalidRequestException.class))
				exchange.getOut().setHeader(Exchange.HTTP_RESPONSE_CODE, "400");
			else {
				int statusCode = getStatusCode(exception);
				exchange.getOut().setHeader(Exchange.HTTP_RESPONSE_CODE,
						statusCode);
			}
		}
		 
		
	}
	 
	 /**
	  * Constructs response for happy path flow
	  */
	 
	 public void buildResponse(Exchange exchange)
	 {
		 	exchange.getOut().setBody("File is generated successfully");
			exchange.getOut().setHeader(Exchange.HTTP_RESPONSE_CODE, "200");
			exchange.getOut().setHeader(Exchange.BREADCRUMB_ID, exchange.getIn().getHeader(Exchange.BREADCRUMB_ID));
	 }
	  
}

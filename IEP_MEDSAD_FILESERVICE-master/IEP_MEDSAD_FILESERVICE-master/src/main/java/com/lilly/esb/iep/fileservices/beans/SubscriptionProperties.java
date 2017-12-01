package com.lilly.esb.iep.fileservices.beans;

import org.apache.camel.Exchange;
import org.apache.cxf.common.util.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.lilly.esb.iep.fileservices.constants.Constants;
import com.microsoft.schemas.ado._2007._08.dataservices.SubscriptionConfig;


/**
 * 
 * Get's sharepoint data into class object
 * @author C241920
 * 
 */
public class SubscriptionProperties{

	private static final Logger LOGGER = LoggerFactory
            .getLogger(SubscriptionProperties.class);
	
	/**
	 * Store's share point data as properties instead of headers(since headers are removed before http calls)
	 * @param Exchange object
	 */
	public void setSubscriptionConfigDetails(Exchange exchange)
	{
		SubscriptionConfig subscriptionConfig= exchange.getIn().getBody(SubscriptionConfig.class);
		String sql=subscriptionConfig.getSQLQuery();
		String delimiter=subscriptionConfig.getDelimiterValue();
		String fileOutputType=subscriptionConfig.getOutputFileTypeValue();
		String xslt = subscriptionConfig.getTransformation();
		String delivery = subscriptionConfig.getDelivery();
		String includeHeader = subscriptionConfig.getIncludeHeaderValue();
		exchange.setProperty(Constants.DEIMITER_VALUE,delimiter);
		exchange.setProperty(Constants.FILE_OUTPUT_TYPE,fileOutputType);
		exchange.setProperty(Constants.SQL_QUERY,sql);
		exchange.setProperty(Constants.XSLT,xslt);
		exchange.setProperty(Constants.INCLUDE_HEADER,includeHeader);
		LOGGER.debug("Delivery " + delivery);
		if(!StringUtils.isEmpty(delivery) && delivery.contains("/") && delivery.length() > (delivery.lastIndexOf("/") + 1)) {
			String fileName = delivery.substring(delivery.lastIndexOf("/") + 1);
			exchange.setProperty(Constants.FILE_NAME, fileName);
		}		
		exchange.setProperty(Constants.DELIVERY,delivery.substring(0, delivery.lastIndexOf("/")));
		LOGGER.info("File Name " + exchange.getProperty(Constants.FILE_NAME));
		LOGGER.info("Directory  " + exchange.getProperty(Constants.DELIVERY));
	}
	

	 
}

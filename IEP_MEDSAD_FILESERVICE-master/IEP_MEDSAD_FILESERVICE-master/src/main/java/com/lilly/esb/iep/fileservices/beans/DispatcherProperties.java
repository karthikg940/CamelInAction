package com.lilly.esb.iep.fileservices.beans;

import org.apache.camel.Exchange;
import com.lilly.iep.common.util.IepGlobalConstants;

/**
 * 
 * Set's required properties for logging in denodo
 * @author C241920
 * 
 */
public class DispatcherProperties {

	/**
	 * Method which set's properties required for logging milestones in denodo
	 * 
	 * @param Exchange object
	 * 		  Milestone name
	 * 		  IncludeBody
	 *        DispatchType 
	 * 
	 */
	public void dispatch(Exchange exchange,String dispatchMilestone,Boolean includeBody,String dispatchType)
	{
		exchange.setProperty(IepGlobalConstants.DISPATCH_MILESTONE,dispatchMilestone);
		exchange.setProperty(IepGlobalConstants.DISPATCH_INCLUDEBODY,includeBody);
		exchange.setProperty(IepGlobalConstants.DISPATCH_TYPE,dispatchType);
	}
	 
}

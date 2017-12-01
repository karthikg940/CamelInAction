/**
* Copyright (c) 2017 Eli Lilly and Company.  All rights reserved.
*/

package com.lilly.esb.iep.sip.beans;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.apache.camel.Body;
import org.apache.camel.Exchange;
import org.apache.camel.Header;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.lilly.esb.iep.sip.constants.Constants;

/**
 * 
 * Process the date of sharepoint and database
 * 
 * @author C241920
 * @author C241254
 *
 */
public class TriggerValidator {

	private final static Logger LOGGER = LoggerFactory
			.getLogger(TriggerValidator.class);

	private String schedulerInterval;

	public String getSchedulerInterval() {
		return schedulerInterval;
	}

	public void setSchedulerInterval(String schedulerInterval) {
		this.schedulerInterval = schedulerInterval;
	}

	public Boolean processSchedulerTime() {

		LOGGER.info("Method Entry processSchedulerTime");
		Calendar currentTimestamp  = Calendar.getInstance();
		if ((currentTimestamp .get(Calendar.MINUTE) == 0) && ((currentTimestamp .get(Calendar.HOUR) % 4) == 0)) {
			return true;
		}
		return false;

	}

	public Boolean processEntryUpdatedTime(@Body Exchange exchange)
			throws ParseException {
		
		LOGGER.info("Method Entry processEntryUpdatedTime");
		String entryUpdatedTime = exchange.getIn().getBody(String.class);
		SimpleDateFormat format = new SimpleDateFormat(
				"yyyy-MM-dd'T'HH:mm:ssXXX");
		Date sysdate = new Date();
		Date sharePointDate = format.parse(entryUpdatedTime);
		if ((sysdate.getTime() - (sharePointDate.getTime())) < (Integer.parseInt(schedulerInterval))) {

			return true;
		}
		return false;

	}

	public void processBatchControlTime(@Body Exchange exchange)
			throws ParseException {
		
		LOGGER.info("Method Entry processBatchControlTime");
		List<Map<String, String>> result = (List<Map<String, String>>) exchange
				.getIn().getBody();

		if (result.isEmpty()) {
			exchange.setProperty(Constants.DB_RESULT,Constants.IS_EMPTY);
			exchange.setProperty(Constants.PROCESS_STUDY_LIST,Boolean.TRUE);

		} else {

			Object endDate = result.get(0).get("ENDTIME");
			String currentTimeStamp = exchange.getIn().getHeader(
					"currentTimeStamp")
					+ "";
			SimpleDateFormat format = new SimpleDateFormat(
					"yyyy-MM-dd HH:mm:ss");
			
			Date startTime = format.parse(currentTimeStamp);
			Date endTime = format.parse(endDate.toString());

			if ((startTime.getTime() - endTime.getTime()) > (Integer.parseInt(schedulerInterval))) {
				exchange.setProperty(Constants.PROCESS_STUDY_LIST,Boolean.TRUE);

			}
		}
	}

	public void entryDateFormat(
			@Header(Constants.ENTRY_UPDATED_TIME) String entryUpdatedTime, @Body Exchange exchange)
			throws ParseException {
		exchange.setProperty(Constants.RESULT,Boolean.FALSE);
		LOGGER.info("Method Entry entryDateFormat");
		SimpleDateFormat format = new SimpleDateFormat(
				"yyyy-MM-dd'T'HH:mm:ssXXX");
		Date sysdate = new Date();
		Date sharePointDate = format.parse(entryUpdatedTime);
		if ((sysdate.getTime() - (sharePointDate.getTime())) < (Integer.parseInt(schedulerInterval))) {
			exchange.setProperty(Constants.RESULT,Boolean.TRUE);
		}
	}
	
	public List<String> aggregateException(@Body Exchange exchange)
    {
           List<String> studyServiceNowTicketList= exchange.getProperty(Constants.STUDY_SERVICE_NOW_TICKET_LIST,List.class);
           LOGGER.info("studyServiceNowTicketList " + studyServiceNowTicketList);
           List<String> sponsorServiceNowTicketList= exchange.getProperty(Constants.SPONSOR_SERVICE_NOW_TICKET_LIST,List.class);
           LOGGER.info("sponsorServiceNowTicketList " + sponsorServiceNowTicketList);
           List<String> serviceNowTicketList= new ArrayList<String>();
           if(studyServiceNowTicketList != null && !studyServiceNowTicketList.isEmpty())
        	   serviceNowTicketList.addAll(studyServiceNowTicketList);
           if(sponsorServiceNowTicketList != null && !sponsorServiceNowTicketList.isEmpty())
        	   serviceNowTicketList.addAll(sponsorServiceNowTicketList);  
           return serviceNowTicketList;
    }
	
	 


}

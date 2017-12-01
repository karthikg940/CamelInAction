/**
* Copyright (c) 2017 Eli Lilly and Company.  All rights reserved.
*/

package com.lilly.esb.iep.sip.processor;

import org.apache.camel.Exchange;
import org.apache.camel.Processor;

import com.lilly.esb.iep.sip.constants.Constants;
import com.microsoft.schemas.ado._2007._08.dataservices.StudyDetails;

/**
 * Maps the sharepoint data to respective attributes
 * 
 * @author C241254
 *
 */
public class StudyAttributesProcessor implements Processor {

	@Override
	public void process(Exchange exchange) throws Exception {

		StudyDetails studyDetails = exchange.getIn()
				.getBody(StudyDetails.class);
		exchange.setProperty(Constants.TRAIL_NUMBER,
				studyDetails.getTrialNumber());

		exchange.setProperty(Constants.STUDY_SITE_CREATION,
				studyDetails.getStudySiteCreationValue());

		exchange.setProperty(Constants.THERAPEUTIC_AREA,
				studyDetails.getTherapeuticAreaValue());

		exchange.setProperty(Constants.PROGRAM_NAME,
				studyDetails.getProgramName());
		exchange.setProperty(Constants.PROGRAM_ID, studyDetails.getProgramID());

		exchange.setProperty(Constants.INDICATION_NAME,
				studyDetails.getIndicationName());
		exchange.setProperty(Constants.INDICATION_ID,
				studyDetails.getIndicationId());

		exchange.setProperty(Constants.TO_PROCESS,
				studyDetails.getToProcessValue());

		exchange.setProperty(Constants.COUNTRY, studyDetails.getCountry());

	}

}

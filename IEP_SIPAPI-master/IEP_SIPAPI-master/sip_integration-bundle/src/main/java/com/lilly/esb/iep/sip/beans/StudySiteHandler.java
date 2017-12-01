/**
* Copyright (c) 2017 Eli Lilly and Company.  All rights reserved.
*/

package com.lilly.esb.iep.sip.beans;

import java.util.List;
import java.util.Map;

import org.apache.camel.Body;
import org.apache.camel.Exchange;
import org.apache.camel.Property;
import org.cdisc.ns.odm.v1.ODM;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.lilly.esb.iep.sip.constants.Constants;
import com.microsoft.schemas.ado._2007._08.dataservices.FacilityMapping;
import com.microsoft.schemas.ado._2007._08.dataservices.PrimaryInvestigatorMapping;

/**
 * Process the response from odata call and construct the ODM payload
 * 
 * @author C241254
 *
 */
public class StudySiteHandler {

	private final static Logger LOGGER = LoggerFactory
			.getLogger(StudySiteHandler.class);

	public String getSiteId(
			@Property(Constants.STUDY_SITE_CD) String studySiteCd,
			@Property(Constants.TRAIL_NUMBER) String trailNumber) {
		
		LOGGER.info("Method Entry getSiteId");
		String studySiteCdReplace = studySiteCd.replace('~', '-');
		String[] studySiteCdSplit = studySiteCdReplace.split("-");
		String siteReference = trailNumber + "-" + studySiteCdSplit[1] + "-"
				+ studySiteCdSplit[0];
		return siteReference;
	}

	public ODM process(@Body Exchange exchange) {

		LOGGER.info("Method Entry process");
		
		Map<String, String> createStudyRecordMap = exchange.getIn().getBody(
				Map.class);
		
		exchange.setProperty(Constants.CNCL_STOP_FLG,
				createStudyRecordMap.get("CnclStopFlg"));
		exchange.setProperty(Constants.HLD_CNCL_STOP_DT,
				createStudyRecordMap.get("HldCnclStopDt"));

		exchange.setProperty(Constants.LATEST_STNDRD_MLSTNCD,
				createStudyRecordMap.get("LatestStndrdMlstnCd"));
		exchange.setProperty(Constants.STUDY_SITE_IIP_ID,
				createStudyRecordMap.get("StudySiteIipId"));

		List<PrimaryInvestigatorMapping> primaryList = (List<PrimaryInvestigatorMapping>) exchange
				.getProperty("PrimarySharePointData");

		List<FacilityMapping> facilityList = (List<FacilityMapping>) exchange
				.getProperty("FacilitySharePointData");

		String personGoldenID = getPIGoldenId(primaryList, createStudyRecordMap);

		String facilityGoldenID = getfacilityGoldenId(facilityList,
				createStudyRecordMap);

		if (personGoldenID != null && facilityGoldenID != null) {
			 		
			ODMPayloadHandler odmPayloadBean = new ODMPayloadHandler();
			ODM odm = new ODM();
			odm = odmPayloadBean.constructStudySiteCreationPayload(
					personGoldenID, facilityGoldenID, exchange.getProperty(
							Constants.STUDY_SITE_REF_ID, String.class),  
					exchange.getProperty(Constants.STUDY_ALS_CD, String.class),exchange.getProperty(Constants.STUDY_SITE_CREATION,String.class));
			return odm;
		} else {

			return null;
		}
	}

	private String getPIGoldenId(List<PrimaryInvestigatorMapping> primaryList,
			Map<String, String> createStudyRecordMap) {
		
		LOGGER.info("Method Entry getPIGoldenId");
		Integer prmryInvstgtrId = Integer.parseInt(createStudyRecordMap
				.get("PrmryInvstgtrId"));

		for (PrimaryInvestigatorMapping primaryInvestigatorIDSharePointBean : primaryList) {
			if (prmryInvstgtrId.equals(primaryInvestigatorIDSharePointBean
					.getPersonMemberID())) {
				return primaryInvestigatorIDSharePointBean.getPersonGoldenID();
			}
		}
		return null;
	}

	private String getfacilityGoldenId(List<FacilityMapping> facilityList,
			Map<String, String> createStudyRecordMap) {
		
		LOGGER.info("Method Entry getfacilityGoldenId");
		Integer facilityMemberID = Integer.parseInt(createStudyRecordMap
				.get("PrmryCentre"));
		for (FacilityMapping facilitySharePointBean : facilityList) {

			if (facilityMemberID.equals(facilitySharePointBean
					.getFacilityMemberID())) {
				return facilitySharePointBean.getFacilityGoldenID();
			}
		}

		return null;
	}
	
	public void setStudySiteProperties(@Body Exchange exchange)
	{
		Map<String, String> createStudyRecordMap = exchange.getIn().getBody(
				Map.class);
		exchange.setProperty(Constants.CNCL_STOP_FLG,
				createStudyRecordMap.get("CnclStopFlg"));
		exchange.setProperty(Constants.HLD_CNCL_STOP_DT,
				createStudyRecordMap.get("HldCnclStopDt"));
		exchange.setProperty(Constants.LATEST_STNDRD_MLSTNCD,
				createStudyRecordMap.get("LatestStndrdMlstnCd"));
		exchange.setProperty(Constants.STUDY_SITE_IIP_ID,
				createStudyRecordMap.get("StudySiteIipId"));
	}

}

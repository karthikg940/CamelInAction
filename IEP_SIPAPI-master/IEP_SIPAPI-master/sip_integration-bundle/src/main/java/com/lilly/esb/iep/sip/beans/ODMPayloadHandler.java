/**
* Copyright (c) 2017 Eli Lilly and Company.  All rights reserved.
*/

package com.lilly.esb.iep.sip.beans;

import java.text.ParseException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.xml.datatype.DatatypeConfigurationException;
import javax.xml.datatype.DatatypeFactory;
import javax.xml.datatype.XMLGregorianCalendar;

import org.apache.camel.Body;
import org.apache.camel.Header;
import org.apache.camel.Property;
import org.apache.commons.lang3.StringUtils;
import org.cdisc.ns.odm.v1.ODM;
import org.cdisc.ns.odm.v1.ODMcomplexTypeDefinitionAdminData;
import org.cdisc.ns.odm.v1.ODMcomplexTypeDefinitionLocation;
import org.cdisc.ns.odm.v1.ODMcomplexTypeDefinitionStudy;
import org.cdisc.ns.odm.v1.SIPcomplexTypeElementDefinitionDef;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.lilly.esb.iep.sip.constants.Constants;
import com.sharedinvestigator.sip.schema.ListOfValueDef;
import com.sharedinvestigator.sip.schema.SIPcomplexTypeDefinitionLocationDef;
import com.sharedinvestigator.sip.schema.SIPcomplexTypeDefinitionLocationDetails;
import com.sharedinvestigator.sip.schema.SIPcomplexTypeDefinitionStudyProfileDef;

/**
 * 
 * Construct the ODM payload for different external api call
 * 
 * @author C241254
 *
 */
public class ODMPayloadHandler {

	private final static Logger LOGGER = LoggerFactory
			.getLogger(ODMPayloadHandler.class);

	public ODM constructCompoundCreationPayload(
			@Body HashMap<String, List<Map<String, String>>> map) {

		LOGGER.info("Method Entry constructCompoundCreationPayload");
		SIPcomplexTypeElementDefinitionDef odmElementExtensionContents = new SIPcomplexTypeElementDefinitionDef();
		ODM odm = new ODM();
		ListOfValueDef listOfValues = new ListOfValueDef();
		if((map.get("StudyCompound") != null) && !(map.get("StudyCompound").isEmpty())){
		List<Map<String, String>> compoundList = map.get("StudyCompound");
		Map<String, String> compoundMap = compoundList.get(0);
		if(!(StringUtils.isEmpty(compoundMap.get("SbstncRfrncCd")))){
		listOfValues.setMemberCompanyCode(compoundMap.get("SbstncRfrncCd"));
		}
		if(!(StringUtils.isEmpty(compoundMap.get("CmpndNm")))){
		listOfValues.setValue(compoundMap.get("CmpndNm"));
		}
		listOfValues.setBusinessEntity("COMPOUND");
		odmElementExtensionContents.getListOfValue().add(listOfValues);
		odm.getODMElementExtension().add(odmElementExtensionContents);
		return odm;
		}
		return null;
	}

	public ODM constructProgramCreationPayload(
			@Header("ProgramId") String programId,
			@Header("ProgramName") String programName,
			@Header("TherapeuticArea") String therapeuticArea) {

		LOGGER.info("Method Entry constructProgramCreationPayload");
		SIPcomplexTypeElementDefinitionDef odmElementExtensionContents = new SIPcomplexTypeElementDefinitionDef();
		ODM odm = new ODM();
		ListOfValueDef listOfValues = new ListOfValueDef();
		listOfValues.setBusinessEntity("PROGRAM");
		if(!(StringUtils.isEmpty(programId))){
		listOfValues.setMemberCompanyCode(programId);
		}
		if(!(StringUtils.isEmpty(programName))){
		listOfValues.setValue(programName);
		}
		if(!(StringUtils.isEmpty(therapeuticArea))){
		listOfValues.setParentValue(therapeuticArea);
		}
		odmElementExtensionContents.getListOfValue().add(listOfValues);
		odm.getODMElementExtension().add(odmElementExtensionContents);
		return odm;
	}

	public ODM constructIndicationCreationPayload(
			@Header("IndicationId") String indicationId,
			@Header("IndicationName") String indicationName) {

		LOGGER.info("Method Entry constructIndicationCreationPayload");
		SIPcomplexTypeElementDefinitionDef odmElementExtensionContents = new SIPcomplexTypeElementDefinitionDef();
		ODM odm = new ODM();
		ListOfValueDef listOfValues = new ListOfValueDef();

		listOfValues.setBusinessEntity("INDICATION");
		if(!(StringUtils.isEmpty(indicationId))){
		listOfValues.setMemberCompanyCode(indicationId);
		}
		if(!(StringUtils.isEmpty(indicationName))){
		listOfValues.setValue(indicationName);
		}
		
		odmElementExtensionContents.getListOfValue().add(listOfValues);
		odm.getODMElementExtension().add(odmElementExtensionContents);
		return odm;
	}

	public ODM constructStudySiteCreationPayload(String primaryInvestigatorID,
			String primaryFacilityID, String siteId, String studyAlsCd,String studySiteCreation
			) {
		
		LOGGER.info("Method Entry constructStudySiteCreationPayload");
		ODM odm = new ODM();
		ODMcomplexTypeDefinitionAdminData odmcomplexTypeDefinitionAdminData = new ODMcomplexTypeDefinitionAdminData();
		ODMcomplexTypeDefinitionLocation odmcomplexTypeDefinitionLocation = new ODMcomplexTypeDefinitionLocation();
		SIPcomplexTypeDefinitionLocationDef sipcomplexTypeDefinitionLocationDef = new SIPcomplexTypeDefinitionLocationDef();
		SIPcomplexTypeDefinitionLocationDetails sipcomplexTypeDefinitionLocationDetails = new SIPcomplexTypeDefinitionLocationDetails();
		
		if(!(StringUtils.isEmpty(studyAlsCd))){
		sipcomplexTypeDefinitionLocationDetails.setStudyID(studyAlsCd);
		}
		if(!(StringUtils.isEmpty(siteId))&& !(studySiteCreation.equals("SIP"))){
		sipcomplexTypeDefinitionLocationDetails.setSiteID(siteId);
		}
		if(!(StringUtils.isEmpty(primaryInvestigatorID))){
		sipcomplexTypeDefinitionLocationDetails
				.setPrincipalInvestigatorIRID(primaryInvestigatorID);
		}
		if(!(StringUtils.isEmpty(primaryFacilityID))){
		sipcomplexTypeDefinitionLocationDetails
				.setPrimaryFacilityIRID(primaryFacilityID);
		}
		odm.getAdminData().add(odmcomplexTypeDefinitionAdminData);
		odmcomplexTypeDefinitionAdminData.getLocation().add(
				odmcomplexTypeDefinitionLocation);
		odmcomplexTypeDefinitionLocation.getLocationElementExtension().add(
				sipcomplexTypeDefinitionLocationDef);
		sipcomplexTypeDefinitionLocationDef.getLocationDetails().add(
				sipcomplexTypeDefinitionLocationDetails);
		
		if(studySiteCreation.equals("SIP"))
		{
			sipcomplexTypeDefinitionLocationDetails.setSponsorSiteID(siteId);
		}
		return odm;

	}

	public ODM constructCloseStudySitePayload(
			@Property(Constants.STUDY_ALS_CD) String studyAlsCd,
			@Property(Constants.STUDY_SITE_REF_ID) String studySiteRefId,
			@Property(Constants.HLD_CNCL_STOP_DT) String HldCnclStopDt,
			@Property(Constants.UNIQUE_SPONSER_SITE_USER_ID) String uniqueSponsorSiteUserID)
			throws DatatypeConfigurationException, ParseException {
		
		LOGGER.info("Method Entry constructCloseStudySitePayload");
		 
		ODM odm = new ODM();
		ODMcomplexTypeDefinitionAdminData odmcomplexTypeDefinitionAdminData = new ODMcomplexTypeDefinitionAdminData();
		ODMcomplexTypeDefinitionLocation odmcomplexTypeDefinitionLocation = new ODMcomplexTypeDefinitionLocation();
		SIPcomplexTypeDefinitionLocationDef sipcomplexTypeDefinitionLocationDef = new SIPcomplexTypeDefinitionLocationDef();
		SIPcomplexTypeDefinitionLocationDetails sipcomplexTypeDefinitionLocationDetails = new SIPcomplexTypeDefinitionLocationDetails();
		
		if(!(StringUtils.isEmpty(studyAlsCd))){
		sipcomplexTypeDefinitionLocationDetails.setStudyID(studyAlsCd);
		}
		if(!(StringUtils.isEmpty(studySiteRefId))){
		sipcomplexTypeDefinitionLocationDetails.setSiteID(studySiteRefId);
		}
		if(!(StringUtils.isEmpty(uniqueSponsorSiteUserID))){
		sipcomplexTypeDefinitionLocationDetails.setUniqueSponsorSiteUserID(uniqueSponsorSiteUserID);
		}
		
		if(!(StringUtils.isEmpty(HldCnclStopDt))){
		XMLGregorianCalendar HldCnclStopDxmlGregorianCalendarDate = DatatypeFactory
				.newInstance().newXMLGregorianCalendar(HldCnclStopDt);
		
		sipcomplexTypeDefinitionLocationDetails
		.setClosureDate(HldCnclStopDxmlGregorianCalendarDate);
		}
		
		
		odm.getAdminData().add(odmcomplexTypeDefinitionAdminData);
		odmcomplexTypeDefinitionAdminData.getLocation().add(
				odmcomplexTypeDefinitionLocation);
		odmcomplexTypeDefinitionLocation.getLocationElementExtension().add(
				sipcomplexTypeDefinitionLocationDef);
		sipcomplexTypeDefinitionLocationDef.getLocationDetails().add(
				sipcomplexTypeDefinitionLocationDetails);

		return odm;
	}

	public ODM constructCloseStudyPayload(
			@Property(Constants.STUDY_ALS_CD) String studyAlsCd,
			@Property(Constants.STUDY_CLOSURE_DATE) XMLGregorianCalendar studyClosureDate,
			@Property(Constants.STUDY_CANCELLED_DATE) XMLGregorianCalendar studyCancelledDate,
			@Property(Constants.UNIQUE_SPONSER_SITE_USER_ID) String uniqueSponsorSiteUserID) {
	
		LOGGER.info("Method Entry constructCloseStudyPayload");
		ODM odm = new ODM();
		ODMcomplexTypeDefinitionStudy odmComplexType = new ODMcomplexTypeDefinitionStudy();
		SIPcomplexTypeDefinitionStudyProfileDef sipComplexTypeDefinitionStudyProfile = new SIPcomplexTypeDefinitionStudyProfileDef();
		
		if(!(StringUtils.isEmpty(studyAlsCd))){
		sipComplexTypeDefinitionStudyProfile.setStudyID(studyAlsCd);
		}
		if(!(StringUtils.isEmpty(uniqueSponsorSiteUserID))){
		sipComplexTypeDefinitionStudyProfile.setSponsorID(uniqueSponsorSiteUserID);
		}
		
		if (!("null".equals(studyClosureDate)) && !(studyClosureDate == null) && !("".equals(studyClosureDate)) ) {
			sipComplexTypeDefinitionStudyProfile
					.setTrialCloseoutDate(studyClosureDate);
		}

		else if(!("null".equals(studyCancelledDate)) && !(studyCancelledDate == null) && !("".equals(studyCancelledDate))) {
			sipComplexTypeDefinitionStudyProfile
					.setTrialCloseoutDate(studyCancelledDate);
		}
		
		odmComplexType.getStudyElementExtension().add(
				sipComplexTypeDefinitionStudyProfile);
		odm.getStudy().add(odmComplexType);
		return odm;
	}
	
	 
}

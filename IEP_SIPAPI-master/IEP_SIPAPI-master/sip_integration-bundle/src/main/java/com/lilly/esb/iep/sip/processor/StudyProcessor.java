/**
* Copyright (c) 2017 Eli Lilly and Company.  All rights reserved.
*/

package com.lilly.esb.iep.sip.processor;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.xml.datatype.DatatypeConfigurationException;
import javax.xml.datatype.DatatypeFactory;
import javax.xml.datatype.XMLGregorianCalendar;

import org.apache.camel.Exchange;
import org.apache.camel.Processor;
import org.apache.commons.lang3.StringUtils;
import org.cdisc.ns.odm.v1.ODM;
import org.cdisc.ns.odm.v1.ODMcomplexTypeDefinitionCountry;
import org.cdisc.ns.odm.v1.ODMcomplexTypeDefinitionStudy;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.lilly.esb.iep.common.util.IepGlobalConstants;
import com.lilly.esb.iep.sip.beans.StudyCompound;
import com.lilly.esb.iep.sip.constants.Constants;
import com.sharedinvestigator.sip.schema.PlannedCountryDef;
import com.sharedinvestigator.sip.schema.SIPcomplexTypeDefinitionStudyProfileDef;

/**
 * Process the response from odata call and creates ODM payload for external api
 * call
 * 
 * @author C241254
 *
 */

public class StudyProcessor implements Processor { 

	private final static Logger LOGGER = LoggerFactory
			.getLogger(StudyProcessor.class);

	XMLGregorianCalendar studyClosureDate ;
	XMLGregorianCalendar studyOverallStatusStartDate;
	XMLGregorianCalendar studyOverallStatusStopDate;
	XMLGregorianCalendar plannedFinalDatabaseLock;
	XMLGregorianCalendar studyCancelledDate;

	@Override
	public void process(Exchange exchange) throws Exception {

		LOGGER.info("Entered StudyProcessor");
		
		List<Map<String, Map<String, List<Map<String, List<Map<String, String>>>>>>> valueList = exchange
				.getIn().getBody(List.class);

		for (Map<String, Map<String, List<Map<String, List<Map<String, String>>>>>> studyMileStoneDatamap : valueList) {
			processStudyMilestones(studyMileStoneDatamap);
		}
		Map<String, Map<String, List<Map<String, List<Map<String, String>>>>>> clinicalStudyMap = valueList
				.get(0);
		if (null != clinicalStudyMap.get("ClinicalStudy").get("StudyAlsCd")) {
			exchange.setProperty(Constants.STUDY_ALS_CD,
					clinicalStudyMap.get("ClinicalStudy").get("StudyAlsCd"));
		}

		List<Map<String, List<Map<String, String>>>> studyCompoundList = clinicalStudyMap
				.get("ClinicalStudy").get("ClinicalStudyStudyDesign");

		Map<String, List<StudyCompound>> compoundMap = studyCompoundProcess(studyCompoundList);

		exchange.setProperty(Constants.COMPOUND_PAYLOAD, studyCompoundList);

		ODM odm = new ODM();

		SIPcomplexTypeDefinitionStudyProfileDef createStudyODM = constructCreateStudyPayload(
				clinicalStudyMap,
				exchange.getProperty(Constants.INDICATION_NAME, String.class),
				exchange.getProperty(Constants.PROGRAM_NAME, String.class),
				exchange.getProperty(Constants.COUNTRY, String.class),
				compoundMap);
		ODMcomplexTypeDefinitionStudy odmComplexTypeDefinitionStudy = new ODMcomplexTypeDefinitionStudy();
		odmComplexTypeDefinitionStudy.getStudyElementExtension().add(
				createStudyODM);
		odm.getStudy().add(odmComplexTypeDefinitionStudy);
		exchange.setProperty(IepGlobalConstants.IEP_PROPERTY_ORIGINAL_MESSAGE,
				odm);

		exchange.setProperty(Constants.STUDY_CANCELLED_DATE, studyCancelledDate);
		exchange.setProperty(Constants.STUDY_CLOSURE_DATE, studyClosureDate);
		setDateProperties();
		 
		LOGGER.info("Leaving StudyProcessor");
	}

	private void processStudyMilestones(
			Map<String, Map<String, List<Map<String, List<Map<String, String>>>>>> studyMileStoneDatamap)
			throws ParseException, DatatypeConfigurationException {
		
		LOGGER.info("Method Entry processStudyMilestones");
		
		String mlstnCd = studyMileStoneDatamap.get("MlstnCd") + "";
		if (mlstnCd.equals("3200")) {

			studyOverallStatusStartDate = formatDate(studyMileStoneDatamap
					.get("StudyMlstnFrcstDtm") + "");
		}

		else if (mlstnCd.equals("3700")) {

			studyOverallStatusStopDate = formatDate(studyMileStoneDatamap
					.get("StudyMlstnFrcstDtm") + "");
		}

		else if (studyMileStoneDatamap.get("StudyMlstnActlDtm") == null
				&& (mlstnCd.equals("4814") || mlstnCd.equals("4844")
						|| mlstnCd.equals("4874") || mlstnCd.equals("3918")
						|| mlstnCd.equals("3930") || mlstnCd.equals("3942")
						|| mlstnCd.equals("3664") || mlstnCd.equals("4014")
						|| mlstnCd.equals("4044") || mlstnCd.equals("4074"))) {

			plannedFinalDatabaseLock = formatDate(studyMileStoneDatamap
					.get("StudyMlstnFrcstDtm") + "");
		}

		else if (studyMileStoneDatamap.get("StudyMlstnActlDtm") != null
				&& mlstnCd.equals("4900")) {
			studyClosureDate = formatDate(studyMileStoneDatamap.get("StudyMlstnActlDtm")+"");
		}
		

		studyCancelledDate = isStudyCancelled(studyMileStoneDatamap);


	}

	private SIPcomplexTypeDefinitionStudyProfileDef constructCreateStudyPayload(
			Map<String, Map<String, List<Map<String, List<Map<String, String>>>>>> clinicalStudyMap,
			String indication, String program, String country,
			Map<String, List<StudyCompound>> compoundMapLocal) {
		
		LOGGER.info("Method Entry constructCreateStudyPayload ");

		PlannedCountryDef plannedCountryDef = new PlannedCountryDef();
		ODMcomplexTypeDefinitionCountry odmComplexTypeDefinitionCountry = new ODMcomplexTypeDefinitionCountry();
		SIPcomplexTypeDefinitionStudyProfileDef sipComplexTypeDefinitionStudyProfileDef = new SIPcomplexTypeDefinitionStudyProfileDef();
		
		if(!(StringUtils.isEmpty(clinicalStudyMap.get("ClinicalStudy").get("StudyShrtDesc")+""))){
		sipComplexTypeDefinitionStudyProfileDef
				.setStudyShortDescription(clinicalStudyMap.get("ClinicalStudy")
						.get("StudyShrtDesc") + "");
		}
		
		if(!(StringUtils.isEmpty(clinicalStudyMap.get("ClinicalStudy").get("StudyTitle")+""))){
		sipComplexTypeDefinitionStudyProfileDef
				.setStudyLongDescription(clinicalStudyMap.get("ClinicalStudy")
						.get("StudyTitle") + "");
		}
		
		if(!(StringUtils.isEmpty(clinicalStudyMap.get("ClinicalStudy").get("StudyAlsCd")+""))){
		sipComplexTypeDefinitionStudyProfileDef.setStudyID(clinicalStudyMap
				.get("ClinicalStudy").get("StudyAlsCd") + "");
		}
		
		if(!(StringUtils.isEmpty(indication))){
		sipComplexTypeDefinitionStudyProfileDef.setIndication(indication);
		}

		if (!(compoundMapLocal.get("commomCompound").isEmpty())) {
			if(!(StringUtils.isEmpty(compoundMapLocal.get("commomCompound").get(0).getCmpndNm()+""))){
			sipComplexTypeDefinitionStudyProfileDef
					.setCompound(compoundMapLocal.get("commomCompound").get(0)
							.getCmpndNm());
			}
		}
			
		sipComplexTypeDefinitionStudyProfileDef.setProgram(program);
		if(studyOverallStatusStartDate != null){
		sipComplexTypeDefinitionStudyProfileDef
				.setStudyOverallStatusStartDate(studyOverallStatusStartDate);
		}
		
		if(studyOverallStatusStopDate != null){
		sipComplexTypeDefinitionStudyProfileDef
				.setStudyOverallStatusStopDate(studyOverallStatusStopDate);
		}
		
		if(plannedFinalDatabaseLock != null){
		sipComplexTypeDefinitionStudyProfileDef
				.setPlannedFinalDatabaseLock(plannedFinalDatabaseLock);
		}
		
		if(!(StringUtils.isEmpty(country))){
		odmComplexTypeDefinitionCountry.setValue(country);
		plannedCountryDef.getCountryCd().add(odmComplexTypeDefinitionCountry);
		sipComplexTypeDefinitionStudyProfileDef.getPlannedCountry().add(
				plannedCountryDef);
		}

		return sipComplexTypeDefinitionStudyProfileDef;
	}

	private XMLGregorianCalendar formatDate(String dateTime)
			throws ParseException, DatatypeConfigurationException {
		
		LOGGER.info("Method Entry formatDate");

		if (dateTime == null || dateTime.equals("null") || dateTime.isEmpty()) {
			return null;
		} else {
			
			String[] dateAndTime = dateTime.split("T");
			String date = dateAndTime[0];			 
			XMLGregorianCalendar xmlGregorianCalendarDate = DatatypeFactory
					.newInstance().newXMLGregorianCalendar(date);
			return xmlGregorianCalendarDate;
		}

	}

	private XMLGregorianCalendar isStudyCancelled(
			Map<String, Map<String, List<Map<String, List<Map<String, String>>>>>> clinicalStudyMap) throws ParseException, DatatypeConfigurationException {

		LOGGER.info("Method Entry isStudyCancelled");
		
		
		String cnclStopFlgStudy = clinicalStudyMap.get("ClinicalStudy").get(
				"CnclStopFlg")+ "";
		String latestStndrdMlstnCdStudy = clinicalStudyMap.get("ClinicalStudy")
				.get("LatestStndrdMlstnCd") + "";
		String hldCnclStopDtStudy = clinicalStudyMap.get("ClinicalStudy").get(
				"HldCnclStopDt")+ "";

		 if (cnclStopFlgStudy.equals("Y")
				&& Integer.parseInt(latestStndrdMlstnCdStudy) < 3200 && !(hldCnclStopDtStudy.equals("null")) && (hldCnclStopDtStudy != null)) {
			return formatDate(hldCnclStopDtStudy);
		}
		return null;
	}

	private Map<String, List<StudyCompound>> studyCompoundProcess(
			List<Map<String, List<Map<String, String>>>> studyCompoundList) {
		
		LOGGER.info("Method Entry studyCompoundProcess");
		
		Map<String, List<StudyCompound>> compoundMap = new HashMap<>();
		List<StudyCompound> genericCompoundList = new ArrayList<>();
		List<StudyCompound> commonCompoundList = new ArrayList<>();
		StudyCompound genericCompound = new StudyCompound();

		for (Map<String, List<Map<String, String>>> studyCompoundMap : studyCompoundList) {
			
			if((studyCompoundMap.get("StudyCompound") != null) && !(studyCompoundMap.get("StudyCompound").isEmpty())){
			List<Map<String, String>> studyCompoundDataList = studyCompoundMap
					.get("StudyCompound");
			StudyCompound otherCmp = new StudyCompound();
			Map<String, String> compoundObject = studyCompoundDataList.get(0);
			if (compoundObject.get("CmpndNmTyp").equals("Generic")) {

				genericCompound.setCmpndNm(compoundObject.get("CmpndNm"));
				genericCompound.setSbstncRfrncCd(compoundObject
						.get("SbstncRfrncCd"));
				genericCompoundList.add(genericCompound);
			} else {

				otherCmp.setCmpndNm(compoundObject.get("CmpndNm"));

				otherCmp.setSbstncRfrncCd(compoundObject.get("SbstncRfrncCd"));
				commonCompoundList.add(otherCmp);
			}
			}

		}

		compoundMap.put("genericCompound", genericCompoundList);
		compoundMap.put("commomCompound", commonCompoundList);

		return compoundMap;

	}
	
	public void setDateProperties()
	{
		studyClosureDate=null ;
		studyOverallStatusStartDate=null;
		studyOverallStatusStopDate=null;
		plannedFinalDatabaseLock=null;
		studyCancelledDate=null;
	}

}

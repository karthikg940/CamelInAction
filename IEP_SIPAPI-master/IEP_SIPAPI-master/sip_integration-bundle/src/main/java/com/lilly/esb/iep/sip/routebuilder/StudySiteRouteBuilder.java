/**
* Copyright (c) 2017 Eli Lilly and Company.  All rights reserved.
*/

package com.lilly.esb.iep.sip.routebuilder;

import java.net.HttpURLConnection;

import org.apache.camel.Exchange;
import org.apache.camel.builder.PredicateBuilder;
import org.apache.camel.component.http4.HttpMethods;

import com.lilly.esb.iep.common.util.IepGlobalConstants;
import com.lilly.esb.iep.sip.beans.StudySiteHandler;
import com.lilly.esb.iep.sip.constants.Constants;

 
/**
 * Gets data from Odata url's,process the data ,construct the payload for
 * external sip api's.
 * 
 * @author C241254
 *
 */
public class StudySiteRouteBuilder extends AbstractSipRouteBuilder {

	@Override
	public void configure() throws Exception {
		super.configure();

		from("direct:process-sip-StudySite").routeId("process-sip-StudySite").errorHandler(noErrorHandler())	
				.processRef("exchangeProcessor")
				.setHeader(Exchange.BREADCRUMB_ID,property(Constants.BREADCRUMB_ID))
				.log("entered into the createStudySite route")
				.wireTap(dispatchUri("MAKE_STUDY_SITE_ODATA_CALL", false))
				.processRef("oDataBasicAuthHeaderProcessor")
				.setHeader(Constants.PAGE_SIZE_OVERRIDE,constant(0))
				.setHeader(Exchange.HTTP_METHOD, HttpMethods.GET)
				.setHeader(Exchange.HTTP_QUERY,simple("{{com.lilly.esb.iep.sip.createStudySite.odata.url.query}} '${property.TrailNumber}'"))
				.inOut("https4://{{com.lilly.esb.iep.sip.createStudySite.odata.url}}?throwExceptionOnFailure=false")
				.convertBodyTo(String.class)
				.to("direct:process-sip-initial-response-status-code")
				.wireTap(dispatchUri("STUDY_SITE_ODATA_CALL_PAYLOAD",true))
				.choice()
					.when(header(Exchange.HTTP_RESPONSE_CODE).isNotEqualTo(constant(HttpURLConnection.HTTP_OK)))
						.log("http response from study site odata url is !=200")
						.wireTap(dispatchUri("NON_200_HTTP_RES_FRM_STUDY_SITE_ODATA", false))
					.endChoice()
					.otherwise()
						.removeHeader(Exchange.HTTP_QUERY)
						.to("direct:process-sip-studySite-marshall")
					.endChoice()
				.end()
				;

		from("direct:process-sip-studySite-marshall").routeId("process-sip-studySite-marshall").errorHandler(noErrorHandler())
				.unmarshal("jacksonDataFormat")
				.setBody(simple("${body[value]}"))
				.choice()
					.when(PredicateBuilder.in(body().isEqualTo("[]"), body().isNull(),body().regex("^\\s*$")))
						.wireTap(dispatchUri("STUDY_SITE_ODATA_PAYLOAD_IS_EMPTY", false))
						.log("create study site odata response body is empty ${body}")
					.endChoice()
					.otherwise()
						.to("direct:process-sip-studySite-split")
					.endChoice()
				.end()
				;

		from("direct:process-sip-studySite-split").routeId("process-sip-studySite-split").errorHandler(noErrorHandler())
				.wireTap(dispatchUri("SPLIT_STUDY_SITE_PAYLOAD", false))
				.split()
				.body()
				.log("after split in create site ${body}")
				.wireTap(dispatchUri("AFTER_SPLIT_STUDY_SITE_ROW",true))
				.setProperty(Constants.STUDY_SITE_REF_ID,simple("body[StudySiteRefId]"))
				.choice()
					.when(PredicateBuilder.or(property(Constants.STUDY_SITE_REF_ID).isNull(), property(Constants.STUDY_SITE_REF_ID).regex("^\\s*$")))
						.log("no studySiteRefId exists")
						.wireTap(dispatchUri("STUDY_SITE_ID_IS_NULL", false))
					.endChoice()
					.otherwise()
						.to("direct:process-sip-createStudySite-OR-updateStudySite")
					.endChoice()
				.end()
				;

		from("direct:process-sip-createStudySite-OR-updateStudySite").routeId("process-sip-createStudySite-OR-updateStudySite").errorHandler(noErrorHandler())
				.log("start createStudySite-OR-updateStudySite route")
				.wireTap(dispatchUri("CHECK_CREATE_OR_UPDATE_STUDY_SITE", false))
				.choice()
					.when(property(Constants.STUDY_SITE_CREATION).isEqualTo("Lilly"))
						.to("direct:process-sip-getStudySite-externalCall")
					.endChoice()
					.when(property(Constants.STUDY_SITE_CREATION).isEqualTo("SIP"))
						.log("entered study site update")
						.to("direct:process-sip-StudySite-payload")
					.endChoice()
					.otherwise()
						.wireTap(dispatchUri("INVALID_STUDY_SITE_FALG", false))
						.log("invalid study site  flag. Study Site flag should be either LILLY or SIP")
					.endChoice()
				.end()
				;

		from("direct:process-sip-getStudySite-externalCall").routeId("process-sip-getStudySite-externalCall").errorHandler(noErrorHandler())

				.setProperty(IepGlobalConstants.IEP_PROPERTY_ORIGINAL_MESSAGE,body())
				.wireTap(dispatchUri("MAKE_GET_STUDY_SITE_API_CALL",false))
				.processRef("exchangeProcessor")
				.setHeader(Exchange.BREADCRUMB_ID,property(Constants.BREADCRUMB_ID))
				.setHeader(IepGlobalConstants.IEP_HEADER_CALLBACK_URL,simple("{{com.lilly.esb.iep.sip.getStudySite.external.api.url}}${property.StudyAlsCd}/${property.StudySiteRefId}"))
				.setHeader(Exchange.HTTP_METHOD, HttpMethods.GET)
				.to("direct:sip-externalAPICall")
				.log("get study site body is ${body}")
				.choice()
					.when(PredicateBuilder.in(body().isNull(), body().regex("^\\s*$")))
						.wireTap(dispatchUri("STUDY_SITE_ALREADY_EXISTS", false))
						.log("study site already exists in external sip")
						.setBody(property(IepGlobalConstants.IEP_PROPERTY_ORIGINAL_MESSAGE))
						.beanRef("studySiteHandler","setStudySiteProperties")
						.to("direct:process-sip-closeStudySite")	
					.endChoice()
					.when(body().isEqualTo("GEN_ERR_01"))
						.setBody(property(IepGlobalConstants.IEP_PROPERTY_ORIGINAL_MESSAGE))
						.to("direct:process-sip-StudySite-payload")
					.endChoice()
					.otherwise()
						.wireTap(dispatchUri("GET_STUDY_SITE_FAILED", true))
						.setProperty(Constants.STUDY_CREATE_FAILURE_FLAG,constant(true))
						.log("get study site call failed")
					.endChoice()
				.end()
				.end()
		;

		from("direct:process-sip-StudySite-payload").routeId("process-sip-StudySite-payload").errorHandler(noErrorHandler())
				.beanRef("studySiteHandler", "process")
				.log("after study site bean ${body}")
				.choice()
					.when(PredicateBuilder.in(body().isNull(), body().regex("^\\s*$")))
						.wireTap(dispatchUri("STUDY_SITE_PAYLOAD_IS_EMPTY", false))
						.log("create study site payload is empty ")
					.endChoice()
					.otherwise()
						.log("study site external call")
						.to("direct:process-sip-studySite-externalSipCall")
					.endChoice()
				.end()
		;
		
		from("direct:process-sip-studySite-externalSipCall").errorHandler(noErrorHandler())
				.setHeader(Exchange.HTTP_METHOD, HttpMethods.POST)
				.choice()
					.when(property(Constants.STUDY_SITE_CREATION).isEqualTo("Lilly"))
						.setHeader(IepGlobalConstants.IEP_HEADER_CALLBACK_URL,simple("{{com.lilly.esb.iep.sip.createStudySite.external.api.url}}"))
						.wireTap(dispatchUri("MAKE_CREATE_STUDY_SITE_EXT_API_CALL", false))
					.endChoice()
					.otherwise()
						.setHeader(IepGlobalConstants.IEP_HEADER_CALLBACK_URL,simple("{{com.lilly.esb.iep.sip.updateStudySite.external.api.url}}"))
						.wireTap(dispatchUri("MAKE_UPDATE_STUDY_SITE_EXT_API_CALL", false))
					.endChoice()
				.end()
				.to("direct:sip-externalAPICall")
				.choice()
					.when(header(Constants.EXTERNAL_API_RESPONSE_FLAG).isEqualTo(Boolean.TRUE))
						.log("study site is created successfully")
						.to("direct:process-sip-closeStudySite")
					.endChoice()
					.when(header(Constants.EXTERNAL_API_DUPLICATE_RESPONSE_FLAG).isEqualTo(Boolean.TRUE))
						.log("study site already exists")
						.to("direct:process-sip-closeStudySite")
					.endChoice()
					.otherwise()
						.setProperty(Constants.STUDY_CREATE_FAILURE_FLAG,constant(true))
						.log("study site failed to create or update")
					.endChoice()
				.end()
		;
 

		from("direct:process-sip-closeStudySite").routeId("process-sip-closeStudySite").errorHandler(noErrorHandler())
				.log("entered into the closestudy")
				.wireTap(dispatchUri("START_CLOSE_STUDY_SITE", false))
				.choice()
					.when(PredicateBuilder.and(property(Constants.HLD_CNCL_STOP_DT).isNotNull(),property(Constants.HLD_CNCL_STOP_DT).regex(".+"), property(Constants.LATEST_STNDRD_MLSTNCD).isLessThan(9200), property(Constants.CNCL_STOP_FLG).isEqualTo("Y")))
						.wireTap(dispatchUri("MAKE_CLOSE_STUDY_SITE_EXT_API_CALL", false))
						.to("direct:process-sip-closeStudySite-externalAPICall").id("sip-externalAPICall-closeStudySite")
					.endChoice()
					.otherwise()
						.to("direct:process-sip-closeStudySite-odataCall")
					.endChoice()
				.end()
				;
		
		from("direct:process-sip-closeStudySite-odataCall").errorHandler(noErrorHandler())
				.log("inside the close study site odata call route")
				.choice()
					.when(PredicateBuilder.or(property(Constants.STUDY_SITE_IIP_ID).isNull(),property(Constants.STUDY_SITE_IIP_ID).regex("^\\s*$")))
						.log("Study Site IIP ID is empty or null.Close study site odata call cannot be performed")
						.wireTap(dispatchUri("STUDY_SITE_IIP_ID_IS_EMPTY", false))
					.endChoice()
					.otherwise()
						.processRef("exchangeProcessor")
						.setHeader(Exchange.BREADCRUMB_ID,property(Constants.BREADCRUMB_ID))
						.wireTap(dispatchUri("MAKE_CLOSE_STUDY_SITE_ODATA_CALL", false))
						.processRef("oDataBasicAuthHeaderProcessor")
						.setHeader(Constants.PAGE_SIZE_OVERRIDE,constant(0))
						.setHeader(Exchange.HTTP_METHOD, HttpMethods.GET)
						.setHeader(Exchange.HTTP_QUERY,simple("{{com.lilly.esb.iep.sip.closeStudySite.odata.url.query}} ${property.StudySiteIipId}"))
						.inOut("https4://{{com.lilly.esb.iep.sip.closeStudySite.odata.url}}?throwExceptionOnFailure=false")
						.convertBodyTo(String.class)
						.to("direct:process-sip-initial-response-status-code")
						.wireTap(dispatchUri("CLOSE_STUDY_SITE_ODATA_RES", true))
						.choice()
							.when(header(Exchange.HTTP_RESPONSE_CODE).isNotEqualTo(constant(HttpURLConnection.HTTP_OK)))
								.log("http response code from close study site odata call is !=200")
								.wireTap(dispatchUri("NON_200_HTTP_FRM_CLOSE_STUDY_SITE_ODATA", false))
							.endChoice()
							.otherwise()
								.removeHeader(Exchange.HTTP_QUERY)
								.to("direct:process-sip-closeStudySite-OdataCall-response")
							.endChoice()
						.end()
					.endChoice()
				.end()
				;

		from("direct:process-sip-closeStudySite-OdataCall-response").routeId("process-sip-closeStudySite-OdataCall-response").errorHandler(noErrorHandler())
				.log("inside close study site odata call route")
				.unmarshal("jacksonDataFormat")
				.setBody(simple("${body[value]}"))
				.choice()
					.when(PredicateBuilder.or(body().isEqualTo("[]"), body().isNull()))
						.wireTap(dispatchUri("CLOSE_STUDY_SITE_ODATA_PAYLOAD_EMPTY", false))
						.log("close study site odata response body is empty ${body}")
					.endChoice()
					.otherwise()
						.to("direct:process-sip-closeStudySite-split")
					.endChoice()
				.end()
				;

		from("direct:process-sip-closeStudySite-split").routeId("process-sip-closeStudySite-split").errorHandler(noErrorHandler())
				.log("inside process-sip-closeStudySite-split route ")
				.wireTap(dispatchUri("SPLIT_CLOSE_STUDY_SITE_ODATA_PAYLOAD", false))
				.split().body()
				.wireTap(dispatchUri("SPLIT_CLOSE_STUDY_SITE_ODATA_PAYLOAD", true))
				.choice()
					.when(simple("${body[SiteMlstnActlDtm]} != null and  ${body[MlstnCd]} == 9900"))
						.log("close study site url is ${body}")
						.setProperty(Constants.HLD_CNCL_STOP_DT, simple("${body[SiteMlstnActlDtm]}"))
						.to("direct:process-sip-closeStudySite-externalAPICall")
					.endChoice()
					.when(simple("${body[SiteMlstnActlDtm]} != null and  ${body[MlstnCd]} == 9190"))
						.log("close study site url ${body}") 
						.setProperty(Constants.HLD_CNCL_STOP_DT, simple("${body[SiteMlstnActlDtm]}"))
						.to("direct:process-sip-closeStudySite-externalAPICall")
					.endChoice()
					.otherwise()// dont close study site
						.log(" ${body}")
						.wireTap(dispatchUri("DONT_CLOSE_STUDY_SITE", false))
					.endChoice()
				.end()
				.end()// end of odata														
				.end()
				;
		
		from("direct:process-sip-closeStudySite-externalAPICall").routeId("process-sip-closeStudySite-externalAPICall").errorHandler(noErrorHandler())
				.beanRef("odmPayloadBean", "constructCloseStudySitePayload")
				.log("close study site payload ${body}")
				.wireTap(dispatchUri("MAKE_CLOSE_STUDY_SITE_EXT_API_CALL", false))
				.setHeader(Exchange.HTTP_METHOD, HttpMethods.POST)
				.setHeader(IepGlobalConstants.IEP_HEADER_CALLBACK_URL,simple("{{com.lilly.esb.iep.sip.closeStudySite.external.api.url}}"))
				.to("direct:sip-externalAPICall")
				.choice()
					.when(header(Constants.EXTERNAL_API_RESPONSE_FLAG).isEqualTo(Boolean.TRUE))
						.log("study site close is successfully")
						.wireTap(dispatchUri("CLOSE_STUDY_SITE_SUCCESS",false))
					.endChoice()
					.when(header(Constants.EXTERNAL_API_DUPLICATE_RESPONSE_FLAG).isEqualTo(Boolean.TRUE))
						.log("study site close is successfully")
						.wireTap(dispatchUri("CLOSE_STUDY_SITE_SUCCESS",false))
					.endChoice()
					.otherwise()
						.wireTap(dispatchUri("CLOSE_STUDY_SITE_FAILED", false))
						.setProperty(Constants.STUDY_CREATE_FAILURE_FLAG,constant(true))
						.log("unsuccessful study site close")
					.endChoice()
				.end()
				;

	}

}

/**
 * Copyright (c) 2017 Eli Lilly and Company.  All rights reserved.
 */

package com.lilly.esb.iep.sip.routebuilder;

import java.net.HttpURLConnection;

import javax.ws.rs.core.MediaType;

import org.apache.camel.Exchange;
import org.apache.camel.builder.PredicateBuilder;
import org.apache.camel.component.http4.HttpMethods;
import org.apache.camel.model.OtherwiseDefinition;

import com.lilly.esb.iep.common.util.IepGlobalConstants;
import com.lilly.esb.iep.sip.aggregator.ExceptionAggregator;
import com.lilly.esb.iep.sip.beans.TriggerValidator;
import com.lilly.esb.iep.sip.constants.Constants;
import com.lilly.esb.iep.sip.processor.SponserProcessor;

/**
 * Sponsor Details route builder
 * <p>
 * Created by Shravan Vanaparthi on 5/16/2017.
 */
public class SponserRouteBuilder extends AbstractSipRouteBuilder {

	// @Override
	protected String processName() {
		return "sponsor";
	}

	@Override
	public void configure() throws Exception {
		super.configure();

		from("direct:sip-" + processName() + "-processor")
				.routeId("sip-" + processName() + "-integration.extract-route")

				.processRef("trackerProcessor")
				.wireTap(dispatchUri("_CREATE_UPDATE_SPONSOR_USER_START", false))
				.processRef("exchangeProcessor")
				.processRef("sharePointBasicAuthHeaderProcessor")
				.inOut("https://{{com.lilly.esb.iep.sip.sponsorlist.site}}?throwExceptionOnFailure=false")
				.convertBodyTo(String.class)
				.wireTap(dispatchUri("_SPONSOR_SHAREPOINT_RESULTS", true))
				.setProperty(Constants.STUDY_CREATE_FAILURE_FLAG,constant(false))
				.split(xpath("/base:feed/base:entry").namespace("base",
						"http://www.w3.org/2005/Atom"),new ExceptionAggregator()).stopOnException()
				.wireTap(dispatchUri("_SPONSOR_SHAREPOINT_RESULTS_XPATH", false))
				.setProperty(Constants.SPONSOR_CREATE_FAILURE_FLAG,constant(false))
				.setProperty(Constants.SPONSOR_BREADCRUMB_ID,header(Exchange.BREADCRUMB_ID))
				.to("direct:sip-" + processName() + ".split").end();
				 
		
		from("direct:sip-" + processName() + ".split")
				.routeId(
						"sip-" + processName()
								+ "-integration.extract-sponsor-route")
				.onException(Throwable.class)
				.handled(true)
				.processRef("defaultExceptionProcessor")
				.id("jms-exception-processor")
				.end()
				.processRef("trackerProcessor")
				.setProperty(IepGlobalConstants.IEP_PROPERTY_ORIGINAL_MESSAGE,
						body())
				.setHeader(
						Constants.ENTRY_UPDATED_TIME,
						xpath("/base:entry/base:updated/text()").namespace(
								"base", "http://www.w3.org/2005/Atom"))
				.setProperty(Constants.SPONSOR_TO_PROCESS_FLAG, xpath("//d:ToProcessValue/text()")
						.namespace("d",
								"http://schemas.microsoft.com/ado/2007/08/dataservices"))
				.setHeader(Constants.LILLY_GLOBAL_ID, xpath("//d:LillyGlobalID/text()")
						.namespace("d",
								"http://schemas.microsoft.com/ado/2007/08/dataservices"))
				.setProperty(Constants.LILLY_GLOBAL_ID,header(Constants.LILLY_GLOBAL_ID))
				.log("Lilly global Id is ${property.Lilly_Global_Id}")
				.wireTap(dispatchUri("_CHECK_UPDATED_TIME", false))
				.beanRef("triggerValidator", "entryDateFormat")
				.log("result is : ${header.Result}")
				.choice()
					.when(PredicateBuilder.and(property(Constants.SPONSOR_TO_PROCESS_FLAG).isEqualTo("Y"),
							PredicateBuilder.and(header(Constants.RESULT).isNotNull(),
									header(Constants.RESULT).isEqualTo(true))))
						.to("direct:GetSponsorUserRecord")
					.otherwise()
						.choice()
						.when(PredicateBuilder.and(property(Constants.SPONSOR_TO_PROCESS_FLAG).isEqualTo("Y"),
								PredicateBuilder.and(property(Constants.PROCESS_STUDY_LIST).isNotNull(),
										property(Constants.PROCESS_STUDY_LIST).isEqualTo(Boolean.TRUE))))
						.to("direct:GetSponsorUserRecord")
						.endChoice()
						.otherwise()
						.log("Sopnsor record not updated in last 15 mins")
						.endChoice()
				.wireTap(dispatchUri("_GET_SPONSOR_USER_RECORD", false))
				.endChoice()
				;

		from("direct:GetSponsorUserRecord")
				.routeId("GetSponsorUserRecord")
				.setHeader("SponsorType", constant("GET"))
				.setProperty(
						"PayLoad",
						xpath("//m:properties")
								.namespace("m",
										"http://schemas.microsoft.com/ado/2007/08/dataservices/metadata"))
				.processRef("sharePointBasicAuthHeaderProcessor")
				.setHeader(Exchange.CONTENT_TYPE,
						simple(MediaType.APPLICATION_XML + ";charset=UTF-8"))
				.setHeader(Exchange.HTTP_METHOD, HttpMethods.GET)
				.setHeader(
						IepGlobalConstants.IEP_HEADER_CALLBACK_URL,
						simple("{{com.lilly.esb.iep.sip.getSponsorUser.external.api.url}}${header.Lilly_Global_Id}?usertype=sponsor"))
				.wireTap(
						dispatchUri("_POSTING_GET_SPONSOR_USER_CALL_TO_SIP",
								true))
				.inOut("https://{{com.lilly.esb.iep.sip.external.api.proxy.url}}?throwExceptionOnFailure=false")
				.convertBodyTo(String.class)
				.id("get-sponser-sip-api-call")
				.to("direct:process-get-sponser-sip-api-call-status-code")

				.log("SponsorStatus is ${header.getSponsorStatus}")
				.choice().when(header("getSponsorStatus").isEqualTo("FAIL"))
				.to("direct:ProcessCreateSponsorRecord")
				.otherwise()
				.to("direct:ProcessUpdateSponsorRecord");

		from("direct:ProcessCreateSponsorRecord")
				.routeId("ProcessCreateSponsorRecord")
				.log("create sponsor user recode route")
				.setHeader("SponsorType", constant("CREATE"))
				.setHeader(Exchange.BREADCRUMB_ID,property(Constants.SPONSOR_BREADCRUMB_ID))
				.setProperty(Constants.BREADCRUMB_ID, header(Exchange.BREADCRUMB_ID).append("_").append("SPONSOR").append("_").append(property(Constants.LILLY_GLOBAL_ID)))
				.setHeader(Exchange.BREADCRUMB_ID,property(Constants.BREADCRUMB_ID))
				.unmarshal("jaxbDataFormatSponser")
				.log("entering into processor and body after unmarshalling ${body}")
				.doTry()
					.to("validator:schema/SharePointSchema.xsd")
				.doCatch(Exception.class)
				.end()
				.choice()
					.when(property(Exchange.EXCEPTION_CAUGHT).isNotNull())
						.wireTap(dispatchUri("STOPPED_SPONSOR_ON_VALIDATION_EXCEPTION", false))
						.log("stopped on exception")
					.endChoice()
					.otherwise()
						.process(new SponserProcessor())
						.processRef("sharePointBasicAuthHeaderProcessor")
						.setHeader(Exchange.CONTENT_TYPE,
								simple(MediaType.APPLICATION_XML + ";charset=UTF-8"))
						.setHeader(Exchange.HTTP_METHOD, HttpMethods.POST)
						.setHeader(
								IepGlobalConstants.IEP_HEADER_CALLBACK_URL,
								simple("{{com.lilly.esb.iep.sip.createSponsorUser.external.api.url}}"))
						.inOut("https://{{com.lilly.esb.iep.sip.external.api.proxy.url}}?throwExceptionOnFailure=false")
						.convertBodyTo(String.class)
						.id("post-sponser-sip-api-call")
						.wireTap(
								dispatchUri("_POSTING_CREATE_SPONSOR_USER_CALL_TO_SIP",
										true))
						.to("direct:sponsor-process-sip-initial-response-status-code")
						.to("direct:sponsor-process-final-response")
						.choice()
							.when(header(Constants.HTTP_RESPONSE_FLAG).isEqualTo(constant(false)))
								.log("Http reponse from external sip call is !=200")
								.wireTap(dispatchError("NON_200_HTTP_RES_FRM_EXT_SIP_CALL", true))
								.throwException(new Exception("NON_200_HTTP_RES_FRM_EXT_SIP_CALL"))
								.to("direct:sip-stop-process")
							.endChoice()
							.otherwise()
								.to("direct:sponsor-process-external-api-response")
							.endChoice()
						.end()
						.choice()
							.when(header(Constants.EXTERNAL_API_RESPONSE_FLAG).isNotEqualTo(constant(true)))
						.wireTap(dispatchUri("GEN_ERR", true)).id("gen-error-response-code-wireTap")
								.setProperty(Constants.SPONSOR_CREATE_FAILURE_FLAG,constant(true))
								.wireTap(dispatchUri("SPONSOR_CREATION_FAILED", false))
								.log("sponsor creation failed")
							.endChoice()
							.otherwise()
								.wireTap(dispatchUri("SPONSOR_CREATION_SUCCESSFULLY", false))
								.log("sponsor successfully created")
							.endChoice()
						.end()
					.endChoice()
				.end()
						;

		from("direct:ProcessUpdateSponsorRecord")
				.routeId("ProcessUpdateSponsorRecord")
				.log("update sponsoe record")
				.setHeader("SponsorType", constant("UPDATE"))
				.setHeader(Exchange.BREADCRUMB_ID,property(Constants.SPONSOR_BREADCRUMB_ID))
				.setProperty(Constants.BREADCRUMB_ID, header(Exchange.BREADCRUMB_ID).append("_").append("SPONSOR").append("_").append(property(Constants.LILLY_GLOBAL_ID)))
				.setHeader(Exchange.BREADCRUMB_ID,property(Constants.BREADCRUMB_ID))
				.unmarshal("jaxbDataFormatSponser")
				.doTry()
					.to("validator:schema/SharePointSchema.xsd")
				.doCatch(Exception.class)
				.end()
				.choice()
					.when(property(Exchange.EXCEPTION_CAUGHT).isNotNull())
						.wireTap(dispatchUri("STOPPED_SPONSOR_ON_VALIDATION_EXCEPTION", false))
						.log("stopped on exception")
					.endChoice()
					.otherwise()
						.process(new SponserProcessor())
						.processRef("sharePointBasicAuthHeaderProcessor")
						.setHeader(Exchange.CONTENT_TYPE,
								simple(MediaType.APPLICATION_XML + ";charset=UTF-8"))
						.setHeader(Exchange.HTTP_METHOD, HttpMethods.POST)
						.setHeader(
								IepGlobalConstants.IEP_HEADER_CALLBACK_URL,
								simple("{{com.lilly.esb.iep.sip.updateSponsorUser.external.api.url}}"))
								
						.inOut("https://{{com.lilly.esb.iep.sip.external.api.proxy.url}}?throwExceptionOnFailure=false")
						.convertBodyTo(String.class)
						.id("post-update-sponser-sip-api-call")
						.wireTap(
								dispatchUri("_POSTING_UPDATE_SPONSOR_USER_CALL_TO_SIP",
										true))
						.to("direct:sponsor-process-sip-initial-response-status-code")
						.to("direct:sponsor-process-final-response")
						.choice()
							.when(header(Constants.HTTP_RESPONSE_FLAG).isEqualTo(
									constant(false)))
								.log("Http reponse from external sip call is !=200")
								.wireTap(dispatchError("NON_200_HTTP_RES_FRM_EXT_SIP_CALL", true))
								.throwException(new Exception("NON_200_HTTP_RES_FRM_EXT_SIP_CALL"))
								.to("direct:sip-stop-process")
							.endChoice()
							.otherwise()
								.to("direct:sponsor-process-external-api-response")
								.choice()
									.when(header(Constants.EXTERNAL_API_RESPONSE_FLAG).isNotEqualTo(Boolean.TRUE))
										.wireTap(dispatchUri("GEN_ERR", true)).id("gen-error2-response-code-wireTap")
										.setProperty(Constants.SPONSOR_CREATE_FAILURE_FLAG,constant(true))
										.wireTap(dispatchUri("SPONSOR_UPDATE_FAILED", false))
										.log("sponsor update failed")
									.endChoice()
									.otherwise()
										.to("direct:ProcessUpdateAssociationsOnRecord")
									.endChoice()
								.end()		
							.endChoice()
						.end()
					.endChoice()
				.end()
						
		;

		from("direct:ProcessUpdateAssociationsOnRecord")
				.routeId("ProcessUpdateAssociationsOnRecord")
				.log("update sponsor with association")
				.setHeader("SponsorType", constant("UPDATE_ASSOCIATIONS"))
				.process(new SponserProcessor())
				.processRef("sharePointBasicAuthHeaderProcessor")
				.setHeader(Exchange.CONTENT_TYPE,
						simple(MediaType.APPLICATION_XML + ";charset=UTF-8"))
				.setHeader(Exchange.HTTP_METHOD, HttpMethods.POST)
				.setHeader(
						IepGlobalConstants.IEP_HEADER_CALLBACK_URL,
						simple("{{com.lilly.esb.iep.sip.associateSponsorUser.external.api.url}}"))
						.log("the body before proxy - update ASS ${body}")
				.inOut("https://{{com.lilly.esb.iep.sip.external.api.proxy.url}}?throwExceptionOnFailure=false")
				.convertBodyTo(String.class)
				.id("post-update-sponser-associate-sip-api-call")
				.wireTap(
						dispatchUri(
								"_POSTING_UPDATE_SPONSOR_USER_ASSOCIATIONS_CALL_TO_SIP",
								true))
				.setProperty(Constants.SPONSOR_GENERR,xpath("//sip:message/text()").namespace("sip",
								"http://www.sharedinvestigator.com/sip/schema"))
				.log("this is text for generro4 ${property.SponsorGenErr}")
				.choice()
				.when(property(Constants.SPONSOR_GENERR).regex(".*User already have the role.*"))
				.setProperty(Constants.SPONSOR_GENERR,constant(true))
				.endChoice()
				.end()
				.to("direct:sponsor-process-sip-initial-response-status-code")
				.to("direct:sponsor-process-final-response")
				.choice()
					.when(header(Constants.HTTP_RESPONSE_FLAG).isNotEqualTo(
							Boolean.TRUE))
						.log("Http reponse from external sip call is !=200")
						.wireTap(dispatchError("NON_200_HTTP_RES_FRM_EXT_SIP_CALL", true))
						.throwException(new Exception("NON_200_HTTP_RES_FRM_EXT_SIP_CALL"))
						.to("direct:sip-stop-process")
					.endChoice()
					.otherwise()
						.to("direct:sponsor-process-external-api-response")
						.choice()
							.when(PredicateBuilder.and(header(Constants.EXTERNAL_API_RESPONSE_FLAG).isNotEqualTo(Boolean.TRUE),property(Constants.SPONSOR_GENERR).isNotEqualTo(Boolean.TRUE)))
								.wireTap(dispatchUri("GEN_ERR", true)).id("gen-error3-response-code-wireTap")
								.setProperty(Constants.SPONSOR_CREATE_FAILURE_FLAG,constant(true))
								.wireTap(dispatchUri("SPONSOR_UPDATE_ASSOCIATION_FAILED", false))
								.log("sponsor update association failed")
							.endChoice()
							.otherwise()
									.log("sponsor association updated successfully")
							.endChoice()
						.end()
					.endChoice()
				.end();

				

		from("direct:process-get-sponser-sip-api-call-status-code")
				.errorHandler(noErrorHandler())
				.routeId("direct-process-sip-get-response-status-code")
				.choice()
				.when(header(Exchange.HTTP_RESPONSE_CODE).isEqualTo(
						constant(HttpURLConnection.HTTP_OK)))
				.wireTap(dispatchUri("_RES_200_HTTP_CODE_FROM_SIP", false))
				.id("200-get-response-code-wireTap")
				.convertBodyTo(String.class)
				.unmarshal("jaxbDataFormatOdmSponser")
				.process(new SponserProcessor())
				.endChoice()
				.otherwise()
				.wireTap(dispatchUri("_NON_200_HTTP_CODE_FROM_SIP", true))
				.id("non-200-get-response-code-wireTap")
				.to("direct:sponsor-process-sip-initial-response-status-code")
				.to("direct:sponsor-process-final-response")
				.choice()
				.when(header(Constants.HTTP_RESPONSE_FLAG).isNotEqualTo(
						Boolean.TRUE))
					.log("Http reponse from external sip call is !=200")
					.wireTap(dispatchError("NON_200_HTTP_RES_FRM_EXT_SIP_CALL", true))
					.throwException(new Exception("NON_200_HTTP_RES_FRM_EXT_SIP_CALL"))
					.to("direct:sip-stop-process")
				.endChoice()
				.to("direct:sponsor-process-external-api-response")
				.choice()
				.when(header(Constants.EXTERNAL_API_RESPONSE_FLAG)
						.isNotEqualTo(Boolean.TRUE))
				.wireTap(dispatchUri("GEN_ERR", true))
				.id("gen-error1-response-code-wireTap").end();

		from("direct:sponsor-process-sip-initial-response-status-code")
				.errorHandler(noErrorHandler())
				.routeId("direct-sponsor-process-sip-initial-response-status-code")
				.choice()
				.when(header(Exchange.HTTP_RESPONSE_CODE).isNull())
				.wireTap(
						dispatchUri(
								"SIP_REFERENCE_REC_NULL_HTTP_RESP_CODE_MILESTONE",
								true))
				.id("sponsor-null-response-code-wireTap")
				.endChoice()
				.when(header(Exchange.HTTP_RESPONSE_CODE).isEqualTo(
						constant(HttpURLConnection.HTTP_OK)))
				.wireTap(dispatchUri("SIP_REFERENCE_REC_200_HTTP_CODE_FROM_SIP_MILESTONE", true))
				.id("sponsor-200-response-code-wireTap")
				.endChoice()
				.when(header(Exchange.HTTP_RESPONSE_CODE).isEqualTo(
						constant(HttpURLConnection.HTTP_BAD_REQUEST)))
				.wireTap(
						dispatchUri(
								"SIP_REFERENCE_REC_400_HTTP_CODE_FROM_SIP_MILESTONE",
								true))
				.id("sponsor-400-response-code-wireTap")
				.endChoice()
				.when(header(Exchange.HTTP_RESPONSE_CODE).isEqualTo(
						constant(HttpURLConnection.HTTP_UNAUTHORIZED)))
				.wireTap(
						dispatchUri(
								"SIP_REFERENCE_REC_401_HTTP_CODE_FROM_SIP_MILESTONE",
								true))
				.id("sponsor-401-response-code-wireTap")
				.endChoice()
				.when(header(Exchange.HTTP_RESPONSE_CODE).isEqualTo(
						constant(HttpURLConnection.HTTP_BAD_METHOD)))
				.wireTap(
						dispatchUri(
								"SIP_REFERENCE_REC_405_HTTP_CODE_FROM_SIP_MILESTONE",
								true))
				.id("sponsor-405-response-code-wireTap")
				.endChoice()
				.when(header(Exchange.HTTP_RESPONSE_CODE).isEqualTo(
						constant(HttpURLConnection.HTTP_INTERNAL_ERROR)))
				.wireTap(
						dispatchUri("SIP_REFERENCE_REC_500_HTTP_CODE_FROM_SIP_MILESTONE",true))
				.id("sponsor-500-response-code-wireTap")
				.endChoice()
				.otherwise()
				.wireTap(
						dispatchUri(
								"SIP_REFERENCE_REC_BAD_HTTP_CODE_FROM_SIP_MILESTONE",
								true)).id("sponsor-unknown-response-code-wireTap")
				.endChoice()
		;
		from("direct:sponsor-process-external-api-response")
				.setBody(
						xpath("//sip:errorID/text()").namespace("sip",
								"http://www.sharedinvestigator.com/sip/schema"))
				.choice()
				.when(body().isEqualTo("GEN_ERR_01"))
				.log("Validation Failure")
				.when(body().isEqualTo("GEN_ERR_02"))
				.log("Entity Not Found")
				.when(body().isEqualTo("GEN_ERR_03"))
				.log("Service Invocation Exception")
				.when(body().isEqualTo("GEN_ERR_04"))
				.log("Invalid Request")
				.when(body().isEqualTo("GEN_ERR_05"))
				.log("Operation Not Supported")
				.when(body().isEqualTo("GEN_ERR_06"))
				.log("External Service Invocation Error")
				.when(body().isEqualTo("GEN_ERR_07"))
				.log("Duplicate Entity")
				.when(body().isEqualTo("GEN_ERR_08"))
				.log("Number Format Error")
				.when(body().isEqualTo("GEN_ERR_09"))
				.log("General Service Error / Technical Error")
				.otherwise()
				.setHeader(Constants.EXTERNAL_API_RESPONSE_FLAG, constant(true));

		from("direct:sponsor-process-final-response")
				.choice()
				.when(header(Exchange.HTTP_RESPONSE_CODE).isNotEqualTo(
						constant(HttpURLConnection.HTTP_OK)))
				.wireTap(dispatchUri("_NON_200_HTTP_CODE", true))
				.id("non-200-status-code-wireTap")
				.setHeader(Constants.HTTP_RESPONSE_FLAG, constant(false))
				.endChoice().otherwise()
				.wireTap(dispatchUri("_200_HTTP_RESPONSE", true))
				.setHeader(Constants.HTTP_RESPONSE_FLAG, constant(true))
				.endChoice();

	}

}

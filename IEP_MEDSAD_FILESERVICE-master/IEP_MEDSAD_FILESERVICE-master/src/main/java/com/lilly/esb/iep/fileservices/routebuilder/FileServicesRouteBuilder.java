package com.lilly.esb.iep.fileservices.routebuilder;	

import org.apache.camel.Exchange;
import org.apache.camel.builder.PredicateBuilder;
import org.apache.camel.builder.RouteBuilder;
import org.apache.camel.component.http4.HttpMethods;
import org.apache.camel.model.dataformat.CsvDataFormat;
import org.apache.camel.model.rest.RestBindingMode;

import com.lilly.esb.iep.fileservices.constants.Constants;
import com.lilly.iep.common.util.IepGlobalConstants;

/**
 * Gets data from sharepoint,process the data and generates a file of required
 * type in fs staging area
 * 
 * @author C241920
 */
public class FileServicesRouteBuilder extends RouteBuilder {
	
	
	@SuppressWarnings("deprecation")
	@Override
	public void configure() throws Exception {

		String contextName=getContext().getName();
		
		// Exception block which is called when any exception raises in the
		// entire flow and final exception response is constructed
		onException(Throwable.class)
			.handled(true)
			.setProperty(IepGlobalConstants.DISPATCH_SNOWTICKET,constant(false))
			.process("restResponseProcessor").id("final-response-processor-onException")
			.setHeader(Exchange.HTTP_QUERY,constant(null))
			.setHeader(Exchange.BREADCRUMB_ID, simple("${property.breadcrumbId}"))
			.process("defaultExceptionProcessor")			
			.end()
		;

		//REST configuration 
		restConfiguration().component("jetty").host("{{rest.hostname}}")
			.port("{{rest.port}}")
			.endpointProperty("handlers", "securityHandler")
			.bindingMode(RestBindingMode.off)
			.dataFormatProperty("prettyPrint", "true")
			.apiContextPath("/api-doc")
			.apiProperty("api.title", "User API")
			.apiProperty("api.version", "1.2.3")
			.apiProperty("cors", "true")
		;

		//Initiation of REST request
		rest("{{com.lilly.esb.iep.fs.cxfrs.endpoint}}")
			.get("/{SubscriptionId}")
			.to("direct:fs-ws-initial-route")
		;

		//Initial route
		from("direct:fs-ws-initial-route").routeId("fs-ws-initial-route")
			.setProperty(Exchange.BREADCRUMB_ID,simple("${in.header.breadcrumbId}"))
			.setProperty(IepGlobalConstants.DISPATCH_SNOWTICKET,constant(true))
			.setProperty(IepGlobalConstants.APPLICATION_CONTEXT_NAME,simple(contextName))
			.setProperty(Constants.IEP_HEADER_SUBSCRIPTION_ID,simple("${header.SubscriptionId}"))
			//Logging milestone for audit
			.bean("dispatcherProperties","dispatch(*,'FS_FILE_CREATION_TRIGGER','false','AUDIT')")
			.wireTap("dispatchServiceProcessor")
			//clearing body and headers before https call
			.setBody(constant(null))
			.removeHeaders("*")
			.setHeader(Exchange.BREADCRUMB_ID, simple("${property.breadcrumbId}"))
			.to("direct:fs-sharepoint-call-route").id("fs-sharepoint-call")
		;


		//Sharepoint call route
		from("direct:fs-sharepoint-call-route") .routeId("fs-sharepoint-call-route")
			.process("sharePointBasicAuthHeaderProcessor")
			.setHeader(Exchange.HTTP_METHOD, HttpMethods.GET)
			// retrieving a single record based on subscription id from
			// sharepoint
			.setHeader(Exchange.HTTP_QUERY,simple("{{com.lilly.esb.iep.fs.sharepoint.url.query}} '$simple{property.SubscriptionId}'"))
			.inOut("https4://{{com.lilly.esb.iep.fs.sharepoint.url}}").id("http-sharepoint-call")
			.convertBodyTo(String.class)
			// Logging sharepoint result
			.bean("dispatcherProperties","dispatch(*,'FS_QUERY_SUBSC_CONFIG_SP_LIST','true','AUDIT')")
			.wireTap("dispatchServiceProcessor")
			//exchange body will be null if request url doesn't contain valid subscription id
			.setBody(xpath("//m:properties").saxon().namespace("m","http://schemas.microsoft.com/ado/2007/08/dataservices/metadata"))
			//checks for the exchange body
			.choice()
				//checks body is empty or null and throws invalid SubscriptionId exception
				.when(PredicateBuilder.in(body().isNull(),body().regex("^\\s*$")))
					.bean("restRequestProcessor")
				.endChoice()
				.otherwise()
					// unmarshalling share point data into java object
					.unmarshal("jaxbDataFormat")
					// Logging unmarshall result
					.bean("dispatcherProperties","dispatch(*,'FS_LOAD_SUBSC_SP_CONFIG','true','AUDIT')")
					.wireTap("dispatchServiceProcessor").id("fs-unmarshal-sharepointdata-to-object")
					.bean("subscriptionProperties", "setSubscriptionConfigDetails")
					.to("direct:fs-db-result-extract-route").id("fs-db-result-extract")
				.endChoice()
			.end()

		; 


		// DB Result Extract route
		from("direct:fs-db-result-extract-route").routeId("fs-db-result-extract-route")
			.process("hibernateDataSourceProcessor")
			//storing original exchange body in a property 
			.setProperty(IepGlobalConstants.IEP_PROPERTY_ORIGINAL_MESSAGE,body())
			//cleaning the body since it is huge before dispatch call(to avoid heap space issue)
			.setBody(simple(" "))
			//Logging database result
			.bean("dispatcherProperties","dispatch(*,'FS_DB_SQL_QUERY_EXECUTED','false','AUDIT')")
			.wireTap("dispatchServiceProcessor")
			//retaining db result
			.setBody(simple("${property.IepOriginalMessage}"))
			.log("file output type ${property.FileOutputType}")
			.choice()
				// When it is tab delimited, actually it is fixed length format in MedSAD subscriptions
				// Hence Going through the BeanIO API to achieve the fixed length format via the transformation XML
				// Transformation XML is mandatory in case of tab delimited files
				.when(PredicateBuilder.or(property(Constants.FILE_OUTPUT_TYPE).isEqualToIgnoreCase(".xml"), property(Constants.DEIMITER_VALUE).isEqualToIgnoreCase("tab")))
				//.when(property(Constants.FILE_OUTPUT_TYPE).isEqualToIgnoreCase(".xml"))
					//checks for xslt property and throws exception if not provided
					.bean("restRequestProcessor","processEmptyXsltException")
					//converting into required format of xml using the xslt transformation 
					.bean("transformer")	
					//.to("xslt:transform.xsl?uriResolver=#customURIResolver")
					.setHeader(Exchange.FILE_NAME,simple("$simple{property.FileName}_${date:now:yyyy-MM-dd}${property.FileOutputType}"))
				.endChoice()
				//marshalling db result to different formats based on delimiter
				.otherwise()
					//checks for delimiter property and throws exception if not provided
					.bean("restRequestProcessor","processEmptyDelimiterException")
					.when(property(Constants.DEIMITER_VALUE).isEqualToIgnoreCase("pipe"))
						.marshal(new CsvDataFormat("{{datdelimiter}}"))
						//setting file name if not,the file,written to staging area will have exchange id as file name
						.setHeader(Exchange.FILE_NAME,simple("$simple{property.FileName}_${date:now:yyyy-MM-dd}${property.FileOutputType}"))
					.endChoice()
					.when(property(Constants.DEIMITER_VALUE).isEqualToIgnoreCase("comma"))
						.marshal(new CsvDataFormat("{{csvdelimiter}}"))	
						.setHeader(Exchange.FILE_NAME,simple("$simple{property.FileName}_${date:now:yyyy-MM-dd}${property.FileOutputType}"))
					.endChoice()
					/*.when(property(Constants.DEIMITER_VALUE).isEqualToIgnoreCase("tab"))
						.marshal(new CsvDataFormat("{{tabdelimiter}}"))	
						.setHeader(Exchange.FILE_NAME,simple("$simple{property.FileName}_${date:now:yyyy-MM-dd}${property.FileOutputType}"))
					.endChoice()*/
				.endChoice()
			.end()
			//storing marshalled/Transformed result in a property
			.setProperty(IepGlobalConstants.IEP_PROPERTY_ORIGINAL_MESSAGE,body())
			.setBody(simple(" "))
			//Logging marshalled/Transformed result
			.bean("dispatcherProperties","dispatch(*,'FS_DB_RESULTSET_IN_FILE_FORMAT','false','AUDIT')")
			.wireTap("dispatchServiceProcessor")
			//retaining marshalled/Transformed result
			.setBody(simple("${property.IepOriginalMessage}"))
			.to("direct:fs-file-transfer-to-staging-area-route").id("fs-file-transfer-to-staging-area")
		;


		//File Transfer route
		from("direct:fs-file-transfer-to-staging-area-route").routeId("fs-file-transfer-to-staging-area-route")
			//writing file to staging area
			.recipientList(simple("{{ftp.server}}$simple{property.Delivery}{{ftp.server.query}}")).id("fs-staging-location")
			//logging file transfer milestone
			.setBody(simple(" ")).id("fs-staging-area")
			.bean("dispatcherProperties","dispatch(*,'FS_SUBSC_FILE_FTPED_TO_STAGE_LOCATION','false','AUDIT')")
			.wireTap("dispatchServiceProcessor")
			.bean("restResponseProcessor","buildResponse")
			//logging final response milestone
			.bean("dispatcherProperties","dispatch(*,'FS_ACKN_SUBSC_FILE_CREATION','true','AUDIT')")
			.wireTap("dispatchServiceProcessor").id("fs-final-response")
		;

	}

}

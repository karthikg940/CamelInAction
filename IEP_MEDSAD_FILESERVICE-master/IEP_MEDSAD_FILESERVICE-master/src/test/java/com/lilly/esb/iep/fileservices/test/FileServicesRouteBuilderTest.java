package com.lilly.esb.iep.fileservices.test;

import javax.net.ssl.HttpsURLConnection;

import org.apache.camel.Exchange;
import org.apache.camel.builder.AdviceWithRouteBuilder;
import org.apache.camel.component.mock.MockEndpoint;
import org.apache.camel.impl.DefaultExchange;
import org.junit.Test;

import com.lilly.esb.iep.fileservices.constants.Constants;

/**
 * @author C241920
 */
public class FileServicesRouteBuilderTest extends LillyCamelSpringTestSupport {

	
	private static final String SUBSCRIPTION_ID = "MTM1";
	final static String cxfRsEndpoint = "https4://localhost:%s/IEP/test/rest/fileservices/v1"; 
	
	/**
	 * Test initial route happy path
	 */
	@Test
	public void testinitialRoute() throws Exception
	{
		context.getRouteDefinition("fs-ws-initial-route").adviceWith(context,new AdviceWithRouteBuilder(){

			@Override
			public void configure() throws Exception {
				final MockEndpoint mockFinalResponse = getMockEndpoint("mock:fs-sharepoint-call");
				mockFinalResponse.expectedPropertyReceived(Constants.IEP_HEADER_SUBSCRIPTION_ID,SUBSCRIPTION_ID);
				weaveById("fs-sharepoint-call").replace().to(mockFinalResponse);
			}
			
		});
		
		context.start();
		Exchange exchange=new DefaultExchange(context);
		exchange.getIn().setHeader(Constants.IEP_HEADER_SUBSCRIPTION_ID,SUBSCRIPTION_ID);
		exchange=template.send(cxfRsEndpoint,exchange);
	}
	
	/**
	 * Test sharepoint call happy path
	 */
	@Test
	public void testsharePointCallRoute() throws Exception
	{
		context.getRouteDefinition("fs-sharepoint-call-route").adviceWith(context,new AdviceWithRouteBuilder(){

			@Override
			public void configure() throws Exception {
				final MockEndpoint mockHttpSharePointCall = getMockEndpoint("mock:http-sharepoint-call");
				final MockEndpoint mockFinalResponse = getMockEndpoint("mock:fs-db-result-extract");
				mockHttpSharePointCall.expectedBodyReceived();
				mockFinalResponse.expectedPropertyReceived(Constants.FILE_OUTPUT_TYPE,".DAT");
				weaveByToString(".*https4.*").replace().inOut(mockHttpSharePointCall);
				weaveById("fs-db-result-extract").replace().to(mockFinalResponse);
			}
			
		});

		context.start();
		Exchange exchange=new DefaultExchange(context);
		exchange.setProperty(Constants.IEP_HEADER_SUBSCRIPTION_ID,SUBSCRIPTION_ID);
		exchange.getIn().setBody(getResourceAsString("/data/sharepointresult.xml"));
		exchange=template.send(cxfRsEndpoint,exchange);
	}
	
	/**
	 * Test db result extract happy path
	 */
	@Test
	public void testDbResultExtractRoute() throws Exception
	{
		context.getRouteDefinition("fs-db-result-extract-route").adviceWith(context,new AdviceWithRouteBuilder(){

			@Override
			public void configure() throws Exception {
				final MockEndpoint mockFinalResponse = getMockEndpoint("mock:fs-file-transfer-to-staging-area");
				mockFinalResponse.expectedBodiesReceived("/data/dbmarshalresult.txt");
				mockFinalResponse.expectedPropertyReceived(Constants.FILE_OUTPUT_TYPE,".DAT");
				weaveById("fs-file-transfer-to-staging-area").replace().to(mockFinalResponse);
			}
			
		});

		context.start();
		Exchange exchange=new DefaultExchange(context);
		exchange.setProperty(Constants.FILE_OUTPUT_TYPE,".DAT");
		exchange.setProperty(Constants.DEIMITER_VALUE,"pipe");
		exchange.setProperty(Constants.SQL_QUERY, "SELECT DISTINCT   RPT_ITEM_STATUS.TRADE_NAME,   RPT_ITEM_STATUS.SBMSN_DT,   RPT_ITEM_STATUS.WITHDRAWAL_DT,   RPT_ITEM_STATUS.MARKET_START_DT,   RPT_ITEM_STATUS.APRVL_DT,   RPT_ITEM_STATUS.COUNTRY_CD,   RPT_INDICATION.RPT_INDICATION_ID FROM   IIP_PRST_OWNER.RPT_ITEM_STATUS,   IIP_PRST_OWNER.RPT_ACTIVITY,   IIP_PRST_OWNER.RPT_ACTIVITY_INDICATION,   IIP_PRST_OWNER.RPT_INDICATION WHERE   RPT_ACTIVITY.ACTVTY_IDNTFCTN        = RPT_ITEM_STATUS.ACTVTY_IDNTFCTN AND RPT_ACTIVITY.ACTVTY_IDNTFCTN      = RPT_ACTIVITY_INDICATION.ACTVTY_IDNTFCTN AND RPT_ACTIVITY_INDICATION.INDCTN_CD = RPT_INDICATION.INDCTN_CD");
		exchange=template.send(cxfRsEndpoint,exchange);
	}
	
	/**
	 * Test .csv data happy path
	 */
	@Test
	public void testCSVDataCreationRoute() throws Exception
	{
		context.getRouteDefinition("fs-db-result-extract-route").adviceWith(context,new AdviceWithRouteBuilder(){

			@Override
			public void configure() throws Exception {

				final MockEndpoint mockFinalResponse = getMockEndpoint("mock:fs-file-transfer-to-staging-area");
				mockFinalResponse.expectedBodiesReceived();
				mockFinalResponse.expectedPropertyReceived(Constants.FILE_OUTPUT_TYPE,".csv");
				weaveById("fs-file-transfer-to-staging-area").replace().to(mockFinalResponse);
				
			}
			
		});

		context.start();
		Exchange exchange=new DefaultExchange(context);
		exchange.setProperty(Constants.FILE_OUTPUT_TYPE,".csv");
		exchange.setProperty(Constants.DEIMITER_VALUE,"comma");
		exchange.setProperty(Constants.SQL_QUERY, "{{validSqlQuery}}");
		exchange=template.send(cxfRsEndpoint,exchange);
	}
	
	/**
	 * Test .dat data happy path
	 */
	@Test
	public void testDATDataCreationRoute() throws Exception
	{
		context.getRouteDefinition("fs-db-result-extract-route").adviceWith(context,new AdviceWithRouteBuilder(){

			@Override
			public void configure() throws Exception {
				final MockEndpoint mockFinalResponse = getMockEndpoint("mock:fs-file-transfer-to-staging-area");
				mockFinalResponse.expectedBodiesReceived("/data/datdelimiterresult.txt");
				mockFinalResponse.expectedPropertyReceived(Constants.FILE_OUTPUT_TYPE,".dat");
				weaveById("fs-file-transfer-to-staging-area").replace().to(mockFinalResponse);
			}
			
		});

		context.start();
		Exchange exchange=new DefaultExchange(context);
		exchange.setProperty(Constants.FILE_OUTPUT_TYPE,".dat");
		exchange.setProperty(Constants.DEIMITER_VALUE,"pipe");
		exchange.setProperty(Constants.SQL_QUERY, "{{validSqlQuery}}");
		exchange=template.send(cxfRsEndpoint,exchange);
	}
	
	/**
	 * Test .out data happy path
	 */
	@Test
	public void testOUTDataCreationRoute() throws Exception
	{
		context.getRouteDefinition("fs-db-result-extract-route").adviceWith(context,new AdviceWithRouteBuilder(){

			@Override
			public void configure() throws Exception {
				final MockEndpoint mockFinalResponse = getMockEndpoint("mock:fs-file-transfer-to-staging-area");
				mockFinalResponse.expectedBodiesReceived("/data/tabdelimiterresult.txt");
				mockFinalResponse.expectedPropertyReceived(Constants.FILE_OUTPUT_TYPE,".OUT");
				weaveById("fs-file-transfer-to-staging-area").replace().to(mockFinalResponse);
			}
			
		});

		context.start();
		Exchange exchange=new DefaultExchange(context);
		exchange.setProperty(Constants.FILE_OUTPUT_TYPE,".OUT");
		exchange.setProperty(Constants.DEIMITER_VALUE,"tab");
		exchange.setProperty(Constants.SQL_QUERY, "{{tabresultsqlquery}}");
		exchange=template.send(cxfRsEndpoint,exchange);
	}
	
	/**
	 * Test .xml data happy path
	 */
	@Test
	public void testXMLDataCreationRoute() throws Exception
	{
		context.getRouteDefinition("fs-db-result-extract-route").adviceWith(context,new AdviceWithRouteBuilder(){

			@Override
			public void configure() throws Exception {
				final MockEndpoint mockFinalResponse = getMockEndpoint("mock:fs-file-transfer-to-staging-area");
				mockFinalResponse.expectedBodiesReceived("/data/xmlresult.xml");
				mockFinalResponse.expectedPropertyReceived(Constants.FILE_OUTPUT_TYPE,".XML");
				weaveById("fs-file-transfer-to-staging-area").replace().to(mockFinalResponse);
			}
			
		});

		context.start();
		Exchange exchange=new DefaultExchange(context);
		exchange.setProperty(Constants.FILE_OUTPUT_TYPE,".XML");
		exchange.setProperty(Constants.XSLT,getResourceAsString("/data/studyxslttemplate.txt"));
		exchange.setProperty(Constants.SQL_QUERY,"{{validsqlqueryforxmlresult}}");
		exchange=template.send(cxfRsEndpoint,exchange);
	}
	
	/**
	 * Test file transfer happy path
	 */
	@Test
	public void testFileTransferRoute() throws Exception
	{
		context.getRouteDefinition("fs-file-transfer-to-staging-area-route").adviceWith(context,new AdviceWithRouteBuilder(){

			@Override
			public void configure() throws Exception {
				final MockEndpoint mockFinalResponse = getMockEndpoint("mock:fs-staging-area-transfer");
				mockFinalResponse.expectedBodiesReceived("generatedfile.DAT");
				mockFinalResponse.expectedPropertyReceived(Constants.FILE_OUTPUT_TYPE,".DAT");
				weaveById("fs-staging-area").replace().to(mockFinalResponse);
			}
			
		});

		context.start();
		Exchange exchange=new DefaultExchange(context);
		exchange.setProperty(Constants.FILE_OUTPUT_TYPE,".DAT");
		exchange.getIn().setBody(getResourceAsString("/data/datdelimiterresult.txt"));
		exchange.getIn().setHeader(Exchange.FILE_NAME,"generatedfile${property.FileOutputType}");
		exchange=template.send(cxfRsEndpoint,exchange);
	}
	
	/**
	 * Test final response happy path
	 */
	@Test
	public void testFinalResponse() throws Exception
	{
		context.getRouteDefinition("fs-file-transfer-to-staging-area-route").adviceWith(context,new AdviceWithRouteBuilder(){

			@Override
			public void configure() throws Exception {
				final MockEndpoint mockFinalResponse = getMockEndpoint("mock:fs-final-response");
				mockFinalResponse.expectedBodiesReceived("File is generated successfully");
				mockFinalResponse.expectedHeaderReceived(Exchange.HTTP_RESPONSE_CODE,HttpsURLConnection.HTTP_OK);
				weaveById("fs-final-response").replace().to(mockFinalResponse);
			}
			
		});

		context.start();
		Exchange exchange=new DefaultExchange(context);
		exchange=template.send(cxfRsEndpoint,exchange);
	}
	
	/**
	 * Test failed initial route exception flow
	 */
	@Test
	public void testinitialRouteExceptionFlow() throws Exception
	{
		context.getRouteDefinition("fs-ws-initial-route").adviceWith(context,new AdviceWithRouteBuilder(){

			@Override
			public void configure() throws Exception {
				final MockEndpoint mockFinalResponse = getMockEndpoint("mock:final-response-processor-onException");
				mockFinalResponse.expectedBodiesReceived("error ocurred! please check the servicenow ticket"+"\n"+"Missing required parameter(s): ");
				mockFinalResponse.expectedHeaderReceived(Exchange.HTTP_RESPONSE_CODE,HttpsURLConnection.HTTP_BAD_REQUEST);
				weaveById("final-response-processor-onException").replace().to(mockFinalResponse);
			}
			
		});
		
		context.start();
		Exchange exchange=new DefaultExchange(context);
		//setting invalid subscription id
		exchange.getIn().setHeader(Constants.IEP_HEADER_SUBSCRIPTION_ID,"");
		exchange=template.send(cxfRsEndpoint,exchange);
	}
	
	@Test
	public void testsharePointCallRouteOnExceptionFlow() throws Exception
	{
		context.getRouteDefinition("fs-sharepoint-call-route").adviceWith(context,new AdviceWithRouteBuilder(){

			@Override
			public void configure() throws Exception {
				final MockEndpoint mockFinalResponse = getMockEndpoint("mock:final-response-processor-onException");
				mockFinalResponse.expectedPropertyReceived(Constants.FILE_OUTPUT_TYPE,".DAT");
				mockFinalResponse.expectedHeaderReceived(Exchange.HTTP_RESPONSE_CODE,HttpsURLConnection.HTTP_INTERNAL_ERROR);
				//calling a invalid sharepoint url
				weaveByToString(".*https4.*").replace().inOut("https4://"+"{{failSharePointUrl}}");
				weaveById("final-response-processor-onException").replace().to(mockFinalResponse);
			}
			
		});

		context.start();
		Exchange exchange=new DefaultExchange(context);
		exchange.setProperty(Constants.IEP_HEADER_SUBSCRIPTION_ID,SUBSCRIPTION_ID);
		exchange.getIn().setBody(getResourceAsString("/data/sharepointresult.xml"));
		exchange=template.send(cxfRsEndpoint,exchange);
	}
	
	@Test
	public void testFailedUnmarshalOnExceptionFlow() throws Exception
	{
		context.getRouteDefinition("fs-sharepoint-call-route").adviceWith(context,new AdviceWithRouteBuilder(){

			@Override
			public void configure() throws Exception {
				final MockEndpoint mockFinalResponse = getMockEndpoint("mock:final-response-processor-onException");
				mockFinalResponse.expectedHeaderReceived(Exchange.HTTP_RESPONSE_CODE,HttpsURLConnection.HTTP_INTERNAL_ERROR);
				weaveById("final-response-processor-onException").replace().to(mockFinalResponse);
			}
			
		});

		context.start();
		Exchange exchange=new DefaultExchange(context);
		//setting invalid unmarshal result as exchange body
		exchange.getIn().setBody(getResourceAsString("/data/failureunmarshalresult.xml"));
		exchange=template.send(cxfRsEndpoint,exchange);
	}
	
	@Test
	public void testfailedSqlQueryOnExceptionFlow() throws Exception
	{
		context.getRouteDefinition("fs-db-result-extract-route").adviceWith(context,new AdviceWithRouteBuilder(){

			@Override
			public void configure() throws Exception {
				final MockEndpoint mockFinalResponse = getMockEndpoint("mock:final-response-processor-onException");
				mockFinalResponse.expectedHeaderReceived(Exchange.HTTP_RESPONSE_CODE,HttpsURLConnection.HTTP_INTERNAL_ERROR);
				weaveById("final-response-processor-onException").replace().to(mockFinalResponse);
			}
			
		});

		context.start();
		Exchange exchange=new DefaultExchange(context);
		exchange.setProperty(Constants.FILE_OUTPUT_TYPE,".DAT");
		exchange.setProperty(Constants.DEIMITER_VALUE,"pipe");
		//setting invalid sql query
		exchange.setProperty(Constants.SQL_QUERY, "{{invalidSqlQuery}}");
		exchange=template.send(cxfRsEndpoint,exchange);
	}
	
	@Test
	public void testfailedmarshalOnExceptionFlow() throws Exception
	{
		context.getRouteDefinition("fs-db-result-extract-route").adviceWith(context,new AdviceWithRouteBuilder(){

			@Override
			public void configure() throws Exception {
				final MockEndpoint mockFinalResponse = getMockEndpoint("mock:final-response-processor-onException");
				mockFinalResponse.expectedHeaderReceived(Exchange.HTTP_RESPONSE_CODE,HttpsURLConnection.HTTP_INTERNAL_ERROR);
				weaveById("final-response-processor-onException").replace().to(mockFinalResponse);
			}
			
		});

		context.start();
		Exchange exchange=new DefaultExchange(context);
		exchange.setProperty(Constants.FILE_OUTPUT_TYPE,".DAT");
		//setting invalid delimiter value
		exchange.setProperty(Constants.DEIMITER_VALUE,"pip");
		exchange.setProperty(Constants.SQL_QUERY, "{{validSqlQuery}}");
		exchange=template.send(cxfRsEndpoint,exchange);
	}
	
	@Test
	public void testfailedFileTransferOnExceptionFlow() throws Exception
	{
		context.getRouteDefinition("fs-file-transfer-to-staging-area-route").adviceWith(context,new AdviceWithRouteBuilder(){

			@Override
			public void configure() throws Exception {
				final MockEndpoint mockFinalResponse = getMockEndpoint("mock:final-response-processor-onException");
				mockFinalResponse.expectedHeaderReceived(Exchange.HTTP_RESPONSE_CODE,HttpsURLConnection.HTTP_INTERNAL_ERROR);
				weaveById("final-response-processor-onException").replace().to(mockFinalResponse);
				//setting invalid ftp server location for writing file
				weaveById("fs-staging-location").replace().to("{{failedFtpServerLocation}}");
			}
			
		});

		context.start();
		Exchange exchange=new DefaultExchange(context);
		exchange.setProperty(Constants.FILE_OUTPUT_TYPE,".DAT");
		exchange.getIn().setBody(getResourceAsString("/data/datdelimiterresult.txt"));
		exchange.getIn().setHeader(Exchange.FILE_NAME,"generatedfile${property.FileOutputType}");
		exchange=template.send(cxfRsEndpoint,exchange);
	}
}

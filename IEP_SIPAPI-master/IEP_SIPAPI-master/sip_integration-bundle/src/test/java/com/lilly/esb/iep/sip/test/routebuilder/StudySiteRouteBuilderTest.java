/**
* Copyright (c) 2017 Eli Lilly and Company.  All rights reserved.
*/

package com.lilly.esb.iep.sip.test.routebuilder;

import java.net.HttpURLConnection;
import java.util.List;

import org.apache.camel.Exchange;
import org.apache.camel.Processor;
import org.apache.camel.builder.AdviceWithRouteBuilder;
import org.apache.camel.component.mock.MockEndpoint;
import org.junit.Before;
import org.junit.Test;

import com.lilly.esb.iep.sip.constants.Constants;

/**
 * @author C241920
 *
 */
public class StudySiteRouteBuilderTest extends AbstractSipRouteBuilderTest{

	 @Override
     protected String getBlueprintDescriptor() {
        return "OSGI-INF/blueprint/blueprint-beans-test.xml";
     }
 
     @Before
     @Override
     public void setUp() throws Exception {
         super.setUp();
 
     }

     MockEndpoint  sipcreateStudySiteMockEndpoint;
     @Test
 	public void testCreateStudySiteFlow() throws Exception {

 		final int numberOfOdataSiteIds = 2;
 		final MockEndpoint  sipGetSiteOdataWebServiceMockEndPoint = this.mockSipGetSiteOdataWebService(HttpURLConnection.HTTP_OK);
 		final MockEndpoint  sipProcessStudySiteMarshalMockEndPoint = this.mockSipprocessstudySiteMarshal();
 		final MockEndpoint  sipProcessSipStudySiteSplitMockEndPoint = this.mockProcessSipstudySiteSplit();
 		final MockEndpoint  sipClosestudySiteMockEndPoint = this.mockProcessSipClosestudySite(HttpURLConnection.HTTP_OK);
 		final MockEndpoint  sipClosestudySiteSplitMockEndPoint = this.mockProcessSipClosestudySiteSplit();
 		context.start();
 		context.getProperties().put(Exchange.LOG_DEBUG_BODY_STREAMS,"true");
 		 
 		sipGetSiteOdataWebServiceMockEndPoint.expectedHeaderReceived(
				Exchange.HTTP_RESPONSE_CODE, 200);
 		sipcreateStudySiteMockEndpoint.expectedMessageCount(1);
  		sipProcessStudySiteMarshalMockEndPoint.expectedMessageCount(1);
  		sipProcessStudySiteMarshalMockEndPoint.expectedBodiesReceived(List.class);
 		sipProcessSipStudySiteSplitMockEndPoint.expectedMessageCount(numberOfOdataSiteIds);
 
 		sipClosestudySiteMockEndPoint.expectedHeaderReceived(
				Exchange.HTTP_RESPONSE_CODE, 200);
 		sipClosestudySiteSplitMockEndPoint.expectedMessageCount(numberOfOdataSiteIds);
 	

 	}
     
     
     
     private MockEndpoint mockSipGetSiteOdataWebService(final Integer responseCode)  throws Exception {
 		final MockEndpoint processSipcreateStudySiteMockEndpoint = getMockEndpoint("mock:process-sip-createStudySite");
 		sipcreateStudySiteMockEndpoint = getMockEndpoint("mock:sip-createStudySite");
 		  
 		context.getRouteDefinition("process-sip-StudySite").adviceWith(context,
 				new AdviceWithRouteBuilder() {
 					@Override
 					public void configure() throws Exception {
 						
 					 
 						weaveByToString(".*https.*")
 								.replace()
 								.inOut(processSipcreateStudySiteMockEndpoint)
 								.setBody(
 										simple("resource:classpath:data/study_site_details.xml"))
 										.process(new Processor() {
 				                            @Override
 				                            public void process(Exchange exchange) throws Exception {
 				                                exchange.getIn().setHeader(Exchange.HTTP_RESPONSE_CODE, responseCode);
 				                          
 				    					}		 
 				    					})
 				    					.to(sipcreateStudySiteMockEndpoint);
 													 
 					}
 								 
 				});
 		return processSipcreateStudySiteMockEndpoint;
 	}
     
     private MockEndpoint mockSipprocessstudySiteMarshal()  throws Exception {
  		final MockEndpoint processSipStudySitemarshallMockEndpoint = getMockEndpoint("mock:process-sip-studySite-marshall");
  		
  		  
  		context.getRouteDefinition("process-sip-studySite-marshall").adviceWith(context,
  				new AdviceWithRouteBuilder() {
  					@Override
  					public void configure() throws Exception {
  						weaveByToString(".*direct.*").replace().to(processSipStudySitemarshallMockEndpoint)
  						  .setBody(simple("resource:classpath:data/study_site_marshal_payload.txt"));
  						
  					}
  					});
  		return processSipStudySitemarshallMockEndpoint;
  	}
     
     
     private MockEndpoint mockProcessSipstudySiteSplit()  throws Exception {
   		final MockEndpoint processSipStudySitesplitMockEndpoint = getMockEndpoint("mock:process-sip-studySite-split");
   		
   		context.getRouteDefinition("process-sip-studySite-split").adviceWith(context,
   				new AdviceWithRouteBuilder() {
   					@Override
   					public void configure() throws Exception {
   						
   						weaveByToString(".*direct.*").replace().to(processSipStudySitesplitMockEndpoint)
   						.setBody(simple("resource:classpath:data/study_site_details.xml"));
   					} 
   					});
   	
   		return processSipStudySitesplitMockEndpoint;
     
   	}
     
     
     private MockEndpoint mockProcessSipStudySiteExternalCall(final Integer responseCode)  throws Exception {
    		final MockEndpoint mockProcessSipStudySiteExternalCallMockEndpoint = getMockEndpoint("mock:process-sip-get-site-nonexisted-service");
    		 

    		context.getRouteDefinition("process-sip-getStudySite-externalCall").adviceWith(context,
    				new AdviceWithRouteBuilder() {
    					@Override
    					public void configure() throws Exception {
    						 
    						weaveByToString(".*direct:sip-ExternalAPICall.*")
								.replace()
								.to(mockProcessSipStudySiteExternalCallMockEndpoint)
								.setBody(
										simple("resource:classpath:data/get_nonexisted_site_response.xml"))
								 .process(new Processor() {
                            @Override
                            public void process(Exchange exchange) throws Exception {
                                exchange.getIn().setHeader(Exchange.HTTP_RESPONSE_CODE, responseCode);
                                
                            
    					}		 
    					});
    					}
    		 
    		});
    		return mockProcessSipStudySiteExternalCallMockEndpoint;
    	 
}
     private MockEndpoint mockProcessSipStudySiteGetExternalCall(final Integer responseCode)  throws Exception {
 		final MockEndpoint mockProcessSipStudySiteExternalCallMockEndpoint = getMockEndpoint("mock:process-sip-get-site-existed-service");
 		 

 		context.getRouteDefinition("process-sip-getStudySite-externalCall").adviceWith(context,
 				new AdviceWithRouteBuilder() {
 					@Override
 					public void configure() throws Exception {

 						weaveByToString(".*direct:sip-ExternalAPICall.*").replace().to(mockProcessSipStudySiteExternalCallMockEndpoint)
 						 
 						.process(new Processor() {
                         @Override
                         public void process(Exchange exchange) throws Exception {
                             exchange.getIn().setHeader(Exchange.HTTP_RESPONSE_CODE, responseCode);
                             exchange.getIn().setBody(simple("resource:classpath:data/get_existed_site_response.xml"));
                                  
 					}		 
 					});
 					}
 		 
 		});
 		return mockProcessSipStudySiteExternalCallMockEndpoint;
 	 
}
     
 
     private MockEndpoint mockProcessSipClosestudySite(final Integer responseCode)  throws Exception {
  		final MockEndpoint processSipCloseStudySitesMockEndpoint = getMockEndpoint("mock:process-sip-closeStudySite");
  		
  		context.getRouteDefinition("process-sip-closeStudySite").adviceWith(context,
  				new AdviceWithRouteBuilder() {
  					@Override
  					public void configure() throws Exception {
  						
  						weaveById("sip-externalAPICall-closeStudySite").replace().to(processSipCloseStudySitesMockEndpoint)
  						.setProperty((Constants.LATEST_STNDRD_MLSTNCD),simple("9100"))
  						.setProperty((Constants.HLD_CNCL_STOP_DT),simple("06-09-2017"))
  						.setProperty((Constants.CNCL_STOP_FLG),simple("Y"))
  						.setBody(simple("resource:classpath:data/create_study_site_payload.xml"))
  						.process(new Processor() {
  	                         @Override
  	                         public void process(Exchange exchange) throws Exception {
  	                             exchange.getIn().setHeader(Exchange.HTTP_RESPONSE_CODE, responseCode);
  	                             
  	                                  
  	 					}		 
  	 					});
  					} 
  					});
  	
  		return processSipCloseStudySitesMockEndpoint;
    
  	}
     
     
     private MockEndpoint mockProcessSipClosestudySiteOdataResponse(final Integer responseCode)  throws Exception {
   		final MockEndpoint processSipCloseStudySitesMockEndpoint = getMockEndpoint("mock:process-sip-closeStudySite-OdataCall-response");
   		
   		context.getRouteDefinition("process-sip-closeStudySite-OdataCall-response").adviceWith(context,
   				new AdviceWithRouteBuilder() {
   					@Override
   					public void configure() throws Exception {
   						
   						weaveByToString(".*direct.*").replace().to(processSipCloseStudySitesMockEndpoint)
   						 
   						.setBody(simple("resource:classpath:data/close_study_site_odata_value_details.txt"))
   						.process(new Processor() {
   	                         @Override
   	                         public void process(Exchange exchange) throws Exception {
   	                             exchange.getIn().setHeader(Exchange.HTTP_RESPONSE_CODE, responseCode);
   	                             
   	                                  
   	 					}		 
   	 					});
   					} 
   					});
   	
   		return processSipCloseStudySitesMockEndpoint;
     
   	}
     
     private MockEndpoint mockProcessSipClosestudySiteSplit()  throws Exception {
    		final MockEndpoint processSipCloseStudySitesSplit = getMockEndpoint("mock:process-sip-closeStudySite-split");
    		
    		context.getRouteDefinition("process-sip-closeStudySite-split").adviceWith(context,
    				new AdviceWithRouteBuilder() {
    					@Override
    					public void configure() throws Exception {
    						
    						weaveByToString(".*direct.*").replace().to(processSipCloseStudySitesSplit)
    						 
    						.setBody(simple("resource:classpath:data/close_study_site_odata_value_details.txt"));
    						 
    					} 
    					});
    	
    		return processSipCloseStudySitesSplit;
      
    	}
       
      
 	
}

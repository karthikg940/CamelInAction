/**
* Copyright (c) 2017 Eli Lilly and Company.  All rights reserved.
*/

package com.lilly.esb.iep.sip.test.routebuilder;
import org.apache.camel.Exchange;
import org.apache.camel.builder.AdviceWithRouteBuilder;
import org.apache.camel.component.mock.MockEndpoint;
import org.junit.Before;
import org.junit.Test;


/**
 * @author C241920
 *
 */
public class PrimaryMappingRouteBuilderTest extends AbstractSipRouteBuilderTest {

	@Override
	protected String getBlueprintDescriptor() {
		return "OSGI-INF/blueprint/blueprint-beans-test.xml";
	}

	@Before
	@Override
	public void setUp() throws Exception {
		super.setUp();

	}	
	
	MockEndpoint sipPrimaryMockEndPoint;
	
	@Test
	public void testPrimaryInvestigatorIdSharePointCallFlow() throws Exception {
		
		final int numberOfPrimaryIdsSplit = 4;
 		final MockEndpoint  sipGetSiteOdataWebServiceMockEndPoint = this.mockFacilityMappingSharepointList();
 		 
 		context.start();
 		context.getProperties().put(Exchange.LOG_DEBUG_BODY_STREAMS,"true");
 		 
 		sipGetSiteOdataWebServiceMockEndPoint.expectedMessageCount(numberOfPrimaryIdsSplit);
	}
	
	private MockEndpoint mockFacilityMappingSharepointList() throws Exception {
		final MockEndpoint sipProcessFacilitySharePointMockEndpoint = getMockEndpoint("mock:sip-process-primaryInvestigatorID-sharePoint");
		sipPrimaryMockEndPoint = getMockEndpoint("mock:sipPrimaryMockEndPoint");
		context.getRouteDefinition("process-sip-primaryInvestigatorIdSharePointCall").adviceWith(context,
				new AdviceWithRouteBuilder() {
					@Override
					public void configure() throws Exception {
						// WeavebyId not working
						weaveByToString(".*https.*")
								.replace()
								.inOut(sipProcessFacilitySharePointMockEndpoint)
								.setBody(
										simple("resource:classpath:data/primary_investigator_details.txt"));
					}
				});
		return sipProcessFacilitySharePointMockEndpoint;
	}
	
}

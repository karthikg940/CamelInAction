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
public class FacilityMappingRouteBuliderTest extends AbstractSipRouteBuilderTest {

	@Override
	protected String getBlueprintDescriptor() {
		return "OSGI-INF/blueprint/blueprint-beans-test.xml";
	}

	@Before
	@Override
	public void setUp() throws Exception {
		super.setUp();

	}	
	
	MockEndpoint sipFacilityMockEndPoint;
	
	@Test
	public void testCreateFacilityMappingFlow() throws Exception {
		
		final int numberOfFacilityIdsSplit = 2;
 		final MockEndpoint  sipGetSiteOdataWebServiceMockEndPoint = this.mockFacilityMappingSharepointList();
 		 
 		context.start();
 		context.getProperties().put(Exchange.LOG_DEBUG_BODY_STREAMS,"true");
 		 
 		sipGetSiteOdataWebServiceMockEndPoint.expectedMessageCount(numberOfFacilityIdsSplit);
	}
	
	private MockEndpoint mockFacilityMappingSharepointList() throws Exception {
		final MockEndpoint sipProcessFacilitySharePointMockEndpoint = getMockEndpoint("mock:sip-process-facilitySharePoint");
		sipFacilityMockEndPoint = getMockEndpoint("mock:sipFacilityMockEndPoint");
		context.getRouteDefinition("process-sip-facilitySharePoint").adviceWith(context,
				new AdviceWithRouteBuilder() {
					@Override
					public void configure() throws Exception {
						 
						weaveByToString(".*https.*")
								.replace()
								.inOut(sipProcessFacilitySharePointMockEndpoint)
								.setBody(
										simple("resource:classpath:data/facility_mapping_details.txt"));
					}
				});
		return sipProcessFacilitySharePointMockEndpoint;
	}
	
}

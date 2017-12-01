package com.lilly.esb.iep.sip.test.routebuilder;

import com.lilly.esb.iep.sip.test.LillyCamelBlueprintTestSupport;



/**
 * Created by Shravan Vanaparthi on 5/21/2017.
 */
public class AbstractSipRouteBuilderTest extends LillyCamelBlueprintTestSupport {

	@Override
	public String isMockEndpointsAndSkip() {
		return "(audit|error):*";
	}

	@Override
	public boolean isUseAdviceWith() {
		return true;
	}

}

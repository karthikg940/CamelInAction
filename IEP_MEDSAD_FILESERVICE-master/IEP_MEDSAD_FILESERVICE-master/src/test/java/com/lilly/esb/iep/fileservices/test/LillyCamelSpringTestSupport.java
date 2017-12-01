/**
 * Copyright (c) 2017 Eli Lilly and Company.  All rights reserved.
 */
package com.lilly.esb.iep.fileservices.test;

import java.io.InputStream;
import java.io.InputStreamReader;

import org.apache.camel.spi.RestConfiguration;
import org.apache.camel.spi.RestConfiguration.RestBindingMode;
import org.apache.camel.test.spring.CamelSpringTestSupport;
import org.springframework.context.support.AbstractApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

/**
 * Lilly-specific {@link CamelSpringTestSupport}
 * 
 * @author C228625 David A. Heitzer
 */
public class LillyCamelSpringTestSupport extends CamelSpringTestSupport {

	@Override
	protected AbstractApplicationContext createApplicationContext() {
		return new ClassPathXmlApplicationContext(new String[] {"META-INF/spring/test-beans.xml"}, 
				getRouteExcludingApplicationContext());
	}

	@Override
	public boolean isUseAdviceWith() {
		return true;
	}

	/**
	 * Override the {@link RestConfiguration}
	 * to use localhost:9000 for integration tests.
	 */
	@Override
	public void doPostSetup() throws Exception {
		super.doPostSetup();
		final RestConfiguration testRestConfiguration = new RestConfiguration();
		testRestConfiguration.setHost("127.0.0.1");
		testRestConfiguration.setPort(8080);
		testRestConfiguration.setComponent("jetty");
		/*
		 * RestBindingMode is set to off because setting it to
		 * auto is causing the test routes to attempt to 
		 * always deserialize the body to JSON (even if the
		 * content-type header is set otherwise).  This was 
		 * causing an issue because the body is a file.  It 
		 * seems that this may be a Camel bug as it is 
		 * supposed to respect the content-type header.  
		 * 
		 * Because we are setting it to off, we must manually
		 * call marshal on the javax.wx.rs.core.Response body
		 * at the end of the route to respond with JSON.
		 */
		testRestConfiguration.setBindingMode(RestBindingMode.off);
		context.setRestConfiguration(testRestConfiguration);
	}
	
	public String getResourceAsString(String resource) throws Exception {

		StringBuilder xml = new StringBuilder();
		InputStream input = getClass().getResourceAsStream(resource);
		int i;
		try(InputStreamReader inputStreamReader = new InputStreamReader(input)){
			while((i = inputStreamReader.read()) != -1) {
				xml.append((char)i);
			}
		}
		return xml.toString();
	}

}

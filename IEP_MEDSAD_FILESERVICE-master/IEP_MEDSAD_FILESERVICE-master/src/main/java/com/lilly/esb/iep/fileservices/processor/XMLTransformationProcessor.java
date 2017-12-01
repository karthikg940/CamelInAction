package com.lilly.esb.iep.fileservices.processor;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.io.Writer;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import javax.xml.transform.Source;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.stream.StreamResult;
import javax.xml.transform.stream.StreamSource;

import org.apache.camel.Exchange;
import org.apache.camel.Processor;
import org.beanio.Marshaller;
import org.beanio.StreamFactory;
import org.json.JSONArray;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.lilly.esb.iep.fileservices.constants.Constants;


/**
 * 
 * Generates required XML output using XLST transformation
 * 
 */

public class XMLTransformationProcessor implements Processor {

	private static final Logger LOGGER = LoggerFactory
			.getLogger(XMLTransformationProcessor.class);

	private static final String ELEMENTS = "Elements";

	private static final String ELEMENT = "Element";

	private static final String XML_TAG = "<?xml version=\"1.0\" encoding=\"ISO-8859-15\"?>\n<";

	private static final String LEFT_TAG = ">";

	private static final String CLOSE_TAG = "</";
	
	private static final String FIXED_LENGTH_MAPPING = "fixedLengthDelimited";
	
	private static final String NEW_LINE = "\n";
	
	private static final String XML_FILE = ".xml";


	/**
	 * 
	 * Converts List into XML and generates required XML using XSLT
	 * transformation and sets the converted xml to exchange body
	 * @param Exchange object
	 * 
	 */
	@Override
	public void process(Exchange exchange) throws Exception {
		// TODO Auto-generated method stub

		// Enhanced this method to support fixed length format
		if(XML_FILE.equalsIgnoreCase((String)exchange.getProperty(Constants.FILE_OUTPUT_TYPE)))
			xmltransformation(exchange);
		else
			fixedLengthTransformation(exchange);
	}

	/**
	 * 	Method takes care of creating xml file output based on the 
	 * 	SQL Resultset after converting it into base xml and performing 
	 * 	XSLT transformation based on the XSLT details available in the SP list
	 * @param exchange
	 * @throws Exception
	 */
	private void xmltransformation(Exchange exchange) throws Exception {
		ArrayList<HashMap<String, String>> dataMap =(ArrayList<HashMap<String, String>>) exchange.getIn().getBody();
		JSONArray jsonArray = new JSONArray();
		for (Map<String, String> map : dataMap) {
			jsonArray.put(map);
		}

		// convert json to xml
		long startTime = System.currentTimeMillis();
		String root = ELEMENTS;
		StringBuilder builder = new StringBuilder();
		builder.append(XML_TAG).append(root).append(LEFT_TAG).append(org.json.XML.toString(jsonArray, ELEMENT)).append(CLOSE_TAG).append(root).append(LEFT_TAG);
		long endTime = System.currentTimeMillis();
		LOGGER.info("Time taken for base xml creation " + (endTime - startTime));
		startTime = System.currentTimeMillis();
		TransformerFactory factory = TransformerFactory.newInstance();
		InputStream is = new ByteArrayInputStream(((String) exchange.getProperty(Constants.XSLT)).getBytes());
		Source xslt = new StreamSource(is);
		Transformer transformer = factory.newTransformer(xslt);
		Source xsltSource = new StreamSource(new ByteArrayInputStream(builder.toString().getBytes()));
		StringWriter writer = new StringWriter();
		Writer printWriter = new PrintWriter(writer);
		transformer.transform(xsltSource, new StreamResult(printWriter));
		endTime = System.currentTimeMillis();
		LOGGER.info("Time taken for xml transformation " + (endTime - startTime));		
		exchange.getOut().setBody(writer.toString());
		printWriter.close();
		writer.close();
	}

	/**
	 * 	Method refers the BeanIO formatting xml and creates a fixed length  
	 *  format file. The current implementation supports only the flexibility 
	 *  at the field spacing and does not guarantee anything on the individual field
	 *  formatting or any other special operations on it.
	 *  The implementation iterates through the exchange body record 
	 *  apply the formatting specified in the SP transformation field
	 *  STREAM NAME IN XML CONFIGURATION SHOULD BE - fixedLengthDelimited
	 *  Sample transformation for instance,
	 *  <beanio xmlns="http://www.beanio.org/2012/03" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"  xsi:schemaLocation="http://www.beanio.org/2012/03 http://www.beanio.org/2012/03/mapping.xsd">  <stream name="fixedLengthDelimited" format="fixedlength" mode="write">   <record name="Element" class="java.util.Map">    <field name="TRADE_NAME" length="30" />    <field name="SBMSN_DT" length="15" />    <field name="WITHDRAWAL_DT" length="15" />    <field name="MARKET_START_DT" length="15" />    <field name="APRVL_DT" length="15" />    <field name="COUNTRY_CD" length="5" />    <field name="RPT_INDICATION_ID" length="10" />   </record>  </stream> </beanio>
	 * @param exchange
	 * @throws Exception
	 */
	private void fixedLengthTransformation(Exchange exchange) throws Exception {

		ArrayList<HashMap<String, String>> dataMap =(ArrayList<HashMap<String, String>>) exchange.getIn().getBody();		
		long startTime = System.currentTimeMillis();
		StreamFactory factory = StreamFactory.newInstance();
		InputStream is = new ByteArrayInputStream(((String) exchange.getProperty(Constants.XSLT)).getBytes());
		factory.load(is);		
		StringWriter writer = new StringWriter();
		Writer printWriter = new PrintWriter(writer);
		Marshaller marshaller = factory.createMarshaller(FIXED_LENGTH_MAPPING);
		for(Map<String, String> record : dataMap) {			
			marshaller = marshaller.marshal(record);
			printWriter.write(marshaller.toString());
			printWriter.write(NEW_LINE);
		}
		long endTime = System.currentTimeMillis();
		LOGGER.info("Time taken for fixed length transformation " + (endTime - startTime));
		exchange.getOut().setBody(writer.toString());
		printWriter.close();
		writer.close();
	}

}

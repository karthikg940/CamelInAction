/**
* Copyright (c) 2017 Eli Lilly and Company.  All rights reserved.
*/

package com.lilly.esb.iep.sip.test.routebuilder;

import java.net.HttpURLConnection;

import javax.net.ssl.HttpsURLConnection;

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
public class StudyRouteBuilderTest extends AbstractSipRouteBuilderTest {
	
	private MockEndpoint sipStudyMockEndpoint=null;
	private MockEndpoint sipCompoundMockEndpoint=null;
	private MockEndpoint sipIndicationMockEndpoint=null;
	private MockEndpoint sipProgramMockEndpoint=null;
	private MockEndpoint sipExternalApiMockEndpoint=null;
	private MockEndpoint sipCloseStudyCondition1MockEndpoint=null;
	private MockEndpoint sipCloseStudyCondition2MockEndpoint=null;
	 
	

	@Override
	protected String getBlueprintDescriptor() {
		return "OSGI-INF/blueprint/blueprint-beans-test.xml";
	}

	@Before
	@Override
	public void setUp() throws Exception {
		super.setUp();

	}

	@Test
	public void testCreateStudyFlow() throws Exception {

		final int numberOfSharePointStudyIdsForSplit = 2;
		
		final MockEndpoint sipProcessBatchControlSelectMockEndpoint = this .mockSipProcessBatchControlSelect();
		final MockEndpoint sipProcessBatchControlInsertMockEndpoint = this .mockSipProcessBatchControlInsert();
		final MockEndpoint sipSharepointCallMockEndpoint = this .mockSipStudySharepointCall(HttpsURLConnection.HTTP_OK);
		final MockEndpoint sipProcessVerifyStudyRecordUpdateMockEndpoint=this.mockSipProcessVerifyStudyRecordUpdate();
		final MockEndpoint sipSipProcessStudyRecordsMockEndpoint=this.mockSipProcessStudyRecords();
		final MockEndpoint sipSipProcessCreateStudyOdatCallMockEndpoint=this. mockSipProcessCreateStudyOdatCall();
		final MockEndpoint sipCreateStudyMockEndpoint = this.mockSipCreateStudy(HttpURLConnection.HTTP_OK);
		final MockEndpoint sipCreateCompoundMockEndpoint = this.mockSipCreateCompound(HttpURLConnection.HTTP_OK);
		final MockEndpoint sipCreateIndicationMockEndpoint = this.mockSipCreateIndication(HttpURLConnection.HTTP_OK);
		final MockEndpoint sipCreateProgramMockEndpoint = this.mockSipCreateProgram(HttpURLConnection.HTTP_OK);
		final MockEndpoint sipExternalAPICallMockEndpoint = this. mockSipExternalAPICall(HttpURLConnection.HTTP_OK);
		 
		context.start();
		context.getProperties().put(Exchange.LOG_DEBUG_BODY_STREAMS, "true");

		sipProcessBatchControlSelectMockEndpoint.expectedMessageCount(1);
		sipProcessBatchControlInsertMockEndpoint.expectedPropertyReceived(Constants.DB_RESULT, "isempty");
		sipSharepointCallMockEndpoint.expectedMessageCount(1);
		sipProcessVerifyStudyRecordUpdateMockEndpoint.expectedMessageCount(numberOfSharePointStudyIdsForSplit);
		sipSipProcessStudyRecordsMockEndpoint.expectedMessageCount(numberOfSharePointStudyIdsForSplit);
		sipSipProcessCreateStudyOdatCallMockEndpoint.expectedMessageCount(1);
		sipCreateStudyMockEndpoint.expectedHeaderReceived(Exchange.HTTP_RESPONSE_CODE,200);
		sipCreateStudyMockEndpoint.expectedMessageCount(numberOfSharePointStudyIdsForSplit);
		sipStudyMockEndpoint.expectedBodyReceived();
		sipCreateCompoundMockEndpoint.expectedMessageCount(numberOfSharePointStudyIdsForSplit);
		sipCompoundMockEndpoint.expectedBodyReceived();
		sipCreateIndicationMockEndpoint.expectedMessageCount(numberOfSharePointStudyIdsForSplit);
		sipIndicationMockEndpoint.expectedBodyReceived();
		sipCreateProgramMockEndpoint.expectedMessageCount(numberOfSharePointStudyIdsForSplit);
		sipProgramMockEndpoint.expectedBodyReceived();
		sipExternalAPICallMockEndpoint.expectedMessageCount(numberOfSharePointStudyIdsForSplit);
		sipExternalApiMockEndpoint.expectedBodyReceived();

	}

	
	/**
	 * @return
	 * @throws Exception
	 */
	
	private MockEndpoint mockSipProcessSchedulerQueue() throws Exception {
		final MockEndpoint sipProcessSchedulerQueueMockEndpoint = getMockEndpoint("mock:process-scheduler-queue");
		context.getRouteDefinition("process-scheduler-queue")
				.adviceWith(context, new AdviceWithRouteBuilder() {
					@Override
					public void configure() throws Exception {
 
						weaveById("process-study-sharePoint")
						.replace()
						.to(sipProcessSchedulerQueueMockEndpoint)
						.setProperty(Constants.SCHEDULER_TIME_FLAG, simple("true"))
						.setBody(simple("resource:classpath:data/study_details.xml"));
					}
				});
		return sipProcessSchedulerQueueMockEndpoint;

	}

	private MockEndpoint mockSipProcessBatchControlSelect() throws Exception {
		final MockEndpoint sipProcessStudyBatchControlSelectMockEndpoint = getMockEndpoint("mock:process-sip-study-batchControl");
		context.getRouteDefinition("process-sip-study-batchControl")
				.adviceWith(context, new AdviceWithRouteBuilder() {
					@Override
					public void configure() throws Exception {
 
						weaveById("batch-control-select")
						.replace()
						.to(sipProcessStudyBatchControlSelectMockEndpoint)
						
						.process(new Processor() {
									@Override
									public void process(Exchange exchange)
											throws Exception {
										exchange.getIn().setBody(simple("resource:classpath:data/study_details.xml"));
									}
								});
						
					}
				});
		return sipProcessStudyBatchControlSelectMockEndpoint;

	}
	
	private MockEndpoint mockSipProcessBatchControlInsert() throws Exception {
		
		final MockEndpoint sipProcessStudyBatchControlInsertMockEndpoint = getMockEndpoint("mock:process-sip-study-batchControl");
		 
		context.getRouteDefinition("process-sip-study-batchControl")
				.adviceWith(context, new AdviceWithRouteBuilder() {
					@Override
					public void configure() throws Exception {
 
						weaveById("batch-control-insert")
						.replace()
						.to(sipProcessStudyBatchControlInsertMockEndpoint)
						.setProperty(Constants.DB_RESULT, simple("isempty"))
						.setBody(simple("insert into iep_owner.iep_batch_control(impactnumber,querytype,objecttype,starttime,endtime)values('15368','inc','sip.study',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)"));				 
					}
				});
		return sipProcessStudyBatchControlInsertMockEndpoint;

	}

	 
	private MockEndpoint mockSipStudySharepointCall(final Integer responseCode) throws Exception {
		final MockEndpoint sipStudySiteWSMockEndpoint = getMockEndpoint("mock:process-sip-studySharePoint-call");
		final MockEndpoint sipStudySharePointMockEndpoint = getMockEndpoint("mock:sip-studySharePoint");
		context.getRouteDefinition("process-sip-studySharePoint-call").adviceWith(context,
				new AdviceWithRouteBuilder() {
					@Override
					public void configure() throws Exception {
						 
						weaveByToString(".*https.*")
								.replace()
								.inOut(sipStudySiteWSMockEndpoint)
								.setBody(
										simple("resource:classpath:data/study_details.xml"))
										.process(new Processor() {
									@Override
									public void process(Exchange exchange)
											throws Exception {
										exchange.getIn().setHeader(
												Exchange.HTTP_RESPONSE_CODE,
												responseCode);
									}
								})
								.to(sipStudySharePointMockEndpoint);
										 
					}
				});
		return sipStudySiteWSMockEndpoint;
	}
	
	private MockEndpoint mockSipProcessVerifyStudyRecordUpdate() throws Exception {
		final MockEndpoint sipProcessVerifyStudyRecordUpdateTimeMockEndpoint = getMockEndpoint("mock:process-sip-verify-study-record-update-time");

		context.getRouteDefinition("process-sip-verify-study-record-update-time").adviceWith(context,
				new AdviceWithRouteBuilder() {
					@Override
					public void configure() throws Exception {
						 
						weaveByToString(".*direct:process.*")
								.replace()
								.to(sipProcessVerifyStudyRecordUpdateTimeMockEndpoint)
								.setBody(
										simple("resource:classpath:data/study_update_record_verify.xml"));
					}
				});
		return sipProcessVerifyStudyRecordUpdateTimeMockEndpoint;
	}

	private MockEndpoint mockSipProcessStudyRecords() throws Exception {
		final MockEndpoint sipProcessStudyRecordsMockEndpoint = getMockEndpoint("mock:process-sip-studyRecords");

		context.getRouteDefinition("process-sip-studyRecords").adviceWith(context,
				new AdviceWithRouteBuilder() {
					@Override
					public void configure() throws Exception {
						 
						weaveByToString(".*direct:process.*")
								.replace()
								.to(sipProcessStudyRecordsMockEndpoint)
								.setBody(
										simple("resource:classpath:data/split_props.xml"));
					}
				});
		return sipProcessStudyRecordsMockEndpoint;
	}

	private MockEndpoint mockSipProcessCreateStudyOdatCall() throws Exception {
		final MockEndpoint sipProcessCreateStudyOdatCallMockEndpoint = getMockEndpoint("mock:process-sip-CreateStudy-OdataCall");

		context.getRouteDefinition("process-sip-CreateStudy-OdataCall").adviceWith(context,
				new AdviceWithRouteBuilder() {
					@Override
					public void configure() throws Exception {
						 
						weaveByToString(".*https.*")
								.replace()
								.inOut(sipProcessCreateStudyOdatCallMockEndpoint)
								.setBody(simple("resource:classpath:data/createstudy_odata_data.xml"));
									 
					}
				});
		return sipProcessCreateStudyOdatCallMockEndpoint;
	}

	private MockEndpoint mockSipCreateStudy(final Integer responseCode) throws Exception {
		final MockEndpoint sipCreateStudyExternalApiCallMockEndpoint = getMockEndpoint("mock:process-sip-createStudy");
		sipStudyMockEndpoint=getMockEndpoint("mock:process-sip-CreateStudy_External_Api_Call");
		context.getRouteDefinition("process-sip-createStudy")
				.adviceWith(context, new AdviceWithRouteBuilder() {
					@Override
					public void configure() throws Exception {
						 
						weaveById("study-externalAPICall")
								.replace()
								.to(sipCreateStudyExternalApiCallMockEndpoint)
								.setBody(simple("resource:classpath:data/study_create_response.xml"))
								.process(new Processor() {
									@Override
									public void process(Exchange exchange)throws Exception {
										exchange.getIn().setHeader(Exchange.HTTP_RESPONSE_CODE,responseCode);
									}
								})
								.to(sipStudyMockEndpoint);
					}
				});
		return sipCreateStudyExternalApiCallMockEndpoint;
	}

	private MockEndpoint mockSipCreateCompound(final Integer responseCode)
			throws Exception {
		final MockEndpoint sipCreateCompoundExternalAPIMockEndpoint = getMockEndpoint("mock:process-sip-createCompound");
		sipCompoundMockEndpoint=getMockEndpoint("mock:process-sip-CreateCompound_External_Api_Call");

		context.getRouteDefinition("process-sip-createCompound").adviceWith(context, new AdviceWithRouteBuilder() {
					@Override
					public void configure() throws Exception {
						 
						weaveById("compound-externalAPICall")
								.replace()
								.to(sipCreateCompoundExternalAPIMockEndpoint)
								.setBody(simple("resource:classpath:data/compound_create_response.xml"))
								.process(new Processor() {
									@Override
									public void process(Exchange exchange)throws Exception {
										exchange.getIn().setHeader(Exchange.HTTP_RESPONSE_CODE,responseCode);
									}
								})
								.to(sipCompoundMockEndpoint);
					}
				});
		return sipCreateCompoundExternalAPIMockEndpoint;
	}

	private MockEndpoint mockSipCreateIndication(final Integer responseCode)
			throws Exception {
		final MockEndpoint sipCreateIndicationExternalAPIMockEndpoint = getMockEndpoint("mock:process-sip-createIndication");
		sipIndicationMockEndpoint=getMockEndpoint("mock:process-sip-CreateIndication_External_Api_Call");

		context.getRouteDefinition("process-sip-createIndication").adviceWith(
				context, new AdviceWithRouteBuilder() {
					@Override
					public void configure() throws Exception {
						 
						weaveById("indication-externalAPICall")
								.replace()
								.to(sipCreateIndicationExternalAPIMockEndpoint)
								.setBody(
										simple("resource:classpath:data/indication_create_response.xml"))
								.process(new Processor() {
									@Override
									public void process(Exchange exchange)
											throws Exception {
										exchange.getIn().setHeader(
												Exchange.HTTP_RESPONSE_CODE,
												responseCode);
									}
								})
								.to(sipIndicationMockEndpoint);;
					}
				});
		return sipCreateIndicationExternalAPIMockEndpoint;
	}

	private MockEndpoint mockSipCreateProgram(final Integer responseCode)
			throws Exception {
		final MockEndpoint sipCreateProgramExternalAPIMockEndpoint = getMockEndpoint("mock:process-sip-CreateProgram-External_API");
		sipProgramMockEndpoint=getMockEndpoint("mock:process-sip-CreateIndication_External_Api_Call");
		context.getRouteDefinition("process-sip-createProgram").adviceWith(
				context, new AdviceWithRouteBuilder() {
					@Override
					public void configure() throws Exception {
						
						weaveById("program-externalAPICall")
								.replace()
								.to(sipCreateProgramExternalAPIMockEndpoint)
								.setBody(
										simple("resource:classpath:data/program_create_response.xml"))
								.process(new Processor() {
									@Override
									public void process(Exchange exchange)
											throws Exception {
										exchange.getIn().setHeader(
												Exchange.HTTP_RESPONSE_CODE,
												responseCode);
									}
								})
								.to(sipProgramMockEndpoint);
					}
				});
		return sipCreateProgramExternalAPIMockEndpoint;
	}

	
	private MockEndpoint mockSipExternalAPICall(final Integer responseCode)
			throws Exception {
		final MockEndpoint sipExternalAPICallMockEndpoint = getMockEndpoint("mock:sip-externalAPICall");
		sipExternalApiMockEndpoint=getMockEndpoint("mock:process-sip-CreateIndication_External_Api_Call");
		context.getRouteDefinition("sip-externalAPICall").adviceWith(
				context, new AdviceWithRouteBuilder() {
					@Override
					public void configure() throws Exception {
						
						weaveByToString(".*https.*")
								.replace()
								.inOut(sipExternalAPICallMockEndpoint)
								.setBody(
										simple("resource:classpath:data/program_create_response.xml"))
								.process(new Processor() {
									@Override
									public void process(Exchange exchange)
											throws Exception {
										exchange.getIn().setHeader(
												Exchange.HTTP_RESPONSE_CODE,
												responseCode);
									}
								})
								.to(sipExternalApiMockEndpoint);
					}
				});
		return sipExternalAPICallMockEndpoint;
	}
	
	private MockEndpoint mockProcessSipCloseStudy(final Integer responseCode)
			throws Exception {
		final MockEndpoint sipProcessCloseStudyMockEndpoint = getMockEndpoint("mock:process-sip-closeStudy");
		sipCloseStudyCondition1MockEndpoint=getMockEndpoint("mock:process-sip-CloseStudy-STUDY_CLOSURE_DATE-condition");
		sipCloseStudyCondition2MockEndpoint=getMockEndpoint("mock:process-sip-CloseStudy-STUDY_CANCELLED_DATE-condition");
		context.getRouteDefinition("process-sip-closeStudy").adviceWith(
				context, new AdviceWithRouteBuilder() {
					@Override
					public void configure() throws Exception {
						
						weaveById("study_closure_date_condition")
								.replace()
								.to(sipProcessCloseStudyMockEndpoint)
								.setProperty(Constants.STUDY_CLOSURE_DATE,simple("2017-14-06"))
								.process(new Processor() {
									@Override
									public void process(Exchange exchange)
											throws Exception {
										exchange.getIn().setBody(simple("resource:classpath:data/close_study_response.xml"));
									}
								})
								.to(sipCloseStudyCondition1MockEndpoint);
						 
						weaveById("study_cancelled_date_condition")
						.replace()
						.to(sipProcessCloseStudyMockEndpoint)
						.setProperty(Constants.STUDY_CANCELLED_DATE,simple("2017-14-06"))
						
						.process(new Processor() {
									@Override
									public void process(Exchange exchange)
											throws Exception {
										exchange.getIn().setBody(simple("resource:classpath:data/close_study_response.xml"));
									}
								})
								.to(sipCloseStudyCondition2MockEndpoint);
						
			 
					}
				});
		return sipProcessCloseStudyMockEndpoint;
	}
	
 
}

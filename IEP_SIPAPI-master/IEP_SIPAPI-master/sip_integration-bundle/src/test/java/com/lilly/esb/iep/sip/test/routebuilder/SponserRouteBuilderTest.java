package com.lilly.esb.iep.sip.test.routebuilder;

import com.lilly.esb.iep.sip.test.LillyCamelBlueprintTestSupport;
import org.apache.camel.Exchange;
import org.apache.camel.Processor;
import org.apache.camel.builder.AdviceWithRouteBuilder;
import org.apache.camel.component.mock.MockEndpoint;
import org.apache.camel.impl.DefaultExchange;
import org.junit.Before;
import org.junit.Test;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;

import javax.xml.XMLConstants;
import javax.xml.bind.JAXBContext;
import javax.xml.validation.Schema;
import javax.xml.validation.SchemaFactory;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;

/**
 * Created by Shravan Vanaparthi on 5/19/2017.
 */
public class SponserRouteBuilderTest extends AbstractSipRouteBuilderTest{

    private static final String MOCK_200_HTTP_RESPONSE_CODE_WIRETAP = "mock:wiretap-200-http-response-code";


    @Override
    protected String getBlueprintDescriptor() {
        return "OSGI-INF/blueprint/blueprint-beans-test.xml";
    }

    @Before
    @Override
    public void setUp() throws Exception {
        super.setUp();

    }

    //@Test
    public void testCreateSponsorSchedulerFlow() throws Exception {

        final int numberOfSharePointStudyIdsForSplit = 2;
        final MockEndpoint sharepointListMockEndpoint = this.mockSharepointList();
        final MockEndpoint sipSponsorSPWebServiceMockEndpoint = this.mockSipCreateSponsorSPListWebService(HttpURLConnection.HTTP_OK);
        final MockEndpoint sipGetSponsorSPWebServiceMockEndpoint = this.mockSipGetSponsorSPListWebService(HttpURLConnection.HTTP_OK);
        //final Map<String, MockEndpoint> wiretapHttpResponseMockEndpointMap = this.adviceWithDirectProcessSipInitialResponseStatusCode();

        context.start();
        context.getProperties().put(Exchange.LOG_DEBUG_BODY_MAX_CHARS, "5000");

        sharepointListMockEndpoint.expectedMessageCount(1);
        sipSponsorSPWebServiceMockEndpoint.expectedMessageCount(numberOfSharePointStudyIdsForSplit);
        sipGetSponsorSPWebServiceMockEndpoint.expectedMessageCount(numberOfSharePointStudyIdsForSplit);
        //wiretapHttpResponseMockEndpointMap.get(MOCK_200_HTTP_RESPONSE_CODE_WIRETAP).expectedMessageCount(numberOfSharePointStudyIdsForSplit);

        final Exchange testExchange = new DefaultExchange(context);
        template.send("wmqIn:queue:IEP.CRON.JOB.SIP.STUDYSPONSOR", testExchange);
        assertMockEndpointsSatisfied(30, TimeUnit.SECONDS);

    }

    //@Test
    public void testUpdateSponsorSchedulerFlow() throws Exception {

        final int numberOfSharePointStudyIdsForSplit = 2;
        final MockEndpoint sharepointListMockEndpoint = this.mockSharepointList();
        final MockEndpoint sipUpdateSponsorSPWebServiceMockEndpoint = this.mockSipGetSponsorForUpdateSPListWebService(HttpURLConnection.HTTP_OK);
        final MockEndpoint sipGetSponsorSPWebServiceMockEndpoint = this.mockSipUpdateSponsorSPListWebService(HttpURLConnection.HTTP_OK);
        final MockEndpoint sipGetSponsorAssociateSPWebServiceMockEndpoint = this.mockSipUpdateSponsorAssociateSPListWebService(HttpURLConnection.HTTP_OK);
        //final Map<String, MockEndpoint> wiretapHttpResponseMockEndpointMap = this.adviceWithDirectProcessSipInitialResponseStatusCode();

        context.start();
        context.getProperties().put(Exchange.LOG_DEBUG_BODY_MAX_CHARS, "5000");
        sharepointListMockEndpoint.expectedMessageCount(1);
        sipGetSponsorSPWebServiceMockEndpoint.expectedMessageCount(2);
        sipUpdateSponsorSPWebServiceMockEndpoint.expectedMessageCount(2);
        sipGetSponsorAssociateSPWebServiceMockEndpoint.expectedMessageCount(2);
        //wiretapHttpResponseMockEndpointMap.get(MOCK_200_HTTP_RESPONSE_CODE_WIRETAP).expectedMessageCount(numberOfSharePointStudyIdsForSplit);
        final Exchange testExchange = new DefaultExchange(context);
        template.send("wmqIn:queue:IEP.CRON.JOB.SIP.STUDYSPONSOR", testExchange);
        assertMockEndpointsSatisfied(30, TimeUnit.SECONDS);

    }

    private MockEndpoint mockSharepointList() throws Exception {
        final MockEndpoint mockSharePoint = getMockEndpoint("mock:https_sharepoint");

            context.getRouteDefinition("sip-sponsor-integration.extract-route").adviceWith(context, new AdviceWithRouteBuilder() {
                @Override
                public void configure() throws Exception {
                    // WeavebyId not working
                    weaveByToString(".*https://.*").replace()
                            .inOut(mockSharePoint)
                            .setBody(simple("resource:classpath:data/sponsor_details.xml"))
                    ;
                }
            });
        return mockSharePoint;
    }

    private MockEndpoint mockSipCreateSponsorSPListWebService(final Integer responseCode) throws Exception {
        final MockEndpoint sipSponsorUserWSMockEndpoint = getMockEndpoint("mock:sip-sponsor-user-service");
            context.getRouteDefinition("ProcessCreateSponsorRecord").adviceWith(context, new AdviceWithRouteBuilder() {
                @Override
                public void configure() throws Exception {
                    weaveByToString(".*https://.*").replace() // Risky if we have other http calls but buggy camel weaving forces me
                            .inOut(sipSponsorUserWSMockEndpoint)
                            .setBody(simple("resource:classpath:data/sponsor_create_response.xml"))
                            .process(new Processor() {
                                @Override
                                public void process(Exchange exchange) throws Exception {
                                    exchange.getIn().setHeader(Exchange.HTTP_RESPONSE_CODE, responseCode);
                                }
                            })
                            ;
                }
            });
        return sipSponsorUserWSMockEndpoint;
    }

    private MockEndpoint mockSipGetSponsorSPListWebService(final Integer responseCode) throws Exception {
        final MockEndpoint sipGetSponsorUserWSMockEndpoint = getMockEndpoint("mock:sip-sponsor-get-user-nonexisted-service");
        context.getRouteDefinition("GetSponsorUserRecord").adviceWith(context, new AdviceWithRouteBuilder() {
            @Override
            public void configure() throws Exception {
                // WeavebyId not working
                weaveByToString(".*https://.*").replace()
                        .inOut(sipGetSponsorUserWSMockEndpoint)
                        .setBody(simple("resource:classpath:data/sponsor_get_resp.xml"))
                        //.setHeader(Exchange.HTTP_RESPONSE_CODE, constant(HttpURLConnection.HTTP_OK))
                        .process(new Processor() {
                            @Override
                            public void process(Exchange exchange) throws Exception {
                                exchange.getIn().setHeader(Exchange.HTTP_RESPONSE_CODE, responseCode);
                            }
                        })
                ;

            }
        });
        return sipGetSponsorUserWSMockEndpoint;
    }

    private MockEndpoint mockSipGetSponsorForUpdateSPListWebService(final Integer responseCode) throws Exception {
        final MockEndpoint sipGetSponsorIUpdateUserWSMockEndpoint = getMockEndpoint("mock:sip-sponsor-get-user-existed-service");
        try {
            context.getRouteDefinition("GetSponsorUserRecord").adviceWith(context, new AdviceWithRouteBuilder() {
                @Override
                public void configure() throws Exception {
                    // WeavebyId not working
                    weaveByToString(".*https://.*").replace()
                            .inOut(sipGetSponsorIUpdateUserWSMockEndpoint)
                            .setBody(simple("resource:classpath:data/sponsor_get_success_response.xml"))
                            //.setHeader(Exchange.HTTP_RESPONSE_CODE, constant(HttpURLConnection.HTTP_OK))
                            .process(new Processor() {
                                @Override
                                public void process(Exchange exchange) throws Exception {
                                    exchange.getIn().setHeader(Exchange.HTTP_RESPONSE_CODE, responseCode);
                                }
                            })
                    ;

                }
            });
        }catch(java.lang.Exception e){
            e.printStackTrace();

        }
        return sipGetSponsorIUpdateUserWSMockEndpoint;
    }


    private MockEndpoint mockSipUpdateSponsorSPListWebService(final Integer responseCode) throws Exception {
        final MockEndpoint sipUpdateSponsorUserWSMockEndpoint = getMockEndpoint("mock:sip-update-sponsor-user-service");
            context.getRouteDefinition("ProcessUpdateSponsorRecord").adviceWith(context, new AdviceWithRouteBuilder() {
                @Override
                public void configure() throws Exception {
                    weaveByToString(".*https://.*").replace() // Risky if we have other http calls but buggy camel weaving forces me
                            .inOut(sipUpdateSponsorUserWSMockEndpoint)
                            .setBody(simple("resource:classpath:data/sponsor_update_response.xml"))
                            .process(new Processor() {
                                @Override
                                public void process(Exchange exchange) throws Exception {
                                    exchange.getIn().setHeader(Exchange.HTTP_RESPONSE_CODE, responseCode);
                                }
                            })
                            .to(sipUpdateSponsorUserWSMockEndpoint);
                }
            });
        return sipUpdateSponsorUserWSMockEndpoint;
    }

    private MockEndpoint mockSipUpdateSponsorAssociateSPListWebService(final Integer responseCode) throws Exception {
        final MockEndpoint mockUpdateSponsorAssociateEndpoint = getMockEndpoint("mock:sip-update-sponsor-associate-user-service");
        context.getRouteDefinition("ProcessUpdateAssociationsOnRecord").adviceWith(context, new AdviceWithRouteBuilder() {
            @Override
            public void configure() throws Exception {
                weaveByToString(".*https://.*").replace() // Risky if we have other http calls but buggy camel weaving forces me
                        .inOut(mockUpdateSponsorAssociateEndpoint)
                        .setBody(simple("resource:classpath:data/sponsor_associate-response.xml"))
                        .process(new Processor() {
                            @Override
                            public void process(Exchange exchange) throws Exception {
                                exchange.getIn().setHeader(Exchange.HTTP_RESPONSE_CODE, responseCode);
                            }
                        })
                        .to(mockUpdateSponsorAssociateEndpoint);
            }
        });
        return mockUpdateSponsorAssociateEndpoint;
    }

    private Map<String, MockEndpoint> adviceWithDirectProcessSipInitialResponseStatusCode() throws Exception {
        final Map<String, MockEndpoint> wiretapHttpResponseMockEndpointMap = new HashMap<String, MockEndpoint>(4);

        final MockEndpoint s200HttpResponseCodeWiretapMockEndpoint = getMockEndpoint("mock:s200-response-code");

        wiretapHttpResponseMockEndpointMap.put(MOCK_200_HTTP_RESPONSE_CODE_WIRETAP, s200HttpResponseCodeWiretapMockEndpoint);

        context.getRouteDefinition("direct-process-sip-create-response-status-code").adviceWith(context, new AdviceWithRouteBuilder() {
            @Override
            public void configure() throws Exception {
                weaveById(".*200-create-response-code-wiretap.*").replace().to(s200HttpResponseCodeWiretapMockEndpoint);
            }
        });

        return wiretapHttpResponseMockEndpointMap;
    }

}

package com.ffss.datax.analytics.test.web.resource

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*
import groovy.json.JsonSlurper

import org.springframework.http.MediaType

import com.ffss.datax.analytics.test.base.TransactionalWebIntegrationTest
import com.ffss.datax.analytics.test.base.WebAppIntegrationBaseSpecification

@TransactionalWebIntegrationTest
class DashBoardSpec extends WebAppIntegrationBaseSpecification{

	def 'fetch the details in the dashboard based on the organization'(fromDate, toDate, expectedResult, orgId){
		given:'the user who belongs to particular organizataion is logged in'
		when:'user in the dashboard page'

		def response=this.mockMvc.perform(get("/api/org/${orgId}/analytics/study?fromDate=${fromDate}&toDate=${toDate}")
				.header("Authorization","Bearer "+StatisticsTestData.token)
				.accept(MediaType.APPLICATION_JSON))

		then:'the dashboard widget is displayed with study statistics of the particular organization'
		def jsonResponse = new JsonSlurper().parseText(response.andReturn().response.contentAsString)

		['results'].forEach{
			assert expectedResult.results.id==jsonResponse.results.id
			assert expectedResult.results.status.size() ==jsonResponse.results.status.size()
			assert expectedResult.results.value.size() ==jsonResponse.results.value.size()
			assert expectedResult.results.total == jsonResponse.results.total
		}
		where:
		fromDate<<['2015-01-01', '', '2015-02-02']
		toDate<<['2018-11-08', '', '2018-02-02']
		expectedResult << [
			StatisticsTestData.widgetTestData2,
			StatisticsTestData.widgetTestData3,
			StatisticsTestData.widgetTestData1
		]
		orgId <<[1001, 1002, 1]
	}
}

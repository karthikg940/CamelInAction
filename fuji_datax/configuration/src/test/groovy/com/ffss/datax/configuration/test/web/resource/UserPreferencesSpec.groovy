package com.ffss.datax.configuration.test.web.resource

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*
import groovy.json.JsonOutput
import groovy.json.JsonSlurper

import javax.ws.rs.core.MediaType

import com.ffss.datax.configuration.test.base.TransactionalWebIntegrationTest
import com.ffss.datax.configuration.test.base.WebAppIntegrationBaseSpecification


@TransactionalWebIntegrationTest
class UserPreferencesSpec extends WebAppIntegrationBaseSpecification  {

	def Authorization = 'Authorization'
	def Bearer = 'Bearer '

	  def 'validate system defaults'(expectedResult,id,daterange){

		given : 'System configured with 24 hours as the default time period and there is no user defined user preference'
		 
		when : 'when user logs in and navigates to dashboard'
		def defaultTimeperiodResponse = this.mockMvc.perform(get("/api/user/${id}/preference?type=${daterange}")
				.header(Authorization,Bearer+UserGroupTestData.token))

		then : 'he will see the default selection as 24 hours'

		def actualResult = new JsonSlurper().parseText(defaultTimeperiodResponse.andReturn().response.contentAsString)
		
		
		actualResult.eachWithIndex {value,index->
			assert   expectedResult.get(index)["name"] == value["name"]
			assert   expectedResult.get(index)["default"] == value["default"] 
		}
	
		assert expectedResult.size() == actualResult.size()
		where:
		expectedResult << [[[name:'PAST 24HRS', default:true], [name:'One Week', default:false], [name:'One Month', default:false], [name:'Six Months', default:false], [name:'One Year', default:false]]]
		id << [1001L]
		daterange << [1L]   
	}   

	def 'validate user selection'(preferenceValue,preferenceType,id,expectedResult){
		
	    def data= ['preferenceValueId':preferenceValue, 'preferenceTypeId':preferenceType];

		given : 'configuration is done and validated'

		when : 'User selected One Week hours as the default'
		
		def resp = this.mockMvc.perform(post("/api/user/${id}/preference")
				.content(JsonOutput.toJson(data))
				.contentType(MediaType.APPLICATION_JSON)
				.header(Authorization,Bearer+UserGroupTestData.token))
	
		
		then : 'when user logs in again, he will see One Week as default'
		
		resp.andExpect(status().isCreated())
		
		
		def getRes = this.mockMvc.perform(get(resp.andReturn().response.headers['Location'].value)
			.header(Authorization,Bearer+UserGroupTestData.token))
		
		def actualResult = new JsonSlurper().parseText(getRes.andReturn().response.contentAsString)
		
		println "actualResult"+actualResult
		
		actualResult.eachWithIndex {value,index->
			assert   expectedResult.get(index)["name"] == value["name"]
			assert   expectedResult.get(index)["default"] == value["default"]
		}
	
		assert expectedResult.size() == actualResult.size()
			
		where:		
		preferenceValue << [2L]
		preferenceType << [1L]
		id << [1002L]
		expectedResult << [[[name:'PAST 24HRS', default:false], [name:'One Week', default:true], [name:'One Month', default:false], [name:'Six Months', default:false], [name:'One Year', default:false]]]
		 
	} 
}

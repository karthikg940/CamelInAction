package com.ffss.datax.study.test.web.resource

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*
import groovy.json.JsonSlurper

import javax.ws.rs.core.MediaType

import com.ffss.datax.study.test.base.TransactionalWebIntegrationTest
import com.ffss.datax.study.test.base.WebAppIntegrationBaseSpecification

@TransactionalWebIntegrationTest
class ExamTypesSpec extends WebAppIntegrationBaseSpecification{
	def 'Get all ExamTypes based templateName'(templatename,expectedStatus,expectedResult){
		given:' we have examtypes associated with templates'
		when:'user want to select one examtype from list of examtypes by templateName'
		def res = this.mockMvc.perform(get("/api/examtype/search?templateName=${templatename}")
				.header("Authorization","Bearer "+TestData.token1)
				.accept(MediaType.APPLICATION_JSON))

		then:'expected status is'

		res.andExpect(status().is(expectedStatus))

		if(expectedStatus == 200){
			def resJsn= new JsonSlurper().parseText(res.andReturn().response.contentAsString)

			['id', 'name'].each{

				assert expectedResult[it] == resJsn[it]
				assert expectedResult[it] == resJsn[it]
			}
		}
		where:
		templatename << ['Ocular', 'abc', 'Sample33']
		expectedStatus << [200, 404, 404]
		expectedResult <<[TestData.examtypes, [:], [:]]
	}
}

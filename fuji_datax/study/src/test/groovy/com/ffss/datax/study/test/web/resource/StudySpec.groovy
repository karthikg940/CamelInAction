package com.ffss.datax.study.test.web.resource

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*
import groovy.json.JsonSlurper

import javax.ws.rs.core.MediaType

import com.ffss.datax.study.test.base.TransactionalWebIntegrationTest
import com.ffss.datax.study.test.base.WebAppIntegrationBaseSpecification

@TransactionalWebIntegrationTest
class StudySpec extends WebAppIntegrationBaseSpecification {

	def 'Test fetching the study for the input data'(token,studyId,expectedStatus,expectedResult) {
		given: ' We have studies available in the database'
		when: ' We fetch a given study'
		def res = this.mockMvc.perform(get("/api/study/${studyId}")
				.header("Authorization","Bearer "+token)
				.accept(MediaType.APPLICATION_JSON))

		then: ' The status is as expected'
		res.andExpect(status().is(expectedStatus))

		if (expectedStatus == 200) {
			validateResult(expectedResult,new JsonSlurper().parseText(res.andReturn().response.contentAsString),studyId)
		}

		where:
		token << [StudyTestData.token1, StudyTestData.token1]
		studyId << [76000000000001, 65656]
		expectedStatus << [200, 404]
		expectedResult << [StudyTestData.testData1, [:]]
	}

	void validateResult(expectedResult,actualResult,studyId) {


		['studyType', 'age', 'height', 'weight'].each{
			assert expectedResult.studyType.size() == actualResult.studyType.size()
			assert expectedResult.age.size() == actualResult.age.size()
			assert expectedResult.height.size() == actualResult.height.size()
			assert expectedResult.weight.size() == actualResult.weight.size()
		}
		['modality', 'examType', 'status', 'images', 'department'].each{

			assert expectedResult.modality.size() == actualResult.modality.size()
			assert expectedResult.examType.size() == actualResult.examType.size()
			assert expectedResult.status.size() == actualResult.status.size()
			assert expectedResult.images.size() == actualResult.Images.size()
			assert expectedResult.department.size() == actualResult.department.size()
		}

		['requestingphysician', 'referringphysician', 'objectId'].each {
			assert expectedResult.requestingphysician.size() == actualResult.requestingphysician.size()
			assert expectedResult.referringphysician.size() == actualResult.referringphysician.size()
		}

		assert expectedResult.objectId[0].seriesUid == actualResult.objectId[0].seriesUid
		assert expectedResult.objectId[0].sopUid == actualResult.objectId[0].sopUid
	}
}

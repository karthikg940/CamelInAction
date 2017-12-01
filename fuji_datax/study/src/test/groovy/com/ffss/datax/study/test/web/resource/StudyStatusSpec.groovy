package com.ffss.datax.study.test.web.resource

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*
import groovy.json.JsonOutput
import groovy.json.JsonSlurper

import javax.ws.rs.core.MediaType

import org.springframework.beans.factory.annotation.Autowired

import com.ffss.datax.common.constants.WrkshtLookup
import com.ffss.datax.common.domain.study.ExamType
import com.ffss.datax.common.domain.worksheet.Worksheet
import com.ffss.datax.common.domain.worksheet.WorksheetLookup
import com.ffss.datax.common.domain.worksheet.WorksheetTemplate
import com.ffss.datax.study.repository.ExamTypeMapRepository
import com.ffss.datax.study.repository.ExamTypeRepository
import com.ffss.datax.study.repository.StudyLookupRepository
import com.ffss.datax.study.repository.StudyRepository
import com.ffss.datax.study.repository.WorksheetRepository
import com.ffss.datax.study.test.base.TransactionalWebIntegrationTest
import com.ffss.datax.study.test.base.WebAppIntegrationBaseSpecification

@TransactionalWebIntegrationTest
class StudyStatusSpec extends WebAppIntegrationBaseSpecification {
	@Autowired
	WorksheetRepository worksheetRepository

	@Autowired
	StudyRepository studyRepository
	@Autowired
	ExamTypeRepository examRepository

	@Autowired
	SeriesRepository seriesRepository
	@Autowired
	ExamTypeMapRepository examTypeMapRepository
	@Autowired
	StudyLookupRepository studyProgressRepository

	def 'Test updation of studystatus'(studyId,data,expectedStatus,orgId) {
		given: 'when user is going to update studytype'

		when: ' A study type is not changed'

		def token = StudyTestData.token1
		addWorksheet(studyId,4001L,'Procedural')
		def response = this.mockMvc.perform(put("/api/org/${orgId}/examtype/${studyId}/status")
				.header("Authorization","Bearer "+token)
				.content(JsonOutput.toJson(data))
				.contentType(MediaType.APPLICATION_JSON))
		then : "study status get same "
		response.andExpect(status().is(expectedStatus))
		and:'A study type is not changed'
		addWorksheet(studyId,4003L,'Procedural')
		def resp = this.mockMvc.perform(put("/api/org/${orgId}/examtype/${studyId}/status")
				.header("Authorization","Bearer "+token)
				.content(JsonOutput.toJson(data))
				.contentType(MediaType.APPLICATION_JSON))

		resp.andExpect(status().is(expectedStatus))
		then : "study status get changed "

		where:
		studyId << [76000000000001]
		data << [StudyTestData.updatestudyType]
		expectedStatus << [200]
		orgId << [1001]
	}
	def 'Test updation of studyExamType'(studyId,data,expectedStatus,examTypeName,templateName) {
		given: 'when user is going to update studytype'

		when: ' A study type is changed'

		def token = StudyTestData.token1
		addWorksheet(studyId,4003L,'Procedural')
		def response = this.mockMvc.perform(put("/api/examtype/${studyId}/exam/${examTypeName}/template/${templateName}")
				.header("Authorization","Bearer "+token)
				.content(JsonOutput.toJson(data))
				.contentType(MediaType.APPLICATION_JSON))

		then : "study status get changed"
		response.andExpect(status().is(expectedStatus))
		and:'user sign the worksheet'
		addWorksheet(studyId,4004L,'Procedural')
		def resp = this.mockMvc.perform(put("/api/examtype/${studyId}/exam/${examTypeName}/template/${templateName}")
				.header("Authorization","Bearer "+token)
				.content(JsonOutput.toJson(StudyTestData.updatestudyTypeNew))
				.contentType(MediaType.APPLICATION_JSON))

		then : "study status get changed"
		def result = new JsonSlurper().parseText(resp.andReturn().response.contentAsString)
		assert result.status == false
		resp.andExpect(status().is(expectedStatus))

		where:
		studyId << [76000000000001]
		data << [StudyTestData.updatestudyType]
		expectedStatus << [200]
		examTypeName<<['Cardiac']
		templateName<<['Sample1']
	}

	def 'Test for remove study'(studyId, studyActiveStatus,expectedStatus){
		given: 'We have a study with active or deactive status'
		def token = StudyTestData.token1
		when: 'admin try to delete study'
		def response = this.mockMvc.perform(delete("/api/study/${studyId}")
				.header("Authorization","Bearer "+token))
		then: 'study should remove'
		response.andExpect(status().is(expectedStatus))
		and: ' When you fetch the study list'

		then: ' The study which is deleted is not found'
		where:
		studyId << [76000000000001, 566868687]
		studyActiveStatus << ["true", "true"]
		expectedStatus <<[200, 404]
	}



	def 'check Attending user is Assigned or Not' (studyId,expectedStatus,expectedresult) {
		given: 'we have strudyId'
		def token = StudyTestData.token1
		when: 'the attending user is asigned or not'

		def res=this.mockMvc.perform(get("/api/study/${studyId}/assignuser")
				.header("Authorization","Bearer "+token)
				.accept(MediaType.APPLICATION_JSON))

		then: 'we expect the status as true OR false'
		res.andExpect(status().is(expectedStatus))

		def result = new JsonSlurper().parseText(res.andReturn().response.contentAsString)
		assert result.size() == expectedresult.size()

		where:
		studyId << [76000000000001]
		expectedStatus << [200]
		expectedresult << [StudyTestData.userAssignedStatus]
	}



	def 'Test updation of studytype'(studyId,data,expectedStatus,studystat,orgId) {
		given: 'when user is going to update studytype'

		when: ' A study type is changed'

		def token = StudyTestData.token1
		def response = this.mockMvc.perform(put("/api/org/${orgId}/examtype/${studyId}/status")
				.header("Authorization","Bearer "+token)
				.content(JsonOutput.toJson(data))
				.contentType(MediaType.APPLICATION_JSON))
		then : "study status get same "
		response.andExpect(status().is(expectedStatus))
		addWorksheet(studyId,studystat,'Procedural')
		def resp = this.mockMvc.perform(put("/api/examtype/${studyId}/study")
				.header("Authorization","Bearer "+token)
				.content(JsonOutput.toJson(data))
				.contentType(MediaType.APPLICATION_JSON))
		then : "study type get changed"
		resp.andExpect(status().is(expectedStatus))
		where:
		studyId << [76000000000001, 76000000000001, 76000000000001]
		data << [StudyTestData.updatestudyType, StudyTestData.updatestudyType, StudyTestData.updatestudyType]
		expectedStatus << [200, 200, 200]
		studystat<<[4003L, 4006L, 4007L]
		orgId << [1001,1001,1001]
	}

	void addWorksheet(studyId,stat,wrkshtType) {
		def study = studyRepository.findOne(studyId)
		def examtpe = examRepository.save(new ExamType(series:seriesRepository.findOne(76000000000101L),examTypeMap:examTypeMapRepository.findOne(9001L)))
		def wrksheet = worksheetRepository.save(new Worksheet(
				template:new WorksheetTemplate(id:7001L),
				examWorksheetType:wrkshtType,
				study:study,
				examType:examtpe,
				lookupId:new WorksheetLookup(id:WrkshtLookup.Pending.value)))
		def studyObj = studyRepository.findOne(studyId)
		if(stat!=4001L)
			if(studyObj){
				studyObj.status = studyProgressRepository.findOne(stat)
				studyRepository.save(studyObj)
			}
	}
}

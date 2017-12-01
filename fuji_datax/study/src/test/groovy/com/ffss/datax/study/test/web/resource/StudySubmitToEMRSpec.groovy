package com.ffss.datax.study.test.web.resource
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*
import groovy.json.JsonOutput

import javax.ws.rs.core.MediaType

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.ResponseEntity

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
import com.ffss.datax.study.repository.WorksheetTemplateRepository
import com.ffss.datax.study.test.base.TransactionalWebIntegrationTest
import com.ffss.datax.study.test.base.WebAppIntegrationBaseSpecification


@TransactionalWebIntegrationTest
class StudySubmitToEMRSpec extends WebAppIntegrationBaseSpecification {

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

	@Autowired
	WorksheetTemplateRepository worksheetTemplateRepository

	def oruResultObj = []

	def 'study submit to Emr'(studyId,seriesId,expectedStatus,description){

		given:'we have a study in datax'

		when:'physician completes his interpretations'

		addWorksheet(studyId,seriesId,4004L,'Procedural')

		then:'the study is ready for submission'

		and:'if there is no order for existing study'

		then:' create order for that study'

		and :'if order,visit,patient info is there for study, Physician can submit the study to emr'

		def res = this.mockMvc.perform(put("/api/study/${studyId}/complete")
				.header("Authorization","Bearer "+StudyTestData.tokenWithOrgId)
				.contentType(MediaType.APPLICATION_JSON))
		then:'study submits to emr and study status changes to submitted'

		res.andExpect(status().is(expectedStatus))
		validateResult()
		//def study = studyRepository.findOne(studyid)

		//println"---${study.status.id}"
		//assert study.status.id ==4008L
		where:
		studyId			|	   seriesId				|	expectedStatus		|	description
		76000000000101	|76000000000101				|	200					|	"Has Order, and all data matches"
		76000000000107	|76000000000107				|	412					|	"Has Order, but patient MRN mismatches"
		76000000000106	|76000000000106				|	412					|	"Has Order, but exam type mismatches"
		76000000000104	|76000000000103				|	428					|	"Missing order in VNA order table "
		76000000000103  |76000000000103             |   428                 |   "Missing order in study"

	}

	void validateResult(){
		String fileContents = new File('/temp/ResultsReport').getText('UTF-8')
		def result =parseHl7Result(fileContents)

		assert result[0][1]==SubmitTestData.msh[1]
		assert result[0][2]==SubmitTestData.msh[2]
		assert result[0][3]==SubmitTestData.msh[3]
		assert result[0][4]==SubmitTestData.msh[4]
		assert result[0][5]==SubmitTestData.msh[5]
		assert result[0][8]==SubmitTestData.msh[8]
		assert result[0][10]==SubmitTestData.msh[10]
		//assert result[0][11]==SubmitTestData.msh[11]

		assert result[1][1]== SubmitTestData.pid[0]				//sequence number
		assert result[1][2]== SubmitTestData.pid[1]			   	//patient id
		assert result[1][3]== SubmitTestData.pid[2]			  	//patient_identifier_list 'medicalId^idType'
		assert result[1][5]== SubmitTestData.pid[3]	            //patient name
		assert result[1][7]== SubmitTestData.pid[4]				//patient's DOB
		assert result[1][8]== SubmitTestData.pid[5]				//patient's sex

		assert result[2][7]== SubmitTestData.pv1[0]				//attendingDoctor name
		assert result[2][19]==SubmitTestData.pv1[1]				//visit/encounter number

		assert result[3][1]== SubmitTestData.obr[0]				//sequence number
		assert result[3][2]== SubmitTestData.obr[1]				//order id
		assert result[3][3]== SubmitTestData.obr[2]				//accessionNumber
		assert result[3][4]== SubmitTestData.obr[3]				//serviceIdentifier 'examId^desc'

		assert result[4][1]== SubmitTestData.obx_indications[0]				//sequence number
		assert result[4][2]== SubmitTestData.obx_indications[1]				//dataType 'TX'
		assert result[4][3]== SubmitTestData.obx_indications[2]				//observation identifier ??
		assert result[4][4]== SubmitTestData.obx_indications[3]             //observation sub-id sequence
		assert result[4][5]== SubmitTestData.obx_indications[4]				//observation value

		assert result[5][1]== SubmitTestData.obx_views[0]				//sequence number
		assert result[5][2]== SubmitTestData.obx_views[1]				//dataType 'TX'
		assert result[5][3]== SubmitTestData.obx_views[2]				//observation identifier ??
		assert result[5][4]== SubmitTestData.obx_views[3]             //observation sub-id sequence
		assert result[5][5]== SubmitTestData.obx_views[4]				//observation value

		assert result[6][1]== SubmitTestData.obx_findings[0]				//sequence number
		assert result[6][2]== SubmitTestData.obx_findings[1]				//dataType 'TX'
		assert result[6][3]== SubmitTestData.obx_findings[2]				//observation identifier ??
		assert result[6][4]== SubmitTestData.obx_findings[3]             //observation sub-id sequence
		assert result[6][5]== SubmitTestData.obx_findings[4]				//observation value

		assert result[7][1]== SubmitTestData.obx_interpretations[0]				//sequence number
		assert result[7][2]== SubmitTestData.obx_interpretations[1]				//dataType 'TX'
		assert result[7][3]== SubmitTestData.obx_interpretations[2]				//observation identifier ??
		assert result[7][4]== SubmitTestData.obx_interpretations[3]             //observation sub-id sequence
		assert result[7][5]== SubmitTestData.obx_interpretations[4]				//observation value

		ResponseEntity<byte[]> response = getMockReportResponse()
		byte[] pdfAsBytes= getMockReportResponse().getBody()
		assert result[8][5]== "PDF^TEXT^^Base64^"+ Base64.getEncoder().encodeToString(pdfAsBytes)
	}

	void validateResult_noExam(){
	}

	def parseHl7Result(String fileContents){

		int pidNum = fileContents.lastIndexOf('PID')
		int pv1Num = fileContents.lastIndexOf('PV1')
		int obrNum = fileContents.lastIndexOf('OBR')
		int obxNum1 = fileContents.lastIndexOf('OBX|1')
		int obxNum2 = fileContents.lastIndexOf('OBX|2')
		int obxNum3 = fileContents.lastIndexOf('OBX|3')
		int obxNum4 = fileContents.lastIndexOf('OBX|4')
		int obxNum5 = fileContents.lastIndexOf('OBX|5')

		String mshH = fileContents.substring(0, pidNum);
		String pidS = fileContents.substring(pidNum,pv1Num);
		String pv1S = fileContents.substring(pv1Num,obrNum);
		String obrS = fileContents.substring(obrNum,obxNum1);
		String obxS1 = fileContents.substring(obxNum1,obxNum2);
		String obxS2 = fileContents.substring(obxNum2,obxNum3);
		String obxS3 = fileContents.substring(obxNum3,obxNum4);
		String obxS4 = fileContents.substring(obxNum4,obxNum5);
		String obxS5 = fileContents.substring(obxNum5);

		oruResultObj.add(mshH.split('\\|'))
		oruResultObj.add(pidS.split('\\|'))
		oruResultObj.add(pv1S.split('\\|'))
		oruResultObj.add(obrS.split('\\|'))
		oruResultObj.add(obxS1.split('\\|'))
		oruResultObj.add(obxS2.split('\\|'))
		oruResultObj.add(obxS3.split('\\|'))
		oruResultObj.add(obxS4.split('\\|'))
		oruResultObj.add(obxS5.split('\\|'))
		//oruResultObj.each{ println"=-----${it}" }
		oruResultObj
	}


	void addWorksheet(studyId,seriesId,stat,wrkshtType) {
		def study = studyRepository.findOne(studyId)
		def examtpe = examRepository.save(new ExamType(series:seriesRepository.findOne(seriesId),examTypeMap:examTypeMapRepository.findOne(9001L)))
		def wrksheet = worksheetRepository.save(new Worksheet(
				template:worksheetTemplateRepository.findOne(7001l),
				examWorksheetType:wrkshtType,
				study:study,
				examType:examtpe,
				content:JsonOutput.toJson(SubmitTestData.cardiacTestData),
				lookupId:new WorksheetLookup(id:WrkshtLookup.Pending.value)))
		def studyObj = studyRepository.findOne(studyId)
		if(stat!=4001L)
			if(studyObj){
				studyObj.status = studyProgressRepository.findOne(stat)
				studyRepository.save(studyObj)
			}
	}
}

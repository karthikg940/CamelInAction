package com.ffss.datax.study.test.web.resource

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*
import groovy.json.JsonOutput

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.MediaType

import com.ffss.datax.common.constants.WrkshtLookup
import com.ffss.datax.common.domain.study.AccessionNumber
import com.ffss.datax.common.domain.study.ExamType
import com.ffss.datax.common.domain.study.StudyExamTypeMap
import com.ffss.datax.common.domain.worksheet.Worksheet
import com.ffss.datax.common.domain.worksheet.WorksheetLookup
import com.ffss.datax.common.domain.worksheet.WorksheetTemplate
import com.ffss.datax.study.repository.ExamTypeMapRepository
import com.ffss.datax.study.repository.ExamTypeRepository
import com.ffss.datax.study.repository.StudyExamTypeMapRepository
import com.ffss.datax.study.repository.StudyLookupRepository
import com.ffss.datax.study.repository.StudyRepository
import com.ffss.datax.study.repository.WorksheetRepository
import com.ffss.datax.study.repository.WorksheetTemplateRepository;
import com.ffss.datax.study.test.base.TransactionalWebIntegrationTest
import com.ffss.datax.study.test.base.WebAppIntegrationBaseSpecification
@TransactionalWebIntegrationTest
class OrderSpec extends WebAppIntegrationBaseSpecification{

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
	AccessionNumberRepository accessionNumberRepository
	@Autowired
	StudyExamTypeMapRepository studyExamTypeMapRepository
	@Autowired
	WorksheetTemplateRepository worksheetTemplateRepository

	def ormRequestObj = []
	String odrfile2='src/test/resources/createorder'

	def 'create order'(){

		def studyId = 76000000000104L

		given:'We have a study'

		when:'Physician completed his interpretations'
		addWorksheet(studyId,76000000000103L,4004L,'Procedural')
		then:'Study is ready for submission'
		def study = studyRepository.findOne(studyId)
		assert study.status.id in [4004L, 4009L]
		and:'When physician submit study to emr'

		def res = this.mockMvc.perform(put("/api/study/${studyId}/complete")
				.header("Authorization","Bearer "+StudyTestData.tokenWithOrgId)
				.contentType(MediaType.APPLICATION_JSON))

		then:'check the study is ordered study or not'

		res.andExpect(status().isPreconditionRequired())

		and:'if Study doesnt contains order'
		then:'create order for that study'

		def response = this.mockMvc.perform(post("/api/study/${studyId}/order")
				.header("Authorization","Bearer "+StudyTestData.tokenWithOrgId)
				.contentType(MediaType.APPLICATION_JSON))
		validaterOrder(odrfile2)
		and:'if order,visit,patient info is there for study, Physician can submit the study to emr'
		int c =sendcreatedOrder(studyId)
		def submitRes = this.mockMvc.perform(put("/api/study/${studyId}/complete")
				.header("Authorization","Bearer "+StudyTestData.tokenWithOrgId)
				.contentType(MediaType.APPLICATION_JSON))

		then:'study submits to emr'
		submitRes.andExpect(status().isOk())
	}

	def 'canceclAndCreateOrder'(){
		given:'We have a study'
		def studyId = 76000000000106L

		when:'Physician completed his interpretations'
		addWorksheet(studyId,76000000000103L,4004L,'Procedural')
		then:'Study is ready for submission'
		def study = studyRepository.findOne(studyId)
		assert study.status.id in [4004L, 4009L]
		and:'When physician submit study to emr'

		def res = this.mockMvc.perform(put("/api/study/${studyId}/complete")
				.header("Authorization","Bearer "+StudyTestData.tokenWithOrgId)
				.contentType(MediaType.APPLICATION_JSON))
		then:'check the study contains correct order or not'
		res.andExpect(status().isPreconditionFailed())
		and:'if there is mismatch in orders cancel the existing order and create new order'

		def cancelOrdRes = this.mockMvc.perform(delete("/api/study/${studyId}/order")
				.header("Authorization","Bearer "+StudyTestData.tokenWithOrgId)
				.contentType(MediaType.APPLICATION_JSON))

		then:'new order created'
		cancelOrdRes.andExpect(status().isOk())
		validaterOrder(odrfile2)
		and:'if order,visit,patient info is there for study, Physician can submit the study to emr'
		int c =sendcreatedOrder(studyId)
		def submitRes = this.mockMvc.perform(put("/api/study/${studyId}/complete")
				.header("Authorization","Bearer "+StudyTestData.tokenWithOrgId)
				.contentType(MediaType.APPLICATION_JSON))

		then:'study submits to emr'
		submitRes.andExpect(status().isOk())
	}
	def sendcreatedOrder(studyId){
		def studyExamTypeMap = studyExamTypeMapRepository.save(new StudyExamTypeMap(
				study :  studyRepository.findOne(studyId),
				examTypeMap : examTypeMapRepository.findOne(9001L)
				))
		def study = studyRepository.findOne(studyId)
		def accessionNumber = accessionNumberRepository.save(new AccessionNumber(id:1,accessionNumber:'50'))
		if(study){
			study.accessionNumber = accessionNumber
			study.studyExamTypeMap = studyExamTypeMap
			studyRepository.save(study)
		}
		//def order = [id: 10001L, patientId: 6000000000103L, studyId: 76000000000106L, accessioNumber: 50, controlCode:'NW', examType:'9001'+'^'+'Cardiac', orderId:"10001"]
		def createdDateTime = '2016-09-12T06:15:06'
		def notificationDateTime= '2016-09-12T06:15:07'
		def observationDate= '2016-09-12T06:15:07'

		sql.execute """
         insert into ORDER_T (ORDER_PK, PATIENT_FK, STUDY_FK, ACCESSION_NUMBER, CONTROL_CODE, EXAM_ID_DESCRIPTION, ORDER_ID, ORDER_GROUP,REPORT_STATUS,ID_TYPE,STUDY_UID,STMO,PATIENT_ACCOUNT_NUMBER, NOTIFICATION_STATUS,OBSERVATION_DATE, NOTIFICATION_DATE_TIME, CREATED_DATE_TIME) values (10001L, 6000000000103L, ${studyId}, '50','NW', '9001^Cardiac','10001',null,null,null,null,null,null,0,${observationDate},${notificationDateTime},${createdDateTime})
      """
		sql.updateCount

	}
	void validaterOrder(odr){
		String order = new File(odr).getText('UTF-8')
		def orderReq =parseHl7requestOrder(order)
		assert orderReq[0][2] == OrderTestData.msh[0]
		assert orderReq[0][8]==OrderTestData.msh[1]

		assert orderReq[1][1]== OrderTestData.pid[0]
		assert orderReq[1][3]== OrderTestData.pid[2]
		assert orderReq[1][5]== OrderTestData.pid[3]
		assert orderReq[1][8]== OrderTestData.pid[4]
		assert orderReq[2][7]== OrderTestData.pv1[0]
		assert orderReq[3][1]== OrderTestData.orc[0]
		assert orderReq[4][1]== OrderTestData.obr[0]
		assert orderReq[4][4]== OrderTestData.obr[1]
	}

	def parseHl7requestOrder(String order){

		int pidNum = order.lastIndexOf('PID')
		int pv1Num = order.lastIndexOf('PV1')
		int gt1Num = order.lastIndexOf('GT1')
		int orcNum = order.lastIndexOf('ORC')
		int obrNum = order.lastIndexOf('OBR')

		String mshH = order.substring(0, pidNum);
		String pidS = order.substring(pidNum,pv1Num)
		String pv1S = order.substring(pv1Num,gt1Num)
		String orcS = order.substring(orcNum,obrNum)
		String obrS = order.substring(obrNum);

		ormRequestObj.add(mshH.split('\\|'))
		ormRequestObj.add(pidS.split('\\|'))
		ormRequestObj.add(pv1S.split('\\|'))
		ormRequestObj.add(orcS.split('\\|'))
		ormRequestObj.add(obrS.split('\\|'))
		//ormRequestObj.each{ println"=-----${it}" }
		ormRequestObj
	}
	void addWorksheet(studyId,seriesId,stat,wrkshtType) {
		def study = studyRepository.findOne(studyId)
		def examtpe = examRepository.save(new ExamType(series:seriesRepository.findOne(seriesId),examTypeMap:examTypeMapRepository.findOne(9001L)))
		def wrksheet = worksheetRepository.save(new Worksheet(
				template:worksheetTemplateRepository.findOne(7001L),
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

package com.ffss.datax.study.service

import groovy.json.JsonSlurper

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.http.RequestEntity
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.stereotype.Service
import org.springframework.web.client.RestTemplate

import com.ffss.datax.common.domain.study.Order
import com.ffss.datax.common.util.CommonUtil
import com.ffss.datax.security.util.SecurityUtil
import com.ffss.datax.study.config.DataSources
import com.ffss.datax.study.constants.OrderControlCode
import com.ffss.datax.study.validator.AckValidator
import com.ffss.datax.study.web.transformer.OrderCancelTransformer
import com.ffss.datax.study.web.transformer.OrderRequestTransformer

@Service
class OrderService {

	@Autowired
	DataSources dataSources

	@Autowired
	JdbcTemplate jdbcTemplate

	@Autowired
	RestTemplate restTemplate

	@Value('${schema.name}')
	String schemaName

	@Autowired
	OrderRequestTransformer orderRequestTransformer

	@Autowired
	OrderCancelTransformer orderCancelTransformer
	
	@Autowired
	StudyService studyService
	@Value('${mirthchannel.createOrderUrl}')
	String createOrderUrl

	@Value('${mirthchannel.cancelOrderUrl}')
	String cancelOrderUrl

	@Autowired
	AckValidator ackValidator

	def findOrder(accessionNumber){
		Order order
		jdbcTemplate.dataSource = dataSources.vnaDataSource()
		String query ="SELECT * FROM ${schemaName}ORDER_T WHERE accession_number='${accessionNumber}'"
		List<Order> orderList  = jdbcTemplate.queryForList(query)

		if(orderList[0]){
			order = new Order(id:orderList[0].ORDER_PK, patientFk:orderList[0].PATIENT_FK, studyFk:orderList[0].STUDY_FK, accessionNumber:orderList[0].ACCESSION_NUMBER, idType:orderList[0].ID_TYPE,
			controlCode:orderList[0].CONTROL_CODE, studyUID:orderList[0].STUDY_UID, examType:orderList[0].EXAM_ID_DESCRIPTION,
			orderId:orderList[0].ORDER_ID,orderGroup:orderList[0].ORDER_GROUP, reportStatus:orderList[0].REPORT_STATUS, patientAccountNumber:orderList[0].PATIENT_ACCOUNT_NUMBER,
			notificationStatus:orderList[0].NOTIFICATION_STATUS,stmo:orderList[0].STMO,uUID:orderList[0].UUID)
			if(orderList[0].OBSERVATION_DATE)
				order.observationDateTime=CommonUtil.getUtilDate(orderList[0].OBSERVATION_DATE)
			if(orderList[0].NOTIFICATION_DATE_TIME)
				order.notificationDateTime=CommonUtil.getUtilDate(orderList[0].NOTIFICATION_DATE_TIME)
			if(orderList[0].CREATED_DATE_TIME)
				order.createdDateTime=CommonUtil.getUtilDate(orderList[0].CREATED_DATE_TIME)
			order
		}
		else{
			return null
		}
	}
	def transformAndSend(stdy, orderControlCode, api) {
		def token = SecurityUtil.retrieveAuthToken()
		def study =stdy
		def studyObj
		if(orderControlCode.equals(OrderControlCode.NW)){
			studyObj = orderRequestTransformer.transform(study, token, orderControlCode)
		}
		else if(orderControlCode.equals(OrderControlCode.CA)) {
			def accessionNumberObj = study.accessionNumber
			def order = findOrder(accessionNumberObj.accessionNumber)
			studyObj = orderCancelTransformer.transform(study, token, orderControlCode,order)
		}
		RequestEntity request = RequestEntity.post(new URI(api)).accept(MediaType.APPLICATION_JSON).body(studyObj)
		restTemplate.exchange(request, String)
	}

	def create(Long studyId){
		def study = studyService.findPatientDetailsByStudyId(studyId)
		transformAndSend(study, OrderControlCode.NW, createOrderUrl).statusCode
	}

	def cancel(Long studyId){
		def study = studyService.findPatientDetailsByStudyId(studyId)
		def cancelResponse = transformAndSend(study, OrderControlCode.CA, cancelOrderUrl)
		def retVal = new JsonSlurper().parseText(cancelResponse.body)
		def response
		def resp = ackValidator.validate(retVal)

		switch (resp) {
			case "Success":
				response = transformAndSend(study, OrderControlCode.NW, createOrderUrl).statusCode
				break
			case "AppliactionError":
				response = HttpStatus.BAD_REQUEST
				break
			case "Error":
				response = HttpStatus.INTERNAL_SERVER_ERROR
				break
			default:
				break
		}
		response
	}
}

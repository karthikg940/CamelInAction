package com.ffss.datax.study.validator

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Component

import com.ffss.datax.common.domain.study.Order
import com.ffss.datax.common.domain.study.Study
import com.ffss.datax.study.constants.OrderStatus
import com.ffss.datax.study.repository.PatientRepository
import com.ffss.datax.study.service.OrderService

@Component
class OrderValidator implements IValidator{

	@Autowired
	PatientRepository patientRepository

	@Autowired
	OrderService orderService

	@Override
	def validate(Study study,Order order){
		def response
		if(order){
			response = (validateExam(study,order) && validateMRN(study,order)) ? OrderStatus.VALID:OrderStatus.MISMATCH
		}else{
			response = OrderStatus.NONORDERED
		}
		return response
	}

	def validateExam(study,order){

		def examFromStudy = study.studyExamTypeMap.examTypeMap
		def examFromOrder = order.getExamType().split('\\^')
		def status = (examFromOrder[0].asType(Integer) == examFromStudy.id && examFromOrder[1] == examFromStudy.examTypeDesc) ? true : false
		return status
	}
	def validateMRN(study,order){
		def medicalIdFromStudy = study.patient.patientIdentifier[0].medicalId
		def patient = patientRepository.findOne(order.patientFk)
		def medicalIdFromOrder = patient.patientIdentifier[0].medicalId
		def status = (medicalIdFromStudy == medicalIdFromOrder) ? true : false
		return status
	}
}

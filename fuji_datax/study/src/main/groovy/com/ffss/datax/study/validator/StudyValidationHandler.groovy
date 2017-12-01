package com.ffss.datax.study.validator

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component

@Component
class StudyValidationHandler {

	@Autowired
	OrderValidator orderValidator

	def validate(study,order){
		orderValidator.validate(study,order)
	}
}

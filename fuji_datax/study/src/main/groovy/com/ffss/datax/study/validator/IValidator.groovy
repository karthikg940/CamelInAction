package com.ffss.datax.study.validator

import com.ffss.datax.common.domain.study.Order
import com.ffss.datax.common.domain.study.Study

interface IValidator {
	def validate(Study study, Order order)
}

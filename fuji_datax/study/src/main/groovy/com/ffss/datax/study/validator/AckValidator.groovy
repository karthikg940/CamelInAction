package com.ffss.datax.study.validator

import org.springframework.stereotype.Component

@Component
class AckValidator {

	def validate(retVal){
		def response

		switch (retVal.ackCode) {
			case "AA":
				response ='Success'
				break
			case "AE":
				response ='ApplicationError'

				break
			case "AR":
				response ='Error'
				break
			default:
				break
		}
		response
	}
}

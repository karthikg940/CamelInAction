package com.ffss.datax.worksheet.web.transformer

import org.joda.time.format.DateTimeFormat
import org.joda.time.format.DateTimeFormatter
import org.springframework.stereotype.Component

import com.ffss.datax.worksheet.constants.WorksheetConstants

@Component
class SignatureTransformer {

	static DateTimeFormatter formatter = DateTimeFormat.forPattern(WorksheetConstants.DATEFORMAT_MONTH)
	
	def transformSign(retVal) {
		def signatureTemplate = [id:'',sign:'',timestamp:'']
		def sign = retVal[0]?retVal[0].wrkShtStatus:''
		if(sign.equalsIgnoreCase('QAInProgress')){
			[worksheet:[id:retVal[0]?retVal[0].worksheet.id:''],qa:retVal[0]?[id:retVal[0]?retVal[0].id:'',sign:retVal[0]?retVal[0].signedName:'',timestamp:retVal[0]?formatter.print(retVal[0].pocDateTime):'']:[]]
		}
		else if(sign.equalsIgnoreCase('signed')){
			[worksheet:[id:retVal[0]?retVal[0].worksheet.id:''],poc:retVal[0]?[id:retVal[0]?retVal[0].id:'',sign:retVal[0]?retVal[0].signedName:'',timestamp:retVal[0]?formatter.print(retVal[0].pocDateTime):'']:[],attending:retVal[1]?[id:retVal[1]?retVal[1].id:'',sign:retVal[1]?retVal[1].signedName:'',timestamp:retVal[1]?formatter.print(retVal[1].pocDateTime):'']:[]]
		}
		else{
			[worksheet:[id:''],poc:signatureTemplate,qa:signatureTemplate]
		}
	}
}

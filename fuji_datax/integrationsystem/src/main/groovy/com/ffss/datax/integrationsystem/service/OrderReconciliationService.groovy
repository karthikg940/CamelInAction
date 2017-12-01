package com.ffss.datax.integrationsystem.service

import org.joda.time.DateTime
import org.joda.time.format.DateTimeFormat
import org.joda.time.format.DateTimeFormatter
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

import com.ffss.datax.integrationsystem.domain.OrderSequence
import com.ffss.datax.integrationsystem.repository.OrderSequenceRepository

@Service
class OrderReconciliationService {
	@Autowired
	ParserHl7  parserHl7

	@Autowired
	OrderSequenceRepository  orderSequenceRepository

	static DateTimeFormatter formatter = DateTimeFormat.forPattern("yyyyMMddHHmmss")

	def cancelOrder(cancelData){
		def ack=[:]
		def msgId = parserHl7.hl7Parse(cancelData)
		ack.dateTimeOfMsg = formatter.print(DateTime.now())
		ack.msgType='ACK'
		ack.msgControlId=msgId
		ack.ackCode='AA'
		parserHl7.generateAck(ack)
	}

	def create(data){
		orderSequenceRepository.save(new OrderSequence()).id
	}
}

package com.ffss.datax.integrationsystem.service

import org.springframework.stereotype.Component

import ca.uhn.hl7v2.DefaultHapiContext
import ca.uhn.hl7v2.HapiContext
import ca.uhn.hl7v2.model.Message
import ca.uhn.hl7v2.model.v25.message.ACK
import ca.uhn.hl7v2.parser.Parser
import ca.uhn.hl7v2.util.Terser
@Component
class ParserHl7 {
	def hl7Parse(String msg){
		HapiContext context = new DefaultHapiContext()
		Parser p = context.getGenericParser()
		Message hapiMsg = p.parse(msg)
		Terser terser = new Terser(hapiMsg)
		terser.get("/.MSH-10-1")
	}

	def generateAck(ack){
		ACK ackn = new ACK();
		HapiContext context = new DefaultHapiContext()
		Parser p = context.getGenericParser()
		Terser terser = new Terser(ackn)
		terser.set("/MSH-1", "|")
		terser.set("/MSH-2", "^~\\&")
		terser.set("/MSH-7", "${ack.dateTimeOfMsg}")
		terser.set("/MSH-9", "${ack.msgType}")
		terser.set("/MSH-10", "${ack.msgControlId}")
		terser.set("/MSH-11", "D")
		terser.set("/MSH-12", "2.6")
		terser.set("/MSA-1", "${ack.ackCode}")
		terser.set("/MSA-2", "${ack.msgControlId}")
		terser.set("/MSA-3", "SUCCESS")
		p.encode(ackn)
	}
}

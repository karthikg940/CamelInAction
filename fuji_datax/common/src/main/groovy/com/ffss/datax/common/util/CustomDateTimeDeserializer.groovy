package com.ffss.datax.common.util


import org.joda.time.DateTime
import org.joda.time.format.ISODateTimeFormat

import com.fasterxml.jackson.core.JsonParser
import com.fasterxml.jackson.core.JsonToken
import com.fasterxml.jackson.databind.DeserializationContext
import com.fasterxml.jackson.databind.JsonDeserializer

/**
 * Custom Jackson deserializer for displaying Java8 DateTime objects.
 */
class CustomDateTimeDeserializer extends JsonDeserializer<DateTime> {

	@Override
	DateTime deserialize(JsonParser jp, DeserializationContext ctxt)
	throws IOException {
		JsonToken t = jp.currentToken
		if (t == JsonToken.VALUE_STRING) {
			String str = jp.text.trim()
			ISODateTimeFormat.dateTimeParser().parseDateTime(str)
		}
		if (t == JsonToken.VALUE_NUMBER_INT) {
			new DateTime(jp.longValue)
		}
		throw ctxt.mappingException(handledType())
	}
}

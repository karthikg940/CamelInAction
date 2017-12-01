package com.ffss.datax.vnasync.domain.util


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
		JsonToken t = jp.getCurrentToken()
		if (t == JsonToken.VALUE_STRING) {
			String str = jp.getText().trim()
			return ISODateTimeFormat.dateTimeParser().parseDateTime(str)
		}
		if (t == JsonToken.VALUE_NUMBER_INT) {
			return new DateTime(jp.getLongValue())
		}
		throw ctxt.mappingException(handledType())
	}
}

package com.ffss.datax.vnasync.domain.util

import org.joda.time.DateTime
import org.joda.time.DateTimeZone
import org.joda.time.format.DateTimeFormat
import org.joda.time.format.DateTimeFormatter

import com.fasterxml.jackson.core.JsonGenerator
import com.fasterxml.jackson.databind.JsonSerializer
import com.fasterxml.jackson.databind.SerializerProvider

/**
 * Custom Jackson serializer for displaying Java8 DateTime objects.
 */
class CustomDateTimeSerializer extends JsonSerializer<DateTime> {

	private static final DateTimeFormatter formatter = DateTimeFormat
	.forPattern("yyyy-MM-dd'T'HH:mm:ss'Z'")

	@Override
	void serialize(DateTime value, JsonGenerator generator,
			SerializerProvider serializerProvider)
	throws IOException {
		generator.writeString(formatter.print(value.toDateTime(DateTimeZone.UTC)))
	}
}

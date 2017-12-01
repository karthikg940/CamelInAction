package com.ffss.datax.vnasync.domain.util

import java.text.DateFormat
import java.text.SimpleDateFormat

import org.joda.time.DateTime
import org.joda.time.DateTimeZone
import org.joda.time.format.DateTimeFormat
import com.ffss.datax.vnasync.constants.VnaSyncConstants

class CommonUtil {

	static  getStartOfDay(DateTime date) {
		date.withHourOfDay(0).withMinuteOfHour(0).withSecondOfMinute(0).withMillisOfSecond(0).withZone(DateTimeZone.UTC)
	}

	static  getEndOfDay(DateTime date) {
		date.withHourOfDay(23).withMinuteOfHour(VnaSyncConstants.numeric_59).withSecondOfMinute(VnaSyncConstants.numeric_59).withMillisOfSecond(999).withZone(DateTimeZone.UTC)
	}

	static  getUtilDate(resultSetDate){
		def timeDuration = 'MM/dd/yyyy HH:mm:ss sss'
		DateFormat df = new SimpleDateFormat(timeDuration)
		String dateStr = df.format(resultSetDate)
		DateTimeFormat.forPattern(timeDuration).parseDateTime(dateStr)
	}

	static  getUtilBirthDate(resultSetDate){
		Date dateTime=resultSetDate

		dateTime
	}
}

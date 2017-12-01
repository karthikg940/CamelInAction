package com.ffss.datax.common.util

import java.text.DateFormat
import java.text.SimpleDateFormat

import org.joda.time.DateTime
import org.joda.time.DateTimeZone
import org.joda.time.format.DateTimeFormat

class CommonUtil {
	static minValue = 59
	static  getStartOfDay(DateTime date) {
		date.withHourOfDay(0).withMinuteOfHour(0).withSecondOfMinute(0).withMillisOfSecond(0).withZone(DateTimeZone.UTC)
	}

	static  getEndOfDay(DateTime date) {
		date.withHourOfDay(23).withMinuteOfHour(minValue).withSecondOfMinute(minValue).withMillisOfSecond(999).withZone(DateTimeZone.UTC)
	}

	static  getUtilDate(resultSetDate){
		def timeDuration = 'MM/dd/yyyy HH:mm:ss sss'
		DateFormat df = new SimpleDateFormat(timeDuration)
		String dateStr = df.format(resultSetDate)
		DateTimeFormat.forPattern(timeDuration).parseDateTime(dateStr)
	}
	
	static getDate(){
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
		formatter.format(new Date());
	}

	static  getUtilBirthDate(resultSetDate){
		Date dateTime=resultSetDate

		dateTime
	}
}

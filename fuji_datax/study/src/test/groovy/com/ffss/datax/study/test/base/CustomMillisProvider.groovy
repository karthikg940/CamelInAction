package com.ffss.datax.study.test.base

import org.joda.time.DateTime
import org.joda.time.DateTimeUtils.MillisProvider

class CustomMillisProvider implements MillisProvider {
	
	DateTime date

	@Override
	public long getMillis() {
		date.millis
	}

}

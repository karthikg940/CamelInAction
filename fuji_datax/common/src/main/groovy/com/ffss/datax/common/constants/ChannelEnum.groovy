package com.ffss.datax.common.constants

enum ChannelEnum {
	
	EMAIL(1),
	INAPP(2),
	INAPP_SHARE(3),
	SMS(4)
		
	int value
	
	private ChannelEnum(int value) {
		this.value = value
	}

}

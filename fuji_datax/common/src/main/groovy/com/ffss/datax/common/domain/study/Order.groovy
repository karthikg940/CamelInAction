package com.ffss.datax.common.domain.study

import org.joda.time.DateTime

class Order {

	//insert into ORDER_T values(1,6000000000101,76000000000101,10000000025,'95115^allergy','Clinical');

	Long id
	Long patientFk
	Long studyFk
	String accessionNumber
	String idType
	String controlCode
	String studyUID
	String examType
	String orderId
	Long orderGroup
	String reportStatus
	DateTime observationDateTime
	String patientAccountNumber
	int notificationStatus
	DateTime notificationDateTime
	DateTime createdDateTime
	String stmo
	String uUID}

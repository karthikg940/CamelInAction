package com.ffss.datax.study.constants

class StudyConstants {
	
	//role constants
	static String ROLE_PERFORMING = 'performing'
	static String ROLE_QA = 'qa'
	static String ROLE_ATTENDING = 'attending'
	static final TASK_ROLE_NAME ='taskRoleName'
	
	//fullname
	static String FIRST_NAME = 'firstName'
	static String MIDDLE_NAME = 'middleName'
	static String LAST_NAME = 'lastName'
	static final NAME ='name'
	
	//worksheet type
	static final PROCEDURAL = 'Procedural'
	static final QA = 'QA'
	
	//studylist types
	static final MYSTUDIES = 'mystudies'
	static final ALLSTUDIES = 'allstudies'
	static final MYATTESTATION = 'myattestation'
	static final QASTUDIES = 'qastudies'
	
	//date
	static String VNA_CREATED_DATE = 'vnaCreatedDateTime'
	static String QA_ASSIGNED_DATE = 'qaAssignedDateTime'
	static String ATTENDING_ASSIGNED_DATE = 'attendingAssignedDateTime'
	static final DEFAULTSTARTTIME = ' 00:00:00'
	static final DEFAULTENDTIME = ' 23:59:59'
	static  DATEFORMAT_YEAR = 'yyyy-MM-dd HH:mm:ss'
	static  DATEFORMAT_MONTH = 'MMM-dd-yyyy HH:mm:ss'
	static  DATEFORMAT = 'MM/dd/yyyy'
	static HL7_DATEFORMAT = 'yyyyMMddHHmm'
	
	//default
	static final DEFAULTSINGLESPACE =' '
	static final PERCENTAGE ='%'
	
	//study attributes
	static final STATUS ='status'
	static String UNSPECIFIED = 'Unspecified'
	static String STUDY = 'study'
	
	//alert Constants
	static final QA_ALERT = 'ALERT_QA'
	static final ATTESTATION_ALERT = 'ALERT_ATTESTATION'
	static final ORG_ID = 1
	static final ALERT_ADMIN_POC = 'ALERT_ADMIN_POC'
	static final ALERT_ADMIN_QA = 'ALERT_ADMIN_QA'
	static final ALERT_POC_IDLE = 'ALERT_POC_IDLE'
	static final ALERT_QA_IDLE = 'ALERT_QA_IDLE'
	static final ALERT_ATTENDING_IDLE = 'ALERT_ATTENDING_IDLE'
	
	static final int CONFIGURED_TIME = 48
	static final int  LAST_SYNC_TIME = 5*60*1000
	
	static String MESSAGE = 'message'
	static final FLAG_YES = 'Y'
	static final FLAG_NO = 'N'
	static String NEW = 'new'
	
	
	
}

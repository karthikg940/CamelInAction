package com.ffss.datax.common.constants

enum StudyStatusEnum {

	NEW('New'),
	ASSIGNED('Assigned'),
	PENDING('Pending'),
	SIGNED('Signed'),
	QA_UNASSIGNED('QAUnassigned'),
	QA_ASSIGNED('QAAssigned'),
	QA_INPROGRESS('QAInProgress'),
	SUBMITTED('Submitted'),
	ATTESTED('Attested'),
	SUBMITTED_FOR_ATTESTATION('SubmittedForAttestation')

	String value

	private StudyStatusEnum(String value) {
		this.value = value
	}

	static boolean isPocIdle(String status){
		status.equalsIgnoreCase('assigned') || status.equalsIgnoreCase('pending') || status.equalsIgnoreCase('signed')
	}
	static boolean isQAIdle(String status){
		status.equalsIgnoreCase('qaassigned') || status.equalsIgnoreCase('qainprogress')
	}
	static boolean isAttendingIdle(String status){
		status.equalsIgnoreCase('submittedforattestation') || status.equalsIgnoreCase('attested')
	}
}

package com.ffss.datax.common.constants

enum StudyLookup {
	
	New(4001L),
	Assigned(4002L),
	Pending(4003L),
	Signed(4004L),
	QAUnassigned(4005L),
	QAAssigned(4006L),
	QAInProgress(4007L),
	Submitted(4008L),
	Attested(4009L),
	SubmittedForAttestation(1010L)
	
	
	long value
	
	StudyLookup(value) {
		this.value = value
	}
}


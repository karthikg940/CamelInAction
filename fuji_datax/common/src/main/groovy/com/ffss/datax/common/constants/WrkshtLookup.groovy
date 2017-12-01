package com.ffss.datax.common.constants

enum WrkshtLookup {
	
	Pending(1001L),
	Signed(1002L),
	QAUnassigned(1003L),
	QAAssigned(1004L),
	QAInProgress(1005L),
	Submitted(1006L),
	Attested(1007L),
	SubmittedForAttestation(1008L)
	
	
	long value
	
	WrkshtLookup(value) {
		this.value = value
	}
}


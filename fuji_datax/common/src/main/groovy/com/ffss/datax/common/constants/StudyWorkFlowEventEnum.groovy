package com.ffss.datax.common.constants

enum StudyWorkFlowEventEnum {
	
	USERASSIGN('UserAssign'),
	QAASSIGN('QAAssign'),
	ASSOCIATION('Association'),
	QAWORKSHEETTYPEUPDATE('QAWorksheetTypeUpdate'),
	QAWORKSHEETUPDATE('QAWorksheetUpdate'),
	QAASSOCIATION('QAAssociation'),
	QASUBMITFORATTENDING('QASubmitForAttending'),
	POCSUBMITFORATTENDING('POCSubmitForAttending'),
	WORKSHEETSAVEPENDING('WorksheetSavePending'),
	POCATTESTATIONSIGNDELETE('POCAttestationSignDelete'),
	QAATTESTATIONSIGNDELETE('QaAttestationSignDelete'),
	POCSIGNED('POCSigned'),
	QAWORKSHEETSAVE('QAWorksheetSave'),
	QASIGNED('QASigned'),
	POCATTESTATION('POCAttestation'),
	DELETEQASIGN('DeleteQASign'),
	DELETEPOCSIGN('DeletePOCSign'),
	DELETEATTENDINGSIGN('DeleteAttendingSign'),
	QASUBMIT('QASubmit'),
	ATTENDINGSUBMITEMR('AttendingSubmitEMR'),
	POCSUBMITEMR('POCSubmitEMR'),
	QAATTESTATIONSIGN('QaAttestationSign'),
	POCATTESTATIONSIGN('POCAttestationSign')
	
	
		
	String value
	
	private StudyWorkFlowEventEnum(String value) {
		this.value = value
	}
}

package com.ffss.datax.workflow.test.web.resource


class WorkflowData {

	static def token = 'eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MTAwMSwidXNlck5hbWUiOiJqb2hudyJ9.N9NB9ioZUSOhtiSziPA10h4PpjOlzBV0ztqqvcuaOp9RqxkRUa3XvvX7GrTPQTy4vxuNd59ve7OBq-dVcPP65g'
	static def crisren = 'eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MTAwMiwidXNlck5hbWUiOiJjcmlzcmVuIn0.d_6oSe5guKmDi_K5V8LIS3L_UsuhrKkrfm9nc_WuDyOoK-mLhVX8WHss3fQ33G2Ek_qTRqwiWmmdl5RUrojOxQ'

	static def qaenabled=[qaEnabled: false, attestationEnabled: true,pocQaAttending: false,QAAttending: false]

	static def qaenabled1=[qaEnabled: false, attestationEnabled: true,pocQaAttending: false,QAAttending: false]
	
	static def createUserTask (workFlowTaskId){
		 [workflowTask:"${workFlowTaskId}",taskRoleName:'performing',loginUserId:1001]
	}
	static def getUser = [type:'performing']
	static def nextStatus=[nextStatus:'New']
	
	static def nextStatusRequest=[status:'New',	event:'UserUnAssign']
	
	static def nextStatus1=[nextStatus:'New']
	
	static def nextStatusRequest1=[status:'',	event:'']

	static def type=[type:'Study',user:1001]
	static def event=[event:'UserUnAssign']

	static def currentStatus=[currentStatus:'Assigned']


	static def assignedUser=[assignedUser:1001]

	static def triggeringUser=[triggeringUser:1001]

	static def workflowId=[workflowId:1001]
	static def study=[studyId:1001]

	static def pocOnly =[
		[assignedUser:1001,event:'WorksheetSavePending'],
		[assignedUser:1001,event:'POCSigned'],
		[assignedUser:1001,event:'POCSubmitEMR']
	]

	static def pocQaAttendOnly =[
		[assignedUser:1001,event:'WorksheetSavePending'],
		[assignedUser:1001,event:'POCSigned'],
		[assignedUser:1001,event:'QAUnAssigned'],
		[assignedUser:1001,event:'QAAssign'],
		[assignedUser:1001,event:'QAWorksheetSave'],
		[assignedUser:1001,event:'QASigned'],
		[assignedUser:1001,event:'QASubmitForAttending'],
		[assignedUser:1001,event:'POCAttestation'],
		[assignedUser:1001,event:'AttendingSubmitEMR']
	]

	static def unAssign =[assignedUser:1001,event:'UserUnAssign']

	static def nextStatusPOC=['Pending', 'Signed', 'Submitted']

	static def nextStatusPOCQaAttend=[
		'Pending',
		'Signed',
		'QAUnAssigned',
		'QAAssigned',
		'QAInProgress',
		'QAInProgress',
		'SubmittedForAttestation',
		'Attested',
		'Submitted'
	]

	static def nextStatusUnassign=['New']
}
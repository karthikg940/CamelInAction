package com.ffss.datax.study.test.web.resource

class AttestationStudiesTestData {
	static def token1 = "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MTAwMSwidXNlck5hbWUiOiJqb2hudyJ9.N9NB9ioZUSOhtiSziPA10h4PpjOlzBV0ztqqvcuaOp9RqxkRUa3XvvX7GrTPQTy4vxuNd59ve7OBq-dVcPP65g"
	
	static def testData1 =[
		results:[[examType:['Kidney', 'Liver', 'Cardiac', 'Thyroid', 'Vascular'],studyId:1111003,date:'2016-11-10 17:24:18',studyType:'Clinical',modality:['Mindray 5', 'GE US2', 'GE US2', 'Sonosite1', 'Sonosite1'],
				patient:[id:'DAT1234',prefix:'Mrs.',firstName:'Joan',middleName:'M',lastName:'Shephard'],
				referringphysician:[prefix:'Mr.',firstName:'Mathew',middleName:'Rodey',lastName:'Doe'],tags:['tumor'],
				requestingphysician:[prefix:'Mr.',firstName:'John',middleName:'Williams',lastName:'Doe'],status: ['signed']]
		]]
}

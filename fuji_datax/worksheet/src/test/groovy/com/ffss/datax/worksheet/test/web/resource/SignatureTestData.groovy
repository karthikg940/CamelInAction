package com.ffss.datax.worksheet.test.web.resource

class SignatureTestData {

	static def token = 'eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MTAwMSwidXNlck5hbWUiOiJqb2hudyJ9.N9NB9ioZUSOhtiSziPA10h4PpjOlzBV0ztqqvcuaOp9RqxkRUa3XvvX7GrTPQTy4vxuNd59ve7OBq-dVcPP65g'
	
	static def insertSignature(wrkshtId,type){
		[worksheet: [id: "${wrkshtId}"], type: "${type}", sign: 'Dr. John Williams', timestamp: '2016-11-10 17:24:18',study:[id:[76000000000001L]]]
	}
	
	static def insertSignatureForAttending(wrkshtId){
		[worksheet: [id: "${wrkshtId}"], type: 'attending', sign: 'Dr. John Williams', timestamp: 'Jan 06,2017 16:04:36',study:[id:[76000000000001]]]
	}
	
	static def invalidData = [worksheet: [id: 1], type: 'credential', sign: 'Dr. John Williams', timestamp: 'Jan 06,2017 16:04:36']
	
	static def signatureTestData1 = [ worksheet: [ id: ''],  poc: [],  attending: [] ]
}

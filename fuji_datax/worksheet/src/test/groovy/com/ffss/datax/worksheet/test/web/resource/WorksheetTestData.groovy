package com.ffss.datax.worksheet.test.web.resource

class WorksheetTestData {

	static def token1 = 'eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MTAwMSwidXNlck5hbWUiOiJqb2hudyJ9.N9NB9ioZUSOhtiSziPA10h4PpjOlzBV0ztqqvcuaOp9RqxkRUa3XvvX7GrTPQTy4vxuNd59ve7OBq-dVcPP65g'
	static def TestData1=[results:[[id:7001, name:'Cardiac'], [id:7002, name:'Thoracic'], [id:7003, name:'Ocular']]]
	/*[results:[
	 ['id': 7001,'name': 'Cardiac'],
	 ['id': -1,'name': 'PCGames']
	 ]
	 ]*/

	static def TestData2=
	[
		'result': ['id': 7001,'name': 'Cardiac',
			'content': ['type': 'cardiac','value': 'CardiacTemplate']]]


	static def saveData = [
		[examType:[id:10001],template:[id:7002],lookupId:[id:1001],study: [id: 76000000000001],wrkshtType:[type:'Procedural'],
			content:[
				sections:[[id:1,questions:[[id:1,choice:[id:1]], [id:2,choice:[text:'Other']]]]]]],
		[examType:[id:10001],template:[id:7002],lookupId:[id:1001],study: [id: 76000000000001],wrkshtType:[type:'qa'],
			content:[
				sections:[[id:1,questions:[[id:1,choice:[id:1]], [id:2,choice:[text:'Other']]]]]]],
		[examType:[id:10001],template:[id:7002],lookupId:[id:1001],study: [id: 76000000000001],wrkshtType:[type:'attending'],
			content:[
				sections:[[id:1,questions:[[id:1,choice:[id:1]], [id:2,choice:[text:'Other']]]]]]],
		[examType:[id:10001],template:[id:7002],lookupId:[id:1001],study: [id: 76000000000001],wrkshtType:[type:'QA'],
			content:[
				sections:[[id:1,questions:[[id:1,choice:[id:1]], [id:2,choice:[text:'Other']]]]]]],
		[examType:[id:10001],lookupId:[id:1001],study: [id: 76000000000001],wrkshtType:[type:'Procedural'],
			content:[
				sections:[[id:1,questions:[[id:1,choice:[id:1]], [id:2,choice:[text:'Other']]]]]]]
	]

	static def expectedSaveStatus = [201, 400, 400, 400, 400]
	static def submitToQa = [studyId: 76000000000001, userId: null]
	static def examTypeIds = [10001, -20]

	static def searchResults =
	[
		[
			[result:[examType:[id:10001],template:[id:7002],lookupId:[id:1001],study: [id: 2001],
					content:[
						sections:[[id:1,questions:[[id:1,choice:[id:1]], [id:2,choice:[text:'Other']]]]]]],

				/* [
				 [result:[template:[id:-1,content:[
				 sections:[
				 [id:1,questions:[
				 [id:1,choice:[id:1]],
				 [id:2,choice:[text:'Other']]
				 ]]
				 ]
				 ]],*/
				content:[
					sections:[[id:1,questions:[[id:1,choice:[id:1]], [id:2,choice:[text:'Other']]]]]]]
		],
		[result:null]
	]

	static def updateData = [
		content:[
			sections:[[id:2,questions:[[id:1,choice:[id:1]], [id:2,choice:[text:'UpdateOther']]]]]],study: [id: 76000000000001]]
	static def request=[status:'pending']

	static def request1=[status:'signed']

	static def wrkshtDelete = [study: [id: 76000000000001],wrkshtType:[type:'Procedural'], assignToUserId: [id: null], examType: [id: 10001], template: [id: 7002],content:[]]

	static def qaTestData=
	[
		'results': [[
				'id': 7004,
				'name': 'QAFlow'
			]
		]]

	static def studyStatusRequest=[status:'attested']
}


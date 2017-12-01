package com.ffss.datax.study.test.web.resource

class StudyTestData {

	static def token1 = "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MTAwMSwidXNlck5hbWUiOiJqb2hudyJ9.N9NB9ioZUSOhtiSziPA10h4PpjOlzBV0ztqqvcuaOp9RqxkRUa3XvvX7GrTPQTy4vxuNd59ve7OBq-dVcPP65g"
	static def token ="eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MTAwMiwidXNlck5hbWUiOiJjcmlzcmVuIn0.d_6oSe5guKmDi_K5V8LIS3L_UsuhrKkrfm9nc_WuDyOoK-mLhVX8WHss3fQ33G2Ek_qTRqwiWmmdl5RUrojOxQ"
	static def tokenWithOrgId = "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MTAwMSwidXNlck5hbWUiOiJqb2hudyIsIm9yZ0lkIjoxfQ.h5LJZRT1ATUM9Exl9yE73CsqkFaYE9qejEAcnoFfU6B4nEVsstppJofs0OynEyn31jDfeQOvSVr-V3uYtXm4Zg"
	static def attestationsExpectedStudies1 =[
		results:[
			[examType:['Kidney', 'Liver', 'Cardiac', 'Thyroid', 'Vascular'],studyId:76000000000001,date:'2016-11-10 17:24:18',studyType:'Clinical',modality:['Mindray 5', 'GE US2', 'GE US2', 'Sonosite1', 'Sonosite1'],
				patient:[id:'DAT1234',prefix:'Mrs.',firstName:'Joan',middleName:'M',lastName:'Shephard'],
				referringphysician:[prefix:'Mr.',firstName:'Mathew',middleName:'Rodey',lastName:'Doe'],tags:['tumor'],
				requestingphysician:[prefix:'Mr.',firstName:'John',middleName:'Williams',lastName:'Doe'],status: ['signed']]
		]
	]

	static def attestationsExpectedStudies2 =[
		results:[
			[examType:['Liver', 'Kidney'],studyId:76000000000001,date:'2016-11-18 12:05:22',studyType:'Clinical',modality:['Sonosite1', 'Emed US 1'],
				tags:['tumor'],patient:[id:'DAT5678',prefix:'Mrs.',firstName:'Lisa',middleName:'R',lastName:'Kudrow'],
				requestingphysician:[prefix:'Mr.',firstName:'John',middleName:'Williams',lastName:'Doe'],
				referringphysician:[prefix:'Mr.',firstName:'Mathew',middleName:'Rodey',lastName:'Doe'],
				status: ['signed']]
		]
	]

	static def expectedStudies = [
		results:[
			examType:['Ocular', 'Venous', 'MSK'],studyId:76000000000001,date:'2016-12-07 16:00:53',studyType:'Clinical',modality:['US', 'US', 'US'],
			patient:[id:1003, firstName:'John', mrnno:'HNE5689', lastName:'Hoover', middleName:'Mason', prefix:'Mr.'],
			referringphysician:[firstName:'John',id:2001,lastName:'Williams',middleName:'Doe',prefix:'Dr'],tags:['DVT', 'Phlebitis', 'MCTD', 'SLE'],
			requestingphysician:[firstName:'melvin',id:2003,lastName:'Wind',middleName:'Dark',prefix:'Dr'],status: ['New']],
		paging:[
			prevPage:'/api/studylist?page=1',
			nextPage:'/api/studylist?page=3',
			limit:20,
			currentPage:2
		]
	]

	static def emptyResult =[
		results:[]]

	static def expectedEmptyStudies = [
		results:[
			examType:['Cardiac', 'Thoracic'],studyId:76000000000001,date:'2016-12-07 16:00:53',studyType:'ivizuln',modality:['US', 'US'],
			patient:[firstName:'John', id:'HNE5689', lastName:'Hoover', middleName:'Mason', prefix:null],
			referringphysician:[firstName:'John',id:2001,lastName:'Williams',middleName:'Doe',prefix:'Dr'],tags:['Tumor', 'Emphysema', 'Mediastinum', 'Esophageal'],
			requestingphysician:[firstName:'melvin',id:2003,lastName:'Wind',middleName:'Dark',prefix:'Dr'],status: ['New']],
		paging:[
			prevPage:'/api/studylist?page=1',
			nextPage:'/api/studylist?page=3',
			limit:20,
			currentPage:2
		]
	]
	
	static def expectedStudies_Anonymous = [
		results:[
			"studyId":76000000010015,"studyNo":"","deleted":"N","studyType":"","date":"2017-05-04 16:42:01",
			"patient":["id":"","mrnno":"","prefix":"","firstName":"","middleName":"","lastName":"Anonymized"],
			"modality":["US"],"examType":"Unspecified","tags":[],
			"requestingphysician":["id":"1001","prefix":"Dr","firstName":"John","middleName":"Doe","lastName":"Williams"],
			"referringphysician":["id":"1002","prefix":"Dr","firstName":"Cris","middleName":"Rodey","lastName":"Doe"],"status":["New"],
			"assignedUser":["id":"","prefix":"","firstName":"","middleName":"","lastName":""],"studyUid":"1.2.276.0.7230010.3.1.2.0.1201.1493896280.258453",
			"qaUser":["id":"","prefix":"","firstName":"","middleName":"","lastName":""],
			"attendingUser":["id":"","prefix":"","firstName":"","middleName":"","lastName":""]]

	]

	static def expectedStudies_validRecord = [
		results:[
			"studyId":76000000090026,"studyNo":"iViz Study 6","deleted":"N","studyType":"","date":"2017-05-04 16:27:19",
			"patient":["id":"NMR-4455663","mrnno":"NMR-4455663","prefix":"","firstName":"Hannah","middleName":"","lastName":"Adams"],"modality":["US"],"examType":"Unspecified","tags":[],
			"requestingphysician":["id":"","prefix":"","firstName":"","middleName":"","lastName":""],
			"referringphysician":["id":"","prefix":"","firstName":"","middleName":"","lastName":""],"status":["New"],"assignedUser":["id":"","prefix":"","firstName":"","middleName":"","lastName":""],
			"studyUid":"1.2.276.0.7230010.3.1.2.0.1201.1493895397.258448","qaUser":["id":"","prefix":"","firstName":"","middleName":"","lastName":""],
			"attendingUser":["id":"","prefix":"","firstName":"","middleName":"","lastName":""]]
	]
	static def expectedStudies_Anonymized24 = [
		results:[
			"studyId":76000000090024,"studyNo":"","deleted":"N","studyType":"","date":"2017-05-04 16:42:01",
			"patient":["id":"","mrnno":"","prefix":"","firstName":"","middleName":"","lastName":"Anonymized"],
			"modality":["US"],"examType":"Unspecified","tags":[],
			"requestingphysician":["id":"1001","prefix":"Dr","firstName":"John","middleName":"Doe","lastName":"Williams"],
			"referringphysician":["id":"1002","prefix":"Dr","firstName":"Cris","middleName":"Rodey","lastName":"Doe"],"status":["New"],
			"assignedUser":["id":"","prefix":"","firstName":"","middleName":"","lastName":""],"studyUid":"1.2.276.0.7230010.3.1.2.0.1201.1493896280.258453",
			"qaUser":["id":"","prefix":"","firstName":"","middleName":"","lastName":""],
			"attendingUser":["id":"","prefix":"","firstName":"","middleName":"","lastName":""]]

	]
	
	static def expectedStudies_Anonymous25 = [
		"results":[
			"studyId":76000000090025,"studyNo":"","deleted":"N","studyType":"","date":"2017-05-04 16:42:01",
			"patient":["id":"","mrnno":"","prefix":"","firstName":"","middleName":"","lastName":"Anonymized"],"modality":["US"],
			"examType":"Unspecified","tags":[],
			"requestingphysician":["id":"1001","prefix":"Dr","firstName":"John","middleName":"Doe","lastName":"Williams"],
			"referringphysician":["id":"1002","prefix":"Dr","firstName":"Cris","middleName":"Rodey","lastName":"Doe"],"status":["New"],
			"assignedUser":["id":"","prefix":"","firstName":"","middleName":"","lastName":""],"studyUid":"1.2.276.0.7230010.3.1.2.0.1201.1493896280.258453",
			"qaUser":["id":"","prefix":"","firstName":"","middleName":"","lastName":""],
			"attendingUser":["id":"","prefix":"","firstName":"","middleName":"","lastName":""]]
	]


	static def testData1 = [
		[
			patient:[id:'UNK76000000010016',dob:'', firstName:'', gender:'Unknown', lastName:'Anonymized', middleName:'', mrnno:'UNK76000000010016', prefix:''],
			assignedUser:[[firstName:'', id:'', lastName:'', middleName:'', prefix:'']],
			attendingUser:[[firstName:'', id:'', lastName:'', middleName:'', prefix:'']],
			date:'Jan-31-2017 11:24:37', deleted:'N', department:[null],
			examType:[[[examtype:'Unspecified']]],height:null, modality:['US'],
			referringphysician:[firstName:'', id:'', lastName:'', middleName:'', prefix:''],
			requestingphysician:[firstName:'', id:'', lastName:'', middleName:'', prefix:''],
			objectId:[[seriesUid:'1.2.840.113619.2.21.24680000',sopUid:'1.20.543.35412.651',frameCount:10]],
			status:['New'], studyId:76000000000001, studyNo:null, studyType:'',
			studyUid:'999.999.3859744', tags:[null], weight:null,
			Images:1, age:null
		]
	]

	static def testData2 = [
		[
			studyId:76000000000001,modality:['US'],studyType:'Clinical',tags:['tumor'],
			status: ['Assigned'],
			examType:[[[id: 10001,examtype: "Cardiac",examtypeProgress: "pending"]], [[id: 10002,examtype: "Thoracic",examtypeProgress: "signed"]]]]
	]


	static def testData3 = [
		[
			studyId:76000000000001,modality:['US'],studyType:'Clinical',tags:['tumor'],
			status: ['New'],
			examType:[[[id: 10001,examtype: "Cardiac",examtypeProgress: "new"]], [[id: 10002,examtype: "Thoracic",examtypeProgress: "new"]]]]
	]


	static def id = [2001, 34532]



	static def expectedStatus = [200, 404]

	static def reAssignResp = [
		"prefix": "Dr",
		"firstName": "John",
		"middleName": "",
		"lastName": "Williams"
	]
	static def reAssignRes = [
		"prefix": "Dr",
		"firstName": "Cris",
		"middleName": "",
		"lastName": "Renella"
	]
	static def eventData = [event:"UserAssign"]
	static def eventType =[type:"study"]

	static def userAssignedStatus = [status:"true"]

	static def qaAssigned = [
		"studyId":76000000000001,
		"userid":1001
	]

	static def updatestudyType = [[
			"wrk1":[
				"examoverview":[
					"type":"Diagnostic",
					"category":"Resuscitative",
					"exam":"Initial exam"
				]
			]]]
	static def updatestudyTypeNew = [[
		"wrk1":[
			"examoverview":[
				"type":"Test",
				"category":"Resuscitative",
				"exam":"Initial exam"
			]
		]]]

	static def updatestudyType2 = [[
			"wrk1":[
				"examoverview":[
					"type":"",
					"category":"",
					"exam":""
				]
			]]]

	static def request = [patientName:'',searchExamType:'',pocName:'',searchStatus:'']
	static def request1 = [patientName:'john',searchExamType:'Ocular',pocName:'Will',searchStatus:'New']

	static def anonymizedRequest = [patientName:'Anonymized',searchExamType:'',pocName:'',searchStatus:'']
	static def request_validRecord= [patientName:'Hannah',searchExamType:'',pocName:'',searchStatus:'']

	static def statusList = [['id':4001,'name':'New'],['id':4002,'name':'Assigned'],['id':4003,'name':'Pending'],
		['id':4004,'name':'Signed'],['id':4005,'name':'QAUnassigned'],['id':4006,'name':'QAAssigned'],
		['id':4007,'name':'QAInProgress'],['id':4008,'name':'Submitted'],['id':4009,'name':'Attested'],['id':4010,'name':'SubmittedForAttestation']]
}

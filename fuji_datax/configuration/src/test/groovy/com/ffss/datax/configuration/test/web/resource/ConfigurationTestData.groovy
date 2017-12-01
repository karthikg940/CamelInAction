package com.ffss.datax.configuration.test.web.resource

class ConfigurationTestData {
	static  stat=200
	static stat1=201
	static Cardiac ='Cardiac'
	static Thoracic ='Thoracic'
	static num1 = [1000, 1001, 1002, 1003, 1004, 1005, 1006]
	static num7= [7002, 7003]
	static num9=[9001, 9002]
	static tags = [11001, 11002, 11003, 11004, 11005, 11006, 11007]
	static token1 = 'eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MTAwMSwidXNlck5hbWUiOiJqb2hudyJ9.N9NB9ioZUSOhtiSziPA10h4PpjOlzBV0ztqqvcuaOp9RqxkRUa3XvvX7GrTPQTy4vxuNd59ve7OBq-dVcPP65g'
	static token2 = 'eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MTAwMiwidXNlck5hbWUiOiJjcmlzcmVuIn0.d_6oSe5guKmDi_K5V8LIS3L_UsuhrKkrfm9nc_WuDyOoK-mLhVX8WHss3fQ33G2Ek_qTRqwiWmmdl5RUrojOxQ'

	static GetCptCodes=[results :[
			[id: num1[0], code: '99201'],
			[id: num1[1], code: '99217'],
			[id: num1[2], code: '00400'],
			[id: num1[3],code: '10040'],
			[id: num1[4],code: '76499'],
			[id: num1[5], code: '90399'],
			[ id: num1[6],code: '96571']
		]
	]
	static GetTemplateData=[results :[
			[id: 7001, name: Cardiac],
			[id: num7[0],  name: Thoracic],
			[id: num7[1],  name: 'Ocular'],
			[id: 7004,name: 'Sample1'],
			[id: 7005,name: 'Sample2'],
			[id: 7006, name: 'Sample3'],
			[ id: 7007,name: 'Sample4'],
			[ id: 7008,name: 'Sample5'],
			[ id: 7009,name: 'Sample6']
		]
	]
	static saveExamTypeData =[examTypeName:'Test1',examTypeDesc: 'Test2Test2Test2',examTypeAlias: ['Test1', 'Test2'], tagNames: ['test1', 'test2'],
		manCptCode:[[id:num1[0]], [id:num1[1]]],
		optCptCode:[[id:num1[3]], [id:num1[2]]],
		worksheets:[[id:'7002']]]

	static updateExamTypeData =[examTypeDesc: 'Test2Test2Test2',examTypeAlias: ['req', 'res'], tagNames: ['test3', 'test4'],
		manCptCode:[[id:num1[1]]],
		optCptCode:[[id:num1[3]], [id:num1[1]]],
		worksheets:[[id:num7[1]]]]
	static GetExamtypesTest= [
		results: [
			[id: num9[0],examTypeDesc: Cardiac,examTypeDetailDesc: 'Cardiology',isEnabled: 'Y',isDeleted:'N'],
			[id: num9[1],examTypeDesc: Thoracic,examTypeDetailDesc: 'Thoracic Study',isEnabled: 'Y',isDeleted: 'N']
		]]
	static examtypeEnableTestData = [status:true]
	static newPersonalTag = [
		[
			  'name' : 'Cardiac_personal'
		]
		]
	
	static newPersonalTagWithId = [
	[
			'id' : 203,
			'name' : 'Cardiac_personal',
			'type' : 'personal'
		]
		]
	static user_X_personalTags = [
		[
				'id' : 203,
				'name' : 'Cardiac_personal',
				'type' : 'personal'
			]
			]
	static user_Y_personalTags = [['id':201, 'name':'Thoracic', 'type':'personal']]
	static requestBody = [
		[
			 "id":203,
			 "name":"CardiacTest",
			 "type": "personal"
		]
		]
	
	static tagsForExamType = [
		[
			'id': 11001,
			'tag': 'Block'
		],
		[
			'id': tags[1],
			'tag': 'Tumor'
		],
		[
			'id': tags[2],
			'tag': 'CAD'
		],
		[
			'id': tags[3],
			'tag': 'Valves'
		],
		[
			'id': tags[4],
			'tag': 'Emphysema'
		],
		[
			'id': tags[5],
			'tag': 'Artery'
		],
		[
			'id': tags[6],
			'tag': 'Cardiomyopathies'
		]
	]
	static tagsForExamTypeW = [
		[
			'id': tags[0],
			'tag': 'Block'
		],
		[
			'id': tags[0],
			'tag': 'Block'
		],
		[
			'id': tags[2],
			'tag': 'CAD'
		],
		[
			'id': tags[3],
			'tag': 'Valves'
		],
		[
			'id': tags[4],
			'tag': 'Emphysema'
		],
		[
			'id': tags[5],
			'tag': 'Artery'
		],
		[
			'id': tags[6],
			'tag': 'Cardiomyopathies'
		]
	]
}
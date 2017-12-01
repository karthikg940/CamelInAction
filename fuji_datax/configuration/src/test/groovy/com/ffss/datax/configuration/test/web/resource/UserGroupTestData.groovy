package com.ffss.datax.configuration.test.web.resource

class UserGroupTestData {
	static def userProfile = [prefix:'Dr',firstName:'John',lastName:'Williams']

	static def token = 'eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MTAwMSwidXNlck5hbWUiOiJqb2hudyJ9.N9NB9ioZUSOhtiSziPA10h4PpjOlzBV0ztqqvcuaOp9RqxkRUa3XvvX7GrTPQTy4vxuNd59ve7OBq-dVcPP65g'

	static def token1 = 'eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MTAwMSwidXNlck5hbWUiOiJqb2hudyJ9.N9NB9ioZUSOhtiSziPA10h4PpjOlzBV0ztqqvcuaOp9RqxkRUa3XvvX7GrTPQTy4vxuNd59ve7OBq-dVcPP65g'

	static def addUserGroupTestData1 =
	[ 'groupName': 'Doctors', 'description': 'This group is for doctors','users': [[
				'id': 1001,
				'text': 'John Williams'
			]],'roles':[['id':6001]],'permissions':[['id':6001]],'org':[['id':1]]]

	static def updateUserGroupData=
	['groupName': 'Doctorslist','description': 'This is  updated doctors', 'users': [[
				'id': 1002,
				'text': 'Cris Renella'
			]],'roles':[['id':6001]],'permissions':[['id':6001]],'org':[['id':760001]]]

	static def updateUserinGroup=
	['groupName': 'Doctorslist','description': 'This is  updated doctors', 'users': [],'roles':[['id':6001]],'permissions':[['id':6001]],'org':[['id':760001]]]

	static def updatePermissioninGroup=
	['groupName': 'Doctorslist','description': 'This is  updated doctors', 'users': [],'roles':[['id':6001]],'permissions':[],'org':[['id':760001]]]
	
	static def updateOrginGroup=
	['groupName': 'Doctorslist','description': 'This is  updated doctors', 'users': [],'roles':[['id':6001]],'permissions':[],'org':[]]
	
	static def getUserGroupTestData1=
	[results:[
			[description:'This group is for doctors', groupName:'Doctors', userGroupId:1001, users:[]],
			[description:'This group is for students', groupName:'Students', userGroupId:1002, users:[]],
			[description:'This new', groupName:'new', userGroupId:1014, users:[[id:1001, userName:'johnw']]]
		]]
}





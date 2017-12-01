package com.ffss.datax.configuration.test.web.resource

class UserProfileTestData {
	static def userProfile = [prefix:'Dr',firstName:'John',lastName:'Williams']

	static token = 'eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MTAwMSwidXNlck5hbWUiOiJqb2hudyJ9.N9NB9ioZUSOhtiSziPA10h4PpjOlzBV0ztqqvcuaOp9RqxkRUa3XvvX7GrTPQTy4vxuNd59ve7OBq-dVcPP65g'
	static token1 = 'eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MTAwMSwidXNlck5hbWUiOiJqb2hudyJ9.N9NB9ioZUSOhtiSziPA10h4PpjOlzBV0ztqqvcuaOp9RqxkRUa3XvvX7GrTPQTy4vxuNd59ve7OBq-dVcPP65g'
	static token2 = 'eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MTAwMSwidXNlck5hbWUiOiJqb2hudyJ9.N9NB9ioZUSOhtiSziPA10h4PpjOlzBV0ztqqvcuaOp9RqxkRUa3XvvX7GrTPQTy4vxuNd59ve7OBq-dVcPP65g'

	static notValideToken = 'eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MTAwNiwidXNlck5hbWUiOiJia3VtYXIifQ.CCXeNnXhWYlgDLX5E7n6cvauAAti7HfLb9DEEs_pU39TRx_X7bN2IZnMqv0idsT0DZnRzAcyEOY6raNRprnDsQ'
	static addUserTestData1 =
	[ title: 'Technician', firstName: 'Victor', lastName:'Cruz', userName:'victorc',
		phone: '123 456 7891234', email:'victorc@sonosite.com', status :'Y',activePrivilegeList:[['id':1001]],activeRoleList:[['id':1001]],activeGroupList:[['id':1001]],activeOrgList:[['id':2]]]

	static userListData=[
		results:[
			[email:'cris.renella@sonosite.com', firstName: 'Cris',lastName:'Renella', phoneNo:123456789,title:'title1',userName: 'crisren'],
			[email:'cris.renella@sonosite.com', firstName: 'Sam', lastName:'Peter', phoneNo:123456780, title:'Physician',userName:'psam']
		]
	]
	static addUserTestDataBadRequest =
	[ title: 'Technician', firstName: 'Victor', lastName:'Cruz', userName:'victorc',
		phone: '123 456 7891234', email:'victorc@sonosite.com', status :'Y',activePrivilegeList:[['id':1001]],activeRoleList:[['id':1001]],activeOrgList:[['id':1], ['id':1]]]
	
	
	static addUserTestData2 =
	[ title: 'Technician', firstName: 'Victor', lastName:'Cruz', userName:'victoria',
		phone: '123 456 7891234', email:'victorc@sonosite.com', status :'Y',activePrivilegeList:[['id':1001]],activeRoleList:[['id':1001]],activeGroupList:[['id':1001]],activeOrgList:[['id':2]]]

	
	
	static updateData =[ title: 'Technician', firstName: 'VictorCharles', lastName:'Cruz', userName:'victoria',
		phone: '123 456 7891234', email:'victorc@sonosite.com', status :'Y',activePrivilegeList:[['id':1001]],activeRoleList:[['id':1001]],activeGroupList:[['id':1001]],activeOrgList:[['id':1]]]


	static userId = [1001, 10055, 1001]

	static userActiveDeactiveTestData = [[status:'false'], [status:'false'], [status:'true']]

	static userStatus = [200, 404, 200]

	static userData1 =
	[results:[
			[email:'cris.renella@sonosite.com', firstName: 'Cris',lastName:'Renella', phoneNo:123456789,title:'title1',userName: 'crisren'],
			[email:'cris.renella@sonosite.com', firstName: 'john',lastName:'Renella', phoneNo:123456789,title:'title1',userName: 'johnw'],
			[email:'cris.renella@sonosite.com', firstName: 'sam',lastName:'Renella', phoneNo:123456789,title:'title1',userName: 'psam']
		]]

	static userData2 =
	[results:[
			[email:'cris.renella@sonosite.com', firstName: 'new',lastName:'Renella', phoneNo:123456789,title:'title1',userName: 'new'],
			[email:'cris.renella@sonosite.com', firstName: 'renu',lastName:'Renella', phoneNo:123456789,title:'title1',userName: 'welcome'],
		]]
	
	static userData3 =
	[results:[
		[email:'cris.renella@sonosite.com', firstName: 'john',lastName:'Renella', phoneNo:123456789,title:'title1',userName: 'test'],
	]]
}





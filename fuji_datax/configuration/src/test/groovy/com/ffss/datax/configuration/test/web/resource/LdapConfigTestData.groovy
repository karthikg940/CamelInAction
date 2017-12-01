package com.ffss.datax.configuration.test.web.resource

class LdapConfigTestData {
	static token1 = 'eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MTAwMSwidXNlck5hbWUiOiJqb2hudyJ9.N9NB9ioZUSOhtiSziPA10h4PpjOlzBV0ztqqvcuaOp9RqxkRUa3XvvX7GrTPQTy4vxuNd59ve7OBq-dVcPP65g'
	static def port = 10389
	static def directoryType ='Active Directory'
	static def remoteServer ='localhost'
	static def searchRoot ='dc=fujifilm,dc=com'
	static def accessGroup ='Admin'
	static userDn ='cn={0}'

	static  data=[
		directoryType:directoryType,
		remoteServer:remoteServer,
		accessGroup:accessGroup,
		searchRoot:searchRoot,
		ldapPort:port,
		userDn:userDn,
		manageDn:'managerDn',
		managePassword:'password']

	static updatedata=[
		directoryType:directoryType,
		remoteServer:remoteServer,
		accessGroup:'ItAdmin',
		searchRoot:searchRoot,
		ldapPort:port,
		userDn:userDn,
		manageDn:'managerDn1',
		managePassword:'password1']

	static  testConnData=[
		[
			directoryType:directoryType,
			remoteServer:remoteServer,
			accessGroup:accessGroup,
			searchRoot:searchRoot,
			ldapPort:port,
			userDn:userDn,
			manageDn:'managerDn2',
			managePassword:'password2',
			itAdminUserName:'johnw'],
		[
			directoryType:directoryType,
			remoteServer:remoteServer,
			accessGroup:accessGroup,
			searchRoot:searchRoot,
			ldapPort:port,
			userDn:userDn,
			manageDn:'managerDn1',
			managePassword:'password',
			itAdminUserName:"xyz"],
	]

	static testConnDataRes=[
		isValidConn:true
	]

	static testConnDataFailRes=[
		isValidConn:false
	]

	static stat=200
}




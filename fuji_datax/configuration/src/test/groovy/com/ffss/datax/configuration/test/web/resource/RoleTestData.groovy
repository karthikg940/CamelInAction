package com.ffss.datax.configuration.test.web.resource

class RoleTestData {
	static def token = 'eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MTAwMSwidXNlck5hbWUiOiJqb2hudyJ9.N9NB9ioZUSOhtiSziPA10h4PpjOlzBV0ztqqvcuaOp9RqxkRUa3XvvX7GrTPQTy4vxuNd59ve7OBq-dVcPP65g'
	static badRequest = 400
	static created=201
	static addRoleData = [
		'roleName': 'Admin1',
		'description': 'administrator',
		'permission':[['id':6001], ['id':6004]],
		'organization' :[['id':1]]]

	static addRoleData1 = [
		'roleName': 'itadmin',
		'description': 'itadministrator',
		'permission':[['id':6002], ['id':6003]]]
	
	static updateDataDuplicate = [
		'roleName': 'itAdmin1',
		'description': 'role1',
		'permission':[['id':6005], ['id':6005]]]
	static updateData2 = [
		'roleName': 'itAdmin',
		'description': 'role4',
		'permission':[]]
	static permissionData = [
		'permissionName': 'poc_assign_unassign',
		'description': 'Performing - Assign Or Unassign Self',
	]
	static OrgData = [
		'orgName': 'FMO - enterpriseorguln',
	]
	
}

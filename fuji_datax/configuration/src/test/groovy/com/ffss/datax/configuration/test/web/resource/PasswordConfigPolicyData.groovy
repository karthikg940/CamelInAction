package com.ffss.datax.configuration.test.web.resource


class PasswordConfigPolicyData {

	static def token = 'eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MTAwMiwidXNlck5hbWUiOiJjcmlzcmVuIn0.d_6oSe5guKmDi_K5V8LIS3L_UsuhrKkrfm9nc_WuDyOoK-mLhVX8WHss3fQ33G2Ek_qTRqwiWmmdl5RUrojOxQ'

	static pwdPolicyData = [pwdminlen:1,sysgenpwd:'',userdfndpwdexp:'',accntlockmax:'',tmplock:'',pwdReuseRestriction:'']
	
	static pwdPolicyWrongData = [sysgenpwd:1,userdfndpwdexp:1,accntlockmax:'',tmplock:'',pwdregex:'regex',comments:'tezst']
}
//comments:'tezst',,pwdregex:'regex'
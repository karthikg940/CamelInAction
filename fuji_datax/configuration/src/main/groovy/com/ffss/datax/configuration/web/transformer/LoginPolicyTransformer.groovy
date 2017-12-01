package com.ffss.datax.configuration.web.transformer
import org.springframework.stereotype.Component

import com.ffss.datax.common.domain.configuration.OrgLoginConfigMap


@Component
class LoginPolicyTransformer {


	def loginPolicyTransform(List<OrgLoginConfigMap> loginPolicy){
		[results:transform(loginPolicy)]
	}

	def transform(List<OrgLoginConfigMap> loginPolicy){
		loginPolicy?.collect{
			[id:it.id,isDefault:it.isDefault,pwdminlen:it?it.passWordMinLen:'',sysgenpwd:it?it.generatedPwdExpiry:'',userdfndpwdexp:it?it.userDefinedPwdExpiry:'',
				pwdReuseRestriction:it?it.pwdReuseRestriction:'',accntlockmax:it?it.accountLockThreshold:'',tmplock:it?it.temporaryLock:'',
				isUppercase:it.isUppercase, isLowercase:it.isLowercase, isNumber:it.isNumber, isSplChar:it.isSplChar]
		}
	}
}


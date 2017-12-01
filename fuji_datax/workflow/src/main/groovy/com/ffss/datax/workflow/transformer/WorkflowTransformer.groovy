package com.ffss.datax.workflow.transformer
import org.springframework.stereotype.Component

import com.ffss.datax.common.domain.workflow.WorkflowTask


/**
 * The Class WorkflowTransformer.
 * @author Virtusa|Polaris
 */
@Component
class WorkflowTransformer {

	def userTransform(user){
		assigneduserTransform(user)
	}

	def assigneduserTransform(WorkflowTask user){
		user?user.collect{
			it.userTaskStage.collect{
				[id:it.user.id?it.user.id:'',
					prefix:it.user.prefix?it.user.prefix:'',
					firstName:it.user.firstName?it.user.firstName:'',
					middleName:it.user.middleName?it.user.middleName:'',
					lastName:it.user.lastName?it.user.lastName:'']
			}
		}.flatten():[
			[id:'',prefix:'',firstName:'',middleName:'',lastName:'']
		]
	}
}

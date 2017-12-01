package com.ffss.datax.analytics.web.transformer

import org.springframework.stereotype.Component

import com.ffss.datax.analytics.constants.AnalyticsConstants
import com.ffss.datax.common.constants.StudyStatusEnum

@Component
class DashboardTransformer {

	static widgetData = [
		[id:'mystudies',type:'My Studies',status:[
				[id:StudyStatusEnum.ASSIGNED.value,displayName:StudyStatusEnum.ASSIGNED.value],
				[id:StudyStatusEnum.PENDING.value,displayName:AnalyticsConstants.IN_PROGRESS_DISPLAYNAME],
				[id:StudyStatusEnum.SIGNED.value,displayName:StudyStatusEnum.SIGNED.value]
			]],
		[id:'allstudies',type:'All Studies',status:[
				[id:StudyStatusEnum.NEW.value,displayName:StudyStatusEnum.NEW.value],
				[id:StudyStatusEnum.ASSIGNED.value,displayName:StudyStatusEnum.ASSIGNED.value],
				[id:StudyStatusEnum.PENDING.value,displayName:AnalyticsConstants.IN_PROGRESS_DISPLAYNAME],
				[id:StudyStatusEnum.SIGNED.value,displayName:StudyStatusEnum.SIGNED.value],
				[id:StudyStatusEnum.QA_ASSIGNED.value,displayName:AnalyticsConstants.QA_ASSIGNED_DISPLAYNAME],
				[id:StudyStatusEnum.QA_INPROGRESS.value,displayName:AnalyticsConstants.QA_INPROGRESS_DISPLAYNAME],
				[id:StudyStatusEnum.QA_UNASSIGNED.value,displayName:AnalyticsConstants.QA_UN_ASSIGNED_DISPLAYNAME],
				[id:StudyStatusEnum.ATTESTED.value,displayName:StudyStatusEnum.ATTESTED.value],
				[id:StudyStatusEnum.SUBMITTED_FOR_ATTESTATION.value,displayName:AnalyticsConstants.SUBMITTED_FOR_ATTESTATION_DISPLAYNAME],
				[id:StudyStatusEnum.SUBMITTED.value,displayName:AnalyticsConstants.SUBMITTED_DISPLAYNAME]
			]],
		[id:'qastudies',type:'My QA Reviews',status:[
				[id:StudyStatusEnum.QA_ASSIGNED.value,displayName:AnalyticsConstants.QA_ASSIGNED_DISPLAYNAME],
				[id:StudyStatusEnum.QA_INPROGRESS.value,displayName:AnalyticsConstants.QA_INPROGRESS_DISPLAYNAME],
				[id:StudyStatusEnum.SUBMITTED.value,displayName:AnalyticsConstants.SUBMITTED_DISPLAYNAME]
			]]
	]

	def transform(studies,allstudies,qaStudies) {
		[results:[
				doTransform(widgetData[0].id,widgetData[0].type,widgetData[0].status,studies),
				doTransform(widgetData[1].id,widgetData[1].type,widgetData[1].status,allstudies),
				doTransform(widgetData[AnalyticsConstants.NUMERIC_2].id,widgetData[AnalyticsConstants.NUMERIC_2].type,widgetData[AnalyticsConstants.NUMERIC_2].status,qaStudies)
			]]
	}

	def doTransform(id,type,status,studies) {
		[id:id?id:'null',type:type?type:'null',total:status.collect{countByStatus(it,studies)}.sum(),status:status.displayName,
			value:status.collect{countByStatus(it,studies)}]
	}

	def countByStatus(status,studies) {
		studies.count{
			if(it.status){
				(it.status)?(it.status.name == status.id):[StudyStatusEnum.NEW.value]
			}else if(it.status == null && status.id == StudyStatusEnum.NEW.value){
				(it.status)?(it.status.name == status.id):[StudyStatusEnum.NEW.value]
			}
		}
	}
}
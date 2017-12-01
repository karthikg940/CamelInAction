package com.ffss.datax.configuration.web.transformer

import org.springframework.stereotype.Component

import com.ffss.datax.common.domain.configuration.CptCode
import com.ffss.datax.common.domain.configuration.ExamTypeCptCode
import com.ffss.datax.common.domain.configuration.ExamTypeDeviceMap
import com.ffss.datax.common.domain.configuration.ExamTypeMap
import com.ffss.datax.common.domain.configuration.TagsExamTypeMap
import com.ffss.datax.common.domain.worksheet.ExamWorksheetTemplate
import com.ffss.datax.common.domain.worksheet.WorksheetTemplate
/**
 * Transform the JSON output
 * @author Virtusa|Polaris
 *
 */
@Component
class ExamTypeListTransformer {

	def transformAll(examTypeMap) {
		[results:transform(examTypeMap)]
	}

	def transform(List<ExamTypeMap> examTypeMap) {
		examTypeMap.collect{
			[id:it.id,examTypeDesc:it.examTypeDesc,examTypeDetailDesc:it.examTypeDetailDesc,isEnabled:it.enabled,isDeleted:it.studyExamTypeMap?'Y':'N']
		}
	}
	def transformExamtypeCptcodes(examType,cptCodes){
		transformexam(examType,cptCodes)
	}
	def transformexam(ExamTypeMap examType,List<CptCode> cptCodes){
		[id:examType.id,examTypeName:examType.examTypeDesc,examTypeDesc:examType.examTypeDetailDesc,examTypeAlias:examType.aliasName?transformAlias(examType.aliasName):'',
			tagNames:examType.tags?transformTags(examType.tags):'',manCptCode:examType.mancptCode?transformManCptCode(examType.mancptCode):'',optCptCode:examType.optcptCode?transformOptCptCode(examType.optcptCode):'',
			worksheets:examType.examWorksheetTemplate?transformWorksheet(examType.examWorksheetTemplate):'', cptCodes:transformCpt(cptCodes)]
	}

	def transformCptCodes(CptCodes){
		[results:transformcodes(CptCodes)]
	}
	def transformcodes(List<CptCode> codes){
		codes?.collect{
			[id:it.id,code:it.cptCode]
		}
	}
	def transformWorksheetTemplates(templates){
		[results:transformTemplates(templates)]
	}

	def transformTemplates(List<WorksheetTemplate> templates){
		templates?.collect{
			[id:it.id,name:it.templateName]
		}
	}

	def transformAlias(List<ExamTypeDeviceMap> alias){
		alias?.collectMany{ [it.aliasName]
		}	}

	def transformTags(List<TagsExamTypeMap> tags){
		tags?.collectMany{ [it.tagDescription]}
	}

	def transformManCptCode(List<ExamTypeCptCode> mancptcode){
		def codes=[]

		mancptcode?.collect{
			if(it.isMandatory=='Y'){
				codes.add([id:it.cptcode.id,code:it.cptcode.cptCode])
			}
		}
		codes
	}

	def transformOptCptCode(List<ExamTypeCptCode> optcptcode){
		def codes=[]
		optcptcode?.collect{
			if(it.isMandatory=='N'){
				codes.add([id:it.cptcode.id,code:it.cptcode.cptCode])
			}
		}
		codes
	}

	def transformWorksheet(List<ExamWorksheetTemplate> worksheet){
		def worksheets=[]
		worksheet?.collect{
			if(it.worksheetTemplate.type=='Procedural'){
				worksheets.add([id:it.worksheetTemplate.id,name:it.worksheetTemplate.templateName])
			}
		}
		worksheets
	}


	def transformExam(ExamTypeMap retVal) {
		[status:retVal.enabled]
	}

	def transformCpt(List<CptCode> cptCodes){
		def codes = []
		cptCodes?.each{
			codes.add([id:it.id,code:it.cptCode])
		}
		codes
	}

	def transformTagsForExamType(List<TagsExamTypeMap> tags){
		def tagList=[]

		tags?.collect{
			tagList.add([id:it.tagId,name:it.tagDescription,,type:'global'])
		}
		tagList
	}


	def transformExamTypes(examTypeMap) {
		[results:transformExamTypesDetail(examTypeMap)]
	}
	def transformExamTypesDetail(List<ExamTypeMap> examTypeMap) {
		examTypeMap.collect{
			[id:it.id,examTypeDesc:it.examTypeDesc]
		}
	}
}

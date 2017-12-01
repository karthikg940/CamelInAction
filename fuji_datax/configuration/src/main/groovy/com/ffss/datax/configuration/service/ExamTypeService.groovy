package com.ffss.datax.configuration.service

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

import com.ffss.datax.common.constants.Constants
import com.ffss.datax.common.domain.configuration.ExamTypeCptCode
import com.ffss.datax.common.domain.configuration.ExamTypeDeviceMap
import com.ffss.datax.common.domain.configuration.ExamTypeMap
import com.ffss.datax.common.domain.configuration.TagsExamTypeMap
import com.ffss.datax.configuration.repository.CptCodeRepository
import com.ffss.datax.configuration.repository.ExamTypeCptCodeRepository
import com.ffss.datax.configuration.repository.ExamTypeDeviceMapRepository
import com.ffss.datax.configuration.repository.ExamTypeRepository
import com.ffss.datax.configuration.repository.ExamWorksheetTemplateRepository
import com.ffss.datax.configuration.repository.StudyExamTypeMapRepository
import com.ffss.datax.configuration.repository.TagsRepository
import com.ffss.datax.configuration.repository.WorksheetTemplateRepository


/**
 * The Class ExamType Servcie.
 * @author Virtusa|Polaris
 */
@Service
class ExamTypeService {

	@Autowired
	ExamTypeRepository examTypeRepository

	@Autowired
	ExamTypeDeviceMapRepository examTypeDeviceMapRepository

	@Autowired
	TagsRepository tagsRepository

	@Autowired
	CptCodeRepository cptCodeRepository

	@Autowired
	ExamTypeCptCodeRepository examTypeCptCodeRepository

	@Autowired
	ExamWorksheetTemplateRepository examWorksheetTemplateRepository

	@Autowired
	WorksheetTemplateRepository worksheetTemplateRepository

	@Autowired
	StudyExamTypeMapRepository studyExamTypeMapRepository

	def aliasNames
	def tags
	def worksheet
	def manCptCodes
	def optCptCodes

	/**
	 * Method to save the exam types.
	 *
	 * @param requestObj - the requestObj contains the information which needs to save
	 * @return the new examtype
	 */
	@Transactional
	def saveExamType(requestObj){
		def examType = examTypeRepository.save(
				new ExamTypeMap(examTypeDesc:requestObj.examTypeName,
				examTypeDetailDesc:requestObj.examTypeDesc,
				deleted:Constants.FLAG_NO,
				enabled:Constants.FLAG_YES))
		//This method is to add the alias names for newly created examtype
		addAliasName(requestObj,examType)

		//Method to add the tags for examtype
		addTags(requestObj,examType)

		//Method to add the man cptcodes for examtype
		addManCptCodes(requestObj,examType)

		//Method to add the opt cpt codes for examtype
		addOptCptCodes(requestObj,examType)

		//Method to add the worksheets for examtype
		addWorksheet(requestObj)

		if(aliasNames){
			examType.aliasName = aliasNames
		}
		if(tags){
			examType.tags = tags
		}
		if(manCptCodes){
			examType.mancptCode = manCptCodes
		}
		if(optCptCodes){
			examType.mancptCode = optCptCodes
		}
		if(worksheet){
			examType.worksheetTemplate = worksheet
		}
		examTypeRepository.save(examType)
	}

	/**
	 *  Create and Adds the alias name to the examtypes.
	 * @param requestObj 
	 * @param examType
	 * @return the alias names
	 */
	def addAliasName(requestObj,examType){
		aliasNames=[]
		requestObj.examTypeAlias?.each{
			def aliasName= examTypeDeviceMapRepository.save(new ExamTypeDeviceMap(
					examTypeMap:examTypeRepository.findOne(examType.id.asType(Long)),
					aliasName:it))
			aliasNames.add(aliasName)
		}
		aliasNames
	}

	/**
	 *  Create and Adds the tags for examtypes.
	 *
	 * @param requestObj 
	 * @param examType
	 * @return the tags
	 */
	def addTags(requestObj,examType){
		tags=[]
		requestObj.tagNames?.each{
			def tag=tagsRepository.save(new TagsExamTypeMap(
					examTypeMap:examTypeRepository.findOne(examType.id.asType(Long)),
					tagDescription:it))
			tags.add(tag)
		}
		tags
	}

	/**
	 * Create and  Adds the man cpt codes for examtype.
	 *
	 * @param requestObj
	 * @param examType
	 * @return the mancodes
	 */
	def addManCptCodes(requestObj,examType){
		manCptCodes=[]
		requestObj.manCptCode?.each{
			def cptCode=examTypeCptCodeRepository.save(new ExamTypeCptCode(
					examTypeMap:examTypeRepository.findOne(examType.id.asType(Long)),
					cptcode:cptCodeRepository.findOne(it.id.asType(Long)),
					isMandatory:Constants.FLAG_YES))
			manCptCodes.add(cptCode)
		}
		manCptCodes
	}

	/**
	 *  Create and Adds the opt cpt codes to examtype.
	 *
	 * @param requestObj
	 * @param examType
	 * @return the optcodes
	 */
	def addOptCptCodes(requestObj, examType){
		optCptCodes=[]
		requestObj.optCptCode?.each{
			def optCode=examTypeCptCodeRepository.save(new ExamTypeCptCode(
					examTypeMap:examTypeRepository.findOne(examType.id.asType(Long)),
					cptcode:cptCodeRepository.findOne(it.id.asType(Long)),
					isMandatory:Constants.FLAG_NO))
			optCptCodes.add(optCode)
		}
		optCptCodes
	}

	/**
	 * Adds the worksheet templates to examtype.
	 *
	 * @param requestObj
	 * @return the worksheets
	 */
	def addWorksheet(requestObj){
		worksheet=[]
		requestObj.worksheets?.each{
			def selectTemplate = worksheetTemplateRepository.findOne(it.id.asType(Long))
			selectTemplate.type = Constants.PROCEDURAL
			worksheetTemplateRepository.save(selectTemplate)
			worksheet.add(selectTemplate)
		}
		worksheet
	}


	/**
	 * Method to get the exam type by Id
	 *
	 * @param examTypeId - the exam type id
	 * @return the exam type
	 */
	def getExamType(examTypeId){
		examTypeRepository.findOne(examTypeId)
	}

	/**
	 * Gets the cpt codes.
	 *
	 * @return the cpt codes
	 */
	def findCptCodesList(){
		cptCodeRepository.findAll()
	}

	/**
	 * Gets the templates.
	 *
	 * @return the templates
	 */
	def findTemplates(){
		def templates=worksheetTemplateRepository.findProceduralTypes()
		templates
	}

	/**
	 * Ifexamtype name present.
	 *
	 * @param examtypeName the examtype name
	 * @return the java.lang. object
	 */
	def ifexamtypeNamePresent(examtypeName) {
		examTypeRepository.findByexamtypeName(examtypeName) != null
	}

	/**
	 * Update exam type by id.
	 *
	 * @param id - examtype id
	 * @param requestObj - the requestObj contains the information which needs to be update 
	 * @return the examtype
	 */
	@Transactional
	def updateExamType(id,requestObj){
		def existingExamtype=examTypeRepository.findOne(id)
		existingExamtype.examTypeDetailDesc = requestObj.examTypeDesc?requestObj.examTypeDesc:''

		//Method to update the alias names for examtype
		removeExamtypeDeviceMap(id,existingExamtype,requestObj)

		//Method to update the tags for examtype
		removeTags(id,existingExamtype,requestObj)

		//Method to update the man cptcodes for examtype
		removeManCptCodes(id,existingExamtype,requestObj)

		//Method to update the optcptcodes for examtype
		removeOptCptCodes(id,existingExamtype,requestObj)

		//Method to update the worksheettemplates for examtype
		addWorksheet(requestObj)

		if(requestObj){
			existingExamtype.worksheetTemplate =[]
			examTypeRepository.save(existingExamtype)

			existingExamtype.worksheetTemplate = worksheet
			examTypeRepository.save(existingExamtype)
		}

		examTypeRepository.save(existingExamtype)
	}

	/**
	 * Method to update alias names of examtype by examtype id
	 * @param id - examtype id
	 * @param existingExamtype
	 * @param requestObj
	 * @return
	 */
	def removeExamtypeDeviceMap(id,existingExamtype,requestObj){
		def alias=examTypeDeviceMapRepository.removeAlias(id.asType(Long))
		alias?.each{
			examTypeDeviceMapRepository.delete(it.id.asType(Long))
		}
		existingExamtype.aliasName = []
		examTypeRepository.save(existingExamtype)

		//To add the alias names for examtype
		def newAlias = addAliasName(requestObj,existingExamtype)
		existingExamtype.aliasName = newAlias
		examTypeRepository.save(existingExamtype)
	}

	/**
	 * Method to update tags of examtype by examtype id
	 * @param id - examtype id
	 * @param existingExamtype
	 * @param requestObj
	 * @return
	 */
	def removeTags(id,existingExamtype,requestObj){
		// TODO: Later to revisited to implement delete tags functionality
		def reqTags =[],currentTag=[],tags = []
		reqTags = requestObj.tagNames
		def existingTags=tagsRepository.getTagsForExam(id.asType(Long))
		existingTags.each{
			def tagexp = it.tagDescription
			currentTag.add(tagexp)
		}
		tags = reqTags - currentTag
		//To add the new tags for examtype
		tags.each{
			tagsRepository.save(new TagsExamTypeMap(
					examTypeMap:examTypeRepository.findOne(existingExamtype.id.asType(Long)),tagDescription:it))
		}
		examTypeRepository.save(existingExamtype)

	}

	/**
	 * Method to update mancptcodes of examtype by examtype id
	 * @param id
	 * @param existingExamtype
	 * @param requestObj
	 * @return
	 */
	def removeManCptCodes(id,existingExamtype,requestObj){
		def existingManCptCodes = examTypeCptCodeRepository.removemanCptCodes(id.asType(Long))
		existingManCptCodes?.each{
			examTypeCptCodeRepository.delete(it.id.asType(Long))
		}

		existingExamtype.mancptCode = []
		examTypeRepository.save(existingExamtype)
		//To add the new mancptcodes for examtype
		def newManCodes = addManCptCodes(requestObj,existingExamtype)
		existingExamtype.mancptCode = newManCodes
		examTypeRepository.save(existingExamtype)
	}

	/**
	 * Method to update optcptcodes of examtype by examtype id
	 * @param id
	 * @param existingExamtype
	 * @param requestObj
	 * @return
	 */
	def removeOptCptCodes(id,existingExamtype,requestObj){
		def existingOptCptCodes = examTypeCptCodeRepository.removeoptCptCodes(id.asType(Long))
		existingOptCptCodes?.each{
			examTypeCptCodeRepository.delete(it.id.asType(Long))
		}

		existingExamtype.optcptCode = []
		examTypeRepository.save(existingExamtype)

		//To add the new optcptcodes for examtype
		def newOptCodes = addOptCptCodes(requestObj,existingExamtype)
		existingExamtype.optcptCode = newOptCodes
		examTypeRepository.save(existingExamtype)
	}

	/**
	 * Method to enable or disable the examtype by examtype id
	 * @param examTypeId
	 * @param renderDetails
	 * @return
	 */
	@Transactional
	def updateStatus(examTypeId, renderDetails) {
		def examType = examTypeRepository.findOne(examTypeId)
		if(examType) {
			if(renderDetails.enable == false) {
				examType.enabled = flagNo
				examTypeRepository.save(examType)
			}
			else if(renderDetails.enable == true) {
				examType.enabled = flagYes
				examTypeRepository.save(examType)
			}
			examType
		}
	}
	/**
	 * Method to get the unused cptcodes for examtype
	 * @param examType
	 * @return
	 */
	def getUnusedCptCodes(examType) {
		def existingCptCodes = []
		def cptCodesForExamType = examTypeCptCodeRepository.findByExamType(examType.id.asType(Long))
		def cptCodes = cptCodeRepository.findAll()
		cptCodesForExamType.each{
			existingCptCodes.add(it.cptcode)
		}
		cptCodes - existingCptCodes
	}
	
	/**
	 * Method to get list of tags base don examtype Id
	 * @param id - exam type id
	 * @return
	 */
	def getTagsForExamType(id){
		tagsRepository.getTagsForExam(id)
	}

	/**
	 * Method to delete(soft) the examtype  by examtypeId if examtype is not associated with study
	 * @param examid
	 * @return
	 */
	@Transactional
	def deleteExamTypeById(examid){
		def studyExamtype = studyExamTypeMapRepository.findAssociatedExamType(examid.asType(Long))
		if(!studyExamtype){
			def studyExamMap = examTypeRepository.findOne(examid)
			studyExamMap.deleted= Constants.FLAG_YES
			examTypeRepository.save(studyExamMap)
			return studyExamMap
		}
		studyExamtype
	}

	/**
	 * Method to list of examtypes which are not deleted
	 * @return
	 */
	def findAll() {
		examTypeRepository.findPresentExamType()
	}
}

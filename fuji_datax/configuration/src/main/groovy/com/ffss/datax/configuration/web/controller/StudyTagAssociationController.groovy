package com.ffss.datax.configuration.web.controller

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.RestController

import com.ffss.datax.configuration.service.StudyTagAssociationService
import com.ffss.datax.configuration.web.transformer.TagTransformer

/**
 * The Class TagController.
 * @author Virtusa|Polaris
 */
@RestController
@RequestMapping('/api/studyTag')
class StudyTagAssociationController {

	@Autowired
	StudyTagAssociationService studyTagAssociationService

	@Autowired
	TagTransformer tagTransformer

	/**
	 * API to save tags for study
	 * @param id - studyId
	 * @param tags
	 * @return
	 */
	@RequestMapping(value='/{studyId}/tag',method = RequestMethod.POST)
	def insertTags(@PathVariable('studyId') Long id,@RequestBody tags){
		def retVal = ResponseEntity.badRequest()
		if(studyTagAssociationService.validateTags(tags)){
			studyTagAssociationService.insertTagsForStudy(id,tags)?ResponseEntity.ok().build():retVal.build()
		}else
			retVal.build()
	}

	/**
	 * API to get list of tags for study
	 * @param id - studyId
	 * @return
	 */
	@RequestMapping(value='/{studyId}/tag',method = RequestMethod.GET)
	def getTagsForStudy(@PathVariable('studyId') Long id){
		tagTransformer.transformTagsForStudy(studyTagAssociationService.getTagsForStudy(id))
	}
	
	
	/**API to get list of all personal tags of an user
	 * @param userId
	 * @return
	 *//*
	@RequestMapping(value='/api/user/{userId}/tag', method=RequestMethod.GET)
	def getAllPersonalTags(@PathVariable('userId') Long userId){
		tagTransformer.transformTagsForUser(studyTagAssociationService.getTagsForUser(userId))
	}*/
	
}
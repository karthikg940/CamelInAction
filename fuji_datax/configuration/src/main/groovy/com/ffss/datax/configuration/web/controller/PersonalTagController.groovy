package com.ffss.datax.configuration.web.controller

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

import com.ffss.datax.common.constants.CustomErrorCode
import com.ffss.datax.configuration.service.PersonalTagService
import com.ffss.datax.configuration.web.transformer.PersonalTagTransformer

@RestController
@RequestMapping('/api/userTag')
class PersonalTagController {

	@Autowired
	PersonalTagService personalTagService

	@Autowired
	PersonalTagTransformer personalTagTransformer

	/**
	 * an API to return list of all matching tags based on input search key.
	 * @param userId
	 * @param srchText
	 * @return the list of all matching tags based on input search key.
	 */
	@RequestMapping(value='/{userId}/tag/searchTag',method=RequestMethod.GET)
	def searchTag(@RequestParam('searchText') String srchText){
		personalTagTransformer.transformSearchResp(personalTagService.searchTag(srchText))
	}

	/**
	 * an API to persist one or more personal tags for a logged-in user.
	 * @param userId
	 * @param tags
	 * 
	 */
	@RequestMapping(value='/{userId}/tag',method=RequestMethod.POST)
	def savePersonalTags(@PathVariable('userId') Long userId,@RequestBody tags){
		def retVal = ResponseEntity.badRequest()
		if(personalTagService.validateTags(tags)){
			personalTagService.saveNewPersonalTag(userId,tags)?ResponseEntity.ok().build():retVal.build()
		}else
			retVal.build()
	}

	/**
	 * an API to get list of all personal tags of an user
	 * @param userId
	 * @return list of personal tags of logged-in user.
	 */
	@RequestMapping(value='/{userId}/tag', method=RequestMethod.GET)
	def getAllPersonalTags(@PathVariable('userId') Long userId){
		personalTagTransformer.transformTags(personalTagService.getTagsForUser(userId))
	}

	/**
	 * an API to delete all personal tags of the logged-in user.
	 * @param userId
	 * 
	 */
	@RequestMapping(value='/{userId}/tag',method=RequestMethod.DELETE)
	def deleteAllPersonalTags(@PathVariable('userId') Long userId){
		personalTagService.deleteAllPersonalTags(userId) ? new ResponseEntity(CustomErrorCode.ER_204.value, HttpStatus.NO_CONTENT) : new ResponseEntity(CustomErrorCode.ER_404.value, HttpStatus.NOT_FOUND)
	}
}

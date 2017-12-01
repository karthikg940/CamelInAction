package com.ffss.datax.configuration.service

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

import com.ffss.datax.common.domain.tag.PersonalTag
import com.ffss.datax.configuration.repository.PersonalTagRepository
import com.ffss.datax.configuration.repository.UserRepository
import com.ffss.datax.security.util.SecurityUtil

@Service
class PersonalTagService {

	@Autowired
	PersonalTagRepository personalTagRepository

	@Autowired
	UserRepository userRepository

	def user
	def personalTagsList

	/**
	 * Method to save new personal tag of logged-in user.
	 * @param userId
	 * @param tags
	 * 
	 */
	@Transactional
	def saveNewPersonalTag(userId,tags){

		user = userRepository.findById(userId)
		if(user)
			populatePersonalTags(tags)
		else
			return false

		if(personalTagsList.size > 0){
			personalTagRepository.save(personalTagsList)
		}
	}

	/**
	 * Method to get list of all personal tags of an user
	 * @param user id
	 * @return list of all personal tags of logged-in user.
	 */
	def getTagsForUser(userId){
		personalTagRepository.getTagsForUser(userId)
	}

	/**
	 * Method to return list of all matching tags based on input search key.
	 * @param srchText
	 * @return
	 */
	def searchTag(srchText){
		personalTagRepository.searchTag(srchText,SecurityUtil.retrieveUserId())
	}

	/**
	 * Method to delete all personal tags of logged-in user.
	 * @param userId
	 * @return
	 */
	@Transactional
	def deleteAllPersonalTags(userId){
		personalTagRepository.deleteAllPersonalTags(userId)
	}

	/**
	 * Method to validate duplicate tag
	 * @param tags
	 * @Return boolean
	 */
	def validateTags(tags){
		def nonUnique = true
		if(tags) {
			nonUnique=tags.clone().unique().size()==tags.size()
		}
		nonUnique
	}

	/**
	 * Method to populate the list to be persisted with valid format of tags.
	 * @param tags
	 * @return
	 */
	def populatePersonalTags(tags){
		personalTagsList = []
		tags?.each{
			if(it.id){
				def tag=personalTagRepository.findOne(it.id.asType(Long))
				personalTagsList.add(tag)
			}
			else{
				def tagObj = new PersonalTag(name:it.name,userId:SecurityUtil.retrieveUserId())
				personalTagsList.add(tagObj)
			}
		}
	}
}

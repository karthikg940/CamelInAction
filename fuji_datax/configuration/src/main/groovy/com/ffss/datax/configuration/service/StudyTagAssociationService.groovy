package com.ffss.datax.configuration.service

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

import com.ffss.datax.configuration.repository.PersonalTagRepository
import com.ffss.datax.configuration.repository.StudyRepository
import com.ffss.datax.configuration.repository.TagsRepository
import com.ffss.datax.security.util.SecurityUtil


/**
 * The Class TagService.
 * @author Virtusa|Polaris
 */
@Service
class StudyTagAssociationService {

	@Autowired
	StudyRepository studyRepository

	@Autowired
	TagsRepository tagRepository

	@Autowired
	PersonalTagRepository personalTagRepository

	@Autowired
	PersonalTagService personalTagService

	def personalTagList
	def worksheetTagList
	def study

	/**
	 *Method to get list of tags for study by studyId 
	 * @param id - studyId
	 * @return
	 */
	def getTagsForStudy(id){
		studyRepository.findOne(id)
	}


	/**
	 * Method to get list of all personal tags of an user
	 * @param user id
	 * @return
	 */
	def getTagsForUser(userId){
		personalTagRepository.getTagsForUser(userId)
	}


	/**
	 *Method to  insert tags for study by studyId
	 * @param id - study id
	 * @param tags
	 */
	@Transactional
	def insertTagsForStudy(id,tags){
		study = studyRepository.findOne(id)
		if(study)
			addTags(tags)
		else
			return false
		study.tags = worksheetTagList
		study.personal_tags = personalTagList
		studyRepository.save(study)
	}

	/**
	 * duplicate tag validation
	 * @param tags
	 */
	def validateTags(tags){
		def nonUnique = true
		if(tags) {
			nonUnique=tags.clone().unique().size()==tags.size()
		}
		nonUnique
	}

	/**
	 * adding given tag to list
	 * @param tags
	 * @return
	 */
	def addTags(tags){
		worksheetTagList = []
		personalTagList= []
		tags?.each{
			if(it.id){
				def tag=tagRepository.findOne(it.id.asType(Long))
				if(tag == null){
					def personalTag = personalTagRepository.findOne(it.id.asType(Long))
					personalTagList.add(personalTag)
				}
				else{
					worksheetTagList.add(tag)
				}
			}
			else{
				def newTag = [['name':it.name]]
				def personalTagObj = personalTagService.saveNewPersonalTag(SecurityUtil.retrieveUserId(),newTag)
				personalTagList.add(personalTagObj[0])
			}
		}
	}
}

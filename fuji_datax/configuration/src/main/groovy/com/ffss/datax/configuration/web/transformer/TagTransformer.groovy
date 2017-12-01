package com.ffss.datax.configuration.web.transformer

import org.springframework.stereotype.Component

import com.ffss.datax.common.domain.tag.PersonalTag
import com.ffss.datax.security.util.SecurityUtil

/**
 * Transform the JSON output
 * @author Virtusa|Polaris
 *
 */
@Component
class TagTransformer {
	def personalTagType = "personal"
	def transformTagsForStudy(study){
		def tagList=[]
		def loggedUserId =SecurityUtil.retrieveUserId()
		study.tags?.collect{
			tagList.add([id:it.tagId,name:it.tagDescription,type:it.tagType])
		}
		study.personal_tags?.collect{
			if(it.userId == loggedUserId){
				tagList.add([id:it.id,name:it.name,type:personalTagType])
			}
		}
		tagList
	}

	def transformTagsForUser(List<PersonalTag> tags){
		def tagList=[]
		tags?.collect{
			tagList.add([id:it.id,name:it.name,type:personalTagType])
		}
		tagList
	}
}

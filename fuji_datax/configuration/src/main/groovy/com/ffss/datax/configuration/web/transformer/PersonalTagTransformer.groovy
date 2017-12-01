package com.ffss.datax.configuration.web.transformer

import org.springframework.stereotype.Component

import com.ffss.datax.common.domain.tag.PersonalTag

@Component
class PersonalTagTransformer {
	
	def personalTagType = "personal"
	/**
	 * Method to transform getAllPersonalTags() response to required field object.
	 * @param tags
	 * @return list of all tags with only required field values.
	 */
	def transformTags(List<PersonalTag> tags){
		
		def tagList=[]
		tags?.collect{
			tagList.add([id:it.id,name:it.name,type:personalTagType])
		}
		tagList
	}
	
	/**
	 * Method to transform searchTag() response to required field object response.
	 * @param tags
	 * @return response object with only required field values.
	 */
	def transformSearchResp(List<PersonalTag> tags){
		def searchedTagsList=[]
		tags?.collect{
			searchedTagsList.add([id:it.id,name:it.name,type:personalTagType])
		}
		searchedTagsList
	}
	
}

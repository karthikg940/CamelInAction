package com.ffss.datax.configuration.web.resource


import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

import com.ffss.datax.configuration.service.UserPreferenceService

@RestController
@RequestMapping('/api/user')
class UserPreferenceResource {

	@Autowired
	UserPreferenceService userPreferenceService;

	@RequestMapping(value='/{id}/preference',method=RequestMethod.GET)
	def getPreference(@PathVariable('id') Long id,@RequestParam('type') Long typeId){
		userPreferenceService.getPreference(id,typeId)
	}

	@RequestMapping(value="/{id}/preference",method=RequestMethod.POST)
	def updatePreference(@PathVariable("id") Long id, @RequestBody def data){
		def savedPreference = userPreferenceService.updatePreference(id, data)
		savedPreference?ResponseEntity.created(new URI("/api/user/${savedPreference.userId}/preference?type=${savedPreference.preferenceType.id}")).build():ResponseEntity.notFound().build()
	}
}

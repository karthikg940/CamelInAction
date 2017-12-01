package com.ffss.datax.integrationsystem.resource

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.RestController

import com.ffss.datax.integrationsystem.service.OrderReconciliationService

@RestController
@RequestMapping('/api/order')
class OrderReconciliationResource {
	@Autowired
	OrderReconciliationService orderReconciliationService


	@RequestMapping(value='/cancel',method=RequestMethod.POST,consumes = ["text/plain"])
	def cancelOrder(@RequestBody String data){
		def retVal = orderReconciliationService.cancelOrder(data)
		retVal?retVal: ResponseEntity.notFound().build()
	}

	@RequestMapping(value='/create',method=RequestMethod.POST,consumes = ["text/plain"])
	def create(@RequestBody String data){
		def retVal = orderReconciliationService.create(data)
		//retVal= ResponseEntity.created(new URI("/api/order/${orderReconciliationService.create(data)}"))
		retVal?retVal: ResponseEntity.notFound().build()
	}
}

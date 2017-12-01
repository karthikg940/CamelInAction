package com.ffss.datax.gateway.web.exception

import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ControllerAdvice
import org.springframework.web.bind.annotation.ExceptionHandler

import feign.FeignException
import groovy.util.logging.*

@Log4j
@ControllerAdvice
class FeignExceptionHandler {

	@ExceptionHandler(FeignException)
	def handleExceptin(FeignException f) {
		log.error 'Exception : Un-Authorized User',f
		ResponseEntity.status(f.status).build()
	}
}

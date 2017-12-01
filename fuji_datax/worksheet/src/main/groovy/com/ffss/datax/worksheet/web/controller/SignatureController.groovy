package com.ffss.datax.worksheet.web.controller

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.RestController

import com.ffss.datax.common.constants.CustomErrorCode
import com.ffss.datax.worksheet.service.SignatureAttestationService

/**
 * The Class SignatureController.
 */
@RestController
@RequestMapping('/api/template')
class SignatureController {

	/** The signature attestation service. */
	@Autowired
	SignatureAttestationService signatureAttestationService
	
	/**
	 * Save attested signature.
	 *
	 * @param signedData the signed data
	 */
	@RequestMapping(value='/sign/attested',method=RequestMethod.POST)
	def saveAttestedSignature(@RequestBody signedData) {

		def retVal
		retVal = ResponseEntity.created(new URI("/api/sign/${signatureAttestationService.saveAttendingSign(signedData).id}"))
		if(!retVal){
			retVal = ResponseEntity.badRequest()
			retVal.body()
		}
		else{
			retVal
		}
		retVal.build()
	}

	/**
	 * Delete attested signature.
	 *
	 * @param id the id
	 */
	@RequestMapping(value='/attested/sign/{id}',method=RequestMethod.DELETE)
	def deletePocAttestedSignature(@PathVariable('id') Long id) {
		def retVal = signatureAttestationService.deletePocAttestedSignature(id)
		retVal?new ResponseEntity(CustomErrorCode.ER_200.value, HttpStatus.OK):new ResponseEntity(CustomErrorCode.ER_404.value, HttpStatus.NOT_FOUND)
	}

	/**
	 * Delete QA attested signature.
	 *
	 * @param id the id
	 * @param studyId the study id
	 */
	@RequestMapping(value='/attested/sign/{id}/{studyId}',method=RequestMethod.DELETE)
	def deleteQAAttestedSignature(@PathVariable('id') Long id,@PathVariable('studyId') Long studyId) {
		def retVal = signatureAttestationService.deleteQaAttestedSignature(id,studyId)
		retVal?new ResponseEntity(CustomErrorCode.ER_200.value, HttpStatus.OK):new ResponseEntity(CustomErrorCode.ER_404.value, HttpStatus.NOT_FOUND)
	}
}

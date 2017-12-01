package com.ffss.datax.worksheet.web.resource

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.RestController

import com.ffss.datax.common.constants.CustomErrorCode
import com.ffss.datax.worksheet.service.SignatureService
import com.ffss.datax.worksheet.web.transformer.SignatureTransformer

/**
 * The Class SignatureResource.
 */
@RestController
@RequestMapping('/api/template')
class SignatureResource {

	/** The signature service. */
	@Autowired
	SignatureService signatureService

	/** The signature transformer. */
	@Autowired
	SignatureTransformer signatureTransformer

	/**
	 * Gets the signature.
	 *
	 * @param wrkshtid the wrkshtid
	 * @return the signature
	 */
	@RequestMapping(value='/sign/{wrkshtid}',method=RequestMethod.GET)
	def getSignature(@PathVariable('wrkshtid') wrkshtid) {

		def retVal = ResponseEntity.notFound()
		retVal = signatureService.getSign(wrkshtid)
		new ResponseEntity<String>(signatureTransformer.transformSign(retVal), HttpStatus.OK)
	}

	/**
	 * Save signature.
	 *
	 * @param signedData the signed data
	 */
	@RequestMapping(value='/sign',method=RequestMethod.POST)
	def saveSignature(@RequestBody signedData) {

		def retVal
		retVal = ResponseEntity.created(new URI("/api/template/sign/${signatureService.saveSignature(signedData).id}"))
		String[] signatureResp= retVal.headers['Location']
		def sign = signatureResp[0]
		if(sign.endsWith('/')){
			retVal = ResponseEntity.badRequest()
			retVal.body()
		}
		else{
			retVal
		}
		retVal.build()
	}

	/**
	 * Delete signature.
	 *
	 * @param id the id
	 */
	@RequestMapping(value='/sign/{id}',method=RequestMethod.DELETE)
	def deleteSignature(@PathVariable('id') Long id) {
		def retVal = signatureService.deleteSignature(id)
		if(retVal){
			retVal = new ResponseEntity(CustomErrorCode.ER_204.value, HttpStatus.NO_CONTENT)
		}
		else{
			retVal = new ResponseEntity(CustomErrorCode.ER_404.value+'signature ID', HttpStatus.NOT_FOUND)
		}
		retVal
	}

}

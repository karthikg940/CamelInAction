package com.ffss.datax.study.service.feign

import org.springframework.cloud.netflix.feign.FeignClient
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestHeader
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.ResponseBody
import org.springframework.http.ResponseEntity


@FeignClient('http://analytics')
interface StudyReportService {	
	
	@RequestMapping(value='/api/org/{orgId}/study/worksheet/{id}/report',method=RequestMethod.GET)
	@ResponseBody ResponseEntity<byte[]> getPdfForSubmitToEMR(@PathVariable('orgId') Long orgId, @PathVariable('id') Long id,@RequestHeader('Authorization') token)
		

}
 
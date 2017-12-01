package com.ffss.datax.analytics.web.resource

import javax.servlet.http.HttpServletResponse

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod

import com.ffss.datax.analytics.service.ReportGenerationService
import com.ffss.datax.common.log.Auditable

/**
 *
 * @author Virtusa|Polaris
 */
@Controller
@RequestMapping(value='/api')
class ReportGenerationResource {

	@Autowired
	ReportGenerationService reportGenerationService

	/**
	 * Generates a pdf file for the selected work sheet
	 * with filled data
	 * @param id - The worksheetId
	 * @param response - HttpServletResponse
	 */
	@RequestMapping(value='/export/worksheet/{id}',method=RequestMethod.GET)
	@Auditable(eventCode=115L, microServiceName='reportgeneration', contentPosition=0,entityName='Worksheet')
	void generatePdfForWrksht(@PathVariable('id') Long id,HttpServletResponse response) {
		def pdfAsBytes = reportGenerationService.findWrkshtAndExport(id)
		response.setHeader('Content-Type', 'application/pdf')
		String fileName ='Worksheet_' + new Date().time + '.pdf'
		response.setHeader('Content-Disposition', "inline; filename=${fileName}")
		def outStream = response.outputStream
		outStream.write(pdfAsBytes)
		outStream.close()
		outStream.flush()
	}

	
	/**
	 * Generates a pdf as bytes for the given work sheet id	  
	 * @param id - The worksheetId	  
	 */
	@RequestMapping(value='/org/{orgId}/study/worksheet/{id}/report',method=RequestMethod.GET)
	ResponseEntity<byte[]> getPdfForSubmitToEMR(@PathVariable('orgId') Long orgId, @PathVariable('id') Long id) {
		ResponseEntity.ok(reportGenerationService.findWrkshtAndExport(id))
	}
	
	
	/**
	 * Generates a PDF with SR Measurements
	 *
	 * @param id - The studyId
	 * @param response - HttpServletResponse
	 */
	@RequestMapping(value='/export/structuredreport/study/{studyId}',method=RequestMethod.GET)
	def findAndExportSrDocument(@PathVariable('studyId') Long studyId, HttpServletResponse response){
		def srMeasurementPdf = reportGenerationService.exportSrDocument(studyId)
		response.setHeader('Content-Type', 'application/pdf')
		String fileName ='SR_Measurements-' + new Date().time + '.pdf'
		response.setHeader('Content-Disposition', "inline; filename=${fileName}")
		def outStream = response.outputStream
		outStream.write(srMeasurementPdf)
		outStream.close()
		outStream.flush()
	}
}
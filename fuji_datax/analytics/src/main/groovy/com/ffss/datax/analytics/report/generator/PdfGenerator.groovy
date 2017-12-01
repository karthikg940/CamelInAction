package com.ffss.datax.analytics.report.generator

import javax.annotation.PreDestroy

import org.apache.commons.io.FileUtils
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.Scope
import org.springframework.stereotype.Component

import com.ffss.datax.analytics.constants.AnalyticsConstants
import com.ffss.datax.analytics.report.generator.util.GraphicUtils
import com.ffss.datax.analytics.repository.StudyRepository
import com.ffss.datax.analytics.service.ReportGenerationService
import com.itextpdf.text.Chunk
import com.itextpdf.text.Document
import com.itextpdf.text.Paragraph
import com.itextpdf.text.pdf.PdfWriter


/**
 * Generates a PDF with worksheet details.
 *
 * @author Virtusa|Polaris
 */
@Component('pdfGenerator')
@Scope('prototype')
class PdfGenerator {

	/** The study repository. */
	@Autowired
	StudyRepository studyRepository

	/** The document. */
	Document document = new Document()

	/** The writer. */
	PdfWriter writer

	/** The output stream. */
	OutputStream outputStream

	/** The temp file. */
	File tempFile = File.createTempFile('streamToFile', '.tmp')

	/** The patient. */
	def patient = ReportGenerationService.patientData

	/** The study. */
	def study = ReportGenerationService.studyData

	/** The sign. */
	def sign = ReportGenerationService.signData

	/** The prfmng physician. */
	def prfmngPhysician = ReportGenerationService.prfmngPhysician

	/** The referring physician. */
	def referringPhysician =  ReportGenerationService.referringPhysician

	/** The qa physician. */
	def qaPhysician =  ReportGenerationService.qaPhysician

	/**
	 * 
	 * Instantiates a new pdf generator.
	 */
	PdfGenerator() {

		outputStream = new FileOutputStream(tempFile)

		writer = PdfWriter.getInstance(document, outputStream)
		document.setMargins(36f,28f, 20f, 30f)
		document.open()
		5.times{document.add(new Paragraph(AnalyticsConstants.DEFAULTSINGLESPACE))}  //place holder for hospital details
		GraphicUtils.drawSeperator(writer)
		GraphicUtils.plotPatientDetails(document, patient, study, prfmngPhysician, referringPhysician,qaPhysician)
		GraphicUtils.drawSeperator(writer)
		document.add(new Paragraph(AnalyticsConstants.DEFAULTSINGLESPACE))
	}

	/**
	 * Generator.
	 *
	 * @param data - Worksheet filled data
	 * @param level - The level to be plotted in output file
	 * 
	 */
	def generate(data, level) {
		Paragraph topics = new Paragraph()
		Paragraph values = new Paragraph()
		Paragraph subValueLevel1 = new Paragraph()
		Paragraph subValueLevel2 = new Paragraph()
		Paragraph subValueLevel3 = new Paragraph()
		def dataLevel = level

		switch(dataLevel){

			case 1 :
				document.add(new Paragraph(AnalyticsConstants.DEFAULTSINGLESPACE))
				if(data.toString().equalsIgnoreCase('Indications for Exam')){
					Paragraph indication = new Paragraph()
					indication.add(new Chunk('Indications ', GraphicUtils.sectionFont))
					document.add(indication)
				}
				else{
					document.add(new Chunk(data.toString(), GraphicUtils.sectionFont))
				}
				break
			case 2 :
				topics.add(new Chunk(data , GraphicUtils.topicFont))
				topics.setIndentationLeft(32)
				document.add(topics)
				break
			case 3 :
				values.add(new Chunk(data, GraphicUtils.valueFont))
				values.setIndentationLeft(40)
				document.add(values)
				break
			case 4 :
				subValueLevel1.add(new Chunk(data, GraphicUtils.subValueFont))
				subValueLevel1.setIndentationLeft(AnalyticsConstants.NUMERIC_52)
				document.add(subValueLevel1)
				break
			case 5 :
				subValueLevel2.add(new Chunk(data, GraphicUtils.subValueFont))
				subValueLevel2.setIndentationLeft(AnalyticsConstants.NUMERIC_52)
				document.add(subValueLevel2)
				break
			case 6 :
				subValueLevel3.add(new Chunk(data, GraphicUtils.subValueFont))
				subValueLevel3.setIndentationLeft(65)
				document.add(subValueLevel3)
				break
			default:
				document.add(new Paragraph(AnalyticsConstants.DEFAULTSINGLESPACE))
				break
		}
	}

	
	/**
	 * Plot the images
	 *
	 */
	def generateImage(imageList){
		GraphicUtils.plotImages(document, imageList)
	}
	
	/**
	 * Generate SR Title
	 */
	def generateSRTitle(title){
		document.add(new Paragraph(AnalyticsConstants.DEFAULTSINGLESPACE))
		document.add(new Chunk(title, GraphicUtils.sectionFont))
	}
	
	/**
	 * Generate SR Measurements
	 */
	def generateSRFindings(measurememts){
		GraphicUtils.plotSRMeasurements(document, measurememts)
	}
	
	/**
	 * Finish.
	 *
	 */
	def finish() {
		GraphicUtils.plotPhysicianSign(document, sign)
		GraphicUtils.drawSeperator(writer)
		clean()
	}
	
	/**
	 * Clean
	 * 
	 */
	def clean(){
		document.close()
		writer.close()
		outputStream.close()
		def retVal = FileUtils.readFileToByteArray(tempFile)
		tempFile.delete()
		retVal
	}
	
	/**
	 * Cleanup.
	 */
	@PreDestroy
	void cleanup() {
		finish()
	}
}

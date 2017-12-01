package com.ffss.datax.analytics.report.generator.util

import java.text.SimpleDateFormat

import org.joda.time.format.DateTimeFormat
import org.springframework.stereotype.Service

import com.ffss.datax.analytics.constants.AnalyticsConstants
import com.ffss.datax.analytics.service.ReportGenerationService
import com.itextpdf.text.BaseColor
import com.itextpdf.text.Chunk
import com.itextpdf.text.Element;
import com.itextpdf.text.Font
import com.itextpdf.text.Image
import com.itextpdf.text.Paragraph
import com.itextpdf.text.pdf.PdfContentByte
import com.itextpdf.text.pdf.PdfPCell
import com.itextpdf.text.pdf.PdfPTable


/**
 * Contains graphical utilities to be used with generator.
 *
 * @author Virtusa|Polaris
 */
@Service
class GraphicUtils {


	/**  Worksheet section font. */
	static Font sectionFont = new Font(Font.FontFamily.TIMES_ROMAN , 16, Font.BOLDITALIC,new BaseColor(22, 14, 109))

	/**  Worksheet topic font. */
	static Font topicFont = new Font(Font.FontFamily.HELVETICA , AnalyticsConstants.NUMERIC_11, Font.BOLD, new BaseColor(AnalyticsConstants.NUMERIC_25, AnalyticsConstants.NUMERIC_25, AnalyticsConstants.NUMERIC_112))

	/**  Worksheet value font. */
	static Font valueFont = new Font(Font.FontFamily.HELVETICA , AnalyticsConstants.NUMERIC_11, Font.NORMAL, new BaseColor(AnalyticsConstants.NUMERIC_25, AnalyticsConstants.NUMERIC_25, AnalyticsConstants.NUMERIC_112))

	/**  Worksheet sub value font. */
	static Font subValueFont = new Font(Font.FontFamily.HELVETICA , AnalyticsConstants.NUMERIC_10, Font.NORMAL, new BaseColor(6, AnalyticsConstants.NUMERIC_3, 58))

	/**  Font for other elements. */
	static Font font1 = new Font(Font.FontFamily.HELVETICA , AnalyticsConstants.NUMERIC_10, Font.BOLD, new BaseColor(AnalyticsConstants.NUMERIC_25, AnalyticsConstants.NUMERIC_25, AnalyticsConstants.NUMERIC_112))

	/** The font 2. */
	static Font font2 = new Font(Font.FontFamily.HELVETICA , 8, Font.BOLD, new BaseColor(AnalyticsConstants.NUMERIC_25, AnalyticsConstants.NUMERIC_25, AnalyticsConstants.NUMERIC_112))

	/** The Constant EMPTY_SPACE. */
	static final EMPTY_SPACE=AnalyticsConstants.DEFAULTSINGLESPACE

	/** The Constant EMPTY. */
	static final EMPTY=''

	/** The Constant EMPTY_PREFIX. */
	static final EMPTY_PREFIX='. '

	/**
	 * Plot a line separator.
	 *
	 * @param writer - The PdfWriter
	 * 
	 */
	static drawSeperator(writer){
		PdfContentByte cb = writer.getDirectContent()
		cb.setLineWidth(1.1f)
		cb.setGrayStroke(0.4f)
		cb.moveTo(35, writer.getVerticalPosition(false))
		cb.lineTo(560, writer.getVerticalPosition(false))
		cb.stroke()
	}

	/**
	 * Displays patient related information.
	 *
	 * @param document - The Document
	 * @param patient - The patient informations
	 * @param study - The study informations
	 * @param prfmngPhysician the prfmng physician
	 * @param referringPhysician the referring physician
	 * @param qaPhysician the qa physician
	 * 
	 */
	static plotPatientDetails(document, patient, study, prfmngPhysician, referringPhysician,qaPhysician){
		String dash = AnalyticsConstants.DASH
		def firstName, lastName, dateOfBirth, dob, gender
		patient.firstName ? (firstName = patient.firstName) : (firstName = EMPTY_SPACE)
		patient.lastName ? (lastName = patient.lastName) : (lastName = EMPTY_SPACE)
		patient.birthDate ? (dateOfBirth = patient.birthDate) : (dateOfBirth = EMPTY_SPACE)
		(dateOfBirth == EMPTY_SPACE) ? (dob = EMPTY_SPACE) : (dob = new SimpleDateFormat(AnalyticsConstants.DATEFORMAT).format(dateOfBirth))
		patient.gender ? (gender = patient.gender) : (gender = EMPTY)

		def examName = study?.studyExamTypeMap?.examTypeMap?.examTypeDesc
		if(!examName)
			examName = ' '

		//Defines table structure to plot the details
		PdfPCell cell1, cell2, cell3, cell4
		PdfPTable patientInfoTable = new PdfPTable(AnalyticsConstants.NUMERIC_2)
		patientInfoTable.defaultCell.setBorder(PdfPCell.NO_BORDER)
		patientInfoTable.setSpacingBefore(AnalyticsConstants.NUMERIC_5)
		patientInfoTable.setWidthPercentage(AnalyticsConstants.NUMERIC_100)
		cell1 = new PdfPCell(new Paragraph(new Chunk('Patient Name :  ' + firstName + EMPTY_SPACE + lastName, font1)))
		cell1.setFixedHeight(AnalyticsConstants.FLOAT_17)
		cell1.setBorder(0)
		patientInfoTable.addCell(cell1)
		cell2 = new PdfPCell(new Paragraph(new Chunk(dash+'DOB : ' + dob, font1)))
		cell2.setFixedHeight(AnalyticsConstants.FLOAT_17)
		cell2.setBorder(0)
		patientInfoTable.addCell(cell2)
		cell3 = new PdfPCell(new Paragraph(new Chunk('Exam Name : ' + examName, font1)))
		cell3.setFixedHeight(AnalyticsConstants.FLOAT_17)
		cell3.setBorder(0)
		patientInfoTable.addCell(cell3)
		cell4 = new PdfPCell(new Paragraph(new Chunk(dash+'Gender : ' + gender, font1)))
		cell4.setFixedHeight(AnalyticsConstants.FLOAT_17)
		cell4.setBorder(0)
		patientInfoTable.addCell(cell4)

		document.add(patientInfoTable)
		document.add(drawNumericDataTable(patient) )
		document.add(drawPhysicianInfoTable(prfmngPhysician,referringPhysician,study,qaPhysician))
	}

	/**
	 *  Creates a table with patient or study related numerical information.
	 *
	 * @param patient - The patient informations
	 * 
	 */
	static  drawNumericDataTable(patient){
		def accessionValue = ReportGenerationService.accessionNumber
		def workList = ReportGenerationService.patientWorkList
		String dash = AnalyticsConstants.DASH
		def mpi, mrn, accessionNo, worklistId
		def medicalId = patient.patientIdentifier.medicalId
		patient.mpiId ? (mpi = patient.mpiId) : (mpi = EMPTY)
		medicalId ? (mrn = medicalId[0].replaceAll('[[,]]+',EMPTY_SPACE)) : (mrn = EMPTY)
		accessionValue ? (accessionNo = accessionValue.accessionNumber):(accessionNo =  EMPTY)
		workList ? (worklistId = workList.encounterNumber):(worklistId =  EMPTY)
		PdfPCell cell1, cell2, cell3, cell4
		PdfPTable numericDataTable = new PdfPTable(AnalyticsConstants.NUMERIC_2)
		numericDataTable.defaultCell.setBorder(PdfPCell.NO_BORDER)
		numericDataTable.setWidthPercentage(AnalyticsConstants.NUMERIC_100)
		cell1 = new PdfPCell(new Paragraph(new Chunk('MR Number : ' + mrn, font1)))
		cell1.setFixedHeight(AnalyticsConstants.FLOAT_17)
		cell1.setBorder(0)
		numericDataTable.addCell(cell1)
		cell2 = new PdfPCell(new Paragraph(new Chunk(dash+'MPI Id : ' + mpi, font1)))
		cell2.setFixedHeight(AnalyticsConstants.FLOAT_17)
		cell2.setBorder(0)
		numericDataTable.addCell(cell2)
		cell3 = new PdfPCell(new Paragraph(new Chunk('Accession No : '+accessionNo, font1)))
		cell3.setFixedHeight(AnalyticsConstants.FLOAT_17)
		cell3.setBorder(0)
		numericDataTable.addCell(cell3)
		cell4 = new PdfPCell(new Paragraph(new Chunk(dash+'Visit / Encounter No: '+worklistId, font1)))
		cell4.setFixedHeight(AnalyticsConstants.FLOAT_17)
		cell4.setBorder(0)
		numericDataTable.addCell(cell4)
		numericDataTable
	}


	/**
	 *  Creates a table with physician information.
	 *
	 * @param prfmngPhysician the prfmng physician
	 * @param referringPhysician the referring physician
	 * @param study the study
	 * @param qaPhysician the qa physician
	 * 
	 */
	static drawPhysicianInfoTable(prfmngPhysician,referringPhysician,study,qaPhysician){
		String dash = AnalyticsConstants.DASH
		def studyDateTime = DateTimeFormat.forPattern(AnalyticsConstants.DATEFORMAT_MONTH).print(study.vnaCreatedDateTime)
		def atndPrefix, atndFirstName, atndLastName
		def performingPhysician = prfmngPhysician
		def attendingPhysician
		if(referringPhysician != null ) {
			attendingPhysician = referringPhysician
			atndPrefix = attendingPhysician.prefix?(attendingPhysician.prefix+EMPTY_PREFIX) : attendingPhysician.prefix
			atndFirstName = attendingPhysician.firstName
			atndLastName = attendingPhysician.lastName
		}
		else{
			atndPrefix =EMPTY_SPACE
			atndFirstName = EMPTY_SPACE
			atndLastName = EMPTY_SPACE
		}
		def qaPrefix, qaFirstName, qaLastName
		if(qaPhysician != null ) {

			qaPrefix = qaPhysician.prefix?(qaPhysician.prefix+EMPTY_PREFIX) : qaPhysician.prefix
			qaFirstName = qaPhysician.firstName
			qaLastName = qaPhysician.lastName
		}
		else{
			qaPrefix =EMPTY_SPACE
			qaFirstName = EMPTY_SPACE
			qaLastName = EMPTY_SPACE
		}
		def perfPrefix, perfFirstName, perfLastName
		performingPhysician.prefix ? (perfPrefix = performingPhysician.prefix+EMPTY_PREFIX) : (perfPrefix = EMPTY_SPACE)
		performingPhysician.firstName ? (perfFirstName = performingPhysician.firstName) : (perfFirstName = EMPTY_SPACE)
		performingPhysician.lastName ? (perfLastName = performingPhysician.lastName) : (perfLastName = EMPTY_SPACE)
		PdfPCell cell1, cell2, cell3, cell4
		PdfPTable physicianInfoTable = new PdfPTable(AnalyticsConstants.NUMERIC_2)
		physicianInfoTable.defaultCell.setBorder(PdfPCell.NO_BORDER)
		physicianInfoTable.setWidthPercentage(AnalyticsConstants.NUMERIC_100)
		physicianInfoTable.setSpacingAfter(AnalyticsConstants.NUMERIC_5)
		cell1 = new PdfPCell(new Paragraph(new Chunk('Performing Physician : ' + perfPrefix+
				perfFirstName + EMPTY_SPACE + perfLastName, font1)))
		cell1.setFixedHeight(AnalyticsConstants.FLOAT_17)
		cell1.setBorder(0)
		physicianInfoTable.addCell(cell1)
		cell2 = new PdfPCell(new Paragraph(new Chunk(dash+'Referring Physician : ' + atndPrefix  +
				atndFirstName + EMPTY_SPACE + atndLastName, font1)))
		cell2.setFixedHeight(AnalyticsConstants.FLOAT_17)
		cell2.setBorder(0)
		physicianInfoTable.addCell(cell2)
		cell3 = new PdfPCell(new Paragraph(new Chunk('Study Date Time : ' + studyDateTime, font1)))
		cell3.setFixedHeight(AnalyticsConstants.FLOAT_17)
		cell3.setBorder(0)
		physicianInfoTable.addCell(cell3)
		//qaPrefix, qaFirstName, qaLastName
		cell4 = new PdfPCell(new Paragraph(new Chunk(dash+'QA Reviewer : ' + qaPrefix  +
				qaFirstName + EMPTY_SPACE + qaLastName, font1)))
		cell4.setFixedHeight(AnalyticsConstants.FLOAT_17)
		cell4.setBorder(0)
		physicianInfoTable.addCell(cell4)
		physicianInfoTable
	}

	/**
	 *  Displays signature information.
	 *
	 * @param document - The Document
	 * @param sign - The signature details
	 * 
	 */
	static plotPhysicianSign(document, sign){
		def physicianName = sign.signedName[0]
		def signDateTime = DateTimeFormat.forPattern(AnalyticsConstants.DATEFORMAT_YEAR).print(sign.pocDateTime[0])
		PdfPCell cell1, cell2
		Paragraph signedTime
		PdfPTable physicianSignTable = new PdfPTable(AnalyticsConstants.NUMERIC_2)
		physicianSignTable.defaultCell.setBorder(PdfPCell.NO_BORDER)
		physicianSignTable.setSpacingBefore(50) //previous 75
		physicianSignTable.setSpacingAfter(4)
		physicianSignTable.setWidthPercentage(AnalyticsConstants.NUMERIC_100)
		cell1 = new PdfPCell()
		cell1.addElement(new Paragraph(new Chunk('Electronically Signed by: ' +physicianName , font1)))
		cell1.setBorder(0)
		physicianSignTable.addCell(cell1)
		signedTime = new Paragraph(new Chunk(signDateTime, font1))
		signedTime.setIndentationLeft(135)
		cell2 = new PdfPCell()
		cell2.addElement(signedTime)
		cell2.setBorder(0)
		physicianSignTable.addCell(cell2)

		document.add(physicianSignTable)
	}

	/**
	 * Displays hospital information.
	 *
	 * @param document - The Document
	 * 
	 */
	static plotHospitalDetails(document){
		String url = 'https://lh3.googleusercontent.com/-zhLhjrBdHH8/Trx12mZFfLI/AAAAAAAAABc/zAdbJ7TZ2y0/w530-h231-p/USARAD_logoRGB.jpg'
		Image image = Image.getInstance(new URL(url))
		image.scaleAbsolute(185f, 75f)
		Paragraph paragraph
		PdfPCell cell1 = new PdfPCell()
		PdfPCell cell2 = new PdfPCell()
		PdfPTable table = new PdfPTable(AnalyticsConstants.NUMERIC_2)
		table.setWidthPercentage(AnalyticsConstants.NUMERIC_100)
		table.setSpacingBefore(15)
		table.setSpacingAfter(-15)
		cell1.addElement(image)
		cell1.setBorder(0)
		cell1.addElement(new Paragraph(EMPTY_SPACE))
		Chunk usaRad = new Chunk('USARad.com ', topicFont)
		usaRad.setAnchor('http://usarad.com/')
		paragraph = new Paragraph(20, usaRad)
		paragraph.setIndentationLeft(120)
		cell2.addElement(paragraph)
		paragraph = new Paragraph(AnalyticsConstants.NUMERIC_18, new Chunk('300 Barr Harbor Drive, Suite 280', font2))
		paragraph.setIndentationLeft(AnalyticsConstants.NUMERIC_95)
		cell2.addElement(paragraph)
		paragraph = new Paragraph(AnalyticsConstants.NUMERIC_18, new Chunk('West Conshohocken, PA 19428', font2))
		paragraph.setIndentationLeft(AnalyticsConstants.NUMERIC_95)
		cell2.addElement(paragraph)
		paragraph = new Paragraph(AnalyticsConstants.NUMERIC_18, new Chunk('Phone: 888.886.5238 Fax: 888.886.5221', font2))
		paragraph.setIndentationLeft(85)
		cell2.addElement(paragraph)
		cell2.setBorder(0)
		table.addCell(cell1)
		table.addCell(cell2)
		document.add(table)
	}



	/**
	 * plot images 
	 *
	 * @param imageList - List of images
	 *
	 */
	static plotImages(document, imageList){

		5.times{document.add(new Paragraph(AnalyticsConstants.DEFAULTSINGLESPACE))}
		document.add(new Chunk('Ultrasound Images ', sectionFont))
		if(imageList?.size() > 0 ){
			PdfPTable table
			if(imageList.size() == 1){
				table = new PdfPTable(1)
				table.setWidthPercentage(70)
			}else{
				table = new PdfPTable(2)
				table.setWidthPercentage(100)
			}
			table.setSpacingBefore(15)
			table.defaultCell.setBorder(PdfPCell.NO_BORDER)
			table.defaultCell.setPaddingRight(10)
			table.defaultCell.setPaddingBottom(20)
			imageList.each{ image ->
				table.addCell(Image.getInstance(image))
			}
			table.completeRow()
			document.add(table)
		}
	}

	/**
	 * Include SR Measurements in pdf
	 * 
	 * @param document
	 * @param measurememts
	 */
	static plotSRMeasurements(document, measurememts){
		PdfPTable table = new PdfPTable(1)
		Paragraph paragraph
		if(measurememts?.size() > 0 ){
			table.setSpacingBefore(3)
			table.horizontalAlignment = Element.ALIGN_LEFT
			table.defaultCell.setBorder(PdfPCell.NO_BORDER)
			table.defaultCell.setPaddingBottom(4)
			measurememts.each{ measurement ->
				paragraph = new Paragraph(new Chunk(measurement, subValueFont))
				paragraph.setIndentationLeft(40)
				table.addCell(paragraph)
			}
			document.add(table)
		}
	}
}

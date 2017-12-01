package com.ffss.datax.analytics.service

import groovy.util.logging.Log4j

import java.awt.image.BufferedImage

import javax.imageio.ImageIO
import javax.imageio.ImageReader
import javax.imageio.stream.ImageInputStream

import org.dcm4che3.imageio.plugins.dcm.DicomImageReadParam
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

import com.ffss.datax.common.vnasync.mapper.DeviceStrategy


@Log4j
@Service
class DicomImageExtractor {

	@Autowired
	DeviceStrategy deviceStrategy

	/*
	 * get list of dicom images 
	 *
	 * @return imageList - list of images in byte array format
	 */
	def extractListOfImages(){
		def bufferedImage
		def imageList = []
		def dcmStreamList
		def studyId = ReportGenerationService.studyData.id
		dcmStreamList = deviceStrategy.getMapperForStudy(studyId, true)

		if(dcmStreamList.size() > 0){
			dcmStreamList.each{  dcmStream ->

				try{
					bufferedImage = loadImageFromDicomStream(dcmStream)
					ByteArrayOutputStream baos = new ByteArrayOutputStream()
					ImageIO.write( bufferedImage, "jpg", baos )
					baos.flush()
					byte[] imageInBytes = baos.toByteArray()
					baos.close()
					imageList.add(imageInBytes)
				}
				catch(Throwable e){
					log.info " Bogus input colorspace"
				}
			}
			imageList
		}
		else
			log.info 'No Image For This Study ..! '
	}



	/*
	 * Load image from dicom stream
	 *
	 * @param dcmStream  - dicom file stream
	 * @return myJpegImage - Buffered image
	 */
	def loadImageFromDicomStream(dcmStream){

		try {
			Iterator<ImageReader> iter = ImageIO.getImageReadersByFormatName("DICOM")
			ImageReader reader = (ImageReader) iter.next()
			DicomImageReadParam param = (DicomImageReadParam) reader.getDefaultReadParam()
			ImageInputStream iis = ImageIO.createImageInputStream(dcmStream)
			reader.setInput(iis, false)
			BufferedImage myJpegImage = reader.read(0, param)
			iis.close()
			if (myJpegImage == null) {
				log.info 'Error: could not read dicom image..! '
			}
			myJpegImage
		}
		catch(Throwable e) {
			log.info "Failed to load image from stream "
		}
	}
}

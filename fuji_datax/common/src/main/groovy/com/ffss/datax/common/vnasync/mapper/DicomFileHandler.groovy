package com.ffss.datax.common.vnasync.mapper

import java.util.regex.Pattern

import jcifs.smb.NtlmPasswordAuthentication
import jcifs.smb.SmbFile

import org.dcm4che2.data.DicomObject
import org.dcm4che2.data.Tag
import org.dcm4che2.io.DicomInputStream
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Configuration

@Configuration
class DicomFileHandler {

	@Value('${vna.directory}')
	String classPath

	@Value('${file.handlerConfig}')
	String fileHandler

	def imageUrl,dcmStream,rootDirectory
	def extractImage(storageDir,directoryName,fileList, onlyImages){
		def dcmStreamList = []
		rootDirectory = storageDir?extractRootDirectory(storageDir):'/'
		if(fileHandler.equals('smb')){
			NtlmPasswordAuthentication auth = new NtlmPasswordAuthentication("", "Administrator", "password")
			if(onlyImages){
				fileList.each{
					imageUrl = "smb://172.25.242.25${rootDirectory}${directoryName}/${it.FILE_NAME}.dcm"
					dcmStream = new SmbFile(imageUrl, auth).getInputStream()
					dcmStreamList.add(dcmStream)
				}
			}
			else{
				def rootDirectory = storageDir?extractRootDirectory(storageDir):'/'
				imageUrl = "smb://172.25.242.25${rootDirectory}${directoryName}/${fileList[0].FILE_NAME}.dcm"
				dcmStream = new SmbFile(imageUrl, auth).getInputStream()
				dcmStreamList.add(dcmStream)
			}
		}
		else{
			String dcmFile = classPath+rootDirectory+directoryName+'/'+fileList[0].FILE_NAME+'.dcm'
			dcmStream = new DicomInputStream(new File(dcmFile))
			dcmStreamList.add(dcmStream)
		}

		dcmStreamList
	}

	def extractFrameNumberForFile(storageDir,directoryName,fileName){
		def inputStream
		rootDirectory = storageDir?extractRootDirectory(storageDir):'/'
		if(fileHandler.equals('smb')){
			NtlmPasswordAuthentication auth = new NtlmPasswordAuthentication("", "Administrator", "password")
			imageUrl = "smb://172.25.242.25${rootDirectory}${directoryName}/${fileName}.dcm"
			inputStream = new SmbFile(imageUrl, auth).getInputStream()
		}
		else{
			String dcmFile = classPath+rootDirectory+directoryName+'/'+fileName+'.dcm'
			inputStream = new File(dcmFile)
		}
		dcmStream = new DicomInputStream(inputStream)
		DicomObject dcmObject = dcmStream.readDicomObject()
		dcmObject.getString(Tag.NumberOfFrames)
	}
	String extractRootDirectory(root){
		String imagePath='/'
		String[] rootDir = root.split (Pattern.quote("\\"))
		int length = rootDir.length-1
		(1..length).each {
			imagePath+=rootDir[it]
			imagePath+='/'
		}
		imagePath
	}
}

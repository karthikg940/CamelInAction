package com.ffss.datax.common.vnasync.mapper

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Configuration
import org.springframework.jdbc.core.JdbcTemplate

import com.ffss.datax.common.config.CommonDataSources
import com.ffss.datax.common.domain.study.SopInstance;



@Configuration
class DeviceStrategy implements DicomMapper{


	@Autowired
	JdbcTemplate jdbcTemplate

	@Autowired
	CommonDataSources dataSources

	@Value('${schema.name}')
	String schemaName

	@Value('${vna.directory}')
	String classPath


	@Autowired
	DicomFileHandler dicomFileHandler

	String directoryName, equipment, storageLoc, storageDir

	@Override
	def getMapperForStudy(Long studyId, boolean onlyImages){
		def dcmStreamList = []
		try{
			findStorageDirectoryForStudy(studyId)
			if(directoryName){
				List<Object> fileList = jdbcTemplate.queryForList("select SOP.FILE_NAME,SER.EQUIPMENT_ID from ${schemaName}SERIES_T SER JOIN ${schemaName}SOP_INSTANCE_T SOP ON SOP.SERIES_FK = SER.SERIES_PK WHERE SER.STUDY_FK = ${studyId} AND SER.MODALITY IN ('US','SR') ORDER BY SER.SERIES_DATE_TIME ASC")
				if(fileList)
					dcmStreamList = dicomFileHandler.extractImage(storageDir,directoryName,fileList, onlyImages)
			}
		}
		catch(Exception e) {
			e.printStackTrace()
		}

		dcmStreamList
	}

	@Override
	public def getFrameNumberForDicomFile(SopInstance sopInstance) {
		def studyId
		def frameCount = 0
		try{
			findStorageDirectoryForStudy(sopInstance.study.id)
			frameCount = dicomFileHandler.extractFrameNumberForFile(storageDir,directoryName,sopInstance.instanceFileName)
		}
		catch(Exception e) {
			e.printStackTrace()
		}
		frameCount
	}

	def findStorageDirectoryForStudy(studyId){
		jdbcTemplate.setDataSource(dataSources.vnaDataSource())
		List<Object> object = jdbcTemplate.queryForList("select B.BAG_PK, L.DIRECTORY_NAME,ST.STORAGE_LOCATION_PK FROM ${schemaName}BAG_T B JOIN ${schemaName}LOCATION_T L ON B.BAG_PK=L.BAG_FK JOIN ${schemaName}CFG_STORAGE_LOCATION_T ST ON ST.NAME = L.STORAGE_LOCATION_ULN JOIN ${schemaName}SOP_INSTANCE_T SOP ON SOP.STUDY_FK = B.STUDY_FK WHERE B.STUDY_FK = ${studyId} AND ST.NAME = L.STORAGE_LOCATION_ULN AND B.STORAGE_GROUP_TYPE IN (1,4) ORDER BY B.LAST_UPDATED_DATE_TIME DESC")
		directoryName =  object[0]?.DIRECTORY_NAME
		storageLoc = object[0]?.STORAGE_LOCATION_PK
		if (storageLoc) {
			Map<Object> locDirObject = jdbcTemplate.queryForMap("select distinct L.LOCAL_DIRECTORY FROM ${schemaName}CFG_STORAGE_LOCATION_T ST JOIN ${schemaName}CFG_LOCATION_CLUSTER_T L ON L.STORAGE_LOCATION_FK =${storageLoc}")
			storageDir = locDirObject.get("LOCAL_DIRECTORY")
		}
	}
}

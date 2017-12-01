package com.ffss.datax.common.vnasync.mapper

import com.ffss.datax.common.domain.study.SopInstance

public interface DicomMapper {

	def getMapperForStudy(Long id, boolean onlyImages)
	def getFrameNumberForDicomFile(SopInstance sopInstance)
}

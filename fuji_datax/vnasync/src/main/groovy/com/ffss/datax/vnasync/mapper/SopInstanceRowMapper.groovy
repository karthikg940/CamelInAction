package com.ffss.datax.vnasync.mapper

import java.sql.ResultSet
import java.sql.SQLException

import org.springframework.context.annotation.Configuration
import org.springframework.jdbc.core.RowMapper

import com.ffss.datax.common.domain.study.Series
import com.ffss.datax.common.domain.study.SopInstance
import com.ffss.datax.common.domain.study.Study
import com.ffss.datax.vnasync.constants.VnaSyncConstants
import com.ffss.datax.vnasync.domain.util.CommonUtil
/**
 * 
 * @author Virtusa|Polaris
 *
 */
@Configuration
class SopInstanceRowMapper implements RowMapper<SopInstance> {

	@Override
	SopInstance mapRow(ResultSet rs, int rowNum) throws SQLException {

		SopInstance sopInstance = new SopInstance()
		sopInstance.setId(rs.getLong('SOP_INSTANCE_PK'))

		if(rs.getLong(VnaSyncConstants.SERIES_FK))
			sopInstance.setSeries(new Series(id:rs.getLong(VnaSyncConstants.SERIES_FK)))
		if(rs.getLong(VnaSyncConstants.STUDY_FK))
			sopInstance.setStudy(new Study(id:rs.getLong(VnaSyncConstants.STUDY_FK)))

		sopInstance.setInstanceType(rs.getInt('SOP_INSTANCE_TYPE'))
		sopInstance.setInstanceUid(rs.getString('SOP_INSTANCE_UID'))
		sopInstance.setcUid(rs.getString('SOP_CUID'))
		if(rs.getDate(VnaSyncConstants.ACQUIRED_DATE_TIME))
			sopInstance.setInstanceDateTime(CommonUtil.getUtilDate(rs.getTimestamp(VnaSyncConstants.ACQUIRED_DATE_TIME)))
		sopInstance.setInstanceFileName(rs.getString('FILE_NAME'))
		sopInstance.setImageNumber(rs.getInt('IMAGE_NUMBER'))
		sopInstance.setIndicator(rs.getString('COMMITTED_INDICATOR'))
		sopInstance.setSize(rs.getLong('ORIGINAL_SIZE'))
		sopInstance.setFrameCount(rs.getInt('FRAME_COUNT'))

		 sopInstance
	}
}

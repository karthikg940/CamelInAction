package com.ffss.datax.vnasync.mapper

import java.sql.ResultSet
import java.sql.SQLException

import org.springframework.context.annotation.Configuration
import org.springframework.jdbc.core.RowMapper

import com.ffss.datax.common.domain.study.AccessionNumber
import com.ffss.datax.common.domain.study.Study
import com.ffss.datax.vnasync.constants.VnaSyncConstants
/**
 * 
 * @author Virtusa|Polaris
 *
 */
@Configuration
class AccessionNoRowMapper implements RowMapper<AccessionNumber> {

	@Override
	AccessionNumber mapRow(ResultSet rs, int rowNum) throws SQLException {

		AccessionNumber accessionNo = new AccessionNumber()
		if(rs.getLong(VnaSyncConstants.STUDY_FK))
			accessionNo.setId(rs.getLong(VnaSyncConstants.STUDY_FK))
		accessionNo.setAccessionNumber(rs.getString('ACCESSION_NUMBER'))
		if(rs.getLong(VnaSyncConstants.STUDY_FK))
			accessionNo.setStudy(new Study(id:rs.getLong(VnaSyncConstants.STUDY_FK)))
		accessionNo
	}
}
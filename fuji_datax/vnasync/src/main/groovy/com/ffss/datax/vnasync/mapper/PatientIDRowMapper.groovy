package com.ffss.datax.vnasync.mapper

import java.sql.ResultSet
import java.sql.SQLException

import org.springframework.context.annotation.Configuration
import org.springframework.jdbc.core.RowMapper

import com.ffss.datax.common.domain.study.Patient
import com.ffss.datax.common.domain.study.PatientIdentifier
import com.ffss.datax.vnasync.constants.VnaSyncConstants
import com.ffss.datax.vnasync.domain.util.CommonUtil
/**
 * 
 * @author Virtusa|Polaris
 *
 */
@Configuration
class PatientIDRowMapper implements RowMapper<PatientIdentifier> {

	@Override
	PatientIdentifier mapRow(ResultSet rs, int rowNum) throws SQLException {

		PatientIdentifier patientID = new PatientIdentifier()
		patientID.setId(rs.getLong('PATIENT_ID_PK'))
		if(rs.getLong(VnaSyncConstants.PATIENT_FK))
			patientID.setPatient(new Patient(id:rs.getLong(VnaSyncConstants.PATIENT_FK)))
		patientID.setIdType(rs.getString('ID_TYPE'))
		patientID.setIssuer(rs.getString('ISSUER'))
		patientID.setMedicalId(rs.getString('MEDICAL_ID'))
		if(rs.getDate(VnaSyncConstants.CREATED_DATE_TIME))
			patientID.setVnaCreatedDateTime(CommonUtil.getUtilDate(rs.getTimestamp(VnaSyncConstants.CREATED_DATE_TIME)))

		patientID
	}
}
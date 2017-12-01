package com.ffss.datax.vnasync.mapper

import java.sql.ResultSet
import java.sql.SQLException

import org.springframework.context.annotation.Configuration
import org.springframework.jdbc.core.RowMapper

import com.ffss.datax.common.domain.study.Patient
import com.ffss.datax.vnasync.constants.VnaSyncConstants
import com.ffss.datax.vnasync.domain.util.CommonUtil
/**
 * 
 * @author Virtusa|Polaris
 *
 */
@Configuration
class PatientRowMapper implements RowMapper<Patient> {

	@Override
	Patient mapRow(ResultSet rs, int rowNum) throws SQLException {

		Patient patient = new Patient()
		patient.with {
			id = rs.getLong('PATIENT_PK')
			if(rs.getDate(VnaSyncConstants.BIRTH_DATE))
				birthDate = CommonUtil.getUtilBirthDate(rs.getDate(VnaSyncConstants.BIRTH_DATE))
			firstName = rs.getString('FIRST_NAME') ? rs.getString('FIRST_NAME') : ''
			middleName = rs.getString('MIDDLE_NAME') ? rs.getString('MIDDLE_NAME') : ''
			lastName = rs.getString('LAST_NAME')  ? rs.getString('LAST_NAME') : ''
			prefix = rs.getString('PREFIX')
			suffix = rs.getString('SUFFIX')
			gender = rs.getString('GENDER')
			ethnicOrigin = rs.getString('ETHNIC_ORIGIN')
			mpiId = rs.getString('MPI_ID')
		}
		patient
	}
}
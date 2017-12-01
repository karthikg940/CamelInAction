package com.ffss.datax.vnasync.mapper

import java.sql.ResultSet
import java.sql.SQLException

import org.springframework.context.annotation.Configuration
import org.springframework.jdbc.core.RowMapper

import com.ffss.datax.common.domain.study.Patient
import com.ffss.datax.common.domain.study.PatientWorklist
import com.ffss.datax.common.domain.userprofile.Organization
import com.ffss.datax.vnasync.constants.VnaSyncConstants
/**
 * 
 * @author Virtusa|Polaris
 *
 */
@Configuration
class PatientWKLRowMapper implements RowMapper<PatientWorklist> {

	@Override
	PatientWorklist mapRow(ResultSet rs, int rowNum) throws SQLException {

		PatientWorklist patientWKL = new PatientWorklist()
		patientWKL.setId(rs.getLong('PATIENT_WORKLIST_PK'))

		patientWKL.setEncounterNumberType(rs.getLong('ENCOUNTER_NUMBER_TYPE'))
		patientWKL.setEncounterNumber(rs.getString('ENCOUNTER_NUMBER'))
		if(rs.getLong(VnaSyncConstants.PATIENT_FK))
			patientWKL.setPatient(new Patient(id:rs.getLong(VnaSyncConstants.PATIENT_FK)))
		if(rs.getLong(VnaSyncConstants.ORG_FK))
			patientWKL.setOrganization(new Organization(id:rs.getLong(VnaSyncConstants.ORG_FK)))

		patientWKL
	}
}
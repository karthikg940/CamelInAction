package com.ffss.datax.vnasync.mapper

import java.sql.ResultSet
import java.sql.SQLException

import org.hibernate.Query
import org.hibernate.Session
import org.joda.time.DateTime
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration
import org.springframework.jdbc.core.RowMapper
import org.springframework.orm.hibernate5.HibernateTemplate;

import com.ffss.datax.common.domain.study.Patient
import com.ffss.datax.common.domain.study.Person
import com.ffss.datax.common.domain.study.Study
import com.ffss.datax.vnasync.constants.VnaSyncConstants
import com.ffss.datax.vnasync.domain.util.CommonUtil
/**
 * 
 * @author Virtusa|Polaris
 *
 */
@Configuration
class StudyRowMapper implements RowMapper<Study> {

	@Autowired
	HibernateTemplate template
	
	@Override
	Study mapRow(ResultSet rs, int rowNum) throws SQLException {
		Study study
		Session session = template.sessionFactory.openSession()
		Query query = session.createQuery(
				'select count(*) from Study study where study.id=:studyId')
		query.setLong('studyId', rs.getLong('STUDY_PK'))
		Long count = (Long)query.uniqueResult()

		if(count>0){
		}else{
			study = new Study()
			study.setId(rs.getLong('STUDY_PK'))
			study.setPatient(new Patient(id:rs.getLong('PATIENT_FK')))
			study.setStudyId(rs.getString('STUDY_ID'))
			study.setDescription(rs.getString('DESCRIPTION'))

			if(rs.getDate(VnaSyncConstants.CREATED_DATE_TIME))
				study.setVnaCreatedDateTime(CommonUtil.getUtilDate(rs.getTimestamp(VnaSyncConstants.CREATED_DATE_TIME)))

			if(rs.getDate(VnaSyncConstants.SCHEDULED_DATE_TIME))
				study.setScheduledDateTime(CommonUtil.getUtilDate(rs.getTimestamp(VnaSyncConstants.SCHEDULED_DATE_TIME)))

			if(rs.getDate(VnaSyncConstants.PERFORMED_DATE_TIME))
				study.setPerformedDateTime(CommonUtil.getUtilDate(rs.getTimestamp(VnaSyncConstants.PERFORMED_DATE_TIME)))

			if(rs.getDate(VnaSyncConstants.COMPLETED_DATE_TIME))
				study.setCompletedDateTime(CommonUtil.getUtilDate(rs.getTimestamp(VnaSyncConstants.COMPLETED_DATE_TIME)))

			study.setLastStatusChangedDateTime(DateTime.now())
			study.setAlerted('N')
			study.setDeleted('N')
			setStudyFieldValue(study,rs)
		}
		session.close()
		study
	}

	def setStudyFieldValue(study,rs){

		study.setStudyUid(rs.getString('STUDY_UID'))
		if(rs.getLong(VnaSyncConstants.REFERRING_PHYSICIAN_FK))
			study.setReferringPhysician(new Person(id:rs.getLong(VnaSyncConstants.REFERRING_PHYSICIAN_FK)))
		if(rs.getLong(VnaSyncConstants.REQUESTING_PHYSICIAN_FK))
			study.setRequestingPhysician(new Person(id:rs.getLong(VnaSyncConstants.REQUESTING_PHYSICIAN_FK)))
		study.setPatientAge(rs.getString('PATIENT_AGE'))
		study.setPatientHeight(rs.getString('PATIENT_HEIGHT'))
		study.setPatientWeight(rs.getString('PATIENT_WEIGHT'))
		study.setInternalValidationStatus(rs.getString('INTERNAL_VALIDATION_STATUS'))
		study.setArchiveStatus(rs.getShort('ARCHIVE_STATUS'))
		if(rs.getDate(VnaSyncConstants.LAST_ACCESSED_DATE_TIME))
			study.setLastAccessedDateTime(CommonUtil.getUtilDate(rs.getTimestamp(VnaSyncConstants.LAST_ACCESSED_DATE_TIME)))
		study.setStmo(rs.getString('STMO'))
	}
}

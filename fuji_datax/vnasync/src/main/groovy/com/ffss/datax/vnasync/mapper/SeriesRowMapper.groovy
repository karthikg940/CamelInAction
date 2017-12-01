package com.ffss.datax.vnasync.mapper

import java.sql.ResultSet
import java.sql.SQLException

import org.hibernate.Query
import org.hibernate.Session
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration
import org.springframework.jdbc.core.RowMapper
import org.springframework.orm.hibernate5.HibernateTemplate;

import com.ffss.datax.common.domain.study.Person
import com.ffss.datax.common.domain.study.Series
import com.ffss.datax.common.domain.study.Study
import com.ffss.datax.vnasync.constants.VnaSyncConstants
import com.ffss.datax.vnasync.domain.util.CommonUtil
/**
 * 
 * @author Virtusa|Polaris
 *
 */
@Configuration
class SeriesRowMapper implements RowMapper<Series> {

	@Autowired
	HibernateTemplate template

	@Override
	Series mapRow(ResultSet rs, int rowNum) throws SQLException {
		Series series
		Session session = template.sessionFactory.openSession()
		Query query = session.createQuery(
		'select count(*) from Series series where series.id=:seriesId')
		query.setLong('seriesId', rs.getLong('SERIES_PK'))
		Long count = (Long)query.uniqueResult()

		if(count>0){
		}
		else{
			series = new Series()
			series.with {
				id = rs.getLong('SERIES_PK')
				study = new Study(id:rs.getLong('STUDY_FK'))

				seriesUid = rs.getString('SERIES_UID')
				seriesNumber = rs.getString('SERIES_NUMBER')
				description = rs.getString('DESCRIPTION')
				dicomMappingFile = rs.getString('DICOM_MAPPING_FILE')
				modality = rs.getString('MODALITY')
				bodyPart = rs.getString('BODY_PART')
				laterality = rs.getString('LATERALITY')
				if(rs.getLong(VnaSyncConstants.CLUSTER_FK))
				clusterId = rs.getLong(VnaSyncConstants.CLUSTER_FK)
				if(rs.getLong(VnaSyncConstants.OPERATOR_FK))
				operator = new Person(id:rs.getLong(VnaSyncConstants.OPERATOR_FK))
				equipmentUln = rs.getString('EQUIPMENT_ULN')
				equipmentId = rs.getString('EQUIPMENT_ID')
				organizationUln = rs.getString('ORGANIZATION_ULN')
				institution = rs.getString('INSTITUTION')
				department = rs.getString('DEPARTMENT')
				stationName = rs.getString('STATION_NAME')
				if(rs.getLong(VnaSyncConstants.PERFORMING_PHYSICIAN_FK))
				performingPhysician = new Person(id:rs.getLong(VnaSyncConstants.PERFORMING_PHYSICIAN_FK))
				if(rs.getDate(VnaSyncConstants.SERIES_DATE_TIME))
				seriesDateTime = CommonUtil.getUtilDate(rs.getTimestamp(VnaSyncConstants.SERIES_DATE_TIME))
				updateSequence = rs.getInt('UPDATE_SEQUENCE')
			}
			session.close()
			series
		}
	}
}
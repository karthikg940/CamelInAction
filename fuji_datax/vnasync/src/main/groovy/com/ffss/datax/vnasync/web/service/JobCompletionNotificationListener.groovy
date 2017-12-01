package com.ffss.datax.vnasync.web.service

import java.sql.ResultSet
import java.sql.SQLException

import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.batch.core.BatchStatus
import org.springframework.batch.core.JobExecution
import org.springframework.batch.core.listener.JobExecutionListenerSupport
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.jdbc.core.RowMapper

import com.ffss.datax.common.domain.userprofile.Organization

//import com.ffss.datax.batch.domain.User

class JobCompletionNotificationListener extends JobExecutionListenerSupport {

	private static final Logger log = LoggerFactory.getLogger(JobCompletionNotificationListener)

	private final JdbcTemplate jdbcTemplate

	@Autowired
	JobCompletionNotificationListener(JdbcTemplate jdbcTemplate) {
		this.jdbcTemplate = jdbcTemplate
	}

	@Override
	void afterJob(JobExecution jobExecution) {
		if(jobExecution.status == BatchStatus.COMPLETED) {
			log.info('!!! JOB FINISHED! Time to verify the results')

			List<Organization> results = jdbcTemplate.query('SELECT ORG_PK, ORG_NAME,DESCRIPTION,IS_PMO,IS_STMO,ID_TYPE,PREFIX,PARENT_ORG_FK FROM organization', new RowMapper<Organization>() {
						@Override
						Organization mapRow(ResultSet rs, int row) throws SQLException {
							//new Organization(rs.getInt(1), rs.getString(2),rs.getString(3),rs.getString(4),rs.getString(5),rs.getString(6),rs.getString(7),rs.getLong(8))
						}
					})

			for (Organization person : results) {
				log.info('Found <' + person + '> in the database.')
			}
		}
	}
}

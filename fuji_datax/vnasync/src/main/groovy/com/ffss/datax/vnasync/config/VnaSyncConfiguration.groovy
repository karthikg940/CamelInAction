package com.ffss.datax.vnasync.config

import groovy.util.logging.*

import java.lang.invoke.MethodHandleImpl.BindCaller.T
import java.sql.Connection
import java.sql.ResultSet
import java.sql.SQLException
import java.sql.Statement
import java.sql.Timestamp

import org.hibernate.SessionFactory
import org.springframework.batch.core.Job
import org.springframework.batch.core.JobExecution
import org.springframework.batch.core.JobExecutionListener
import org.springframework.batch.core.JobParameters
import org.springframework.batch.core.JobParametersBuilder
import org.springframework.batch.core.Step
import org.springframework.batch.core.configuration.annotation.JobBuilderFactory
import org.springframework.batch.core.configuration.annotation.StepBuilderFactory
import org.springframework.batch.core.launch.JobLauncher
import org.springframework.batch.core.launch.support.RunIdIncrementer
import org.springframework.batch.item.ItemWriter
import org.springframework.batch.item.database.HibernateItemWriter
import org.springframework.batch.item.database.JdbcCursorItemReader
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.http.HttpStatus.Series
import org.springframework.jdbc.core.JdbcTemplate

import com.ffss.datax.common.domain.study.AccessionNumber
import com.ffss.datax.common.domain.study.Patient
import com.ffss.datax.common.domain.study.PatientIdentifier
import com.ffss.datax.common.domain.study.PatientWorklist
import com.ffss.datax.common.domain.study.Person
import com.ffss.datax.common.domain.study.SopInstance
import com.ffss.datax.common.domain.study.Study
import com.ffss.datax.common.domain.userprofile.Organization
import com.ffss.datax.vnasync.constants.VnaSyncConstants
import com.ffss.datax.vnasync.mapper.AccessionNoRowMapper
import com.ffss.datax.vnasync.mapper.OrgRowMapper
import com.ffss.datax.vnasync.mapper.PatientIDRowMapper
import com.ffss.datax.vnasync.mapper.PatientRowMapper
import com.ffss.datax.vnasync.mapper.PatientWKLRowMapper
import com.ffss.datax.vnasync.mapper.PersonRowMapper
import com.ffss.datax.vnasync.mapper.SeriesRowMapper
import com.ffss.datax.vnasync.mapper.SopInstanceRowMapper
import com.ffss.datax.vnasync.mapper.StudyRowMapper
import com.ffss.datax.vnasync.web.service.AccessionNoItemProcessor
import com.ffss.datax.vnasync.web.service.JobCompletionNotificationListener
import com.ffss.datax.vnasync.web.service.OrganizationItemProcessor
import com.ffss.datax.vnasync.web.service.PatientIDItemProcessor
import com.ffss.datax.vnasync.web.service.PatientItemProcessor
import com.ffss.datax.vnasync.web.service.PatientWKLItemProcessor
import com.ffss.datax.vnasync.web.service.PersonItemProcessor
import com.ffss.datax.vnasync.web.service.SeriesItemProcessor
import com.ffss.datax.vnasync.web.service.SopItemProcessor
import com.ffss.datax.vnasync.web.service.StudyItemProcessor
/**
 * 
 * @author Virtusa|Polaris
 * Class contains all the spring batch configurations with reader and writer
 * configurations as well..
 */
@Log4j
@Configuration
class VnaSyncConfiguration {

	@Autowired
	JobBuilderFactory jobBuilderFactory

	@Autowired
	StepBuilderFactory stepBuilderFactory

	@Autowired
	DataSources dataSources

	@Autowired
	OrgRowMapper orgMapper

	@Autowired
	PatientRowMapper patientMapper

	@Autowired
	PersonRowMapper personMapper

	@Autowired
	SeriesRowMapper seriesMapper

	@Autowired
	StudyRowMapper studyMapper

	@Autowired
	SopInstanceRowMapper sopMapper

	@Autowired
	PatientIDRowMapper patientIDMapper

	@Autowired
	AccessionNoRowMapper accessionNoMapper

	@Autowired
	PatientWKLRowMapper patientWKLMapper

	@Autowired
	SessionFactory sessionFactory

	@Autowired
	private JobLauncher jobLauncher

	Timestamp batchStartDt

	private String status

	@Value('${schema.name}')
	String schemaName

	String findLastBatchProcessDate()
	throws SQLException {

		Statement stmt = null
		batchStartDt = null
		status =  null
		String query ='SELECT start_time, status FROM batch_job_execution ORDER BY start_time DESC limit 1'
		Connection con = (Connection)dataSources.dataxDataSource().connection
		try {
			stmt = con.createStatement()
			ResultSet rs = stmt.executeQuery(query)
			while (rs.next()) {
				batchStartDt = rs.getTimestamp('start_time')
				status = rs.getString('status')
				log.info("Batch** ${batchStartDt}       ${status}")
			}
		} catch (SQLException e ) {
			log.error('Exception :',e)
		} finally {
			if (stmt != null) {
				con.close()
				stmt.close()
			}
		}
		null
	}



	/**
	 * Configured data retrieval tasks for the reader
	 * @return
	 */
	@Bean
	JdbcCursorItemReader<Organization> orgReader(){
		JdbcCursorItemReader<Organization> reader = new JdbcCursorItemReader<Organization>()
		reader.setDataSource(dataSources.vnaDataSource())
		reader.setSql("SELECT ORG_PK, NAME,DESCRIPTION,IS_PMO,IS_STMO,ID_TYPE,PREFIX,PARENT_ORG_FK FROM ${schemaName}CFG_ORG_T")
		reader.setRowMapper(orgMapper)
		reader
	}


	/**
	 * Configured data retrieval tasks for the reader
	 * @return
	 */
	@Bean
	JdbcCursorItemReader<Patient> patientDataReader(){
		JdbcCursorItemReader<Patient> reader = new JdbcCursorItemReader<Patient>()
		reader.setDataSource(dataSources.vnaDataSource())

		reader.setSql("SELECT PATIENT_PK,BIRTH_DATE,FIRST_NAME,MIDDLE_NAME,LAST_NAME,PREFIX,SUFFIX,GENDER,ETHNIC_ORIGIN,MPI_ID FROM ${schemaName}PATIENT_T")
		reader.setRowMapper(patientMapper)

		reader
	}

	/**
	 * Configured data retrieval tasks for the reader
	 * @return
	 */
	@Bean
	JdbcCursorItemReader<Person> personDataReader(){
		JdbcCursorItemReader<Person> reader = new JdbcCursorItemReader<Person>()
		reader.setDataSource(dataSources.vnaDataSource())
		reader.setSql("SELECT PERSON_PK, FIRST_NAME,MIDDLE_NAME,LAST_NAME,PREFIX,SUFFIX FROM ${schemaName}PERSON_T")
		reader.setRowMapper(personMapper)

		reader
	}

	/**
	 * Configured data retrieval tasks for the reader
	 * @return
	 */
	@Bean
	JdbcCursorItemReader<Series> seriesDataReader(){
		JdbcCursorItemReader<Series> reader = new JdbcCursorItemReader<Series>()
		reader.setDataSource(dataSources.vnaDataSource())
		reader.setSql("SELECT SERIES_PK,STUDY_FK,SERIES_UID,SERIES_NUMBER,DESCRIPTION,DICOM_MAPPING_FILE,MODALITY,BODY_PART,LATERALITY,CLUSTER_FK,OPERATOR_FK,EQUIPMENT_ULN,EQUIPMENT_ID,ORGANIZATION_ULN,INSTITUTION,DEPARTMENT,STATION_NAME,PERFORMING_PHYSICIAN_FK, SERIES_DATE_TIME,UPDATE_SEQUENCE FROM ${schemaName}SERIES_T")
		reader.setRowMapper(seriesMapper)

		reader
	}

	/**
	 * Configured data retrieval tasks for the reader
	 * @return
	 */
	@Bean
	JdbcCursorItemReader<Study> studyDataReader(){
		JdbcCursorItemReader<Study> reader = new JdbcCursorItemReader<Study>()
		reader.setDataSource(dataSources.vnaDataSource())
		reader.setSql("SELECT STUDY_PK, PATIENT_FK,STUDY_ID,DESCRIPTION,CREATED_DATE_TIME,SCHEDULED_DATE_TIME,PERFORMED_DATE_TIME,COMPLETED_DATE_TIME,STUDY_UID,REFERRING_PHYSICIAN_FK,REQUESTING_PHYSICIAN_FK,PATIENT_AGE,PATIENT_HEIGHT,PATIENT_WEIGHT,INTERNAL_VALIDATION_STATUS,ARCHIVE_STATUS,LAST_ACCESSED_DATE_TIME,STMO FROM ${schemaName}STUDY_T")
		reader.setRowMapper(studyMapper)

		reader
	}

	/**
	 * Configured data retrieval tasks for the reader
	 * @return
	 */
	@Bean
	JdbcCursorItemReader<SopInstance> sopDataReader(){
		JdbcCursorItemReader<SopInstance> reader = new JdbcCursorItemReader<SopInstance>()
		reader.setDataSource(dataSources.vnaDataSource())
		reader.setSql("SELECT SOP_INSTANCE_PK,SERIES_FK,STUDY_FK,SOP_INSTANCE_TYPE,SOP_INSTANCE_UID,SOP_CUID,ACQUIRED_DATE_TIME,FILE_NAME,IMAGE_NUMBER,COMMITTED_INDICATOR,ORIGINAL_SIZE,FRAME_COUNT FROM ${schemaName}SOP_INSTANCE_T")
		reader.setRowMapper(sopMapper)

		reader
	}

	/**
	 * Configured data retrieval tasks for the reader
	 * @return
	 */
	@Bean
	JdbcCursorItemReader<PatientIdentifier> patientIdDataReader(){
		JdbcCursorItemReader<PatientIdentifier> reader = new JdbcCursorItemReader<PatientIdentifier>()
		reader.setDataSource(dataSources.vnaDataSource())
		reader.setSql("SELECT PATIENT_ID_PK,PATIENT_FK,ID_TYPE,ISSUER,MEDICAL_ID,CREATED_DATE_TIME,CALC_LC_MEDICAL_ID FROM ${schemaName}PATIENT_ID_T")
		reader.setRowMapper(patientIDMapper)

		reader
	}

	/**
	 * Configured data retrieval tasks for the reader
	 * @return
	 */
	@Bean
	JdbcCursorItemReader<PatientWorklist> patientWKLDataReader(){
		JdbcCursorItemReader<PatientWorklist> reader = new JdbcCursorItemReader<PatientWorklist>()
		reader.setDataSource(dataSources.vnaDataSource())
		reader.setSql("SELECT PATIENT_WORKLIST_PK,ENCOUNTER_NUMBER_TYPE,ENCOUNTER_NUMBER,PATIENT_FK,ORG_FK FROM ${schemaName}PATIENT_WORKLIST_T")
		reader.setRowMapper(patientWKLMapper)

		reader
	}

	/**
	 * Configured data retrieval tasks for the reader
	 * @return
	 */
	@Bean
	JdbcCursorItemReader<AccessionNumber> accessionNoDataReader(){
		JdbcCursorItemReader<AccessionNumber> reader = new JdbcCursorItemReader<AccessionNumber>()
		reader.setDataSource(dataSources.vnaDataSource())
		reader.setSql("SELECT ACCESSION_NUMBER,STUDY_FK FROM ${schemaName}ACCESSION_NUMBER_T")
		reader.setRowMapper(accessionNoMapper)

		reader
	}

	@Bean
	<T> ItemWriter<T> writer() {
		new HibernateItemWriter<T>() {
					{
						setSessionFactory(sessionFactory)
					}
				}
	}


	/**
	 * Holds listeners tasks..
	 * @return
	 */
	@Bean
	JobExecutionListener listener() {
		new JobCompletionNotificationListener(new JdbcTemplate(dataSources.dataxDataSource()))
	}


	/**
	 * 
	 * @return
	 */
	@Bean
	OrganizationItemProcessor orgProcessor() {
		new OrganizationItemProcessor()
	}


	@Bean
	PatientItemProcessor patientProcessor() {
		new PatientItemProcessor()
	}

	@Bean
	PersonItemProcessor personProcessor() {
		new PersonItemProcessor()
	}

	@Bean
	SeriesItemProcessor seriesProcessor() {
		new SeriesItemProcessor()
	}

	@Bean
	StudyItemProcessor studyProcessor() {
		new StudyItemProcessor()
	}

	@Bean
	SopItemProcessor sopProcessor() {
		new SopItemProcessor()
	}

	@Bean
	PatientIDItemProcessor patientIdProcessor() {
		new PatientIDItemProcessor()
	}

	@Bean
	PatientWKLItemProcessor patientWKLProcessor() {
		new PatientWKLItemProcessor()
	}

	@Bean
	AccessionNoItemProcessor accessionNoProcessor() {
		new AccessionNoItemProcessor()
	}

	/**
	 * Configuring job level information
	 * adding steps in the job
	 * @return Job info
	 */
	Job importVNASyncJobs() {
		jobBuilderFactory.get('importVNASyncJobs')
				.incrementer(new RunIdIncrementer())
				.listener(listener()).flow(step1())
				.next(step2()).next(step7()).next(step3()).next(step8()).next(step4())
				.next(step5()).next(step6()).next(step9())
				.end()
				.build()
	}

	
	/**
	 * Configuring step level information
	 * @return Step Object
	 */
	@Bean
	Step step1() {
		stepBuilderFactory.get('step1')
				.<Organization, Organization> chunk(VnaSyncConstants.numeric_100)
				.reader(orgReader())
				.listener(listener())
				.processor(orgProcessor())
				.writer(writer())
				.build()
	}

	/**
	 * Configuring step level information
	 * @return Step Object
	 */
	@Bean
	Step step2() {
		stepBuilderFactory.get('step2')
				.<Patient, Patient> chunk(VnaSyncConstants.numeric_500)
				.reader(patientDataReader())
				.listener(listener())
				.processor(patientProcessor())
				.writer(writer())
				.build()
	}

	/**
	 * Configuring step level information
	 * @return Step Object
	 */
	@Bean
	Step step3() {
		stepBuilderFactory.get('step3')
				.<Person, Person> chunk(VnaSyncConstants.numeric_100)
				.reader(personDataReader())
				.listener(listener())
				.processor(personProcessor())
				.writer(writer())
				.build()
	}

	/**
	 * Configuring step level information
	 * @return Step Object
	 */
	@Bean
	Step step4() {
		stepBuilderFactory.get('step4')
				.<Study, Study> chunk(VnaSyncConstants.numeric_100)
				.reader(studyDataReader())
				.listener(listener())
				.processor(studyProcessor())
				.writer(writer())
				.build()
	}

	/**
	 * Configuring step level information
	 * @return Step Object
	 */
	@Bean
	Step step5() {
		stepBuilderFactory.get('step5')
				.<Series, Series> chunk(VnaSyncConstants.numeric_100)
				.reader(seriesDataReader())
				.listener(listener())
				.processor(seriesProcessor())
				.writer(writer())
				.build()
	}

	/**
	 * Configuring step level information
	 * @return Step Object
	 */
	@Bean
	Step step6() {
		stepBuilderFactory.get('step6')
				.<SopInstance, SopInstance> chunk(VnaSyncConstants.numeric_500)
				.reader(sopDataReader())
				.listener(listener())
				.processor(sopProcessor())
				.writer(writer())
				.build()
	}
	/**
	 * Configuring step level information
	 * @return Step Object
	 */
	@Bean
	Step step7() {
		stepBuilderFactory.get('step7')
				.<PatientIdentifier, PatientIdentifier> chunk(VnaSyncConstants.numeric_100)
				.reader(patientIdDataReader())
				.listener(listener())
				.processor(patientIdProcessor())
				.writer(writer())
				.build()
	}

	/**
	 * Configuring step level information
	 * @return Step Object
	 */
	@Bean
	Step step8() {
		stepBuilderFactory.get('step8')
				.<PatientWorklist, PatientWorklist> chunk(VnaSyncConstants.numeric_100)
				.reader(patientWKLDataReader())
				.listener(listener())
				.processor(patientWKLProcessor())
				.writer(writer())
				.build()
	}

	/**
	 * Configuring step level information
	 * @return Step Object
	 */
	@Bean
	Step step9() {
		stepBuilderFactory.get('step9')
				.<AccessionNumber, AccessionNumber> chunk(VnaSyncConstants.numeric_100)
				.reader(accessionNoDataReader())
				.listener(listener())
				.processor(accessionNoProcessor())
				.writer(writer())
				.build()
	}

	void perform() {
		findLastBatchProcessDate()
		log.info("Batch :  ${batchStartDt}       ${status}")
		if(!status?.equalsIgnoreCase('STARTED')){
			log.info("Job Started at : ${new Date()}")
			JobParameters param = new JobParametersBuilder().addString('JobID',
					String.valueOf(System.currentTimeMillis())).toJobParameters()

			JobExecution execution = jobLauncher.run(importVNASyncJobs(),param)
			log.info("Job finished with status : ${execution.status}")
		}
	}
}


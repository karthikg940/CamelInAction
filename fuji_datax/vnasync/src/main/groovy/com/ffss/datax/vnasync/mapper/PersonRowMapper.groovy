package com.ffss.datax.vnasync.mapper

import java.sql.ResultSet
import java.sql.SQLException

import org.springframework.context.annotation.Configuration
import org.springframework.jdbc.core.RowMapper

import com.ffss.datax.common.domain.study.Person
/**
 * 
 * @author Virtusa|Polaris
 *
 */

@Configuration
class PersonRowMapper implements RowMapper<Person> {

	@Override
	Person mapRow(ResultSet rs, int rowNum) throws SQLException {

		Person person = new Person()
		person.with{
			id = rs.getLong('PERSON_PK')
			firstName = rs.getString('FIRST_NAME')
			middleName = rs.getString('MIDDLE_NAME')
			lastName = rs.getString('LAST_NAME')
			prefix = rs.getString('PREFIX')
			suffix = rs.getString('SUFFIX')
		}
		person
	}
}
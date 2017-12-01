package com.ffss.datax.vnasync.mapper

import java.sql.ResultSet
import java.sql.SQLException

import org.springframework.context.annotation.Configuration
import org.springframework.jdbc.core.RowMapper

import com.ffss.datax.common.domain.userprofile.Organization

/**
 * 
 * @author Virtusa|Polaris
 *
 */
@Configuration
class OrgRowMapper implements RowMapper<Organization> {

	@Override
	Organization mapRow(ResultSet rs, int rowNum) throws SQLException {

		Organization org = new Organization()
		org.with{
			id = rs.getLong('ORG_PK')
			orgName = rs.getString('NAME')
			description = rs.getString('DESCRIPTION')
			isPmo = rs.getString('IS_PMO')
			isStmo = rs.getString('IS_STMO')
			idType = rs.getString('ID_TYPE')
			prefix = rs.getString('PREFIX')
			parentOrgFk = rs.getLong('PARENT_ORG_FK')
		}
		org
	}
}
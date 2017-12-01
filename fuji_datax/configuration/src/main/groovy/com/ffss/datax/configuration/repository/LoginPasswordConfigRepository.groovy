package com.ffss.datax.configuration.repository



import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query

import com.ffss.datax.common.domain.configuration.OrgLoginConfigMap

interface LoginPasswordConfigRepository extends JpaRepository<OrgLoginConfigMap,Long>{
	
	@Query("select s from OrgLoginConfigMap s where s.isDefault = 'Y'")
	OrgLoginConfigMap findDefaultValue()
	
	OrgLoginConfigMap findByOrganizationId(Long orgId)
}

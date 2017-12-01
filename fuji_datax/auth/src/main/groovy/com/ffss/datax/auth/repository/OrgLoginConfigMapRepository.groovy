package com.ffss.datax.auth.repository



import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query

import com.ffss.datax.common.domain.configuration.OrgLoginConfigMap

interface OrgLoginConfigMapRepository extends JpaRepository<OrgLoginConfigMap,Long>{


	OrgLoginConfigMap findByOrganizationId(Long orgId)
	
	@Query("select org from OrgLoginConfigMap org where org.isDefault='Y'")
	OrgLoginConfigMap findDefaultValue()
}

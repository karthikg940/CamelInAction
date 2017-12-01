package com.ffss.datax.study.repository


import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import org.springframework.stereotype.Repository

import com.ffss.datax.common.domain.userprofile.UserAccount

/**
 *Service interface for Jpa CRUD operations.
 *
 *@author Virtusa|Polaris
 *
 */
@Repository
interface UserAccountRepository extends JpaRepository<UserAccount, Long> {
	@Query('select ua from UserAccount ua where ua.id =:id')
	UserAccount findUser(@Param('id')Long id)

	@Query("select ua from UserAccount ua where ua.userName ='system' ")
	UserAccount findByUserName()

	@Query("select ua from UserAccount ua where ua.isActive ='Y' and ua.organization.id =:orgId")
	List<UserAccount> findAdminUsersByOrgId(@Param('orgId') Long orgId)
}



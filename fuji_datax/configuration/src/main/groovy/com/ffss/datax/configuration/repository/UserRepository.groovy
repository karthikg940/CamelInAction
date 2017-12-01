package com.ffss.datax.configuration.repository

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import org.springframework.stereotype.Repository

import com.ffss.datax.common.domain.userprofile.UserAccount

/**
 *Service interface for Jpa CRUD operations.
 *
 *@author Virtusa|Polaris
 */
@Repository
interface UserRepository extends JpaRepository<UserAccount, Long> {
	@Query('From UserAccount ua join fetch ua.organization where ua.id=:userId')
	def findOrgVal(@Param('userId')Long userId)


	UserAccount findByUserName(String userName)
	
	UserAccount findById(id)
	
	UserAccount findByEmailAddressIgnoreCase(String emailAddress)
	
	@Query("select s from UserAccount s where isActive='Y' and s.id!=:id")
	List<UserAccount> findOtherActiveUsers(@Param('id') Long id)
	
	@Query("select ua from UserAccount ua where ua.organization.id=:orgId")
	List<UserAccount> findUserListByOrgId(@Param('orgId')Long orgId)
	
}



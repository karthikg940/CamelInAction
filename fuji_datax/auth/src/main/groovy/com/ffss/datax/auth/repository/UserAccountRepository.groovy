package com.ffss.datax.auth.repository


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
interface UserAccountRepository extends JpaRepository<UserAccount, Long>
{
	
	UserAccount findByUserName(String userName)
	
	@Query("select ua from UserAccount ua where ua.isActive ='Y' and ua.userName=:username ")
	UserAccount findActiveUserByUserName(@Param('username') String username)
	
	@Query("select ua from UserAccount ua where ua.isActive='Y' and ua.emailAddress=:email")
	UserAccount findActiceUserByEmail(@Param('email') String email)
	
	UserAccount findById(id)
}



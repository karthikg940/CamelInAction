package com.ffss.datax.workflow.repository


import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

import com.ffss.datax.common.domain.userprofile.UserAccount

/**
 *Service interface for Jpa CRUD operations.
 *
 *@author Virtusa|Polaris
 *
 */
@Repository
interface UserRepository extends JpaRepository<UserAccount, Long> {
}



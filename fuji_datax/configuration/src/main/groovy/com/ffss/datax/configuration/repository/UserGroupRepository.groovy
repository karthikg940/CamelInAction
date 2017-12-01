package com.ffss.datax.configuration.repository


import org.springframework.data.jpa.repository.JpaRepository

import com.ffss.datax.common.domain.userprofile.UserGroup

/**
 *Service interface for Jpa CRUD operations.
 *
 *@author Virtusa|Polaris
 */
interface UserGroupRepository extends JpaRepository<UserGroup, Long> {

	UserGroup findByGroupName(String groupName)
}



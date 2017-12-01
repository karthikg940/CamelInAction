package com.ffss.datax.configuration.repository

import org.springframework.data.jpa.repository.JpaRepository

import com.ffss.datax.common.domain.userprofile.UserRole

interface RoleRepository extends JpaRepository<UserRole, Long>{
	UserRole findByRoleName(String groupName)
}

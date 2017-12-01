package com.ffss.datax.configuration.repository

import org.springframework.data.jpa.repository.JpaRepository

import com.ffss.datax.common.domain.userprofile.Permission

interface PermissionRepository extends JpaRepository<Permission, Long> {

}

package com.ffss.datax.configuration.repository

import org.springframework.data.jpa.repository.JpaRepository

import com.ffss.datax.common.domain.userprofile.Organization

interface OrganizationRepository extends JpaRepository<Organization,Long>{

}

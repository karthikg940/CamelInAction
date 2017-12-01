package com.ffss.datax.workflow.repository

import org.springframework.data.jpa.repository.JpaRepository

import com.ffss.datax.common.domain.workflow.Preference

interface PreferenceRepository extends JpaRepository<Preference,Long> {

	List<Preference> findByOrganizationId(id)
}

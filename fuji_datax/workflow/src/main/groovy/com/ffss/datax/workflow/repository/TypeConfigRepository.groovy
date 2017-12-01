package com.ffss.datax.workflow.repository

import org.springframework.data.jpa.repository.JpaRepository

import com.ffss.datax.common.domain.workflow.TypeConfig

interface TypeConfigRepository extends JpaRepository<TypeConfig, Long> {

	TypeConfig findByTypeName(type)
}

package com.ffss.datax.analytics.test.web.resource;

import org.springframework.data.jpa.repository.JpaRepository

import com.ffss.datax.common.domain.workflow.TypeConfig

public interface TypeConfigRepository extends JpaRepository<TypeConfig, Long> {

	TypeConfig findOneByTypeName(type)
}

package com.ffss.datax.analytics.test.web.resource;

import org.springframework.data.jpa.repository.JpaRepository

import com.ffss.datax.common.domain.study.Series

interface SeriesRepository extends JpaRepository<Series,Long> {
	
}

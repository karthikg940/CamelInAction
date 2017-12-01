package com.ffss.datax.study.test.web.resource;

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Modifying
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param

import com.ffss.datax.common.domain.study.Series

interface SeriesRepository extends JpaRepository<Series,Long> {
	
	@Modifying
	@Query('update Series s set s.operator=:operator where s.study.id=:id')
	int updateUser(@Param('id') Long id,@Param('operator') operator)
}

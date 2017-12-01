package com.ffss.datax.vnasync.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import org.springframework.stereotype.Repository

import com.ffss.datax.common.domain.configuration.ExamTypeDeviceMap

@Repository
interface ExamTypeDeviceMapRepository extends JpaRepository<ExamTypeDeviceMap, Long> {

	@Query("select deviceMap from ExamTypeDeviceMap deviceMap join fetch deviceMap.examTypeMap where deviceMap.aliasName = :name")
	ExamTypeDeviceMap findByAliasNameIgnoreCase(@Param('name')String name)
}

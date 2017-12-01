package com.ffss.datax.configuration.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import org.springframework.stereotype.Repository

import com.ffss.datax.common.domain.configuration.ExamTypeDeviceMap

@Repository
interface ExamTypeDeviceMapRepository extends JpaRepository<ExamTypeDeviceMap, Long> {

	@Query('select edm from ExamTypeDeviceMap edm join fetch edm.examTypeMap e where e.id=:id')
	List<ExamTypeDeviceMap> removeAlias(@Param('id') Long id)
}

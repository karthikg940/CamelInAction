package com.ffss.datax.configuration.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import org.springframework.stereotype.Repository

import com.ffss.datax.common.domain.configuration.ExamTypeCptCode

@Repository
interface ExamTypeCptCodeRepository extends JpaRepository<ExamTypeCptCode, Long> {

	@Query("select tm from ExamTypeCptCode tm join fetch tm.examTypeMap e where e.id=:id and tm.isMandatory='Y'")
	List<ExamTypeCptCode> removemanCptCodes(@Param('id') Long id)

	@Query("select tm from ExamTypeCptCode tm join fetch tm.examTypeMap e where e.id=:id and tm.isMandatory='N'")
	List<ExamTypeCptCode> removeoptCptCodes(@Param('id') Long id)

	@Query('select tm from ExamTypeCptCode tm join fetch tm.examTypeMap e where e.id=:id')
	List<ExamTypeCptCode> findByExamType(@Param('id') Long id)
}

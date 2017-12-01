 package com.ffss.datax.configuration.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param

import com.ffss.datax.common.domain.configuration.TagsExamTypeMap

interface TagsRepository extends JpaRepository<TagsExamTypeMap, Long> {

	@Query('select tags from TagsExamTypeMap tags join fetch tags.examTypeMap e where e.id=:id')
	List<TagsExamTypeMap> getTagsForExam(@Param('id')Long id)
}
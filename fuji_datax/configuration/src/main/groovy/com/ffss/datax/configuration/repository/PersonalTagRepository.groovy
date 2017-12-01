package com.ffss.datax.configuration.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Modifying
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param

import com.ffss.datax.common.domain.tag.PersonalTag

interface PersonalTagRepository extends JpaRepository<PersonalTag, Long> {

	@Query('select tags from PersonalTag tags where tags.userId=:userId')
	List<PersonalTag> getTagsForUser(@Param('userId')Long userId)

	@Query('select pt from PersonalTag pt where pt.userId=:userId and pt.name like %:srchText%')
	List<PersonalTag> searchTag(@Param('srchText') String srchText,@Param('userId') Long userId)
	
	@Modifying
	@Query('delete from PersonalTag pt where pt.userId=:userId')
	int deleteAllPersonalTags(@Param('userId') Long userId)
}

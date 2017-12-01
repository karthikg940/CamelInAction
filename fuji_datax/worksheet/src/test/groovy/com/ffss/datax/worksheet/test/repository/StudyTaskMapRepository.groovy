package com.ffss.datax.worksheet.test.repository

import org.springframework.data.jpa.repository.JpaRepository

import com.ffss.datax.common.domain.study.StudyTaskMap

public interface StudyTaskMapRepository extends JpaRepository<StudyTaskMap, Long> {
	
}
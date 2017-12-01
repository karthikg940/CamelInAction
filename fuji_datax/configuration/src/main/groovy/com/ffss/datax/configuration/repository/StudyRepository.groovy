package com.ffss.datax.configuration.repository

import com.ffss.datax.common.domain.study.Study
import org.springframework.data.jpa.repository.JpaRepository

interface StudyRepository extends JpaRepository<Study,Long>{
}

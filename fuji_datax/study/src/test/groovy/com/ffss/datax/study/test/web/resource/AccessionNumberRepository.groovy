package com.ffss.datax.study.test.web.resource

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param

import com.ffss.datax.common.domain.study.AccessionNumber


/**
 * The Interface AccessionNumberRepository.
 */
interface AccessionNumberRepository   extends JpaRepository<AccessionNumber, Long> {
}

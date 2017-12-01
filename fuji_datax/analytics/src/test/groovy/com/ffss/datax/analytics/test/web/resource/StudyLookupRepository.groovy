 package com.ffss.datax.analytics.test.web.resource

import org.springframework.data.jpa.repository.JpaRepository


import com.ffss.datax.common.domain.study.StudyLookup



/**
 * The Interface StudyLookupRepository.
 * @author Virtusa|Polaris
 */
interface StudyLookupRepository extends JpaRepository<StudyLookup, Long> {
}
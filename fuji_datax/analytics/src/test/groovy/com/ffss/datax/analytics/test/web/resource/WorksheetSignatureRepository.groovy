package com.ffss.datax.analytics.test.web.resource

import org.springframework.data.jpa.repository.JpaRepository

import com.ffss.datax.common.domain.worksheet.WorksheetSignature

/**
 * The Interface SignatureRepository.
 */
interface WorksheetSignatureRepository extends JpaRepository<WorksheetSignature, Long>  {

}


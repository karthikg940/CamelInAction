package com.ffss.datax.worksheet.repository
import org.springframework.data.jpa.repository.JpaRepository

import com.ffss.datax.common.domain.worksheet.WorksheetLookup

/**
 * The Interface WorksheetLookupRepository.
 */
interface WorksheetLookupRepository extends JpaRepository<WorksheetLookup, Long> {
}

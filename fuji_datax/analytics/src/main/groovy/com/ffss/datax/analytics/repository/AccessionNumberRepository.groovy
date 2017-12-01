package com.ffss.datax.analytics.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param

import com.ffss.datax.common.domain.study.AccessionNumber


/**
 * The Interface AccessionNumberRepository.
 */
interface AccessionNumberRepository   extends JpaRepository<AccessionNumber, Long> {

	/**
	 * Gets the accession number.
	 *
	 * @param id the id
	 * @return the accession number
	 */
	@Query('select acc from AccessionNumber acc where acc.study.id=:id')
	AccessionNumber getAccessionNumber(@Param('id') Long id)
}

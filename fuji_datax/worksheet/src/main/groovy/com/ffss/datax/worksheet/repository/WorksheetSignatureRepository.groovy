package com.ffss.datax.worksheet.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Modifying
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param

import com.ffss.datax.common.domain.worksheet.WorksheetSignature

/**
 * The Interface SignatureRepository.
 */
interface WorksheetSignatureRepository extends JpaRepository<WorksheetSignature, Long>  {

	/**
	 * Update signature.
	 *
	 * @param wrksht the wrksht
	 * @param signData the sign data
	 * @param wrkShtStatus the wrk sht status
	 * @return the int
	 */
	@Modifying
	@Query('update WorksheetSignature w set w.signedName=:signData, w.wrkShtStatus=:wrkShtStatus where w.worksheet.id = (select id from Worksheet w  where w.id =:wrksht)')
	int updateSignature(@Param('wrksht')Long wrksht,@Param('signData')String signData,@Param('wrkShtStatus')String wrkShtStatus)

	/**
	 * Gets the signature.
	 *
	 * @param wrksht the wrksht
	 * @return the signature
	 */
	@Query('FROM WorksheetSignature w join fetch w.worksheet ws where ws.id =:wrksht')
	List<WorksheetSignature> findSignatureByWorksheetId(@Param('wrksht')Long wrksht)
	
	/**
	 * Delete attested signature.
	 *
	 * @param worksheetId the worksheet id
	 * @return the int
	 */
	@Modifying
	@Query("delete WorksheetSignature w  where ((w.worksheet.id =:worksheetId) AND (w.wrkShtStatus in('Signed','Attested')))")
	int deleteAttestedSignature(@Param('worksheetId') Long worksheetId)
	
	/**
	 * Delete attested sign.
	 *
	 * @param worksheetId the worksheet id
	 * @return the int
	 */
	@Modifying
	@Query("delete WorksheetSignature w  where ((w.worksheet.id =:worksheetId) AND (w.wrkShtStatus in('Attested')))")
	int deleteAttestedSign(@Param('worksheetId') Long worksheetId)
}


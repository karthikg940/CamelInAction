package com.ffss.datax.worksheet.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Modifying
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param

import com.ffss.datax.common.domain.worksheet.Worksheet

/**
 * The Interface WorksheetRepository.
 */
interface WorksheetRepository extends JpaRepository<Worksheet, Long> {
	
	/**
	 * Find by exam type.
	 *
	 * @param studyId the study id
	 * @return the list
	 */
	@Query("select w from Worksheet w join fetch w.study s join fetch w.template  where w.examWorksheetType in ('Procedural') and s.id=:studyId")
	List<Worksheet> findWorksheetByTypeProcedural(@Param('studyId') studyId)
	
	/**
	 * Find qa.
	 *
	 * @param studyId the study id
	 * @return the list
	 */
	@Query("select w from Worksheet w join fetch w.study s join fetch w.template  where ( w.examWorksheetType in ('QA') and s.id=:studyId)")
	List<Worksheet> findWorksheetByTypeQA(@Param('studyId') studyId)
	
	/**
	 * Find by study.
	 *
	 * @param studyId the study id
	 * @param type the type
	 * @return the worksheet
	 */
	@Query('select w from Worksheet w join fetch w.study s join fetch w.template  where s.id=:studyId and w.examWorksheetType=:type')
	Worksheet findWorksheetByStudyAndType(@Param('studyId') studyId,@Param('type') type)
	
	/**
	 * Find by study alone.
	 *
	 * @param studyId the study id
	 * @return the worksheet
	 */
	@Query('select w from Worksheet w join fetch w.study s join fetch w.template  where s.id=:studyId')
	Worksheet findWorksheetByStudy(@Param('studyId') studyId)
	
	
	/**
	 * Gets the study.
	 *
	 * @param worksheetId the worksheet id
	 * @return the study
	 */
	@Query('select w from Worksheet w join fetch w.study s where w.id=:worksheetId')
	Worksheet findWorksheetWithStudy(@Param('worksheetId') worksheetId)
	
	/**
	 * Delete worksheet.
	 *
	 * @param id the id
	 * @return the int
	 */
	@Modifying
	@Query('delete from Worksheet w where w.id=:id')
	int deleteWorksheet(@Param('id') Long id)
	
	/**
	 * Gets the poc template id.
	 *
	 * @param studyId the study id
	 * @return the poc template id
	 */
	@Query("select w from Worksheet w where (w.examWorksheetType='Procedural' AND w.study.id=:studyId)")
	Worksheet findWorksheetByStudyTypeProcedural(@Param('studyId') Long studyId)
	
	/**
	 * Find qa worksheet by study id.
	 *
	 * @param studyId the study id
	 * @return the worksheet
	 */
	@Query("select w from Worksheet w where (w.examWorksheetType='QA' AND w.study.id=:studyId)")
	Worksheet findQaWorksheetByStudyId(@Param('studyId') Long studyId)
}

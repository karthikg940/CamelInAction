package com.ffss.datax.vnasync.repository

 
import com.ffss.datax.common.domain.study.Study
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param



interface StudyRepository extends JpaRepository<Study, Long> {

	@Query('select s from Study s join fetch s.studyExamTypeMap stMap join fetch stMap.examTypeMap map where s.id =:id')
	Study getExamTypeForStudy(@Param('id') Long id)
	
	@Query('select s from Study s join fetch s.sopInstance where s.id=:id')
	Study getFrameCountForStudyImage(@Param('id') Long id)
}

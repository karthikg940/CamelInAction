package com.ffss.datax.study.service

import javax.persistence.EntityManager
import javax.persistence.PersistenceContext
import javax.persistence.criteria.CriteriaBuilder
import javax.persistence.criteria.CriteriaQuery
import javax.persistence.criteria.Expression
import javax.persistence.criteria.Join
import javax.persistence.criteria.JoinType
import javax.persistence.criteria.Predicate
import javax.persistence.criteria.Root

import org.springframework.stereotype.Service
import org.joda.time.DateTime


import com.ffss.datax.common.constants.StudyStatusEnum
import com.ffss.datax.common.domain.configuration.ExamTypeMap
import com.ffss.datax.common.domain.study.Patient
import com.ffss.datax.common.domain.study.Series
import com.ffss.datax.common.domain.study.Study
import com.ffss.datax.common.domain.study.StudyExamTypeMap
import com.ffss.datax.common.domain.study.StudyLookup
import com.ffss.datax.common.domain.study.StudyTaskMap
import com.ffss.datax.common.domain.userprofile.UserAccount
import com.ffss.datax.common.domain.workflow.TaskRole
import com.ffss.datax.common.domain.workflow.TaskRoleConfig
import com.ffss.datax.common.domain.workflow.UserTaskStage
import com.ffss.datax.common.domain.workflow.WorkflowTask
import com.ffss.datax.study.constants.StudyConstants


/**
 * @author Virtusa|Polaris
 * The Class StudySearchService.
 * to get the studies based on filters
 * it uses criteria builder to apply filters and fetch the studies
 * 
 */
@Service
class StudySearchService {

	/** The Entity Manager. */
	@PersistenceContext
	EntityManager em

	/**
	 * Gets the search result based on the filters applied.
	 *
	 * @param request the request
	 * @return the search result
	 */
	def getSearchResult(request) {
		def results

		//Criteria Builder to generate dynamic query based on filter parameters
		CriteriaBuilder cb = em.criteriaBuilder
		CriteriaQuery<Study> query = cb.createQuery(Study)

		//Predicate to provide conditions
		List <Predicate> p = []
		Predicate patientNameFilter, pocNameFilter

		//Study  - Root Domain
		Root<Study> study = query.from(Study)

		//Joins - study
		Join<Study, Patient> patients = study.join('patient')
		Join<Study, StudyLookup> studyLookup = study.join(StudyConstants.STATUS,JoinType.LEFT)
		Join<Study, Series> series = study.join(StudyConstants.STATUS,JoinType.LEFT)
		Join<Study, StudyExamTypeMap> studyExamTypeMap = study.join('studyExamTypeMap',JoinType.LEFT)
		Join<StudyExamTypeMap, ExamTypeMap> examTypeMap = studyExamTypeMap.join('examTypeMap',JoinType.LEFT)
		Join<Study, StudyTaskMap> studyTaskMap = study.join('studyTaskMap',JoinType.LEFT)
		Join<StudyTaskMap,WorkflowTask> workflowTask = studyTaskMap.join('workflowTask',JoinType.LEFT)
		Join<WorkflowTask,UserTaskStage> userTaskStage = workflowTask.join('userTaskStage',JoinType.LEFT)
		Join<UserTaskStage,TaskRoleConfig> taskRoleConfig = userTaskStage.join('taskRoleConfig',JoinType.LEFT)
		Join<TaskRoleConfig,TaskRole> taskRole = taskRoleConfig.join('taskRole',JoinType.LEFT)
		Join<UserTaskStage,UserAccount> user = userTaskStage.join('user',JoinType.LEFT)

		//Expressions for in clause conditions
		Expression<String> statusExpression = studyLookup.get(StudyConstants.NAME)
		Expression<String> roleExpression = taskRole.get(StudyConstants.TASK_ROLE_NAME)

		//the date (yyyy-MM-dd HH:mm:ss), status, isDeleted, user, role
		p.add(cb.between(study.<DateTime>get(request.createdDate), request.fromDate,request.toDate))
		p.add(cb.equal(study.get('deleted'), 'N'))

		if(request.userId != null){
			p.add(cb.equal(user.get('id'), request.userId))
		}
		if(request.role){
			p.add(roleExpression.in(request.role))
		}
		p.add(cb.equal(study.get('orgFk'), request.orgId))											 

		//To add the filters/Predicates
		if(request.patientName){
			//Expression criteria for the combination of firstName, lastname and middleName
			Expression<String> exp1 = cb.concat(patients.get(StudyConstants.FIRST_NAME), StudyConstants.DEFAULTSINGLESPACE)
			exp1 = cb.concat(exp1, patients.get(StudyConstants.LAST_NAME))
			Expression<String> exp3 = cb.concat(patients.get(StudyConstants.FIRST_NAME), StudyConstants.DEFAULTSINGLESPACE)
			exp3 = cb.concat(exp3, patients.get(StudyConstants.MIDDLE_NAME))
			Expression<String> exp6 = cb.concat(patients.get(StudyConstants.MIDDLE_NAME), StudyConstants.DEFAULTSINGLESPACE)
			exp6 = cb.concat(exp6, patients.get(StudyConstants.LAST_NAME))
			Expression<String> exp7 = cb.concat(patients.get(StudyConstants.FIRST_NAME), StudyConstants.DEFAULTSINGLESPACE)
			Expression<String> exp8 = cb.concat(patients.get(StudyConstants.MIDDLE_NAME), StudyConstants.DEFAULTSINGLESPACE)
			exp8 = cb.concat(exp7,exp8)
			Expression<String> exp9 = cb.concat(exp8,patients.get(StudyConstants.LAST_NAME))
			patientNameFilter = cb.or(cb.like(exp1, StudyConstants.PERCENTAGE+ request.patientName +StudyConstants.PERCENTAGE),cb.like(exp3, StudyConstants.PERCENTAGE+ request.patientName +StudyConstants.PERCENTAGE),
					cb.like(exp6, StudyConstants.PERCENTAGE+ request.patientName +StudyConstants.PERCENTAGE),cb.like(exp9, StudyConstants.PERCENTAGE+ request.patientName +StudyConstants.PERCENTAGE))
			p.add(patientNameFilter)
		}
		if(request.filterStatus){
			//To retrieve New studies
			if (request.filterStatus == StudyStatusEnum.NEW.value){
				p.add(study.get(StudyConstants.STATUS).isNull())
			}
			else{
				p.add(cb.equal(studyLookup.get(StudyConstants.NAME), request.filterStatus))
			}
		}
		else{
			if(request.status){
				p.add(statusExpression.in(request.status))
			}
		}
		if(request.examType){
			//To retrieve unassociated examtype studies
			if (request.examType == StudyConstants.UNSPECIFIED){
				p.add(studyExamTypeMap.get(StudyConstants.STUDY).isNull())
			}
			else{
				p.add(cb.equal(examTypeMap.get('examTypeDesc'), request.examType))
			}

		}
		if(request.pocName){
			//Expression criteria for the combination of firstName, lastname and middleName
			p.add(cb.equal(taskRole.get(StudyConstants.TASK_ROLE_NAME),StudyConstants.ROLE_PERFORMING))
			Expression<String> exp1 = cb.concat(user.get(StudyConstants.FIRST_NAME), StudyConstants.DEFAULTSINGLESPACE)
			exp1 = cb.concat(exp1, user.get(StudyConstants.LAST_NAME))
			Expression<String> exp3 = cb.concat(user.get(StudyConstants.FIRST_NAME), StudyConstants.DEFAULTSINGLESPACE)
			exp3 = cb.concat(exp3, user.get(StudyConstants.MIDDLE_NAME))
			Expression<String> exp6 = cb.concat(user.get(StudyConstants.MIDDLE_NAME), StudyConstants.DEFAULTSINGLESPACE)
			exp6 = cb.concat(exp6, user.get(StudyConstants.LAST_NAME))
			Expression<String> exp7 = cb.concat(user.get(StudyConstants.FIRST_NAME), StudyConstants.DEFAULTSINGLESPACE)
			Expression<String> exp8 = cb.concat(user.get(StudyConstants.MIDDLE_NAME), StudyConstants.DEFAULTSINGLESPACE)
			exp8 = cb.concat(exp7,exp8)
			Expression<String> exp9 = cb.concat(exp8,user.get(StudyConstants.LAST_NAME))
			pocNameFilter = cb.or(cb.like(exp1, StudyConstants.PERCENTAGE+ request.pocName +StudyConstants.PERCENTAGE), cb.like(exp3, StudyConstants.PERCENTAGE+ request.pocName +StudyConstants.PERCENTAGE)
					,cb.like(exp6, StudyConstants.PERCENTAGE+ request.pocName +StudyConstants.PERCENTAGE),cb.like(exp9, StudyConstants.PERCENTAGE+ request.pocName +StudyConstants.PERCENTAGE))
			p.add(pocNameFilter)
		}
		else{
			if(request.role){
				p.add(roleExpression.in(request.role))
			}
		}


		//add all conditions
		if(!p.isEmpty()){
			p.removeAll([null])
			Predicate[] pr = new Predicate[p.size()]
			p.toArray(pr)
			query.where(pr)
		}

		//Execute Query with predicates
		results = em.createQuery(query).resultList
		results

	}

}

package com.ffss.datax.common.log

import groovy.util.logging.*

import javax.persistence.EntityManager
import javax.persistence.PersistenceContext

import org.apache.shiro.SecurityUtils
import org.apache.shiro.subject.Subject
import org.aspectj.lang.ProceedingJoinPoint
import org.aspectj.lang.Signature
import org.aspectj.lang.annotation.Around
import org.aspectj.lang.annotation.Aspect
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component

import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.datatype.hibernate4.Hibernate4Module
import com.ffss.datax.common.constants.Constants
import com.ffss.datax.common.constants.EntityEnum
import com.ffss.datax.common.domain.*
import com.ffss.datax.common.domain.study.Study
import com.ffss.datax.common.domain.userprofile.UserAccount
import com.ffss.datax.common.domain.userprofile.UserGroup
import com.ffss.datax.common.domain.worksheet.Worksheet
import com.ffss.datax.common.service.AsyncAuditService
/**			 
 * Pick up logs from different micro services 
 * 
 *
 * @author Virtusa|Polaris
 */
@Log4j
@Aspect
@Component
class AuditLogger {
	
	@Autowired
	AsyncAuditService asyncAuditService

	@PersistenceContext
	EntityManager entityManager

	/**
	 * Arround advice calls before and after method execution. 
	 * Based on the input, it will generate Json for the given entity id and entity name.
	 * @param pjp
	 * @param auditAnnotation
	 * @return
	 * @throws Throwable
	 */
	@Around('@annotation(auditAnnotation)')
	def auditInformation(ProceedingJoinPoint pjp,Auditable auditAnnotation) throws Throwable {

		Signature signature = pjp.signature
		String method = signature.name
		def content = [:]
		
		
		def entityName = auditAnnotation.entityName()
		def entityId
		if(auditAnnotation.id()!=Constants.NUMERIC_MINUS_1){
			entityId = pjp.args[auditAnnotation.id()]
		}
		Subject subject  = SecurityUtils.subject
		def token = "Bearer ${subject.principal.token}".toString()


		content[Constants.PREVIOUS] = getAuditLogsByID(entityId,entityName)


		log.info ('    Started ' + method + '() :  ')

		Object result = pjp.proceed()


		content[Constants.NEW] = getAuditLogsByID(entityId,entityName)


		if(auditAnnotation.contentPosition()!=Constants.NUMERIC_MINUS_1 && auditAnnotation.id()==Constants.NUMERIC_MINUS_1){
			content[Constants.NEW] = pjp.args[auditAnnotation.contentPosition()]
			content[Constants.PREVIOUS] = null
		}

		asyncAuditService.auditLogger(content,auditAnnotation.eventCode(),auditAnnotation.microServiceName(),auditAnnotation.entityName(),token)


		log.info ('    '+ method + '() Ended')

		result
	}

	/**
	 * get the Json by passing enity id and entity name
	 * 
	 * @param entityId
	 * @param entityName
	 * @return json object
	 */
	def getAuditLogsByID(entityId,entityName){
		def retVal
		if(entityId&&entityId!=Constants.NUMERIC_MINUS_1){

			def auditData
			if(entityName == EntityEnum.STUDY.value){
				auditData =  entityManager.find(Study, entityId)
			}
			if(entityName==EntityEnum.USERGROUP.value){
				auditData =  entityManager.find(UserGroup, entityId)
			}

			if(entityName==EntityEnum.USERACCOUNT.value){
				auditData =  entityManager.find(UserAccount, entityId)
			}

			if(entityName==EntityEnum.WORKSHEET.value){
				auditData =  entityManager.find(Worksheet, entityId)
			}

			retVal =convertToJson(auditData)
		}
		retVal
	}

	/**
	 * 
	 * Convert entity object to Json
	 * 
	 * @param entityObj
	 * @return json value
	 */
	def convertToJson(entityObj) {
		def result
		ObjectMapper mapper = new ObjectMapper()
		mapper.registerModule(new Hibernate4Module())
		result = mapper.writeValueAsString(entityObj)

		result
	}

	
}

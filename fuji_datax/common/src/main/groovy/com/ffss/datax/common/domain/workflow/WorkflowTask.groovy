package com.ffss.datax.common.domain.workflow

import javax.persistence.CascadeType
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.FetchType
import javax.persistence.GeneratedValue
import javax.persistence.Id
import javax.persistence.JoinColumn
import javax.persistence.ManyToOne
import javax.persistence.OneToMany
import javax.persistence.Table

import org.hibernate.annotations.Type
import org.joda.time.DateTime

import com.fasterxml.jackson.annotation.JsonBackReference
import com.fasterxml.jackson.annotation.JsonIgnore
import com.fasterxml.jackson.annotation.JsonManagedReference
import com.fasterxml.jackson.databind.annotation.JsonDeserialize
import com.fasterxml.jackson.databind.annotation.JsonSerialize
import com.ffss.datax.common.domain.audit.Audit
import com.ffss.datax.common.domain.study.StudyTaskMap
import com.ffss.datax.common.domain.userprofile.UserAccount
import com.ffss.datax.common.util.CustomDateTimeDeserializer
import com.ffss.datax.common.util.CustomDateTimeSerializer

@Entity
@Table(name='workflow_task')
class WorkflowTask extends Audit{

	@Id
	@GeneratedValue
	@Column(name='TASK_PK')
	Long id
	
	@JsonIgnore
	@JsonBackReference
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name='WORKFLOW_CONFIG_FK')
	WorkflowConfig workflowConfig

	@Column(name='CURRENT_STATUS')
	String currentStatus

	
	@JsonBackReference
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name='ASSIGNED_USER')
	UserAccount assignedUser

	@JsonIgnore
	@JsonBackReference
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name='TRIGGERING_USER')
	UserAccount triggeringUser

	@JsonIgnore
	@JsonBackReference
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name='TYPE_FK')
	TypeConfig typeConfig

	@Column(name='ASSIGNED_DATE')
	@Type(type = 'org.jadira.usertype.dateandtime.joda.PersistentDateTime')
	@JsonSerialize(using = CustomDateTimeSerializer)
	@JsonDeserialize(using = CustomDateTimeDeserializer)
	DateTime assignedDate

	@JsonIgnore
	@JsonManagedReference
	@OneToMany(mappedBy = 'workflowTask',cascade=CascadeType.ALL)
	List<TaskAssignedUser> taskAssignedUser
	
	@JsonIgnore
	@JsonManagedReference
	@OneToMany(mappedBy = 'workflowTask',cascade=CascadeType.ALL)
	List<StudyTaskMap> studyTaskMap
	
	@JsonIgnore
	@JsonManagedReference
	@OneToMany(mappedBy = 'workflowTask',cascade=CascadeType.ALL)
	List<UserTaskStage> userTaskStage
}

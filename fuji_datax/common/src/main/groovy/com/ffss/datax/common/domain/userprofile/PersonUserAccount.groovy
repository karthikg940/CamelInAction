package com.ffss.datax.common.domain.userprofile

import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.FetchType
import javax.persistence.GeneratedValue
import javax.persistence.Id
import javax.persistence.JoinColumn
import javax.persistence.ManyToOne
import javax.persistence.Table

import com.fasterxml.jackson.annotation.JsonBackReference
import com.fasterxml.jackson.annotation.JsonIgnore
import com.ffss.datax.common.domain.audit.Audit
import com.ffss.datax.common.domain.study.Person

@Entity
@Table(name='person_user_account')
class PersonUserAccount extends Audit{
	@Id
	@GeneratedValue
	@Column(name='PERSON_USER_ACCOUNT_PK')
	Long id
	
	@JsonIgnore
	@JsonBackReference
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name='USER_ACCOUNT_FK')
	UserAccount userAccount
	
	@JsonIgnore
	@JsonBackReference
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name='person_fk')
	Person person
	
	
}

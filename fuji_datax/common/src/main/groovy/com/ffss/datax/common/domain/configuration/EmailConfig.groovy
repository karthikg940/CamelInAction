package com.ffss.datax.common.domain.configuration


import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.Id
import javax.persistence.Table

import org.joda.time.DateTime

import com.fasterxml.jackson.annotation.JsonIgnore
import com.ffss.datax.common.domain.audit.Audit

@Entity
@Table(name='email_config')
class EmailConfig extends Audit {
	@Id
	@GeneratedValue
	@Column(name='EMAIL_CONFIG_PK')
	Long id
	
	@Column(name='ORG_FK')
	Long orgId
	
	@Column(name='IS_SSL')
	Boolean isSSL
	
	@Column(name='IS_AUTH')
	Boolean isAuth
	
	@Column(name='IS_ENABLE')
	Boolean isEnable
	
	@Column(name='AUTH_USER')
	String userName
	
	@Column(name='AUTH_USER_PASSWORD')
	private String password

	@Column(name='PORT')
	Integer port

	@Column(name='SERVER')
	String server
	
	@Column(name='DEFAULT_EMAIL')
	String defaultEmail

	//@JsonIgnore
	String getPassword() {
		this.password
	}
	
	void setPassword(String password) {
		this.password = password
	}
	
	@Override
	@JsonIgnore
	Long getCreatedBy() {
		this.createdBy
	}
	
	@Override
	@JsonIgnore
	DateTime getCreatedDateTime() {
		this.createdDateTime
	}
	
	@Override
	@JsonIgnore
	Long getUpdatedBy() {
		this.updatedBy
	}
	
	@Override
	@JsonIgnore
	DateTime getUpdatedDateTime() {
		this.updatedDateTime
	}
	
}
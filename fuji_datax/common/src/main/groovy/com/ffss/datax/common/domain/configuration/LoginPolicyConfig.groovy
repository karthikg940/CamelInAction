package com.ffss.datax.common.domain.configuration

import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.Id
import javax.persistence.Table

import com.ffss.datax.common.domain.audit.Audit

@Entity
@Table(name='login_policy_config')
class LoginPolicyConfig extends Audit{

	@Id
	@Column(name='LOGIN_POLICY_CONFIG_PK')
	@GeneratedValue
	Long id
	
	@Column(name='LOGIN_ATTRIBUTES')
	String loginAttributes
	
	@Column(name='ATTRIBUTE_VALUE')
	String attributeValue
	
	
}

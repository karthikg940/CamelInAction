package com.ffss.datax.common.domain.configuration
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.Id
import javax.persistence.JoinColumn
import javax.persistence.OneToOne
import javax.persistence.Table

import com.ffss.datax.common.domain.audit.Audit
import com.ffss.datax.common.domain.userprofile.Organization
import org.hibernate.annotations.Type

@Entity
@Table(name='login_password_config')
class OrgLoginConfigMap extends Audit{

	@Id
	@GeneratedValue
	@Column(name='LOGIN_PASSWORD_CONFIG_PK')
	Long id

	@Column(name='PASSWORD_MIN_LENGTH')
	String passWordMinLen

	@Column(name='SYS_GEN_PWD_EXPIRY')
	String generatedPwdExpiry
	
	@Column(name='USER_DEFINED_PWD_EXPIRY')
	String userDefinedPwdExpiry
	
	@Column(name='HISTORY_PWD_REUSE_RSTRCTN')
	String pwdReuseRestriction
	
	@Column(name='ACC_LOCK_THRSHLD')
	String accountLockThreshold
	
	@Column(name='INACTIVE_PERIOD_TMP_LOCK')
	String temporaryLock
	
	@Column(name='PASSWORD_VALIDATION')
	String passwordRegex
	
	@Column(name='COMMENTS')
	String comments
	
	@Column(name='IS_DEFAULT')
	String isDefault
	
	@Column(name='IS_UPPERCASE')
	@Type(type='java.lang.Boolean')
	boolean isUppercase

	@Column(name='IS_LOWERCASE')
	@Type(type='java.lang.Boolean')
	boolean isLowercase

	@Column(name='IS_NUMBER')
	@Type(type='java.lang.Boolean')
	boolean isNumber

	@Column(name='IS_SPL_CHAR')
	@Type(type='java.lang.Boolean')
	boolean isSplChar
	
	@OneToOne
	@JoinColumn(name='ORG_FK')
	Organization organization
	
}

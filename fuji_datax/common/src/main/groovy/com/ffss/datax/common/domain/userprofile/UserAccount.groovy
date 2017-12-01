package com.ffss.datax.common.domain.userprofile

import javax.persistence.*

import org.hibernate.annotations.Type
import org.joda.time.DateTime

import com.fasterxml.jackson.annotation.JsonBackReference
import com.fasterxml.jackson.annotation.JsonIgnore
import com.fasterxml.jackson.annotation.JsonManagedReference
import com.fasterxml.jackson.databind.annotation.JsonDeserialize
import com.fasterxml.jackson.databind.annotation.JsonSerialize
import com.ffss.datax.common.domain.audit.Audit
import com.ffss.datax.common.util.CustomDateTimeDeserializer
import com.ffss.datax.common.util.CustomDateTimeSerializer

@Entity
@Table(name='user_account')
class UserAccount extends Audit {
	@Id
	@GeneratedValue
	@Column(name='USER_ACCOUNT_PK')
	Long id

	@Column(name='USER_NAME')
	String userName

	/*@Column(name='ENABLED')
	 Character enabled*/

	@Column(name='FIRST_NAME')
	String firstName
	
	@Column(name='MIDDLE_NAME')
	String middleName

	@Column(name='LAST_NAME')
	String lastName

	@Column(name='PREFIX')
	String prefix

	@Column(name='BATCHID')
	String batchId

	@Column(name='TITLE')
	String title

	@Column(name='PHONE_NO')
	String phoneNo

	@Column(name='IS_EXTERNAL')
	String isExternal

	@Column(name='PASSWORD_HASH')
	String passwordHash

	@Column(name='EMAIL_ADDRESS')
	String emailAddress


	@Column(name='LOGIN_ATTEMPT')
	Integer loginAttempt

	@Column(name='IS_ACTIVE')
	String isActive

	@Column(name='PASSWORD_EXPIRE')
	String ispwdExpired

	@Column(name='LAST_PWD_CHANGEDATE')
	@Type(type = 'org.jadira.usertype.dateandtime.joda.PersistentDateTime')
	@JsonSerialize(using = CustomDateTimeSerializer)
	@JsonDeserialize(using = CustomDateTimeDeserializer)
	DateTime lastPwdChangDate

	@Column(name='PWD_EXPIREDATE')
	@Type(type = 'org.jadira.usertype.dateandtime.joda.PersistentDateTime')
	@JsonSerialize(using = CustomDateTimeSerializer)
	@JsonDeserialize(using = CustomDateTimeDeserializer)
	DateTime pwdExpireDate

	@Column(name='PROFILE_URL')
	String profileUrl

	@Column(name='IS_PWD_SYSGEN')
	String isPwdSysgen

	@Column(name='IS_USER_LOCK')
	String isUserLock

	@Column(name='IS_USER_DELETED')
	String isUserDel

	@Column(name='LAST_LOGIN')
	@Type(type = 'org.jadira.usertype.dateandtime.joda.PersistentDateTime')
	@JsonSerialize(using = CustomDateTimeSerializer)
	@JsonDeserialize(using = CustomDateTimeDeserializer)
	DateTime lastLogin
	
	@Column(name='LAST_LOCKED_TIME')
	@Type(type = 'org.jadira.usertype.dateandtime.joda.PersistentDateTime')
	@JsonSerialize(using = CustomDateTimeSerializer)
	@JsonDeserialize(using = CustomDateTimeDeserializer)
	DateTime lockedTime

	@JsonIgnore
	@JsonManagedReference
	@OneToMany(mappedBy = 'user',cascade=CascadeType.ALL)
	List<PasswordHistory> passwordHistory
	    
	@JsonIgnore
	@OneToMany(mappedBy = 'userAccount',cascade=CascadeType.ALL)
	List<PersonUserAccount> userAccount
	
/*	@JsonIgnore
	@JsonManagedReference
	@OneToMany(mappedBy ='userAccount',cascade=CascadeType.ALL)
	List<UserAccountGroup> userAccountGroup*/
	
	@ManyToMany(cascade = CascadeType.ALL)
	@JsonManagedReference
	@JoinTable(name = 'useracc_group_mapping',
	joinColumns =   
	@JoinColumn(name = 'USER_ACCOUNT_FK', referencedColumnName = 'USER_ACCOUNT_PK'),
	inverseJoinColumns =
	@JoinColumn(name = 'USER_GROUP_FK',referencedColumnName = 'USER_GROUP_PK')
	)
	List<UserGroup> userGroup =  [] 
	
	@JsonIgnore
	@JsonBackReference
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name='org_fk')
	Organization organization
	
	@ManyToMany(cascade = CascadeType.ALL)
	@JsonManagedReference
	@JoinTable(name = 'useracc_role_mapping',
	joinColumns =    
	@JoinColumn(name = 'USER_ACCOUNT_FK', referencedColumnName = 'USER_ACCOUNT_PK'),
	inverseJoinColumns =
	@JoinColumn(name = 'USER_ROLE_FK',referencedColumnName = 'USER_ROLE_PK')
	)
	List<UserRole> userRole =  []
	
	@ManyToMany(cascade = CascadeType.ALL)
	@JsonManagedReference
	@JoinTable(name = 'useracc_permission_mapping',
	joinColumns =    
	@JoinColumn(name = 'USER_ACCOUNT_FK', referencedColumnName = 'USER_ACCOUNT_PK'),
	inverseJoinColumns =
	@JoinColumn(name = 'PERMISSION_FK',referencedColumnName = 'PERMISSION_PK')
	)
	List<Permission> permission =  []
	
	@ManyToMany(cascade = CascadeType.ALL)
	@JsonManagedReference
	@JoinTable(name = 'useracc_org_mapping',
	joinColumns =
	@JoinColumn(name = 'USER_ACCOUNT_FK', referencedColumnName = 'USER_ACCOUNT_PK'),
	inverseJoinColumns =
	@JoinColumn(name = 'USER_ORG_FK',referencedColumnName = 'ORG_PK')
	)
	List<Organization> userOrg = []
}

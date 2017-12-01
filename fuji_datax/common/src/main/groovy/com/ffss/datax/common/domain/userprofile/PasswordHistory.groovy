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
@Table(name='password_history')
class PasswordHistory extends Audit {
	@Id
	@GeneratedValue
	@Column(name='PASSWORD_HISTORY_PK')
	Long id

	@Column(name='PASSWORD_HASH')
	String passwordHash

	@JsonIgnore
	@JsonBackReference
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name='USER_ACCOUNT_FK')
	UserAccount user
	
}

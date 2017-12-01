package com.ffss.datax.common.domain.study

import javax.persistence.CascadeType
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.Id
import javax.persistence.OneToMany
import javax.persistence.Table

import com.fasterxml.jackson.annotation.JsonBackReference
import com.fasterxml.jackson.annotation.JsonIgnore
import com.ffss.datax.common.domain.audit.Audit
import com.ffss.datax.common.domain.userprofile.PersonUserAccount

@Entity
@Table(name='person')
class Person extends Audit {
	@Id
	@Column(name='person_pk')
	Long id

	@Column(name='first_name')
	String firstName

	@Column(name='middle_name')
	String middleName

	@Column(name='last_name')
	String lastName

	@Column(name='prefix')
	String prefix

	@Column(name='suffix')
	String suffix
	
	@JsonIgnore
	@JsonBackReference
	@OneToMany(mappedBy = 'person',cascade=CascadeType.ALL)
	List<PersonUserAccount> personUserAccount
	
}

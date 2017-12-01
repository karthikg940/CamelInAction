package com.ffss.datax.integrationsystem.domain

import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.Id
import javax.persistence.Table


@Entity
@Table(name='order_sequence')
class OrderSequence{

	@Id
	@GeneratedValue
	@Column(name='ID')
	Long id

}

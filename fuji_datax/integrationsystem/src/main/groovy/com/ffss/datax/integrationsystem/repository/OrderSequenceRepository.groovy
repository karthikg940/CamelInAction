package com.ffss.datax.integrationsystem.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

import com.ffss.datax.integrationsystem.domain.OrderSequence

@Repository
interface OrderSequenceRepository extends JpaRepository<OrderSequence,Long>{
}

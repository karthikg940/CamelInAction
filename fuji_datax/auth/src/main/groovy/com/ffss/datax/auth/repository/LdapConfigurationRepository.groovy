package com.ffss.datax.auth.repository

import com.ffss.datax.common.domain.configuration.LdapConfig
import org.springframework.data.jpa.repository.JpaRepository

interface LdapConfigurationRepository extends JpaRepository<LdapConfig, Long> {

}

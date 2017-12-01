package com.ffss.datax.worksheet.test.repository

import org.springframework.data.jpa.repository.JpaRepository

import com.ffss.datax.common.domain.userprofile.UserAccount

interface UserRepository  extends JpaRepository<UserAccount,Long>{

}

package com.ffss.datax.configuration.test.web.resource

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*
import groovy.json.JsonSlurper

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.MediaType

import com.ffss.datax.common.constants.Constants
import com.ffss.datax.common.domain.configuration.OrgLoginConfigMap
import com.ffss.datax.configuration.constants.ConfigurationConstants
import com.ffss.datax.configuration.repository.LoginPasswordConfigRepository
import com.ffss.datax.configuration.repository.OrganizationRepository
import com.ffss.datax.configuration.test.base.TransactionalWebIntegrationTest
import com.ffss.datax.configuration.test.base.WebAppIntegrationBaseSpecification


@TransactionalWebIntegrationTest
class PasswordPolicySpec extends WebAppIntegrationBaseSpecification {

                @Autowired
                LoginPasswordConfigRepository loginPasswordConfigRepository

                @Autowired
                OrganizationRepository organizationRepository

                def 'check the correct password policies fields populated into the change pwd page' () {
                                given : 'Organization has configured a password policy for their users'

                                def token = 'eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MTAwMiwidXNlck5hbWUiOiJjcmlzcmVuIn0.d_6oSe5guKmDi_K5V8LIS3L_UsuhrKkrfm9nc_WuDyOoK-mLhVX8WHss3fQ33G2Ek_qTRqwiWmmdl5RUrojOxQ'


                                def policydata = loginPasswordConfigRepository.save(new OrgLoginConfigMap(id:1001,
                                passWordMinLen:5,
                                accountLockThreshold:10,
                                userDefinedPwdExpiry:100,
                                passwordRegex :"ASDASD",
								pwdReuseRestriction:4,
                                isUppercase :false,
                                isLowercase :false,
                                isNumber :true,
                                isSplChar :true,
                                comments:ConfigurationConstants.ALLOW_ALL,
                                isDefault:Constants.FLAG_NO,
                                organization:organizationRepository.findOne(1l)))

                                when : 'user tries to change his password'
                                def pwdDataList = this.mockMvc.perform(get("/api/config/passwordpolicy")
                                                                .header('Authorization','Bearer '+token)
                                                                .contentType(MediaType.APPLICATION_JSON))
                                
                                
                                then : 'user is able to see the configured password policies'
                                def pwdData = new JsonSlurper().parseText(pwdDataList.andReturn().response.contentAsString)
                                println "pwdData.results[0]"+pwdData.results[0]
                                println "pwdData"+pwdData
                                def iReallyTested = false
                                pwdData.results.each{
                                                if(it.isDefault == 'N'){
                                                                assert it.pwdminlen == '5'
                                                                assert it.isUppercase ==false
                                                                assert it.isLowercase ==false
                                                                assert it.isNumber ==true
                                                                assert it.isSplChar ==true
																assert it.pwdReuseRestriction == '4'
                                                                iReallyTested = true
                                                }
                                }
                                
                                assert iReallyTested
                                
                }
                
                
}

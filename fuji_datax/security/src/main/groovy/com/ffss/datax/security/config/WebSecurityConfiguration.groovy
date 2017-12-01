package com.ffss.datax.security.config

import javax.servlet.Filter

import org.apache.shiro.mgt.SecurityManager
import org.apache.shiro.spring.web.ShiroFilterFactoryBean
import org.apache.shiro.web.mgt.DefaultWebSecurityManager
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

import com.ffss.datax.security.constants.SecurityConstants
/**
 *Apache Shiro configurations
 *
 *@author Virtusa|Polaris
 */
@Configuration
class WebSecurityConfiguration{

	/*
	 * Filter method for Shiro, specifying the api's 
	 * to be filtered
	 */
	@Bean
	ShiroFilterFactoryBean shiroFilterFactoryBean() {


		ShiroFilterFactoryBean shiroFilterFactoryBean = new ShiroFilterFactoryBean()
		Map<String, Filter> filterChain = [:] as HashMap
		shiroFilterFactoryBean.setSecurityManager(securityManager())
		filterChain.with{
			put('/api/userValidate',SecurityConstants.ANONYMOUS_FILTER)
			put('/api/userValidate/**',SecurityConstants.ANONYMOUS_FILTER)
			put('/api/pwdpolicy',SecurityConstants.ANONYMOUS_FILTER)
			put('/api/pwdpolicy/**',SecurityConstants.ANONYMOUS_FILTER)
			put('/api/login',SecurityConstants.ANONYMOUS_FILTER)
			put('/api/login/**',SecurityConstants.ANONYMOUS_FILTER)
			put('/api/**',SecurityConstants.AUTH_FILTER)
		}

		shiroFilterFactoryBean.setFilterChainDefinitionMap(filterChain)
		Map<String, Filter> filters = [:] as HashMap
		filters.put(SecurityConstants.AUTH_FILTER, new StatelessAuthenticationFilter())
		shiroFilterFactoryBean.setFilters(filters)
		shiroFilterFactoryBean
	}

	/*
	 * Default security manager 
	 */
	@Bean(name = 'securityManager')
	SecurityManager securityManager() {
		DefaultWebSecurityManager securityManager = new DefaultWebSecurityManager()
		securityManager.setRealm(realm())
		securityManager
	}

	/*
	 * Realm for the Authnetication filter to happen
	 */
	@Bean(name = 'realm')
	AuthenticatingTokenRealm realm() {
		AuthenticatingTokenRealm realm = new AuthenticatingTokenRealm()
		realm.init()
		realm
	}
}
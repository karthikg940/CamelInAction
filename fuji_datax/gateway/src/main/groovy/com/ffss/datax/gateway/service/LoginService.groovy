package com.ffss.datax.gateway.service

import org.springframework.cloud.netflix.feign.FeignClient
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.ResponseBody

/**
 * Feign client for Authentication service calls
 * 
 * @author Virtusa|Polaris
 */


@FeignClient('http://auth')
interface LoginService {

	@RequestMapping(value='/api/login',method=RequestMethod.POST)
	@ResponseBody def login(@RequestParam('user') user,@RequestParam('pwd') pwd,@RequestParam('secret') secret)

	@RequestMapping(value='/api/login',method=RequestMethod.GET)
	@ResponseBody def getUser(@RequestParam('userId') Long userId)

	@RequestMapping(value='/api/userValidate',method=RequestMethod.GET)
	@ResponseBody def validateUserInfo(@RequestParam('value') String value)

	@RequestMapping(value='/api/userValidate/reset',method=RequestMethod.POST)
	@ResponseBody def resetPassword(@RequestParam('value') String value)

	@RequestMapping(value='api/pwdpolicy',method=RequestMethod.GET)
	@ResponseBody def findLdapConfig()
}

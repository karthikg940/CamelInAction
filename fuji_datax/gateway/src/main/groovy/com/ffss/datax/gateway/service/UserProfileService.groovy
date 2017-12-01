package com.ffss.datax.gateway.service

import org.springframework.cloud.netflix.feign.FeignClient
import org.springframework.web.bind.annotation.RequestHeader
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.ResponseBody
/**
 * Feign client for UserProfile service calls
 *
 * @author Virtusa|Polaris
 */
@FeignClient('http://configuration')
interface UserProfileService {

	@RequestMapping(value='/api/user/changepassword',method=RequestMethod.PUT)
	@ResponseBody def changePassword(@RequestParam('password') def password, @RequestHeader('Authorization') token)

	@RequestMapping(value='/api/user/currentpassword',method=RequestMethod.GET)
	@ResponseBody def currentPasswordValidate(@RequestParam('password') def password,@RequestHeader('Authorization') token)

	@RequestMapping(value='/api/user/newpassword',method=RequestMethod.GET)
	@ResponseBody def newPasswordValidate(@RequestParam('password') def password,@RequestHeader('Authorization') token)
}

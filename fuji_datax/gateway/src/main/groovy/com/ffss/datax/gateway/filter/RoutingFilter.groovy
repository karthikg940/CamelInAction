package com.ffss.datax.gateway.filter

import org.slf4j.Logger
import org.slf4j.LoggerFactory

import com.ffss.datax.security.util.SecurityUtil
import com.netflix.zuul.ZuulFilter
import com.netflix.zuul.context.RequestContext

class RoutingFilter extends ZuulFilter  {

	private final Logger log = LoggerFactory.getLogger(RoutingFilter.class);

	@Override
	public String filterType() {
		return 'pre';
	}

	@Override
	public int filterOrder() {
		return 100;
	}

	@Override
	public boolean shouldFilter() {
		RequestContext ctx = RequestContext.getCurrentContext();
		if( (ctx.get("proxy") != null) && ( ctx.get("proxy").equals("studylist") || ctx.get("proxy").equals("dashboard") || ctx.get("proxy").equals("userlist") ) ) {
			return true;
		}
		return false;
	}

	@Override
	public Object run() {
		Long orgId = SecurityUtil.retreiveOrgId()
		String newUrl
		RequestContext ctx = RequestContext.getCurrentContext()
		def currentUrl = ctx.get("requestURI")
		newUrl = currentUrl.replace('/api/', "/api/org/${orgId}/")
		ctx.put("requestURI", newUrl)
		return null
	}
}

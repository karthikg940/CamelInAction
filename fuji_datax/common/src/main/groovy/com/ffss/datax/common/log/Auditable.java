package com.ffss.datax.common.log;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * Annotation for method level logging
 * 
 * 
 * @author Virtusa|Polaris
 */
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
public @interface Auditable {
	
	long eventCode();
	
	String microServiceName();

	int contentPosition() default -1;
	
	int id() default -1;
	
	String entityName();

}

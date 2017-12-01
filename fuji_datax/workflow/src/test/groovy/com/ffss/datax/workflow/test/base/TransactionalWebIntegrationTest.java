package com.ffss.datax.workflow.test.base;

import java.lang.annotation.ElementType;
import java.lang.annotation.Inherited;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.transaction.annotation.Transactional;

import com.ffss.datax.workflow.WorkflowApplication;

/**
 * 
 * @author Askar
 * @author Venkatesh
 */
@ContextConfiguration(classes = WorkflowApplication.class)
@SpringBootTest
@Transactional
@Inherited
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.TYPE)
public @interface TransactionalWebIntegrationTest {

}


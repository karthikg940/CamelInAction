package com.ffss.datax.analytics.test.base;


import java.lang.annotation.ElementType;
import java.lang.annotation.Inherited;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.transaction.annotation.Transactional;

import com.ffss.datax.analytics.AnalyticsApplication;




@ContextConfiguration(classes = AnalyticsApplication.class)
@SpringBootTest
@Transactional
@Inherited
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.TYPE)
public @interface TransactionalWebIntegrationTest {

}


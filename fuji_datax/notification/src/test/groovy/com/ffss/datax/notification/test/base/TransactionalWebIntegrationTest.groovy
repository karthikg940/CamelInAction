package com.ffss.datax.notification.test.base;


import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ContextConfiguration;

import com.ffss.datax.notification.NotificationApplication;

import groovy.transform.AnnotationCollector;



@ContextConfiguration(classes = NotificationApplication.class)
@SpringBootTest
@AnnotationCollector
public @interface TransactionalWebIntegrationTest {
}


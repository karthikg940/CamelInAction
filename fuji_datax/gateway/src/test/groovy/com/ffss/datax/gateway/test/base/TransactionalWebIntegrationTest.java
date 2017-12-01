package com.ffss.datax.gateway.test.base;

import java.lang.annotation.ElementType;
import java.lang.annotation.Inherited;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ContextConfiguration;

import com.ffss.datax.gateway.GatewayApplication;


@ContextConfiguration(classes = GatewayApplication.class)
@SpringBootTest
@Inherited
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.TYPE)
public @interface TransactionalWebIntegrationTest {

}

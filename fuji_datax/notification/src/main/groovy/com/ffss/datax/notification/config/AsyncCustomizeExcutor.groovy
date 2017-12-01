package com.ffss.datax.notification.config

import java.util.concurrent.RejectedExecutionHandler
import java.util.concurrent.ThreadPoolExecutor

import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.core.task.TaskExecutor
import org.springframework.scheduling.annotation.EnableAsync
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor

@Configuration
@EnableAsync
class AsyncCustomizeExcutor {

	@Value('${notification.threadpoolTask.corePoolSize:10}')
	int corePoolSize_task

	@Value('${notification.threadpoolTask.maxPoolSize:20}')
	int maxPoolSize_task

	@Value('${notification.threadpoolTask.queueCapacity:200}')
	int queueCapacity_task

	@Value('${notification.threadpoolTask.sleepInterval:2000}')
	int sleepInterval_task


	@Value('${notification.threadpoolReq.corePoolSize:2}')
	int corePoolSize_req

	@Value('${notification.threadpoolReq.maxPoolSize:3}')
	int maxPoolSize_req

	@Value('${notification.threadpoolReq.queueCapacity:200}')
	int queueCapacity_req

	@Value('${notification.threadpoolReq.sleepInterval:2000}')
	int sleepInterval_req

	private final static String THREAD1_NAME_PREFIX = 'Notification_'
	private final static String THREAD2_NAME_PREFIX = 'NotificationReq_'

	@Bean(name='notificationTaskExecutor')
	TaskExecutor notificationTaskExecutor() {
		ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor()
		executor.with{
			corePoolSize = corePoolSize_task
			maxPoolSize= maxPoolSize_task
			queueCapacity= queueCapacity_task
			threadNamePrefix = THREAD1_NAME_PREFIX

			rejectedExecutionHandler = new RejectedExecutionHandler() {
						void rejectedExecution(Runnable r, ThreadPoolExecutor e) {
							Thread.sleep(sleepInterval_task)
							e.execute(r)
						}
					}
			initialize()
		}
		executor
	}

	@Bean(name='notificationReqExecutor')
	TaskExecutor notificationReqExecutor() {
		ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor()
		executor.with{
			corePoolSize = corePoolSize_req
			maxPoolSize=maxPoolSize_req
			queueCapacity=queueCapacity_req
			threadNamePrefix = THREAD2_NAME_PREFIX

			rejectedExecutionHandler = new RejectedExecutionHandler() {
						void rejectedExecution(Runnable r, ThreadPoolExecutor e) {
							Thread.sleep(sleepInterval_req)
							e.execute(r)
						}
					}
			initialize()
		}
		executor
	}
}




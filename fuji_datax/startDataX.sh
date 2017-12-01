#!/bin/bash

echo off
echo Starting Microservices

export baseDir=.


echo Starting Eureka
nohup java -Xmx128m -jar $baseDir/eureka/build/libs/eureka-0.0.2-SNAPSHOT.jar 2>&1 > ./logs/eureka.out &

sleep 10 
 
echo  
echo Starting Gatway Service 
nohup java -Xmx256m -jar $baseDir/gateway/build/libs/gateway-0.0.2-SNAPSHOT.war 2>&1 > ./logs/gateway.out & 
 
sleep 5 
 
echo  
echo Starting Authentication Service 
nohup java -Xmx128m -jar $baseDir/auth/build/libs/authentication-0.0.2-SNAPSHOT.jar 2>&1 > ./logs/authentication.out & 
 
sleep 5 
 
echo  
echo Starting  onfiguration Service 
nohup java -Xmx128m -jar $baseDir/configuration/build/libs/configuration-0.0.2-SNAPSHOT.jar 2>&1 > ./logs/configuration.out & 
 
sleep 5 
 
echo  
echo Starting Notification Service 
nohup java -Xmx128m -jar $baseDir/notification/build/libs/notification-0.0.2-SNAPSHOT.jar 2>&1 > ./logs/notification.out & 
 
sleep 5 
 
echo  
echo Starting Report Generation Service 
nohup java -Xmx256m -jar $baseDir/reportgeneration/build/libs/reportgeneration-12.1-SNAPSHOT.jar 2>&1 > ./logs/reportgeneration.out & 
 
sleep 5 
 
echo  
echo Starting Statistics Service 
nohup java -Xmx256m -jar $baseDir/statistics/build/libs/statistics-0.0.2-SNAPSHOT.jar 2>&1 > ./logs/statistics.out & 
 
sleep 5 
 
echo  
echo Starting Study List Service 
nohup java -Xmx256m -jar $baseDir/studylist/build/libs/studylist-0.0.2-SNAPSHOT.jar 2>&1 > ./logs/studylist.out & 
 
sleep 5 
 
echo  
echo Starting Study Workflow Service 
nohup java -Xmx128m -jar $baseDir/studyworkflow/build/libs/workflow-0.0.2-SNAPSHOT.jar 2>&1 > ./logs/studyworkflow.out & 
 
sleep 5 
 
echo  
echo Starting System  onfiguration Service 
nohup java -Xmx256m -jar $baseDir/systemconfiguration/build/libs/systemconfiguration-0.0.2-SNAPSHOT.jar 2>&1 > ./logs/systemconfiguration.out & 
 
sleep 5 
 
echo  
echo Starting User Profile Service 
nohup java -Xmx256m -jar $baseDir/userprofile/build/libs/userprofile-0.0.2-SNAPSHOT.jar 2>&1 > ./logs/userprofile.out & 
 
sleep 5 
 
echo  
echo Starting Work Sheet Service 
nohup java -Xmx256m -jar $baseDir/worksheet/build/libs/worksheet-0.0.2-SNAPSHOT.jar 2>&1 > ./logs/worksheet.out & 
 
#sleep 5 
 
echo  
#echo Starting VNA Sync Service 
#nohup java -Xmx256m -jar $baseDir/vnasync/build/libs/vnasync-0.0.2-SNAPSHOT.jar 2>&1 > ./logs/vnasync.out & 
 
echo  
echo  Completed starting of Microservices 


exit 0

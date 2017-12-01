echo off
echo Starting Microservices

set baseDir=D:\DataX_Deployments\UAT_20170522\datax

echo Starting Eureka
start "Eureka" cmd /C java -Xmx128m -jar %baseDir%\eureka\build\libs\eureka-0.0.1-SNAPSHOT.jar

Sleep 30

echo 
echo Starting Gatway Service
start "Gateway" cmd /C java -Xmx256m -jar %baseDir%\gaetway\build\libs\gateway-0.0.1-SNAPSHOT.war

sleep 15

echo 
echo Starting Authentication Service
start "Authentication" cmd /C java -Xmx128m -jar %baseDir%\auth\build\libs\authentication-0.0.1-SNAPSHOT.jar

sleep 15

echo 
echo Starting Configuration Service
start "Configuration" cmd /C java -Xmx128m -jar %baseDir%\configuration\build\libs\configuration-0.0.1-SNAPSHOT.jar

sleep 15

echo 
echo Starting Notification Service
start "Notification" cmd /C java -Xmx128m -jar %baseDir%\notification\build\libs\notification-0.0.1-SNAPSHOT.jar
s
sleep 15

echo 
echo Starting Report Generation Service
start "Report Generation" cmd /C java -Xmx256m -jar %baseDir%\reportgeneration\build\libs\reportgeneration-12.1-SNAPSHOT.jar

sleep 15

echo 
echo Starting Statistics Service
start "Statistics" cmd /C java -Xmx256m -jar %baseDir%\statistics\build\libs\statistics-0.0.1-SNAPSHOT.jar

sleep 15

echo 
echo Starting Study List Service
start "Study List" cmd /C java -Xmx256m -jar %baseDir%\studylist\build\libs\studylist-0.0.1-SNAPSHOT.jar

sleep 15

echo 
echo Starting Study Workflow Service
start "Study Workflow" cmd /C java -Xmx128m -jar %baseDir%\studyworkflow\build\libs\workflow-0.0.1-SNAPSHOT.jar

sleep 15

echo 
echo Starting System Configuration Service
start "System Sonfiguration" cmd /C java -Xmx256m -jar %baseDir%\systemconfiguration\build\libs\systemconfiguration-0.0.1-SNAPSHOT.jar

sleep 15

echo 
echo Starting User Profile Service
start "User Profile" cmd /C java -Xmx256m -jar %baseDir%\userprofile\build\libs\userprofile-0.0.1-SNAPSHOT.jar

sleep 15

echo 
echo Starting Work Sheet Service
start "Work Sheet" cmd /C java -Xmx256m -jar %baseDir%\worksheet\build\libs\worksheet-0.0.1-SNAPSHOT.jar

sleep 15

echo 
echo Starting VNA Sync Service
start "VNA Sync" cmd /C java -Xmx256m -jar %baseDir%\batchexample\build\libs\batchexample-0.0.1-SNAPSHOT.jar

echo 
echo Completed starting of Microservices

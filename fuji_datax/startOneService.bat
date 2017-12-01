echo off
echo Starting Microservices

set baseDir=D:\DataX_Deployments\UAT_20170522\datax

echo 
echo Starting Gatway Service
cd %baseDir%\gateway
start "Gateway" cmd /C gradle bootrun -Dorg.gradle.daemon=false

echo Completed starting of Microservices

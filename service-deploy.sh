#!/bin/bash

PROJECT_ID="$(gcloud config get-value project)"
echo $PROJECT_ID
for project in $(cat projects-deploy.txt)
do
   :
  case $project in
  # case 1 build and deploy package common

  "common")
    cd common || exit
    mvn -B clean deploy --file pom.xml
    cd ..;;

  # case 2 build and deploy order-service
  "order-service")
     cd order-service || continue
     mvn clean install || continue
     sudo su
     echo "packaging done, start docker build"
    sudo docker build -f Dockerfile --tag us.gcr.io/$PROJECT_ID/orderservice:latest . || continue
     echo  "docker build done, docker push"
    sudo docker push gcr.io/$PROJECT_ID/orderservice:latest || continue
     echo  "pushed docker image"

  esac

done
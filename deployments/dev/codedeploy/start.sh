#!/bin/bash

aws ecr get-login-password --region ap-southeast-1 | docker login --username AWS --password-stdin 737938582190.dkr.ecr.ap-southeast-1.amazonaws.com

cd /home/ubuntu/infofx-website/

docker system prune -f

docker pull 737938582190.dkr.ecr.ap-southeast-1.amazonaws.com/fe-infofx-dev:latest

docker-compose up -d
#! /bin/bash

CONT_NAME=travel-expenses-core

docker kill $CONT_NAME | true
docker container rm $CONT_NAME | true




docker run -d \
       --name $CONT_NAME \
       -p 99:3002 \
       --restart always \
       --net mynetwork \
       travel-expenses-core

docker logs $CONT_NAME

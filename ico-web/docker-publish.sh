#!/bin/bash

docker tag trycodecatch-ico-web:latest alenhrga/trycodecatch-ico-web:latest

docker login
docker push alenhrga/trycodecatch-ico-web:latest

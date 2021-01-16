#!/bin/sh
echo "cleaning port"
sudo kill -9 $(lsof -t -i :4200)
echo "Server is start"
ng serve

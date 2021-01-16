#!/bin/sh
echo "cleaning port"
sudo kill -9 $(lsof -t -i :3000)
echo "Server is start"
npm start

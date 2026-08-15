#!/bin/bash
set -e

echo "Starting app with pm2..."
if ! command -v pm2 &> /dev/null; then
  npm install -g pm2
fi

cd /home/ec2-user/app
pm2 start app.js --name nodejs-cicd-demo --update-env
pm2 save

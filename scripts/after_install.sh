#!/bin/bash
set -e

echo "Installing npm dependencies..."
cd /home/ec2-user/app
npm install --production

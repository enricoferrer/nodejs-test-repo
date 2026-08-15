#!/bin/bash
set -e

echo "Installing Node.js if not present..."
if ! command -v node &> /dev/null; then
  curl -fsSL https://rpm.nodesource.com/setup_20.x | bash -
  yum install -y nodejs
fi

if [ -d /home/ec2-user/app ]; then
  rm -rf /home/ec2-user/app
fi
mkdir -p /home/ec2-user/app

#!/bin/bash
set -e

echo "Validating that the app responds on /health..."
sleep 5
curl -f http://localhost:3000/health

#!/bin/bash

echo "🚀 Starting the MetaMarketing backend setup..."

# ✅ Update packages & install Node.js + npm
sudo apt-get update -y
sudo apt-get install -y nodejs npm

# ✅ Navigate to the application root
cd /var/app/current/

# ✅ Install npm dependencies
echo "📦 Installing dependencies..."
npm install

# ✅ Load environment variables from .env if it exists
if [ -f ".env" ]; then
  echo "🔐 Loading environment variables from .env"
  export $(grep -v '^#' .env | xargs)
else
  echo "⚠️ .env file not found! Make sure it's present for sensitive configs like RPC/contract address."
fi

# ✅ Start the Node.js server
echo "🚦 Starting the Node.js server..."
npm start

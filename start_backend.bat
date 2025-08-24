@echo off
echo 🚀 Starting the MetaMarketing backend setup...

REM ✅ Navigate to project folder
cd /d E:\MetaMarketingAppFinal

REM ✅ Install npm dependencies
echo 📦 Installing dependencies...
npm install

REM ✅ Load environment variables from .env
if exist .env (
  echo 🔐 Loading environment variables from .env
  for /f "tokens=* delims=" %%a in (.env) do set %%a
) else (
  echo ⚠️ .env file not found! Make sure it's present for sensitive configs like RPC/contract address.
)

REM ✅ Start the Node.js server
echo 🚦 Starting the Node.js server...
npm start
pause

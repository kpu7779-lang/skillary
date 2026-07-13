@echo off
chcp 65001 >nul
title Skillary API + 完整版
cd /d "%~dp0"

if not exist "node_modules\next\package.json" (
  echo 正在安装依赖...
  call npm install --legacy-peer-deps
)

if not exist "prisma\dev.db" (
  echo 正在初始化数据库...
  call npx --yes prisma@6.11.1 db push
)

if not exist "node_modules\.prisma\client\index.js" (
  echo 正在生成 Prisma 客户端...
  if exist "..\prisma-tools-tmp\node_modules\.bin\prisma.cmd" (
    call "..\prisma-tools-tmp\node_modules\.bin\prisma.cmd" generate --schema="%~dp0prisma\schema.prisma"
  ) else (
    call npx --yes prisma@6.11.1 generate
  )
)

echo.
echo  清理旧进程与缓存...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":3000 " ^| findstr LISTENING') do taskkill /F /PID %%a >nul 2>&1
if exist ".next" rd /s /q ".next" >nul 2>&1

echo.
echo  启动 Skillary 完整版 + API
echo  访问 http://localhost:3000
echo.
start "" "http://localhost:3000"
if exist "node_modules\next\dist\bin\next" (
  node "node_modules\next\dist\bin\next" dev -p 3000
) else (
  call npm run dev
)
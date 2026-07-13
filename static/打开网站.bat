@echo off
chcp 65001 >nul
title Skillary 静态预览
cd /d "%~dp0"
echo.
echo  Skillary 静态预览站
echo  ─────────────────────────────────────
echo  访问 http://localhost:8765
echo  完整版 API：在上级目录运行「启动网站.bat」
echo  ─────────────────────────────────────
echo.
start "" "http://localhost:8765"
python -m http.server 8765
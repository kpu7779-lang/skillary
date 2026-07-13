@echo off
chcp 65001 >nul
title Skillary 静态预览
cd /d "%~dp0static"
echo.
echo  Skillary 静态预览站
echo  ─────────────────────────────────────
echo  访问 http://localhost:8765
echo  完整功能请用上级目录「启动网站.bat」
echo  ─────────────────────────────────────
echo.
start "" "http://localhost:8765"
python -m http.server 8765
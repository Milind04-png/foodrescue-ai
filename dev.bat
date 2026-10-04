@echo off
title FoodRescue AI Development Environment
echo =========================================================================
echo    FOODRESCUE AI - DEVELOPMENT MODE (TECH TITANS)
echo    Starting FastAPI Backend + Vite Live HMR Server...
echo =========================================================================
echo.
echo 1. Launching FastAPI Backend on port 8000 in background...
start /B python backend\main.py
echo.
echo 2. Launching browser to Vite dev server (http://127.0.0.1:5173)...
timeout /t 2 /nobreak >nul
start http://127.0.0.1:5173
echo.
echo 3. Starting Vite Frontend Server...
npm run dev

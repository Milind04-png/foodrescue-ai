@echo off
title FoodRescue AI - Frontend Launcher
echo ========================================================
echo   FoodRescue AI - Frontend Development Server
echo   Team TECH TITANS
echo ========================================================
echo.

where npm >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] npm is not found in your PATH.
    echo Please install Node.js from https://nodejs.org/
    echo.
    pause
    exit /b
)

if not exist node_modules (
    echo Installing dependencies (npm install)...
    call npm install
)

echo Starting Vite dev server on http://localhost:5173 ...
echo.
call npm run dev -- --open
pause

@echo off
title FoodRescue AI Development Environment
cd /d "%~dp0"

echo =========================================================================
echo    FOODRESCUE AI - DEVELOPMENT MODE (TECH TITANS)
echo    Starting FastAPI Backend + Vite Live HMR Server...
echo =========================================================================
echo.

:: Detect Python
set PYTHON_CMD=python
python --version >nul 2>&1
if %errorlevel% neq 0 (
    py --version >nul 2>&1
    if %errorlevel% equ 0 (
        set PYTHON_CMD=py
    ) else (
        if exist "%LOCALAPPDATA%\Programs\Python\Python312\python.exe" (
            set PYTHON_CMD="%LOCALAPPDATA%\Programs\Python\Python312\python.exe"
        )
    )
)

echo 1. Launching FastAPI Backend on port 8000 in background...
start /B %PYTHON_CMD% backend\main.py
echo.
echo 2. Launching browser to Vite dev server (http://127.0.0.1:5173)...
timeout /t 2 /nobreak >nul
start http://127.0.0.1:5173
echo.
echo 3. Starting Vite Frontend Server...
npm run dev

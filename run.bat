@echo off
title FoodRescue AI Platform Server
cd /d "%~dp0"

echo =========================================================================
echo    FOODRESCUE AI - ENTERPRISE FOOD REDISTRIBUTION PLATFORM
echo    Tagline: Predict - Rescue - Redistribute - Sustain
echo    Team Name: TECH TITANS
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
        ) else (
            echo [ERROR] Python not found in PATH!
            echo Please ensure Python is installed and added to PATH.
            pause
            exit /b 1
        )
    )
)

echo 1. Launching FoodRescue AI website in your default browser...
start http://127.0.0.1:8000
echo.
echo 2. Starting FastAPI Engine (Serving UI + Database + APIs on port 8000)...
echo    Open URL anytime: http://127.0.0.1:8000
echo    Interactive API Docs: http://127.0.0.1:8000/docs
echo.
echo [SERVER IS RUNNING] Press CTRL+C anytime in this window to stop the server.
echo =========================================================================
echo.
%PYTHON_CMD% backend\main.py
pause

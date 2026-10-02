@echo off
title FoodRescue AI - Backend Server Launcher
echo ========================================================
echo   FoodRescue AI - FastAPI Backend Server
echo   Team TECH TITANS
echo ========================================================
echo.

where python >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Python is not found in your PATH.
    echo Please install Python 3.9+ from https://www.python.org/
    echo.
    pause
    exit /b
)

echo Installing / verifying dependencies...
call pip install -r requirements.txt

echo.
echo Launching FastAPI Server on http://127.0.0.1:8000 ...
echo Swagger UI docs available at: http://127.0.0.1:8000/docs
echo.
call python backend/main.py
pause

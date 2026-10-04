@echo off
title FoodRescue AI Platform Server
echo =========================================================================
echo    FOODRESCUE AI - ENTERPRISE FOOD REDISTRIBUTION PLATFORM
echo    Tagline: Predict - Rescue - Redistribute - Sustain
echo    Team Name: TECH TITANS
echo =========================================================================
echo.
echo Launching FoodRescue AI website in your default browser...
start http://127.0.0.1:8000
echo.
echo Starting FastAPI Engine (Serving UI + Database + APIs on port 8000)...
echo Open URL anytime: http://127.0.0.1:8000
echo Interactive API Docs: http://127.0.0.1:8000/docs
echo (Press CTRL+C anytime in this terminal to stop the server)
echo.
python backend\main.py
pause

Write-Host "=========================================================" -ForegroundColor Green
Write-Host "   FOODRESCUE AI - ENTERPRISE PLATFORM (TECH TITANS)     " -ForegroundColor Cyan
Write-Host "   Tagline: Predict - Rescue - Redistribute - Sustain    " -ForegroundColor Cyan
Write-Host "=========================================================" -ForegroundColor Green
Write-Host "`nLaunching FoodRescue AI in your default browser..." -ForegroundColor Yellow
Start-Process "http://127.0.0.1:8000"
Write-Host "Starting FastAPI Engine on http://127.0.0.1:8000..." -ForegroundColor Yellow
Write-Host "Interactive API Docs: http://127.0.0.1:8000/docs" -ForegroundColor Yellow
Write-Host "(Press Ctrl+C to stop the server)`n" -ForegroundColor DarkGray
python backend\main.py

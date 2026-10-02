# Script to package frontend and backend separately into zip files and export folders

$rootDir = $PSScriptRoot
if (-not $rootDir) { $rootDir = Get-Location }

$exportsDir = Join-Path $rootDir "exports"
$frontendExport = Join-Path $exportsDir "foodrescue-frontend"
$backendExport = Join-Path $exportsDir "foodrescue-backend"
$downloadsDir = "C:\Users\milin\Downloads"

Write-Host "Creating export package directories..."
if (Test-Path $frontendExport) { Remove-Item -Recurse -Force $frontendExport }
if (Test-Path $backendExport) { Remove-Item -Recurse -Force $backendExport }

New-Item -ItemType Directory -Path $frontendExport -Force | Out-Null
New-Item -ItemType Directory -Path $backendExport -Force | Out-Null

# ----------------- FRONTEND PACKAGE -----------------
Write-Host "Assembling Frontend Package..."
Copy-Item -Recurse (Join-Path $rootDir "src") (Join-Path $frontendExport "src")
Copy-Item -Recurse (Join-Path $rootDir "dist") (Join-Path $frontendExport "dist")
Copy-Item -Recurse (Join-Path $rootDir "frontend") (Join-Path $frontendExport "frontend")
Copy-Item (Join-Path $rootDir "index.html") (Join-Path $frontendExport "index.html")
Copy-Item (Join-Path $rootDir "package.json") (Join-Path $frontendExport "package.json")
Copy-Item (Join-Path $rootDir "package-lock.json") (Join-Path $frontendExport "package-lock.json")
Copy-Item (Join-Path $rootDir "vite.config.js") (Join-Path $frontendExport "vite.config.js")
Copy-Item (Join-Path $rootDir ".env.example") (Join-Path $frontendExport ".env.example")
Copy-Item (Join-Path $rootDir ".gitignore") (Join-Path $frontendExport ".gitignore")

$frontendReadme = @"
# FoodRescue AI - Frontend Platform
> **Tagline:** Predict · Rescue · Redistribute · Sustain  
> **Team:** TECH TITANS

Enterprise web application for B2B & institutional surplus food management.

## Package Contents

1. **Modern React 19 + Vite + Tailwind CSS v4** (`src/`, `index.html`, `vite.config.js`)
   - Reactive multi-role switcher (Overview, Food Donor, NGO Portal, Delivery Fleet, Command Center)
   - Real-time countdown urgency badges and dynamic 3-tier escalation engine
   - AI Vision volumetric gastronorm container scanner
   - FSSAI Digital Safety & Handover Gate with Dual-Key QR/OTP verification and Form-IX e-Handover slip
   - Hyperlocal 5 km NGO relief feed with portion calculators
   - Interactive route radar with Green Corridor traffic routing and EV fleet telematics
   - ESG analytics, Section 80G CSR tax certificate generator, and Institutional Leaderboard
2. **Pre-built Production Bundle** (`dist/`)
   - Fully compiled, optimized HTML/CSS/JS ready for instant deployment on Vercel, Netlify, Cloudflare Pages, AWS S3, or any static web server without requiring Node.js.
3. **Vanilla Single-Page Edition** (`frontend/`)
   - Zero-dependency HTML5 / CSS3 / ES6 vanilla edition.

## Quick Start (Development Server)

### Prerequisites
- Node.js (v18 or higher recommended)
- npm (v9 or higher)

### Installation & Run
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the local development server:
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:5173`.

3. Or run via the included Windows launcher:
   Double-click `run_frontend.bat`.

## Production Build & Serve

```bash
# Build production bundle to /dist
npm run build

# Preview production build locally
npm run preview
```

Or serve the included `dist/` directory directly with any static server:
```bash
npx serve dist -p 5000
```
"@
Set-Content -Path (Join-Path $frontendExport "README.md") -Value $frontendReadme -Encoding UTF8

$frontendBat = @"
@echo off
echo ========================================================
echo  Starting FoodRescue AI Frontend (Vite Dev Server)
echo ========================================================
where npm >nul 2>nul
if %errorlevel% neq 0 (
    echo Error: npm is not found in PATH. Please install Node.js.
    pause
    exit /b
)
if not exist node_modules (
    echo Installing dependencies...
    call npm install
)
echo Launching dev server on http://localhost:5173 ...
call npm run dev -- --open
pause
"@
Set-Content -Path (Join-Path $frontendExport "run_frontend.bat") -Value $frontendBat -Encoding ASCII


# ----------------- BACKEND PACKAGE -----------------
Write-Host "Assembling Backend Package..."
Copy-Item -Recurse (Join-Path $rootDir "backend") (Join-Path $backendExport "backend")
Copy-Item -Recurse (Join-Path $rootDir "tests") (Join-Path $backendExport "tests")
Copy-Item (Join-Path $rootDir "requirements.txt") (Join-Path $backendExport "requirements.txt")
Copy-Item (Join-Path $rootDir ".env.example") (Join-Path $backendExport ".env.example")
Copy-Item (Join-Path $rootDir ".gitignore") (Join-Path $backendExport ".gitignore")

$backendReadme = @"
# FoodRescue AI - Backend API & AI Engine
> **Tagline:** Predict · Rescue · Redistribute · Sustain  
> **Team:** TECH TITANS

FastAPI Python server powering machine learning demand forecasting, FSSAI microbial shelf-life decay calculation, multi-criteria NGO matching, micro-logistics routing, and Section 80G compliance audit trail.

## Package Contents

- **`backend/main.py`**: REST API server & route handlers with auto-fallback for standalone mode.
- **`backend/ml_engine.py`**: Scikit-Learn demand forecaster & Arrhenius microbial shelf-life kinetics engine.
- **`backend/mock_data.py`**: Enterprise seed data for institutional donors, verified NGOs, and EV fleet.
- **`tests/test_api.py`**: Automated unit test suite verifying forecasting, shelf-life, and matching.
- **`requirements.txt`**: Python dependencies list.

## Quick Start

### Prerequisites
- Python 3.9+ installed
- pip package manager

### Installation & Run
1. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
2. Launch the backend server:
   ```bash
   python backend/main.py
   ```
   Or using Uvicorn directly:
   ```bash
   uvicorn backend.main:app --host 127.0.0.1 --port 8000 --reload
   ```

3. Or run via the included Windows launcher:
   Double-click `run_backend.bat`.

### Interactive Documentation & Testing
- Interactive Swagger UI: `http://127.0.0.1:8000/docs`
- ReDoc API Reference: `http://127.0.0.1:8000/redoc`
- Run automated unit test suite:
  ```bash
  python tests/test_api.py
  ```

## Key API Endpoints
- `GET /api/status`: System status and engine health
- `GET /api/data`: Full dataset (donors, NGOs, fleet, donations, ESG metrics)
- `POST /api/predict-demand`: ML demand prediction based on day, weather, festival, planned portions
- `POST /api/check-shelf-life`: FSSAI microbial decay calculation based on ambient temp & preparation time
- `POST /api/match`: Proximity & capacity NGO recipient matching
- `POST /api/donations`: Create and list new bulk donation
- `POST /api/claim`: NGO claim allocation
- `POST /api/certificate/generate`: Section 80G CSR Tax Exemption & Sustainability Certificate
"@
Set-Content -Path (Join-Path $backendExport "README.md") -Value $backendReadme -Encoding UTF8

$backendBat = @"
@echo off
echo ========================================================
echo  Starting FoodRescue AI Backend Server (FastAPI)
echo ========================================================
where python >nul 2>nul
if %errorlevel% neq 0 (
    echo Error: python is not found in PATH. Please install Python 3.9+.
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
"@
Set-Content -Path (Join-Path $backendExport "run_backend.bat") -Value $backendBat -Encoding ASCII


# ----------------- CREATE ZIP ARCHIVES -----------------
$frontendZip = Join-Path $exportsDir "foodrescue-frontend.zip"
$backendZip = Join-Path $exportsDir "foodrescue-backend.zip"

Write-Host "Compressing foodrescue-frontend.zip..."
if (Test-Path $frontendZip) { Remove-Item -Force $frontendZip }
Compress-Archive -Path "$frontendExport\*" -DestinationPath $frontendZip -CompressionLevel Optimal

Write-Host "Compressing foodrescue-backend.zip..."
if (Test-Path $backendZip) { Remove-Item -Force $backendZip }
Compress-Archive -Path "$backendExport\*" -DestinationPath $backendZip -CompressionLevel Optimal

# ----------------- COPY TO USER'S DOWNLOADS FOLDER -----------------
if (Test-Path $downloadsDir) {
    Write-Host "Exporting to User Downloads folder: $downloadsDir..."
    Copy-Item $frontendZip -Destination (Join-Path $downloadsDir "foodrescue-frontend.zip") -Force
    Copy-Item $backendZip -Destination (Join-Path $downloadsDir "foodrescue-backend.zip") -Force
    
    $dlFrontendFolder = Join-Path $downloadsDir "foodrescue-frontend"
    $dlBackendFolder = Join-Path $downloadsDir "foodrescue-backend"
    if (Test-Path $dlFrontendFolder) { Remove-Item -Recurse -Force $dlFrontendFolder }
    if (Test-Path $dlBackendFolder) { Remove-Item -Recurse -Force $dlBackendFolder }
    
    Copy-Item -Recurse $frontendExport $dlFrontendFolder
    Copy-Item -Recurse $backendExport $dlBackendFolder
    Write-Host "Successfully exported both ZIP files and extracted folders to Downloads!"
}

Write-Host "Done!"

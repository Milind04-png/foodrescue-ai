# FoodRescue AI - Backend Server & AI Engine
> **Tagline:** Predict · Rescue · Redistribute · Sustain  
> **Team:** TECH TITANS

FastAPI Python server powering machine learning demand forecasting, FSSAI microbial shelf-life decay kinetics, multi-criteria NGO matching within a 5 km micro-logistics radius, and Section 80G CSR compliance audit trail.

---

## 📦 What's Inside This Backend Package

```text
foodrescue-backend/
├── backend/
│   ├── main.py            # FastAPI REST application & routing engine
│   ├── ml_engine.py       # Scikit-Learn demand forecaster & Arrhenius decay model
│   ├── mock_data.py       # Enterprise Delhi NCR institutional seed dataset
│   └── requirements.txt   # Backend dependencies
├── tests/
│   └── test_api.py        # Automated test suite (demand, shelf-life, matching)
├── requirements.txt       # Root Python dependencies
├── run_backend.bat        # Windows 1-click launcher
├── .env.example           # Environment configuration template
└── README.md              # Full setup & API guide
```

---

## 🚀 Quick Start (Backend Server)

### Prerequisites
- [Python 3.9+](https://www.python.org/)
- pip package manager

### Installation & Run

1. Open a terminal inside this folder:
   ```bash
   cd foodrescue-backend
   ```

2. (Recommended) Create and activate a virtual environment:
   ```bash
   python -m venv venv
   # Windows:
   .\venv\Scripts\activate
   # macOS/Linux:
   source venv/bin/activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Launch the FastAPI server:
   ```bash
   python backend/main.py
   ```
   Or using Uvicorn directly:
   ```bash
   uvicorn backend.main:app --host 127.0.0.1 --port 8000 --reload
   ```

5. **Windows One-Click Launcher**:
   Simply double-click **`run_backend.bat`**.

---

## 📚 Interactive API Documentation

Once the server is running, explore and test the endpoints directly in your browser:
- **Interactive Swagger UI**: `http://127.0.0.1:8000/docs`
- **ReDoc Interactive Reference**: `http://127.0.0.1:8000/redoc`
- **System Health Status**: `http://127.0.0.1:8000/api/status`

---

## 🧪 Running Automated Unit Tests

Run the automated test suite to verify the forecasting regression model, Arrhenius temperature decay formula, and proximity matching algorithm:
```bash
python tests/test_api.py
```

Expected output:
```text
[PASS] Demand forecast test passed!
[PASS] FSSAI shelf-life test passed!
[PASS] Matching algorithm test passed!

All unit tests passed successfully!
```

---

## 🔌 Key API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/status` | System health check and engine info |
| `GET` | `/api/data` | Donors, NGOs, fleet, donations, and ESG metrics |
| `POST` | `/api/predict-demand` | ML demand forecasting with weather and festival factors |
| `POST` | `/api/check-shelf-life`| Arrhenius dynamic microbial shelf-life decay calculation |
| `POST` | `/api/match` | 5 km proximity, capacity & dietary recipient matching |
| `POST` | `/api/donations` | Log new institutional surplus batch |
| `POST` | `/api/claim` | 1-Click NGO claim allocation |
| `POST` | `/api/certificate/generate` | Section 80G CSR tax exemption certificate |

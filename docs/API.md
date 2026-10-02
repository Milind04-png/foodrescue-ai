# 📡 FoodRescue AI — REST API Documentation

This document describes the core endpoints exposed by the **FoodRescue AI FastAPI Engine** (`backend/main.py`).

---

## 1. System Health & Metadata

### `GET /api/status`
Returns real-time status of the ML prediction services and active version.

**Response:**
```json
{
  "status": "ONLINE",
  "system": "FoodRescue AI Core Engine",
  "ecosystem_version": "v2.0",
  "team": "TECH TITANS",
  "timestamp": "2026-10-03T01:40:00.000Z"
}
```

---

## 2. Demand Forecasting Engine

### `POST /api/predict-demand`
Calculates predicted footfall demand and overproduction risk using Random Forest Regression.

**Request Body:**
```json
{
  "establishment_type": "Hotel / Banquets",
  "day_of_week": 3,
  "weather": "Rain",
  "is_festival": false,
  "planned_portions": 320
}
```

**Response:**
```json
{
  "expected_covers": 250,
  "planned_covers": 320,
  "predicted_surplus_covers": 70,
  "estimated_waste_kg": 23.5,
  "recommended_adjustment_covers": -65,
  "recommendation_tip": "Cut Thursday prep by ~65 covers (-20%) to avoid an estimated 22 kg surplus due to rain."
}
```

---

## 3. FSSAI Arrhenius Microbial Shelf-Life Engine

### `POST /api/check-shelf-life`
Computes thermal safety decay based on Arrhenius temperature factor:
$$k = A \exp\left(-\frac{E_a}{R T}\right)$$

**Request Body:**
```json
{
  "category": "Cooked Gravy & Rice",
  "prep_iso": "2026-10-03T18:00:00",
  "ambient_temp_c": 32.0,
  "storage_condition": "Insulated Hot Pan (> 65°C)"
}
```

---

## 4. Smart Matching & Route Optimization

### `POST /api/match`
Evaluates multi-objective compatibility score:
$$\text{Score} = 0.35P + 0.30U + 0.20C + 0.15D$$

### `POST /api/optimize-route`
Dispatches nearest electric vehicle and generates waypoint navigation.

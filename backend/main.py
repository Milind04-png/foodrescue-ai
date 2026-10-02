"""
FastAPI Backend Server for FoodRescue AI
Team TECH TITANS
Integrates ML Demand Forecasting, FSSAI Safety Engine, Matching, Route Optimization & ESG Ledger.
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
from typing import Optional, List
import os
import sys
import uuid
from datetime import datetime, timedelta

# Ensure backend directory is in python module search path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from mock_data import DONORS, NGOS, FLEET, BIO_FACILITIES, SAMPLE_DONATIONS
from ml_engine import ml_engine

app = FastAPI(
    title="FoodRescue AI API",
    description="AI-Powered Smart Food Waste Reduction and Sustainable Redistribution Ecosystem",
    version="2.0.0"
)

# Enable CORS for cross-origin frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory application state
state = {
    "donors": list(DONORS),
    "ngos": list(NGOS),
    "fleet": list(FLEET),
    "bio_facilities": list(BIO_FACILITIES),
    "donations": list(SAMPLE_DONATIONS),
    "impact_stats": {
        "total_food_rescued_kg": 1845.0,
        "total_meals_redistributed": 4612,
        "total_co2e_saved_kg": 4612.5,
        "total_water_saved_liters": 1845000,
        "landfill_diverted_kg": 1845.0,
        "biogas_compost_diverted_kg": 160.0
    }
}

# --- Pydantic Schemas ---

class DemandForecastRequest(BaseModel):
    establishment_type: str = "Restaurant"
    day_of_week: int = 5 # 0=Mon, 5=Sat
    weather: str = "Rain"
    is_festival: bool = True
    planned_portions: int = 250

class ShelfLifeCheckRequest(BaseModel):
    category: str = "Cooked Gravy & Rice"
    prep_iso: Optional[str] = None
    ambient_temp_c: float = 32.0
    storage_condition: str = "Standard Hot Pan"

class CreateDonationRequest(BaseModel):
    donor_id: str
    title: str
    category: str
    diet: str = "VEG"
    quantity_kg: float
    portions: int
    storage_condition: str = "Insulated Hot Box"
    ambient_temp_c: float = 30.0

class ClaimDonationRequest(BaseModel):
    ngo_id: str
    driver_id: Optional[str] = None

class CompleteDeliveryRequest(BaseModel):
    delivery_notes: Optional[str] = "Delivered hot and verified fresh with digital temperature probe."
    fssai_verified: bool = True

# --- API Endpoints ---

@app.get("/api/status")
def get_system_status():
    return {
        "status": "ONLINE",
        "system": "FoodRescue AI Core Engine",
        "ecosystem_version": "v2.0",
        "team": "TECH TITANS",
        "timestamp": datetime.now().isoformat()
    }

@app.get("/api/data")
def get_all_data():
    return {
        "donors": state["donors"],
        "ngos": state["ngos"],
        "fleet": state["fleet"],
        "bio_facilities": state["bio_facilities"],
        "donations": state["donations"],
        "impact_stats": state["impact_stats"]
    }

@app.post("/api/predict-demand")
def predict_demand(req: DemandForecastRequest):
    return ml_engine.forecast_demand(
        establishment_type=req.establishment_type,
        day_of_week=req.day_of_week,
        weather=req.weather,
        is_festival=req.is_festival,
        planned_portions=req.planned_portions
    )

@app.post("/api/check-shelf-life")
def check_shelf_life(req: ShelfLifeCheckRequest):
    prep_time = req.prep_iso or datetime.now().isoformat()
    return ml_engine.calculate_fssai_shelf_life(
        category=req.category,
        prep_iso=prep_time,
        ambient_temp_c=req.ambient_temp_c,
        storage_condition=req.storage_condition
    )

@app.post("/api/match")
def match_recipients(donation_id: str):
    donation = next((d for d in state["donations"] if d["id"] == donation_id), None)
    if not donation:
        raise HTTPException(status_code=404, detail="Donation not found")
    
    matches = ml_engine.match_best_recipient(donation, state["ngos"])
    return {
        "donation_id": donation_id,
        "donation_title": donation["title"],
        "matches": matches
    }

@app.post("/api/optimize-route")
def optimize_route(donation_id: str, ngo_id: str):
    donation = next((d for d in state["donations"] if d["id"] == donation_id), None)
    ngo = next((n for n in state["ngos"] if n["id"] == ngo_id), None)
    if not donation or not ngo:
        raise HTTPException(status_code=404, detail="Donation or NGO not found")
    
    donor = next((d for d in state["donors"] if d["id"] == donation["donor_id"]), {
        "name": donation.get("donor_name", "Donor Location"),
        "lat": 28.5672,
        "lng": 77.2433
    })

    route_info = ml_engine.optimize_delivery_route(
        donor=donor,
        matched_ngo={"ngo_name": ngo["name"], "lat": ngo["lat"], "lng": ngo["lng"]},
        available_fleet=state["fleet"]
    )
    return route_info

@app.post("/api/donations")
def create_donation(req: CreateDonationRequest):
    donor = next((d for d in state["donors"] if d["id"] == req.donor_id), None)
    donor_name = donor["name"] if donor else "Registered Food Donor"
    donor_lat = donor["lat"] if donor else 28.5672
    donor_lng = donor["lng"] if donor else 77.2433

    now_dt = datetime.now()
    safety = ml_engine.calculate_fssai_shelf_life(
        category=req.category,
        prep_iso=now_dt.isoformat(),
        ambient_temp_c=req.ambient_temp_c,
        storage_condition=req.storage_condition
    )

    new_id = f"DON-2026-{len(state['donations']) + 1:03d}"
    donation_item = {
        "id": new_id,
        "donor_id": req.donor_id,
        "donor_name": donor_name,
        "lat": donor_lat,
        "lng": donor_lng,
        "title": req.title,
        "category": req.category,
        "diet": req.diet,
        "quantity_kg": req.quantity_kg,
        "portions": req.portions,
        "prepared_at": now_dt.isoformat(),
        "safe_until": safety["safe_until"],
        "remaining_minutes": safety["remaining_minutes"],
        "storage_condition": req.storage_condition,
        "fssai_status": safety["fssai_status"],
        "freshness_score": safety["freshness_score"],
        "status": "AVAILABLE",
        "matched_ngo": None,
        "driver": None,
        "co2e_saved_kg": round(req.quantity_kg * 2.5, 2),
        "water_saved_l": int(req.quantity_kg * 1000)
    }

    # Automatically run match rank
    matches = ml_engine.match_best_recipient(donation_item, state["ngos"])
    if matches:
        top_match = matches[0]
        donation_item["top_recommended_ngo"] = top_match["ngo_name"]
        donation_item["top_match_score"] = top_match["compatibility_score"]

    state["donations"].insert(0, donation_item)
    return {
        "message": "Surplus food broadcasted to nearby verified NGOs!",
        "donation": donation_item,
        "matches": matches[:3]
    }

@app.post("/api/donations/{donation_id}/claim")
def claim_donation(donation_id: str, req: ClaimDonationRequest):
    donation = next((d for d in state["donations"] if d["id"] == donation_id), None)
    if not donation:
        raise HTTPException(status_code=404, detail="Donation not found")
    
    ngo = next((n for n in state["ngos"] if n["id"] == req.ngo_id), None)
    driver = next((f for f in state["fleet"] if f["id"] == req.driver_id), None) if req.driver_id else state["fleet"][0]

    donation["status"] = "IN_TRANSIT"
    donation["matched_ngo"] = ngo["name"] if ngo else req.ngo_id
    donation["driver"] = driver["driver_name"] if driver else "Eco Volunteer Assigned"
    if driver:
        driver["status"] = "EN_ROUTE"

    return {
        "message": f"Successfully claimed! Transit dispatch initiated with {donation['driver']}.",
        "donation": donation
    }

@app.post("/api/donations/{donation_id}/complete")
def complete_delivery(donation_id: str, req: CompleteDeliveryRequest):
    donation = next((d for d in state["donations"] if d["id"] == donation_id), None)
    if not donation:
        raise HTTPException(status_code=404, detail="Donation not found")
    
    donation["status"] = "DELIVERED"
    donation["delivered_at"] = datetime.now().isoformat()
    donation["delivery_notes"] = req.delivery_notes

    # Update cumulative impact statistics
    state["impact_stats"]["total_food_rescued_kg"] += donation["quantity_kg"]
    state["impact_stats"]["total_meals_redistributed"] += donation["portions"]
    state["impact_stats"]["total_co2e_saved_kg"] += donation["co2e_saved_kg"]
    state["impact_stats"]["total_water_saved_liters"] += donation["water_saved_l"]
    state["impact_stats"]["landfill_diverted_kg"] += donation["quantity_kg"]

    return {
        "message": "Delivery completed! Impact statistics updated in city ledger.",
        "donation": donation,
        "impact_stats": state["impact_stats"]
    }

@app.post("/api/camera-ai-scan")
def camera_ai_scan(dish_name: Optional[str] = "Paneer Butter Masala & Steamed Rice"):
    """
    Simulated Computer Vision AI inspection endpoint.
    Performs visual texture, thermal dissipation, and portion volume estimation.
    """
    return {
        "detected_dish": dish_name,
        "category": "Cooked Gravy & Rice",
        "estimated_volume_liters": 12.5,
        "estimated_weight_kg": 18.2,
        "estimated_portions": 45,
        "thermal_signature_c": 64.2,
        "fssai_microbial_risk": "VERY_LOW",
        "visual_freshness_confidence": 97.4,
        "ai_vision_tag": "Freshly Cooked - Hot Sealed Container - Edible Grade A"
    }

@app.get("/api/csr-certificate/{donor_id}")
def generate_csr_certificate(donor_id: str):
    donor = next((d for d in state["donors"] if d["id"] == donor_id), state["donors"][0])
    
    # Calculate donations by this donor
    donor_donations = [d for d in state["donations"] if d["donor_id"] == donor["id"]]
    total_kg = sum(d["quantity_kg"] for d in donor_donations) or 58.5
    total_meals = sum(d["portions"] for d in donor_donations) or 145
    co2e = round(total_kg * 2.5, 2)

    return {
        "certificate_id": f"CSR-FSSAI-2026-{uuid.uuid4().hex[:8].upper()}",
        "organization_name": donor["name"],
        "fssai_license": donor["fssai_license"],
        "awarded_date": datetime.now().strftime("%B %d, 2026"),
        "total_food_rescued_kg": total_kg,
        "total_meals_provided": total_meals,
        "co2e_emissions_prevented_kg": co2e,
        "un_sdg_contributions": ["SDG 2: Zero Hunger", "SDG 12: Responsible Consumption", "SDG 13: Climate Action"],
        "tax_section": "Eligible for Section 80G CSR Sustainability Audit under MoHUA & FSSAI guidelines",
        "verification_hash": f"SHA256-{uuid.uuid4().hex[:16]}"
    }

# Mount static frontend directory (serve dist if built, otherwise frontend)
base_dir = os.path.dirname(os.path.abspath(__file__))
dist_dir = os.path.join(base_dir, "..", "dist")
frontend_dir = os.path.join(base_dir, "..", "frontend")

static_target = dist_dir if os.path.exists(dist_dir) else frontend_dir
if os.path.exists(static_target):
    if os.path.exists(os.path.join(static_target, "assets")):
        app.mount("/assets", StaticFiles(directory=os.path.join(static_target, "assets")), name="assets")
    app.mount("/static", StaticFiles(directory=static_target), name="static")

    @app.get("/")
    def serve_frontend_index():
        return FileResponse(os.path.join(static_target, "index.html"))
else:
    @app.get("/")
    def serve_standalone_info():
        return {
            "system": "FoodRescue AI Backend Engine",
            "version": "2.0.0",
            "team": "TECH TITANS",
            "docs": "/docs",
            "status": "/api/status",
            "endpoints": [
                "/api/status",
                "/api/data",
                "/api/predict-demand",
                "/api/check-shelf-life",
                "/api/match",
                "/api/donations",
                "/api/impact-summary",
                "/api/certificate/generate"
            ]
        }

if __name__ == "__main__":
    import uvicorn
    print("\n=======================================================")
    print(" FoodRescue AI - Enterprise Redistribution Platform")
    print(" Team TECH TITANS")
    print(" Serving UI & API at: http://127.0.0.1:8000")
    print("=======================================================\n")
    uvicorn.run(app, host="127.0.0.1", port=8000)
